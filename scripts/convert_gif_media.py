#!/usr/bin/env python3
"""Convert the GIF assets referenced by the portfolio to verified MP4/JPEG pairs."""

from __future__ import annotations

import argparse
import concurrent.futures
import json
import math
import re
import subprocess
import sys
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
MANIFEST = ROOT / "src/app/common/gifMedia.json"
FFMPEG = Path("/opt/homebrew/bin/ffmpeg")
FFPROBE = Path("/opt/homebrew/bin/ffprobe")
MAX_WORKERS = 2
THREADS_PER_WORKER = 2

# This allowlist follows active GIF URLs in src and GIF exports from the public
# image modules that are referenced by src. Unused GIFs stay untouched.
SOURCE_PATHS = (
    "Media/BMW/dancingCarBlack.gif",
    "Media/DeepScreen/_WaterTest.gif",
    "Media/Easel/EaselThumbPrimary.gif",
    "Media/NRF/Clear_Canvas_Thumb.gif",
    "Media/Odyssey/odysseyThumb.gif",
    "Media/Voyager/VoyagerThumb.gif",
    "images/PointAR/Figma2_02_AdobeExpress_kwpccg.gif",
    "images/PointAR/PointAR_Hero_AdobeExpress_AdobeExpress_wegd2s.gif",
    "images/PointAR/hand.gif",
    "images/PointAR/mobileView.gif",
    "images/PointAR/pointAR_Home.gif",
    "images/PointAR/start.gif",
    "images/PointAR/tour1.gif",
    "images/PointAR/tour2.gif",
    "images/PointAR/tour3.gif",
    "images/PointAR/tour4.gif",
    "images/PointAR/tour5.gif",
    "images/PointAR/tour6.gif",
    "images/PointAR/wave.gif",
    "images/PLUR/Hero.gif",
    "images/SpatialAge/spatialAge.gif",
    "images/bmw/dancingCar.gif",
    "images/canary/canaryHero4.gif",
    "images/dtlaMarriott/MarriotThumb.gif",
    "images/easel/EaselHero.gif",
    "images/home/sky.gif",
    "images/meaningfulPursuits/Hero1.gif",
    "images/plantasia/plantHero3.gif",
    "images/play/play1.gif",
    "images/play/play2.gif",
    "images/play/play3.gif",
    "images/play/play4.gif",
    "images/play/play5.gif",
    "images/play/play6.gif",
    "images/play/play7.gif",
    "images/play/play9.gif",
    "images/play/play10.gif",
    "images/play/play11.gif",
    "images/play/play12.gif",
    "images/play/play13.gif",
    "images/play/play14.gif",
    "images/play/play15.gif",
    "images/play/play16.gif",
    "images/play/play17.gif",
    "images/play/play18.gif",
    "images/play/play19.gif",
    "images/play/play20.gif",
    "images/play/play21.gif",
    "images/play/play22.gif",
    "images/play/play23.gif",
    "images/play/play24.gif",
    "images/play/play25.gif",
    "images/play/play26.gif",
    "images/play/play27.gif",
    "images/play/play28.gif",
    "images/play/play29.gif",
    "images/play/play30.gif",
    "images/play/play31.gif",
    "images/reakt/reaktHero3.gif",
    "images/reakt/reaktSystems_1.gif",
    "images/stemport/stemportHeroThumb.gif",
)


class ConversionError(RuntimeError):
    pass


def run(command: list[str], *, capture: bool = True) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(
        command,
        check=False,
        capture_output=capture,
        text=True,
    )
    if result.returncode:
        detail = result.stderr.strip() if result.stderr else "Command failed."
        raise ConversionError(f"{' '.join(command)}\n{detail}")
    return result


def probe(path: Path) -> dict:
    result = run(
        [
            str(FFPROBE),
            "-v",
            "error",
            "-select_streams",
            "v:0",
            "-show_streams",
            "-show_frames",
            "-show_entries",
            "stream=width,height,duration,time_base:format=duration:"
            "frame=best_effort_timestamp_time",
            "-of",
            "json",
            str(path),
        ]
    )
    data = json.loads(result.stdout)
    if not data.get("streams") or not data.get("frames"):
        raise ConversionError(f"No video frames found in {path}")
    stream = data["streams"][0]
    frames = data["frames"]
    timestamps = [
        float(frame["best_effort_timestamp_time"])
        for frame in frames
        if "best_effort_timestamp_time" in frame
    ]
    if len(timestamps) != len(frames):
        raise ConversionError(f"Missing frame timestamp in {path}")
    duration_value = stream.get("duration") or data.get("format", {}).get("duration")
    duration = float(duration_value) if duration_value else None
    return {
        "width": int(stream["width"]),
        "height": int(stream["height"]),
        "timeBase": stream["time_base"],
        "frameCount": len(frames),
        "timestamps": timestamps,
        "duration": duration,
    }


def transparency(path: Path) -> dict:
    result = run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-nostats",
            "-loglevel",
            "error",
            "-threads",
            str(THREADS_PER_WORKER),
            "-i",
            str(path),
            "-vf",
            "format=rgba,alphaextract,signalstats,metadata=print:key=lavfi.signalstats.YMIN:file=-",
            "-an",
            "-f",
            "null",
            "-",
        ]
    )
    minima = [
        int(value)
        for value in re.findall(r"lavfi\.signalstats\.YMIN=(\d+)", result.stdout)
    ]
    if not minima:
        raise ConversionError(f"Could not inspect alpha in {path}")
    return {
        "opaque": min(minima) == 255,
        "framesChecked": len(minima),
        "minimumAlpha": min(minima),
    }


def output_paths(source: Path) -> tuple[Path, Path]:
    return (
        source.with_name(source.name + ".hq.mp4"),
        source.with_name(source.name + ".poster.jpg"),
    )


def check_pair(source: Path, video: Path, poster: Path, input_info: dict) -> dict:
    if not video.is_file() or not poster.is_file():
        raise ConversionError(f"Expected video and poster for {source}")
    video_info = probe(video)
    if video_info["frameCount"] != input_info["frameCount"]:
        raise ConversionError(
            f"Frame count changed for {source}: "
            f"{input_info['frameCount']} to {video_info['frameCount']}"
        )
    if (video_info["width"], video_info["height"]) != (
        math.ceil(input_info["width"] / 2) * 2,
        math.ceil(input_info["height"] / 2) * 2,
    ):
        raise ConversionError(f"Unexpected padded dimensions for {video}")
    max_timestamp_delta = max(
        abs(source_time - video_time)
        for source_time, video_time in zip(
            input_info["timestamps"], video_info["timestamps"]
        )
    )
    if max_timestamp_delta > (1 / 60000) + 0.00001:
        raise ConversionError(
            f"Frame timing changed for {source}: {max_timestamp_delta:.6f}s"
        )
    if input_info["duration"] is not None and video_info["duration"] is not None:
        duration_delta = abs(input_info["duration"] - video_info["duration"])
        if duration_delta > 0.011:
            raise ConversionError(
                f"Duration changed for {source}: {duration_delta:.6f}s"
            )
    ssim_result = run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-nostats",
            "-loglevel",
            "info",
            "-threads",
            str(THREADS_PER_WORKER),
            "-filter_threads",
            str(THREADS_PER_WORKER),
            "-i",
            str(source),
            "-i",
            str(video),
            "-filter_complex",
            "[0:v]pad=ceil(iw/2)*2:ceil(ih/2)*2[reference];"
            "[reference][1:v]ssim=stats_file=-",
            "-an",
            "-f",
            "null",
            "-",
        ]
    )
    all_ssim = re.findall(r"All:([0-9.]+)", ssim_result.stderr)
    if not all_ssim:
        raise ConversionError(f"Could not calculate SSIM for {source}")
    return {
        "frameCount": video_info["frameCount"],
        "sourceDurationSeconds": input_info["duration"],
        "videoDurationSeconds": video_info["duration"],
        "maximumFrameTimestampDeltaSeconds": max_timestamp_delta,
        "meanSsim": float(all_ssim[-1]),
        "sourceBytes": source.stat().st_size,
        "videoBytes": video.stat().st_size,
        "posterBytes": poster.stat().st_size,
    }


def convert_one(relative_path: str, check_only: bool) -> dict:
    source = PUBLIC / relative_path
    if not source.is_file():
        raise ConversionError(f"Missing referenced GIF: {source}")
    source_info = probe(source)
    alpha = transparency(source)
    public_url = "/" + relative_path
    if not alpha["opaque"]:
        return {
            "source": public_url,
            "sourceBytes": source.stat().st_size,
            "width": source_info["width"],
            "height": source_info["height"],
            "frameCount": source_info["frameCount"],
            "durationSeconds": source_info["duration"],
            "alpha": alpha,
            "status": "skipped-transparency",
            "reason": "GIF contains transparent pixels; H.264 cannot preserve alpha.",
        }

    video, poster = output_paths(source)
    if check_only:
        verification = check_pair(source, video, poster, source_info)
    else:
        existing = [path for path in (video, poster) if path.exists()]
        if existing and not all(path.is_file() for path in (video, poster)):
            raise ConversionError(
                f"Incomplete conversion already exists for {source}; refusing to overwrite."
            )
        if not existing:
            temporary_video = video.with_name(video.name + ".tmp.mp4")
            temporary_poster = poster.with_name(poster.name + ".tmp.jpg")
            try:
                run(
                    [
                        str(FFMPEG),
                        "-hide_banner",
                        "-nostats",
                        "-loglevel",
                        "error",
                        "-threads",
                        str(THREADS_PER_WORKER),
                        "-filter_threads",
                        str(THREADS_PER_WORKER),
                        "-i",
                        str(source),
                        "-map",
                        "0:v:0",
                        "-an",
                        "-vf",
                        "pad=ceil(iw/2)*2:ceil(ih/2)*2",
                        "-c:v",
                        "libx264",
                        "-threads:v",
                        str(THREADS_PER_WORKER),
                        "-preset",
                        "slow",
                        "-crf",
                        "17",
                        "-pix_fmt",
                        "yuv420p",
                        "-fps_mode",
                        "passthrough",
                        "-enc_time_base:v",
                        source_info["timeBase"],
                        "-video_track_timescale",
                        "60000",
                        "-movflags",
                        "+faststart",
                        str(temporary_video),
                    ]
                )
                run(
                    [
                        str(FFMPEG),
                        "-hide_banner",
                        "-nostats",
                        "-loglevel",
                        "error",
                        "-threads",
                        str(THREADS_PER_WORKER),
                        "-i",
                        str(source),
                        "-map",
                        "0:v:0",
                        "-frames:v",
                        "1",
                        "-q:v",
                        "2",
                        "-update",
                        "1",
                        str(temporary_poster),
                    ]
                )
                verification = check_pair(
                    source, temporary_video, temporary_poster, source_info
                )
                temporary_video.replace(video)
                temporary_poster.replace(poster)
            finally:
                temporary_video.unlink(missing_ok=True)
                temporary_poster.unlink(missing_ok=True)
        else:
            verification = check_pair(source, video, poster, source_info)
    return {
        "source": public_url,
        "video": "/" + video.relative_to(PUBLIC).as_posix(),
        "poster": "/" + poster.relative_to(PUBLIC).as_posix(),
        "width": math.ceil(source_info["width"] / 2) * 2,
        "height": math.ceil(source_info["height"] / 2) * 2,
        "sourceWidth": source_info["width"],
        "sourceHeight": source_info["height"],
        "alpha": alpha,
        "status": "verified",
        **verification,
    }


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + ".tmp")
    temporary.write_text(json.dumps(value, indent=2) + "\n")
    temporary.replace(path)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="Verify existing outputs and the GIF media manifest without converting.",
    )
    parser.add_argument(
        "--report",
        type=Path,
        help="Write a detailed JSON verification and byte-size report to this path.",
    )
    args = parser.parse_args()
    if not FFMPEG.is_file() or not FFPROBE.is_file():
        parser.error("Install neither: the required ffmpeg and ffprobe must already exist.")

    started = time.time()
    results = []
    errors = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {
            executor.submit(convert_one, source, args.check): source
            for source in SOURCE_PATHS
        }
        for future in concurrent.futures.as_completed(futures):
            source = futures[future]
            try:
                result = future.result()
                results.append(result)
                print(
                    f"{result['status']}: {result['source']}",
                    flush=True,
                )
            except Exception as error:
                errors.append({"source": source, "error": str(error)})
                print(f"failed: /{source}: {error}", file=sys.stderr, flush=True)

    results.sort(key=lambda item: item["source"])
    if errors:
        report = {
            "status": "failed",
            "elapsedSeconds": round(time.time() - started, 2),
            "results": results,
            "errors": errors,
        }
        if args.report:
            write_json(args.report, report)
        return 1

    manifest = {
        result["source"]: {
            "video": result["video"],
            "poster": result["poster"],
            "width": result["width"],
            "height": result["height"],
            "sourceWidth": result["sourceWidth"],
            "sourceHeight": result["sourceHeight"],
        }
        for result in results
        if result["status"] == "verified"
    }
    if args.check:
        existing_manifest = json.loads(MANIFEST.read_text())
        if existing_manifest != manifest:
            print(f"Manifest differs from verified outputs: {MANIFEST}", file=sys.stderr)
            return 1
    else:
        write_json(MANIFEST, manifest)

    verified = [item for item in results if item["status"] == "verified"]
    skipped = [item for item in results if item["status"] != "verified"]
    source_bytes = sum(item["sourceBytes"] for item in results)
    video_bytes = sum(item.get("videoBytes", 0) for item in verified)
    poster_bytes = sum(item.get("posterBytes", 0) for item in verified)
    unreferenced = sorted(
        path.relative_to(PUBLIC).as_posix()
        for path in PUBLIC.rglob("*.gif")
        if path.relative_to(PUBLIC).as_posix() not in SOURCE_PATHS
    )
    report = {
        "status": "verified",
        "configuration": {
            "videoCodec": "libx264",
            "crf": 17,
            "preset": "slow",
            "pixelFormat": "yuv420p",
            "frameRateMode": "passthrough",
            "encoderTimeBase": "source stream time base",
            "videoTrackTimescale": 60000,
            "threadsPerWorker": THREADS_PER_WORKER,
            "maxWorkers": MAX_WORKERS,
            "posterQuality": "JPEG q:v 2 (about 90)",
        },
        "elapsedSeconds": round(time.time() - started, 2),
        "referencedGifCount": len(results),
        "verifiedConversionCount": len(verified),
        "skippedCount": len(skipped),
        "publicGifInventoryCount": len(list(PUBLIC.rglob("*.gif"))),
        "unreferencedGifCount": len(unreferenced),
        "unreferencedGifBytes": sum((PUBLIC / path).stat().st_size for path in unreferenced),
        "unreferencedGifSources": unreferenced,
        "sourceBytes": source_bytes,
        "convertedVideoBytes": video_bytes,
        "posterBytes": poster_bytes,
        "outputsBytes": video_bytes + poster_bytes,
        "netBytesSaved": source_bytes - video_bytes - poster_bytes,
        "keyAssets": {
            result["source"]: {
                "sourceBytes": result["sourceBytes"],
                "videoBytes": result["videoBytes"],
                "posterBytes": result["posterBytes"],
                "outputsBytes": result["videoBytes"] + result["posterBytes"],
                "netBytesSaved": result["sourceBytes"]
                - result["videoBytes"]
                - result["posterBytes"],
            }
            for result in verified
            if result["source"]
            in {"/images/home/sky.gif", "/Media/Voyager/VoyagerThumb.gif"}
        },
        "results": results,
    }
    if args.report:
        write_json(args.report, report)
    print(
        f"Verified {len(verified)} conversions; skipped {len(skipped)} transparent GIFs. "
        f"Referenced GIFs: {source_bytes:,} bytes; outputs: "
        f"{video_bytes + poster_bytes:,} bytes."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

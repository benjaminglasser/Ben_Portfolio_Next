"use client";

import { useEffect, useRef } from "react";
import { cancelHalftoneUpdate, requestHalftoneUpdate } from "./halftoneScheduler";

const DURATION = 650;
const INK = "#e8e8e8";
const INK_LEVEL = 0xe8;
const DISC_LEVELS = 64;
const EFFECT_INK = "#8e2115";

const HalftoneCover = ({ image, revealed, origin, tone = "auto", levels, simplifyPattern = false, cleanSilhouette = false, animated = false, animationSource, preload = false, detailEnhancement = 0, liveEnabled = true, prepareEnabled = true }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const progressRef = useRef(0);
  const toneRef = useRef(null);
  const levelsRef = useRef(null);
  const blackOverride = levels?.black;
  const whiteOverride = levels?.white;
  const steepness = levels?.steepness ?? 1.4;
  const targetRef = useRef({ revealed, origin });
  const liveEnabledRef = useRef(liveEnabled);
  const prepareEnabledRef = useRef(prepareEnabled);

  useEffect(() => {
    prepareEnabledRef.current = prepareEnabled;
    if (prepareEnabled) controlsRef.current?.prepare();
  }, [prepareEnabled]);

  useEffect(() => {
    liveEnabledRef.current = liveEnabled;
    controlsRef.current?.animate();
  }, [liveEnabled]);

  useEffect(() => {
    targetRef.current = { revealed, origin };
    controlsRef.current?.animate();
  }, [revealed, origin]);

  useEffect(() => {
    const CELL = cleanSilhouette ? 2 : 4;
    const canvas = canvasRef.current;
    const video = image.tagName === "VIDEO" ? image : videoRef.current;
    const sharedVideo = video === image;
    const context = canvas.getContext("2d");
    const sample = document.createElement("canvas");
    const sampleContext = sample.getContext("2d", { willReadFrequently: true });
    const paper = document.createElement("canvas");
    const paperContext = paper.getContext("2d");
    const glyphs = document.createElement("canvas");
    const glyphContext = glyphs.getContext("2d");
    if (!context || !sampleContext || !paperContext || !glyphContext) {
      console.warn("Thumbnail halftone skipped: canvas rendering is unavailable.");
      canvas.dataset.ready = "true";
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let progress = progressRef.current;
    let cols = 0;
    let rows = 0;
    let seeds;
    let radii;
    let remainingByCell;
    let masks;
    let paperImage;
    let paperPixels;
    let width = 0;
    let height = 0;
    let pixelRatio = 0;
    let ready = false;
    let failed = false;
    let visible = false;
    let liveFrame = 0;
    let liveTimer = 0;
    let videoFrame = 0;
    let lastVideoTime = -1;
    let playPending = false;
    const frameCallbacks = video && "requestVideoFrameCallback" in video;
    const playVideo = () => {
      if (!video || !video.paused || playPending || failed) return;
      playPending = true;
      video.play().catch((error) => {
        failed = true;
        console.warn("Animated thumbnail could not play:", error);
      }).finally(() => { playPending = false; });
    };

    const liveActive = () => animated && liveEnabledRef.current && visible && !failed && progress < 1 && !motion.matches;
    const stopLive = () => {
      cancelHalftoneUpdate(sampleLive);
      cancelAnimationFrame(liveFrame);
      clearTimeout(liveTimer);
      if (videoFrame) video.cancelVideoFrameCallback(videoFrame);
      liveFrame = liveTimer = videoFrame = 0;
    };
    // Resample only when the video presents a new frame, through a shared per-frame budget.
    const sampleLive = () => {
      if (!liveActive()) return;
      prepare(true);
    };
    const updateLive = () => {
      liveFrame = liveTimer = videoFrame = 0;
      if (!liveActive()) {
        if (!sharedVideo) video?.pause();
        return;
      }
      if (!video || video.currentTime !== lastVideoTime) {
        lastVideoTime = video?.currentTime ?? -1;
        requestHalftoneUpdate(sampleLive);
      }
      if (frameCallbacks) videoFrame = video.requestVideoFrameCallback(updateLive);
      else liveTimer = setTimeout(() => { liveFrame = requestAnimationFrame(updateLive); }, 32);
    };
    const startLive = () => {
      if (liveActive() && !liveFrame && !liveTimer && !videoFrame) {
        playVideo();
        updateLive();
      }
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
      if (!ready || progress === 1) return;
      context.drawImage(paper, 0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
      if (progress === 0) return;
      const { x, y } = targetRef.current.origin;
      const ox = x * width;
      const oy = y * height;
      const farthest = Math.hypot(
        Math.max(ox, width - ox),
        Math.max(oy, height - oy)
      );
      const band = CELL * 3;
      const radius = progress * (farthest + band * 2) - band;
      if (radius <= 0) return;
      context.save();
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      const core = Math.max(0, radius - band - CELL * 2.5 - CELL);
      if (core > 0) {
        context.moveTo(ox + core, oy);
        context.arc(ox, oy, core, 0, Math.PI * 2);
      }
      for (let index = 0; index < radii.length; index++) {
        const cx = (index % cols) * CELL + CELL / 2;
        const cy = Math.floor(index / cols) * CELL + CELL / 2;
        const distance = Math.hypot(cx - ox, cy - oy);
        const noisyDistance = distance + (seeds[index] - 0.5) * CELL * 5;
        const remaining = Math.max(0, Math.min(1, (noisyDistance - radius + band) / band));
        remainingByCell[index] = remaining;
        if (distance + CELL < core || remaining === 1) continue;
        const fade = remaining * remaining * (3 - 2 * remaining);
        const opening = CELL / Math.SQRT2 * (1 - fade);
        context.moveTo(cx + opening, cy);
        context.arc(cx, cy, opening, 0, Math.PI * 2);
      }
      context.fill();
      context.restore();
      context.fillStyle = EFFECT_INK;
      for (let index = 0; index < radii.length; index++) {
        const remaining = remainingByCell[index];
        if (remaining === 0 || remaining === 1) continue;
        context.globalAlpha = 0.95 * Math.sin(remaining * Math.PI);
        context.beginPath();
        context.arc((index % cols) * CELL + CELL / 2, Math.floor(index / cols) * CELL + CELL / 2, Math.max(radii[index], CELL * 0.35) * remaining, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const animate = () => {
      cancelAnimationFrame(frame);
      const target = targetRef.current.revealed ? 1 : 0;
      if (motion.matches) {
        progress = target;
        draw();
        startLive();
        if (progress === 1 && !sharedVideo) video?.pause();
        return;
      }
      if (!ready || progress === target) {
        draw();
        startLive();
        return;
      }
      const from = progress;
      const start = performance.now();
      const duration = DURATION * Math.abs(target - from);
      const tick = (now) => {
        const elapsed = Math.min(1, (now - start) / duration);
        progress = from + (target - from) * elapsed;
        draw();
        startLive();
        if (elapsed < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      startLive();
    };

    const prepare = (live = false) => {
      if (!prepareEnabledRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const imageWidth = image.naturalWidth || image.videoWidth;
      const imageHeight = image.naturalHeight || image.videoHeight;
      if (!rect.width || !rect.height || !imageWidth || !imageHeight) return;
      const dpr = window.devicePixelRatio || 1;
      const resized = width !== rect.width || height !== rect.height || pixelRatio !== dpr;
      if (ready && !resized && !live) return;
      width = rect.width;
      height = rect.height;
      pixelRatio = dpr;
      if (resized) {
        canvas.width = paper.width = Math.ceil(width * dpr);
        canvas.height = paper.height = Math.ceil(height * dpr);
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        paperContext.setTransform(dpr, 0, 0, dpr, 0, 0);
        const tile = Math.ceil(CELL * dpr);
        glyphs.width = tile * (cleanSilhouette ? DISC_LEVELS : 8);
        glyphs.height = tile;
        glyphContext.fillStyle = INK;
        glyphContext.strokeStyle = INK;
        for (let glyph = 0; glyph < (cleanSilhouette ? DISC_LEVELS : 8); glyph++) {
          glyphContext.save();
          glyphContext.translate(glyph * tile, 0);
          glyphContext.scale(tile / CELL, tile / CELL);
          glyphContext.lineWidth = 0.45;
          if (cleanSilhouette) {
            if (glyph) {
              glyphContext.beginPath();
              glyphContext.arc(CELL / 2, CELL / 2, CELL * 0.5 * Math.sqrt(glyph / (DISC_LEVELS - 1)), 0, Math.PI * 2);
              glyphContext.fill();
            }
          } else if (glyph < 2) {
            glyphContext.beginPath();
            glyphContext.arc(CELL / 2, CELL / 2, glyph ? 0.65 : 0.25, 0, Math.PI * 2);
            glyphContext.fill();
          } else if (glyph === 2) {
            glyphContext.strokeRect(0.7, 0.7, CELL - 1.4, CELL - 1.4);
          } else if (glyph < 6) {
            glyphContext.beginPath();
            for (let line = 0; line < 3; line++) {
              const p = 0.65 + line * 1.35;
              glyphContext.moveTo(glyph === 4 ? p : 0.3, glyph === 4 ? 0.3 : p);
              glyphContext.lineTo(glyph === 4 ? p : CELL - 0.3, glyph === 4 ? CELL - 0.3 : p);
              if (glyph === 5) {
                glyphContext.moveTo(p, 0.3);
                glyphContext.lineTo(p, CELL - 0.3);
              }
            }
            glyphContext.stroke();
          } else {
            const inset = glyph === 6 ? 0.55 : 0.15;
            glyphContext.fillRect(inset, inset, CELL - inset * 2, CELL - inset * 2);
          }
          glyphContext.restore();
        }
        // Keep each glyph's coverage so live frames are stamped into one pixel buffer
        // instead of thousands of individual canvas draw calls.
        const atlas = glyphContext.getImageData(0, 0, glyphs.width, tile).data;
        const count = glyphs.width / tile;
        masks = new Float32Array(count * tile * tile);
        for (let glyph = 0; glyph < count; glyph++) {
          for (let py = 0; py < tile; py++) {
            for (let px = 0; px < tile; px++) {
              masks[(glyph * tile + py) * tile + px] = atlas[(py * glyphs.width + glyph * tile + px) * 4 + 3] / 255;
            }
          }
        }
        paperImage = paperContext.createImageData(paper.width, paper.height);
        paperPixels = new Uint32Array(paperImage.data.buffer);
      }
      const nextCols = Math.ceil(width / CELL);
      const nextRows = Math.ceil(height / CELL);
      if (resized || nextCols !== cols || nextRows !== rows) {
        cols = nextCols;
        rows = nextRows;
        const count = cols * rows;
        sample.width = cols;
        sample.height = rows;
        remainingByCell = new Float32Array(count);
        radii = new Float32Array(count);
        seeds = new Float32Array(count);
        for (let index = 0; index < count; index++) {
          const noise = Math.sin((index % cols) * 127.1 + Math.floor(index / cols) * 311.7) * 43758.5453;
          seeds[index] = noise - Math.floor(noise);
        }
      }
      sampleContext.clearRect(0, 0, cols, rows);

      // Sample the same centered object-cover crop as the image underneath.
      const scale = Math.max(width / imageWidth, height / imageHeight);
      const source = video?.readyState >= 2 ? video : image;
      const sourceWidth = source === image ? imageWidth : video.videoWidth;
      const sourceHeight = source === image ? imageHeight : video.videoHeight;
      const sourceScale = source === image ? scale : Math.max(width / sourceWidth, height / sourceHeight);
      const cropWidth = width / sourceScale;
      const cropHeight = height / sourceScale;
      sampleContext.drawImage(
        source,
        (sourceWidth - cropWidth) / 2,
        (sourceHeight - cropHeight) / 2,
        cropWidth,
        cropHeight,
        0,
        0,
        width / CELL,
        height / CELL
      );
      let pixels;
      try {
        pixels = sampleContext.getImageData(0, 0, cols, rows).data;
      } catch (error) {
        if (error.name !== "SecurityError") throw error;
        ready = false;
        failed = true;
        context.clearRect(0, 0, width, height);
        console.warn("Thumbnail halftone skipped: the image does not allow canvas sampling.", error);
        canvas.dataset.ready = "true";
        return;
      }

      const luminance = (col, row) => {
        const offset = (Math.max(0, Math.min(rows - 1, row)) * cols + Math.max(0, Math.min(cols - 1, col))) * 4;
        return (pixels[offset] * 0.299 + pixels[offset + 1] * 0.587 + pixels[offset + 2] * 0.114) / 255;
      };
      if (!toneRef.current || toneRef.current.requested !== tone) {
        let brightness = 0;
        let weight = 0;
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const alpha = pixels[(row * cols + col) * 4 + 3] / 255;
            brightness += luminance(col, row) * alpha;
            weight += alpha;
          }
        }
        const average = weight ? brightness / weight : 0;
        toneRef.current = {
          requested: tone,
          mode: tone === "auto" ? average > 0.55 ? "swap" : "keep" : tone,
          average,
        };
        levelsRef.current = null;
      }
      if (!levelsRef.current) {
        const histogram = new Float64Array(256);
        let weight = 0;
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const alpha = pixels[(row * cols + col) * 4 + 3] / 255;
            const luma = luminance(col, row);
            const brightness = toneRef.current.mode === "swap" ? 1 - luma : luma;
            histogram[Math.round(brightness * 255)] += alpha;
            weight += alpha;
          }
        }
        const percentile = (fraction) => {
          let cumulative = 0;
          for (let bin = 0; bin < histogram.length; bin++) {
            cumulative += histogram[bin];
            if (cumulative >= weight * fraction) return bin / 255;
          }
          return 1;
        };
        // Keep a broad tonal range so surface shading survives background suppression.
        const black = Math.min(0.4, percentile(0.2));
        levelsRef.current = { black, white: Math.max(black + 0.45, percentile(0.97)) };
      }
      const validOverride = blackOverride === undefined && whiteOverride === undefined ||
        Number.isFinite(blackOverride) && Number.isFinite(whiteOverride) &&
        blackOverride >= 0 && whiteOverride <= 1 && whiteOverride > blackOverride;
      const validSteepness = Number.isFinite(steepness) && steepness >= 1 && steepness <= 12;
      if ((!validOverride || !validSteepness) && !live) {
        console.warn("Invalid thumbnail levels; using automatic levels and the default contrast curve.", levels);
      }
      const black = validOverride ? blackOverride ?? levelsRef.current.black : levelsRef.current.black;
      const white = validOverride ? whiteOverride ?? levelsRef.current.white : levelsRef.current.white;
      const curve = validSteepness ? steepness : 1.4;
      canvas.dataset.tone = toneRef.current.mode;
      canvas.dataset.brightness = toneRef.current.average.toFixed(3);
      canvas.dataset.blackPoint = black.toFixed(3);
      canvas.dataset.whitePoint = white.toFixed(3);
      const tile = glyphs.height;
      const paperWidth = paper.width;
      const paperHeight = paper.height;
      const cellPixels = CELL * dpr;
      paperPixels.fill(0xff000000);
      const stamp = (mask, opacity, col, row) => {
        const x0 = Math.round(col * cellPixels);
        const y0 = Math.round(row * cellPixels);
        const spanX = Math.min(tile, paperWidth - x0);
        const spanY = Math.min(tile, paperHeight - y0);
        const factor = Math.min(1, opacity);
        for (let py = 0; py < spanY; py++) {
          let target = (y0 + py) * paperWidth + x0;
          let source = (mask * tile + py) * tile;
          for (let px = 0; px < spanX; px++, target++, source++) {
            const coverage = masks[source] * factor;
            if (coverage <= 0) continue;
            const current = paperPixels[target] & 255;
            const value = (current + (INK_LEVEL - current) * coverage + 0.5) | 0;
            paperPixels[target] = 0xff000000 | (value << 16) | (value << 8) | value;
          }
        }
      };
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col;
          const offset = index * 4;
          const alpha = pixels[offset + 3] / 255;
          let luma = luminance(col, row);
          if (cleanSilhouette) {
            // Expand fine wireframe strokes by one small cell before tonal mapping.
            luma = Math.max(luma, luminance(col - 1, row), luminance(col + 1, row),
              luminance(col, row - 1), luminance(col, row + 1));
          } else if (simplifyPattern) {
            const neighborhood = (
              luminance(col - 1, row) + luminance(col + 1, row) +
              luminance(col, row - 1) + luminance(col, row + 1)
            ) / 4;
            luma = luma * 0.5 + neighborhood * 0.5;
          }
          if (detailEnhancement > 0) {
            const surrounding = (
              luminance(col - 2, row) + luminance(col + 2, row) +
              luminance(col, row - 2) + luminance(col, row + 2)
            ) / 4;
            luma = Math.max(0, Math.min(1, luma + (luma - surrounding) * detailEnhancement));
          }
          const brightness = (toneRef.current.mode === "swap" ? 1 - luma : luma) * alpha;
          const normalized = Math.max(0, Math.min(1, (brightness - black) / (white - black)));
          const light = normalized ** curve;
          const dark = (1 - normalized) ** curve;
          // Retain source shading even where project-specific levels clip to black or white.
          const sourceWeight = cleanSilhouette ? 0 : simplifyPattern ? 0.1 : 0.3;
          const shade = (1 - sourceWeight) * light / (light + dark) + sourceWeight * brightness;
          radii[index] = Math.min(CELL / 2, (0.025 + 0.475 * shade) * CELL);
          if (cleanSilhouette) {
            const disc = Math.round(Math.min(1, shade) * (DISC_LEVELS - 1));
            if (disc > 0) stamp(disc, 1, col, row);
            continue;
          }
          const glyph = simplifyPattern ?
            shade < 0.12 ? 0 : shade < 0.3 ? 1 : shade < 0.65 ? 3 : 7 :
            shade < 0.08 ? 0 : shade < 0.2 ? 1 : shade < 0.34 ? 2 :
            shade < 0.55 ? 3 + (col + row) % 2 : shade < 0.72 ? 5 : shade < 0.88 ? 6 : 7;
          stamp(glyph, simplifyPattern ?
            shade < 0.12 ? shade * 4 : shade < 0.3 ? 0.45 + shade :
              shade < 0.65 ? 0.55 + shade * 0.6 : 0.6 + shade * 0.4 :
            shade < 0.08 ? 0.15 + shade * 6 : 1, col, row);
        }
      }
      paperContext.putImageData(paperImage, 0, 0);
      canvas.dataset.pattern = cleanSilhouette ? "clean-silhouette-dots" : simplifyPattern ? "simplified-tonal-glyphs" : "tonal-glyphs";
      ready = true;
      canvas.dataset.ready = "true";
      if (live) draw();
      else animate();
    };

    controlsRef.current = { animate, prepare };
    const resize = () => prepare();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLive();
      else {
        if (!sharedVideo) video?.pause();
        stopLive();
      }
    });
    visibility.observe(canvas);
    window.addEventListener("resize", resize);
    motion.addEventListener("change", animate);
    const handleVideoError = () => {
      failed = true;
      if (!sharedVideo) video?.pause();
      console.warn("Animated thumbnail source could not load:", animationSource);
    };
    video?.addEventListener("error", handleVideoError);
    prepare();
    return () => {
      progressRef.current = progress;
      cancelAnimationFrame(frame);
      stopLive();
      if (!sharedVideo) video?.pause();
      video?.removeEventListener("error", handleVideoError);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", animate);
      controlsRef.current = null;
    };
  }, [image, animated, animationSource, detailEnhancement, tone, blackOverride, whiteOverride, steepness, simplifyPattern, cleanSilhouette]);

  return (
    <>
      {animationSource && (
        <video
          ref={videoRef}
          src={animationSource}
          className="hidden"
          muted
          loop
          playsInline
          preload={preload ? "auto" : "none"}
          aria-hidden="true"
        />
      )}
      <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      />
    </>
  );
};

export default HalftoneCover;

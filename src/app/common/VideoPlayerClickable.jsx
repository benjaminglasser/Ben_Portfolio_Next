"use client";
import React, { useRef, useState, useEffect } from "react";
import MediaLoader from "./MediaLoader";

// A click-to-play video with sound. It shows a poster/first frame with a play
// button overlay; clicking starts playback with audio and reveals the native
// controls. preload="metadata" avoids downloading the full file up front.
// Pauses automatically when scrolled out of view.
const VideoPlayerClickable = ({ src, poster, className }) => {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posterReady, setPosterReady] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  useEffect(() => {
    setPosterReady(false);
    if (!poster) return;
    const image = new Image();
    image.onload = () => setPosterReady(true);
    image.onerror = () => console.warn("Video poster could not load.", poster);
    image.src = poster;
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [poster]);

  const handlePlay = async () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (!videoEl.getAttribute("src")) {
      videoEl.src = src;
      setActive(true);
    }
    videoEl.muted = false;
    try {
      await videoEl.play();
      setStarted(true);
    } catch (playError) {
      console.warn("Video could not start playback.", src, playError);
      setError(true);
    }
  };

  // Pause the video once it's mostly scrolled off-screen.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    const near = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(true);
    }, { rootMargin: "200px" });
    near.observe(videoEl);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !videoEl.paused) {
          videoEl.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(videoEl);
    return () => {
      near.disconnect();
      observer.disconnect();
      videoEl.pause();
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className || ""}`}>
      <video
        ref={videoRef}
        className="w-full h-auto"
        style={{ aspectRatio }}
        src={active ? src : undefined}
        poster={poster}
        preload={active ? "metadata" : "none"}
        playsInline
        controls={started}
        onLoadStart={() => {
          setLoading(true);
          setError(false);
        }}
        onLoadedMetadata={(event) => {
          const { videoWidth, videoHeight } = event.currentTarget;
          if (videoWidth && videoHeight) setAspectRatio(videoWidth / videoHeight);
        }}
        onLoadedData={() => setLoading(false)}
        onError={() => {
          console.warn("Video could not load.", src, videoRef.current?.error);
          setError(true);
        }}
      />
      {loading && !posterReady && !error && <MediaLoader className="absolute inset-0 z-10 pointer-events-none" />}

      {error && <p role="alert" className="desc-mono text-white p-4">Your video could not play. Try again.</p>}
      {!started && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40 cursor-pointer"
        >
          <span className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-[var(--rust)] bg-black/60 transition-colors hover:bg-[var(--rust)] group">
            <svg
              width="28"
              height="32"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path d="M2 2L26 16L2 30V2Z" fill="var(--rust)" className="group-hover:fill-black" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default VideoPlayerClickable;

"use client";
import React, { useRef, useState, useEffect } from "react";

// A click-to-play video with sound. It shows a poster/first frame with a play
// button overlay; clicking starts playback with audio and reveals the native
// controls. preload="metadata" avoids downloading the full file up front.
// Pauses automatically when scrolled out of view.
const VideoPlayerClickable = ({ src, poster, className }) => {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.muted = false;
    videoEl.play();
    setStarted(true);
  };

  // Pause the video once it's mostly scrolled off-screen.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !videoEl.paused) {
          videoEl.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(videoEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className || ""}`}>
      <video
        ref={videoRef}
        className="w-full h-auto"
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        controls={started}
      />

      {!started && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40 cursor-pointer"
        >
          <span className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#b45314] bg-black/60 transition-colors hover:bg-[#b45314] group">
            <svg
              width="28"
              height="32"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path d="M2 2L26 16L2 30V2Z" fill="#b45314" className="group-hover:fill-black" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default VideoPlayerClickable;

"use client";
import React, { useRef, useState } from "react";

// A click-to-play video with sound. It shows a poster/first frame with a play
// button overlay; clicking starts playback with audio and reveals the native
// controls. preload="metadata" avoids downloading the full file up front.
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

  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className || ""}`}>
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
          <span className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#A9232C] bg-black/60 transition-colors hover:bg-[#A9232C] group">
            <svg
              width="28"
              height="32"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path d="M2 2L26 16L2 30V2Z" fill="#A9232C" className="group-hover:fill-black" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default VideoPlayerClickable;

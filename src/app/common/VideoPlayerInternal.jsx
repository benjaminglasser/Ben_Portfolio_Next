"use client";
import React, { useState, useRef, useEffect } from "react";
import { PuffLoader } from "react-spinners";

const VideoPlayerInternal = ({ video, className, centered, scaleOnLargeScreens, hideLoader }) => {
  // State to manage if the video is loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoRef = useRef(null);

  // Function to handle video load state
  const handleVideoLoad = () => {
    setLoading(false); // Video is ready, so set loading to false
  };

  const handleVideoError = () => {
    setLoading(false);
    setError(true);
  };

  // Cached videos can become playable before React attaches its event
  // listeners, so the load event never fires and the spinner stays up.
  // Check the readyState on mount and listen for several load signals as
  // a fallback, plus a hard timeout so the spinner can never hang forever.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // HAVE_CURRENT_DATA (2) or greater means there's at least a frame to show.
    if (videoEl.readyState >= 2) {
      setLoading(false);
      return;
    }

    const clearLoading = () => setLoading(false);
    videoEl.addEventListener("loadeddata", clearLoading);
    videoEl.addEventListener("canplay", clearLoading);
    videoEl.addEventListener("playing", clearLoading);

    // Kick off loading in case autoplay/resource-selection didn't start it.
    if (videoEl.networkState === videoEl.NETWORK_EMPTY) {
      videoEl.load();
    }

    // Hard safety net: never let the spinner sit on top of the video forever.
    const timeoutId = setTimeout(clearLoading, 4000);

    return () => {
      videoEl.removeEventListener("loadeddata", clearLoading);
      videoEl.removeEventListener("canplay", clearLoading);
      videoEl.removeEventListener("playing", clearLoading);
      clearTimeout(timeoutId);
    };
  }, [video]);

  return (
    <div
      className={`${centered ? "flex justify-center items-center" : "block"} relative`}
    >
      {loading && !hideLoader && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-10">
          <PuffLoader
            color="#b02b1a"
            loading
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {/* Video container */}
      <div
        className={`${className} w-full flex justify-center 
                    ${centered ? "mt-10 w-full px-5 md:w-3/5 overflow-hidden" : "md:w-full"}
                    ${scaleOnLargeScreens ? "overflow-hidden xl:overflow-visible" : "overflow-hidden"}
                  `}
      >
        {error ? (
          <div className="w-full h-full flex justify-center items-center bg-gray-100">
            <p className="text-gray-500">Failed to load video</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            className={`w-full ${scaleOnLargeScreens ? "object-cover xl:object-contain" : "object-cover"} h-auto`}
            autoPlay
            loop
            playsInline
            muted
            loading="lazy"
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onCanPlayThrough={handleVideoLoad}
            onPlaying={handleVideoLoad}
            onError={handleVideoError}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerInternal;

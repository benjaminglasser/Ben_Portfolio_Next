"use client";
import React, { useState } from "react";
import LazyVideo from "./LazyVideo";
import MediaLoader from "./MediaLoader";

const VideoPlayerInternal = ({ video, className, centered, scaleOnLargeScreens, hideLoader }) => {
  // State to manage if the video is loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  // Function to handle video load state
  const handleVideoLoad = () => {
    setLoading(false); // Video is ready, so set loading to false
  };

  const handleVideoError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div
      className={`${centered ? "flex justify-center items-center" : "block"} relative`}
    >
      {/* Video container */}
      <div
        className={`${className} relative w-full flex justify-center
                    ${centered ? "mt-10 w-full px-5 md:w-3/5 overflow-hidden" : "md:w-full"}
                    ${scaleOnLargeScreens ? "overflow-hidden xl:overflow-visible" : "overflow-hidden"}
                  `}
      >
        {error ? (
          <div className="w-full h-full flex justify-center items-center bg-gray-100">
            <p className="text-gray-500">Failed to load video</p>
          </div>
        ) : (
          <LazyVideo
            src={video}
            className={`w-full ${scaleOnLargeScreens ? "object-cover xl:object-contain" : "object-cover"} h-auto`}
            style={{ aspectRatio }}
            onLoadStart={() => {
              setLoading(true);
              setError(false);
            }}
            onLoadedMetadata={(event) => {
              const { videoWidth, videoHeight } = event.currentTarget;
              if (videoWidth && videoHeight) setAspectRatio(videoWidth / videoHeight);
            }}
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onCanPlayThrough={handleVideoLoad}
            onPlaying={handleVideoLoad}
            onError={handleVideoError}
          />
        )}
        {loading && !error && !hideLoader && (
          <MediaLoader className="absolute inset-0 z-10 overflow-hidden pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default VideoPlayerInternal;

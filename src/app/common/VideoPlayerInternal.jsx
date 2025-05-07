"use client";
import React, { useState } from "react";
import { PuffLoader } from "react-spinners";

const VideoPlayerInternal = ({ video, className, centered }) => {
  // State to manage if the video is loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-10">
          <PuffLoader
            color="#ff477b"
            loading
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {/* Video container */}
      <div
        className={`${className} w-full overflow-hidden flex justify-center 
                    ${centered ? "mt-10 w-full px-5 md:w-3/5" : "md:w-full"}
                  `}
      >
        {error ? (
          <div className="w-full h-full flex justify-center items-center bg-gray-100">
            <p className="text-gray-500">Failed to load video</p>
          </div>
        ) : (
          <video
            className="object-cover w-full h-auto"
            autoPlay
            loop
            playsInline
            muted
            loading="lazy"
            onCanPlayThrough={handleVideoLoad}
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

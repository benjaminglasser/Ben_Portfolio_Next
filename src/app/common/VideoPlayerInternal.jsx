"use client";
import React, { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";

const VideoPlayerInternal = ({ video, className, centered }) => {
  // State to manage if the video is loading
  const [loading, setLoading] = useState(true);

  // Function to handle video load state
  const handleVideoLoad = () => {
    setLoading(false); // Video is ready, so set loading to false
  };

  return (
    <div
      className={`${centered ? "flex justify-center items-center" : "block"}`}
    >
      {loading && (
        <div className="w-full h-screen flex justify-center items-center">
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
        <video
          className="object-cover w-full h-auto"
          autoPlay
          loop
          playsInline
          muted
          loading="lazy"
          onCanPlayThrough={handleVideoLoad} // Event when video can play through without stopping
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayerInternal;

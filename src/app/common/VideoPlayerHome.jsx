"use client";
import React, { useRef } from "react";

const VideoPlayerHome = ({ video1, video2, className, centered, isHovered }) => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  return (
    <div className={`${centered ? "flex justify-center items-center" : "block"}`}>
      <div
        className={`${className} w-full overflow-hidden flex justify-center h-[500px] md:h-[70vh]
                    ${centered ? "mt-10 w-full px-5 md:w-3/5" : "md:w-full"}`}
      >
        {/* Video 1 */}
        <video
          ref={video1Ref}
          className={`object-cover w-full h-[500px] md:h-[70vh] absolute transition-opacity duration-200 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
          autoPlay
          loop
          playsInline
          muted
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video 2 */}
        <video
          ref={video2Ref}
          className={`object-cover w-full h-[500px] md:h-[70vh] absolute transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          playsInline
          muted
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayerHome;
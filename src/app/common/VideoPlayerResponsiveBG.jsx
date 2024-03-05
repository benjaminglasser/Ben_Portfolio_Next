import { IMAGES } from "@/app/assets/images";
import React from "react";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";

function VideoPlayerResponsiveBG({ vidDesktop, vidMobile }) {
  return (
    <>
      <VideoPlayerInternal
        className="fixed hidden md:block"
        video={vidDesktop}
      />
      <VideoPlayerInternal
        className="fixed block md:hidden"
        video={vidMobile}
      />
    </>
  );
}

export default VideoPlayerResponsiveBG;

import { IMAGES } from "@/app/assets/images";
import React from "react";
import VideoPlayerInternal from '@/app/common/VideoPlayerInternal.jsx'

function ResponsiveBMWVideo() {
  return (
    <>


      <VideoPlayerInternal 
        className="fixed hidden lg:block"
        video="/Media/BMW/car-sim.mp4"
      />
      <VideoPlayerInternal 
        className="fixed block lg:hidden"
        video="/Media/BMW/carSimPhone.mp4"
      />
      

    </>
  );
}

export default ResponsiveBMWVideo;

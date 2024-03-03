import { IMAGES } from "@/app/assets/images";
import React from "react";
import VideoPlayerHero from '@/app/common/VideoPlayerHero.jsx'

function ResponsiveBMWVideo() {
  return (
    <>
      {/* <video
        className="fixed top-0 left-0 w-full h-full -z-10 object-cover hidden lg:block"
        autoPlay
        muted
        loop
        src="/Videos/BMW/car-sim.mp4"
      /> */}

      <VideoPlayerHero 
        className="fixed hidden lg:block"
        video="/Videos/BMW/car-sim.mp4"
      />
      <VideoPlayerHero 
        className="fixed block lg:hidden"
        video="/Videos/BMW/carSimPhone.mp4"
      />



      {/* <video
        className="fixed top-0 left-0 w-full  h-full -z-10 object-cover block lg:hidden"
        autoPlay
        muted
        loop
        src="/Videos/BMW/carSimPhone.mp4"
      /> */}
      

    </>
  );
}

export default ResponsiveBMWVideo;

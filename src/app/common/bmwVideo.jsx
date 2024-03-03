import { IMAGES } from "@/app/assets/images";
import React from "react";

function ResponsiveBMWVideo() {
  return (
    <>
      <video
        className="fixed top-0 left-0 w-full h-full -z-10 object-cover hidden lg:block"
        autoPlay
        muted
        loop
        src="/Videos/BMW/car-sim.mp4"
      />
      <video
        className="fixed top-0 left-0 w-full  h-full -z-10 object-cover block lg:hidden"
        autoPlay
        muted
        loop
        src="/Videos/BMW/carSimPhone.mp4"
      />
    </>
  );
}

export default ResponsiveBMWVideo;

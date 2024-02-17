import { IMAGES } from "@/app/assets/images";
import React from "react";

function ResponsiveBMWVideo() {
  return (
    <div>
      <video
        className="absolute top-0 left-0 w-full -z-10 object-cover hidden lg:block"
        autoPlay
        muted
        loop
        src={IMAGES.BG_BMW}
      />
      <video
        className="absolute top-0 left-0 w-full -z-10 object-cover block lg:hidden"
        autoPlay
        muted
        loop
        src={IMAGES.BG_BMW_PHONE}
      />
    </div>
  );
}

export default ResponsiveBMWVideo;

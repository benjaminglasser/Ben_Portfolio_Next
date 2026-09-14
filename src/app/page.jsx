"use client";
// import Image from "next/image";
// import { IMAGES } from "../../public/images";
// import Grid from "@mui/system/Unstable_Grid/Grid";
import WorkSection from "@/app/common/WorkSection";
import HomePageExtraInfo from "@/app/common/HomePageExtraInfo";
import React, { useState } from "react";
import VideoPlayerHome from "@/app/common/VideoPlayerHome.jsx";

export default function Home() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  return (
    <div className="relative">
      <div className="full-bleed relative -mt-3 md:mt-0">
        <VideoPlayerHome
          video1="/Media/Home/water_v2_MAIN.mp4"
          video2="/Media/Home/water_v2_WIREFRAME.mp4"
          onLoadingChange={setIsVideoLoading}
        />
        {/* Tagline, bottom-right of the hero */}
        <HomePageExtraInfo isLoading={isVideoLoading} />
      </div>

      <div className="mt-16 md:mt-24">
        <WorkSection />
      </div>
    </div>
  );
}

// <div
// className="home-wrapper" style={{ height: "calc(100vh - 300px)" }}
// >
{
  /* <div className="cross-hair-grid">
        <div className="cross-hairs">
          {[...Array(20)].map((_, index) => (
            <div className="cross-hair" key={index}>
              <Image
                className="sky"
                src={IMAGES.CROSS_HAIR_SM}
                alt="crosshair"
              />
            </div>
          ))}
        </div>
      </div> */
}
{
  /* <div className="one hidden md:block">
        <div className="box1"></div>
        <div className="box2"></div>
      </div> */
}
{
  /* <Grid container className="mt-5 md:mt-10 h-full flex items-center"> */
}
{
  /* <Grid xs={12} md={9}>
          <div className="px-0 md:px-8 lg:px-32">
            <a href="mailto:glasserben@gmail.com" target="_blank">
              <Image
                className="sky-gif w-full"
                src={IMAGES.SKY_GIF}
                alt="generative sky"
              />
            </a>
            <div className="border-b mt-5 md:mt-10" />
          </div>
        </Grid> */
}
{
  /* </Grid> */
}
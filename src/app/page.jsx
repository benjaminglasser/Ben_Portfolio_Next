"use client";
// import Image from "next/image";
// import { IMAGES } from "../../public/images";
// import Grid from "@mui/system/Unstable_Grid/Grid";
import WorkSection from "@/app/common/WorkSection";
import HomePageExtraInfo from "@/app/common/HomePageExtraInfo";
import React, { useState } from "react";
import VideoPlayerHome from "@/app/common/VideoPlayerHome.jsx";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative">
      
      {/* <div
        className="home-wrapper"
        style={{ height: "calc(100vh - 300px)" }}
      ></div> */}
      {/* <TickerCntr /> */}
     
      
      <HomePageExtraInfo />
      <VideoPlayerHome
        // className="h-[500px] md:h-[70vh]"
        video1="/Media/Home/water_v2_MAIN.mp4"
        video2="/Media/Home/water_v2_WIREFRAME.mp4"
        isHovered={isHovered} // Pass hover state as a prop
        />
      <h4
  className={`mt-8 w-[220px] md:mt-14 ${
    isHovered ? "text-pink" : "text-mute"
  } transition-colors duration-300`}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <strong>SELECTED WORKS</strong>
</h4>
      <div className="mt-4 md:mt-8">
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
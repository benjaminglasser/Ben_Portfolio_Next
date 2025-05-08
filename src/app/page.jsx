"use client";
// import Image from "next/image";
// import { IMAGES } from "../../public/images";
// import Grid from "@mui/system/Unstable_Grid/Grid";
import WorkSection from "@/app/common/WorkSection";
import HomePageExtraInfo from "@/app/common/HomePageExtraInfo";
import React, { useState } from "react";
import VideoPlayerHome from "@/app/common/VideoPlayerHome.jsx";
import { motion } from "framer-motion";

export default function Home() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const fadeOnlyVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <HomePageExtraInfo isLoading={isVideoLoading} />
      
      <motion.div variants={fadeOnlyVariants}>
        <VideoPlayerHome
          // className="h-[500px] md:h-[70vh]"
          video1="/Media/Home/water_v2_MAIN.mp4"
          video2="/Media/Home/water_v2_WIREFRAME.mp4"
          onLoadingChange={setIsVideoLoading}
        />
      </motion.div>

      <motion.h4 
        className="mt-8 w-[220px] md:mt-14 text-mute"
        variants={itemVariants}
      >
        <strong>SELECTED WORKS</strong>
      </motion.h4>

      <motion.div 
        className="mt-4 md:mt-8"
        variants={itemVariants}
      >
        <WorkSection />
      </motion.div>
    </motion.div>
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
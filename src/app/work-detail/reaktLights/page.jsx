"use client";
import React from "react";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import { REAKT } from "@/app/assets/images/reakt";
import { Grid } from "@mui/material";
import DetailSection from "../../common/detailSection";
import VideoPlayer from "@/app/common/CenteredVideoPlayer";

const reaktLights = () => {
  return (
    <div className="w-full text-white">

   

      <div className="h-[600px] overflow-hidden flex items-center justify-center">
        <video autoPlay loop muted playsinline className="object-cover w-[140%] min-h-full ">
          <source src={REAKT.REAKT_HERO_VID} type="video/mp4"/>
          <source src={REAKT.REAKT_HERO_WEBM} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="relative w-full flex flex-col items-cente">
        <video autoPlay loop muted playsinline className="w-full h-auto">
          <source src={REAKT.REAKT_HERO_VID} type="video/mp4"/>
          <source src={REAKT.REAKT_HERO_WEBM} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className=" relative w-full flex flex-col items-center">
      <video className="w-full h-auto" autoPlay loop playsInline muted >
        <source src={"/EaselSizzle_v10.mp4"} type="video/mp4" />
        <source src={"/EaselSizzle_Vertical.webm"} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      </div>

      <ZigzagHeader
        title="REAKT LIGHTS"
        description="Customizable audio reactive lighting system"
        extendedDescription="Reakt Lights is an audio-reactive lighting system that was commissioned for The Canary Test gallery in Los Angeles, CA. Part of the project was also to build an easy-to-use interface for the gallery to use for future sound pieces."
        time="2021 // Canary Gallery"
        role="Designer / Engineer"
        tools={[
          "TouchDesigner",
          "Chauvet DMX Dimmer/Switch Pack",
          "DMXKing eDMX1 PRO Ethernet DMX Controller",
        ]}
      />  

        <VideoPlayer
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/7znbWZne4Nk"
        />
        <VideoPlayer
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/d45Ef3S-61w"
        />
        <VideoPlayer
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://player.vimeo.com/video/589537817"
        />


      <DetailSection
        className="px-5 md:px-10 "
        title="BACKEND + INTERFACE BUILD"
        description={`Input audio signals are fed to TouchDesigner where set frequencies can be isolated, normalized then convert DMX. The signal is then converted and fed into a Chauvet DMX Dimmer/Switch Pack that can break out up to 4 channels.`}
        widthFull
        left
      />
      <Image src={REAKT.system} alt="reakt" className="w-full h-full" />


      <VideoPlayer
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/ZXU8C1nDULM"
        />
      <VideoPlayer
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/HJ8bRSWIQpQ"
        />

      
      <DetailSection
        className="px-5 md:px-10 "
        title="EARLY TESTS"
        widthFull
        left
      />

        <VideoPlayer
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/pXBFflD6ALo"
        />
        <VideoPlayer
          widthFull
          className="aspect-w-16 aspect-h-9 mb-24"
          src="https://www.youtube.com/embed/8Mm1Mv-THHY"
        />
    </div>
  );
};

export default reaktLights;

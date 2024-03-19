"use client";
import React from "react";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import { REAKT } from "../../../../public/images/reakt";
import { Grid } from "@mui/material";
import DetailSection from "../../common/detailSection";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import FancyCarousel from "@/app/common/Carousel";

const reaktLights = () => {
  const source = [
    {
      url: "https://www.youtube.com/embed/7znbWZne4Nk",
    },
    {
      url: "https://www.youtube.com/embed/d45Ef3S-61w",
    },
    {
      url: "https://player.vimeo.com/video/589537817",
    },
  ];
  const source2 = [
    {
      url: "https://www.youtube.com/embed/HJ8bRSWIQpQ",
    },
    {
      url: "https://www.youtube.com/embed/ZXU8C1nDULM",
    },
  ];
  const source3 = [
    {
      url: "https://www.youtube.com/embed/pXBFflD6ALo",
    },
    {
      url: "https://www.youtube.com/embed/8Mm1Mv-THHY",
    },
  ];

  return (
    <div className="w-full text-white">
      <VideoPlayerInternal
        className="md:h-[600px]"
        video="/Media/Reakt/reaktHero.mp4"
      />

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

      <div className="mt-20">
        <FancyCarousel SOURCE={source} />
      </div>

      <DetailSection
        className="px-5 md:px-10 "
        title="BACKEND + INTERFACE BUILD"
        description={`Input audio signals are fed to TouchDesigner where set frequencies can be isolated, normalized then convert DMX. The signal is then converted and fed into a Chauvet DMX Dimmer/Switch Pack that can break out up to 4 channels.`}
        widthFull
        left
      />
      <Image src={REAKT.system} alt="reakt" className="w-full h-full" />

      {/* <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/ZXU8C1nDULM"
        />
      <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/HJ8bRSWIQpQ"
        /> */}

      <div className="mt-20">
        <FancyCarousel SOURCE={source2} />
      </div>

      <DetailSection
        className="px-5 md:px-10 "
        title="EARLY TESTS"
        widthFull
        left
      />

      {/* <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/pXBFflD6ALo"
        />
        <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9 mb-24"
          src="https://www.youtube.com/embed/8Mm1Mv-THHY"
        /> */}

      <div className="my-20">
        <FancyCarousel SOURCE={source3} />
      </div>
    </div>
  );
};

export default reaktLights;

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
        className="md:h-[600px] lg:h-[700px] xl:h-auto"
        video="/Media/Reakt/reaktHero.mp4"
        scaleOnLargeScreens={true}
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

      <DetailSection
        className="px-5 md:px-10 "
        title="VERSION 2"
        description={`Next up was to get rid of the computer and put the code onto a raspberry pi. Then wire it up to a basic prototype for controls. "Make it exist first, then make it pretty"`}
        widthFull
        left
      />

      <div className="px-5 md:px-10 mt-8 mb-24">
        <div className="grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 aspect-[1/2] md:aspect-[2/1] gap-3 max-w-[1400px] mx-auto">
          <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v2_1.jpg"
              alt="Raspberry Pi HAT wired to potentiometers"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="col-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v2_2.jpg"
              alt="Prototype control layout with labeled knobs"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v2_3.jpg"
              alt="Cardboard prototype enclosure, front"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v2_4.jpg"
              alt="Cardboard prototype enclosure, inside"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default reaktLights;

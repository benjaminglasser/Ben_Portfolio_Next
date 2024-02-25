"use client";
import React from "react";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import { REAKT } from "@/app/assets/images/reakt";
import { Grid } from "@mui/material";
import DetailSection from "../../common/detailSection";
import VideoPlayer from "@/app/common/VerticalVideoPlayer";

const reaktLights = () => {
  return (
    <div className="w-full text-white">
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
      <div className="flex justify-center items-center mt-10">
        <VideoPlayer
          widthFull
          className="w-full md:w-3/5 h-full md:h-[36rem]"
          src="https://www.youtube.com/embed/7znbWZne4Nk"
        />
      </div>
      <div className="flex justify-center items-center mt-10">
        <VideoPlayer
          widthFull
          className="w-full md:w-3/5 h-full md:h-[36rem]"
          src="https://www.youtube.com/embed/d45Ef3S-61w"
        />
      </div>
      <div className="flex justify-center items-center mt-10">
        <VideoPlayer
          widthFull
          className="w-full md:w-3/5 h-full md:h-[36rem]"
          src="https://player.vimeo.com/video/589537817"
        />
      </div>

      <DetailSection
        className="px-5 md:px-10 "
        title="BACKEND + INTERFACE BUILD"
        description={`nput audio signals are fed to TouchDesigner where set frequencies can be isolated, normalized then convert DMX. The signal is then converted and fed into a Chauvet DMX Dimmer/Switch Pack that can break out up to 4 channels.`}
        widthFull
        left
      />
      <Image src={REAKT.system} alt="reakt" className="w-full h-full" />
      <Grid container className="w-full px-5 md:px-10">
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full px-0 md:px-20 mt-10"
        >
          <VideoPlayer
            widthFull
            className="h-full md:h-[24rem] w-full"
            src="https://www.youtube.com/embed/ZXU8C1nDULM"
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full px-0 md:px-20 mt-10"
        >
          <VideoPlayer
            widthFull
            className="h-full md:h-[24rem] w-full"
            src="https://www.youtube.com/embed/HJ8bRSWIQpQ"
          />
        </Grid>
      </Grid>
      <DetailSection
        className="px-5 md:px-10 "
        title="EARLY TESTS"
        widthFull
        left
      />
      <Grid container className="w-full px-5 md:px-10 mb-20">
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full px-0 md:px-20 mt-10"
        >
          <VideoPlayer
            widthFull
            className="h-full md:h-[24rem] w-full"
            src="https://www.youtube.com/embed/pXBFflD6ALo"
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full px-0 md:px-20 mt-10"
        >
          <VideoPlayer
            widthFull
            className="h-full md:h-[24rem] w-full"
            src="https://www.youtube.com/embed/8Mm1Mv-THHY"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default reaktLights;

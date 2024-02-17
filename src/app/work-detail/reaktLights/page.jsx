"use client";
import React from 'react'
import Image from "next/image";
import ReactPlayer from "react-player";
import ZigzagHeader from "../components/zigzagHeader";
import { REAKT } from "@/app/assets/images/reakt";
import { Grid } from "@mui/material";
import DetailSection from "../components/detailSection";

const reaktLights = () => {
  return (
    <div className="w-full text-white">
      <ZigzagHeader
        title="REAKT LIGHTS"
        description="Customizable audio reactive lighting system"
        extendedDescription="Reakt Lights is an audio-reactive lighting system that was commissioned for The Canary Test gallery in Los Angeles, CA. Part of the project was also to build an easy-to-use interface for the gallery to use for future sound pieces."
        time="2021 // Canary Gallery"
        role="Designer / Engineer"
        tools={["TouchDesigner", "Chauvet DMX Dimmer/Switch Pack", "DMXKing eDMX1 PRO Ethernet DMX Controller"]}
      />
      <div className="flex justify-center items-center h-screen">
        <ReactPlayer
            url="https://youtu.be/7znbWZne4Nk"
            width="60%" 
            height="80%"
            controls
        />
        </div>
        <div className="flex justify-center items-center h-screen">
        <ReactPlayer
            url="https://youtu.be/d45Ef3S-61w"
            width="80%" 
            height="90%"
            controls
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
    
    <Grid container className="w-full flex justify-center items-center h-screen" >
        <Grid item xs={12} md={6}>
        <div className="w-full flex justify-center items-center">
            <ReactPlayer
                    url="https://youtu.be/ZXU8C1nDULM"
                />
        </div>
        </Grid>
        <Grid item xs={12} md={6}>
        <div className="w-full flex justify-center items-center">
            <ReactPlayer
                url="https://youtu.be/HJ8bRSWIQpQ"
            />
            </div>
        </Grid>
    </Grid>
    <DetailSection
        className="px-5 md:px-10 "
        title="EARLY TESTS"
        widthFull
        left
    />
    <Grid container className="w-full flex justify-center items-center h-screen" >
        <Grid item xs={12} md={6}>
        <div className="w-full flex justify-center items-center">
            <ReactPlayer
                    url="https://youtu.be/pXBFflD6ALo"
                />
        </div>
        </Grid>
        <Grid item xs={12} md={6}>
        <div className="w-full flex justify-center items-center">
            <ReactPlayer
                url="https://youtu.be/8Mm1Mv-THHY"
            />
            </div>
        </Grid>
    </Grid>
    </div>
  )
}

export default reaktLights
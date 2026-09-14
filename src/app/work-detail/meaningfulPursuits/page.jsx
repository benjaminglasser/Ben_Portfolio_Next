"use client";
import React from "react";
import ZigzagHeader from "../../common/zigzagHeader";
import Contained from "@/app/common/Contained";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";

const MeaningfulPursuits = () => {
  const videos = [
    "https://www.youtube.com/embed/hK23aSLVaAk",
    "https://www.youtube.com/embed/8Csz61fViZA",
    "https://www.youtube.com/embed/VghFPjuuXhQ",
    "https://www.youtube.com/embed/6ScrKPMQPcw",
    "https://www.youtube.com/embed/HsI6URf6grg",
    "https://www.youtube.com/embed/CV9ECfroSgU",
    "https://www.youtube.com/embed/SxJNx4Ymk4M",
    "https://www.youtube.com/embed/kpQODCM1WYU",
    "https://www.youtube.com/embed/Uy7GpsWTLS0",
    "https://www.youtube.com/embed/5Oe320cKOl8",
    "https://www.youtube.com/embed/89wx2XuiLt0",
  ];

  return (
    <div className="w-full text-white">
      {/* Masthead */}
      <ZigzagHeader
        title="Meaningful Pursuits"
        description="Album Visuals"
        extendedDescription="A series of live video vignettes commissioned by an electronic musician for their album as well as to be projected behind their performance. This was for an album entitled “Meaningful Pursuits” by Danny Goliger"
        time="2021 // Artist Album AV"
        role="Animator / Creative Director"
        tools={["TouchDesigner", "Premiere Pro"]}
      />

      <Contained className="mt-16 md:mt-24">
        <div className="flex flex-col gap-8">
          {videos.map((src) => (
            <VideoPlayerExternal key={src} src={src} />
          ))}
        </div>
      </Contained>

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default MeaningfulPursuits;

"use client";
import React from "react";
import ZigzagHeader from "../../common/zigzagHeader";
import Contained from "@/app/common/Contained";
import MeaningfulPursuitsVideos from "@/app/common/MeaningfulPursuitsVideos";

const MeaningfulPursuits = () => {

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
        <MeaningfulPursuitsVideos />
      </Contained>

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default MeaningfulPursuits;

"use client";
import React from "react";
import ZigzagHeader from "../../common/zigzagHeader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FancyCarousel from "@/app/common/Carousel";
// import { MEAN } from "@/app/assets/images/meaningfulPursuits";


const MeaningfulPursuits = () => {
  return (
    <div className="w-full text-white">

      <ZigzagHeader
        title="MEANINGFUL PURSUITS"
        description="Album Visuals"
        extendedDescription="A series of live video vignettes commissioned by an electronic musician for their album as well as to be projected behind their performance. This was for an album entitled “Meaningful Pursuits” by Danny Goliger"
        time="2021 // Artist Album AV"
        role="Animator / Creative Director"
        tools={["TouchDesigner", "Premiere Pro"]}
      />
      <div className="mt-20">
        <FancyCarousel />
      </div>
    </div>
  );
};

export default MeaningfulPursuits;

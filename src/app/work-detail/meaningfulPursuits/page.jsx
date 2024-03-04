"use client";
import React from "react";
import ZigzagHeader from "../../common/zigzagHeader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FancyCarousel from "@/app/common/Carousel";
// import { MEAN } from "@/app/assets/images/meaningfulPursuits";



const MeaningfulPursuits = () => {

  const source = [
    {
      url: "https://www.youtube.com/embed/hK23aSLVaAk?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1",
    },
    {
      url: "https://www.youtube.com/embed/8Csz61fViZA?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3",
    },
    {
      url: "https://www.youtube.com/embed/VghFPjuuXhQ?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=5",
    },
    {
      url: "https://www.youtube.com/embed/6ScrKPMQPcw?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=7",
    },
    {
      url: "https://www.youtube.com/embed/HsI6URf6grg?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=9",
    },
    {
      url: "https://www.youtube.com/embed/CV9ECfroSgU?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=11",
    },
    {
      url: "https://www.youtube.com/embed/SxJNx4Ymk4M?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=13",
    },
    {
      url: "https://www.youtube.com/embed/kpQODCM1WYU?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=15",
    },
    {
      url: "https://www.youtube.com/embed/Uy7GpsWTLS0?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=17",
    },
    {
      url: "https://www.youtube.com/embed/5Oe320cKOl8?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=19",
    },
    {
      url: "https://www.youtube.com/embed/89wx2XuiLt0?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=21",
    },
  ];

  return (
    <div className="w-full text-white">
      <div className="mt-10">
      <ZigzagHeader
        title="MEANINGFUL PURSUITS"
        description="Album Visuals"
        extendedDescription="A series of live video vignettes commissioned by an electronic musician for their album as well as to be projected behind their performance. This was for an album entitled “Meaningful Pursuits” by Danny Goliger"
        time="2021 // Artist Album AV"
        role="Animator / Creative Director"
        tools={["TouchDesigner", "Premiere Pro"]}
      />
      <div className="mt-20">
        <FancyCarousel 
          SOURCE={source}
        />
      </div>
    </div>
    </div>
  );
};

export default MeaningfulPursuits;

"use client";
import React from "react";
import ZigzagHeader from "../components/zigzagHeader";
import Slider from "react-slick";
import VideoPlayer from "@/app/common/VerticalVideoPlayer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FancyCarousel from "@/app/common/Carousel";

const MeaningfulPursuits = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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
      {/* <div className="flex justify-center items-center h-screen">
        <Slider {...settings}>
          <iframe
            width="100%"
            height="100%"
            src="https://player.vimeo.com/video/589537817"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <div className="bg-white w-full h-full text-black">
            <h3>1</h3>
          </div>
          <div className="bg-white w-full h-full text-black">
            <h3>2</h3>
          </div>
          <div className="bg-white w-full h-full text-black">
            <h3>3</h3>
          </div>
          <div className="bg-white w-full h-full text-black">
            <h3>4</h3>
          </div>
          <div className="bg-white w-full h-full text-black">
            <h3>5</h3>
          </div>
          <div className="bg-white w-full h-full text-black">
            <h3>6</h3>
          </div>
        </Slider>
      </div> */}
      <div className="mt-20">
        <FancyCarousel />
      </div>
    </div>
  );
};

export default MeaningfulPursuits;

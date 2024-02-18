"use client";
import React from "react";
import ZigzagHeader from "../components/zigzagHeader";
import ReactPlayer from "react-player";
import Slider from "react-slick";

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
      <div className="flex justify-center items-center h-screen">
        <Slider {...settings}>
          <ReactPlayer
            url="https://youtu.be/SxJNx4Ymk4M"
            width="90%"
            height="90%"
            controls
          />
          <ReactPlayer
            url="https://youtu.be/kpQODCM1WYU"
            width="90%"
            height="90%"
            controls
          />
          <ReactPlayer
            url="https://youtu.be/Uy7GpsWTLS0"
            width="90%"
            height="90%"
            controls
          />
          <ReactPlayer
            url="https://youtu.be/hK23aSLVaAk"
            width="90%"
            height="90%"
            controls
          />
          <ReactPlayer
            url="https://youtu.be/HsI6URf6grg"
            width="90%"
            height="90%"
            controls
          />
          <ReactPlayer
            url="https://youtu.be/CV9ECfroSgU"
            width="90%"
            height="90%"
            controls
          />
          <ReactPlayer
            url="https://youtu.be/SxJNx4Ymk4M"
            width="90%"
            height="90%"
            controls
          />
          <ReactPlayer
            url="https://youtu.be/kpQODCM1WYU"
            width="90%"
            height="90%"
            controls
          />
          <ReactPlayer
            url="https://youtu.be/Uy7GpsWTLS0"
            width="90%"
            height="90%"
            controls
          />
          <ReactPlayer
            url="https://youtu.be/5Oe320cKOl8"
            width="90%"
            height="90%"
            controls
          />
          <ReactPlayer
            url="https://youtu.be/VghFPjuuXhQ"
            width="90%"
            height="90%"
            controls
          />
        </Slider>
      </div>
    </div>
  );
};

export default MeaningfulPursuits;

"use client";
import React from "react";
import Context from "../../common/context";
import AIM from "../../common/aim";
import DetailSection from "../../common/detailSection";
import { IMAGES } from "@/app/assets/images";
import Section from "@/app/common/Section";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";

const Canary = () => {
  return (
    <div className="w-full text-white">
      <div className="bg-black h-12 md:h-0" />
      <VideoPlayerInternal
        // className="h-[600px]"
        video="/Media/DeepScreen/WaterTest.mp4"
      />
      {/* <div className="bg-gradient-to-b from-black to-transparentw-full h-8 md:h-24" /> */}
      <ZigzagHeader
        title="Circa DeepScreen"
        description="Innovative DeepScreen Advertising Concept for Polestar on Downtown LA's Circa’s Curved Display"
        extendedDescription="We developed a cutting-edge advertising concept for Polestar, utilizing the Circa building's curved display in Downtown LA to showcase Standard Vision's DeepScreen technology. Our design featured a 3D deep field effect paired with interactive water simulations across three screens, creating an immersive triptych visual. Through creative iteration, a final concept emerged, marrying technology with design to captivate viewers. This project highlights Polestar's innovation and showcases new horizons in digital advertising."
        time="Fall 2023"
        role="3D Graphics and Simulation"
        tools={["Blender"]}
      />

      <Section>
        <VideoPlayerInternal centered video="/Media/DeepScreen/FINAL_1.mp4" />
      </Section>

      <Section>
        <Context
          title="CONTEXT"
          className="mt-24"
          context="Set against the backdrop of the Circa building's striking curved display in Downtown Los Angeles, this project sought to leverage the unique architectural canvas to introduce an innovative advertising medium that blends art with technology."
        />
      </Section>
      <Section>
        <AIM
          className="mt-16"
          aim="The aim was to demonstrate Standard Vision's in-house graphics capabilities and the novel opportunities provided by their DeepScreen technology, enticing other companies to engage our services for high-impact advertising projects."
        />
      </Section>
      <DetailSection
        className="px-5 md:px-10 "
        title="UI Considerations"
        description="A key feature of this build involved including a 24hr livestream of the gallery at all times to be displayed soley on the landing page. It was important to create a design language that wouldn't overshadow this focal point."
        left={false}
        // images={[IMAGES.UI_CONSIDERATION]}
      />
      <DetailSection
        className="px-5 md:px-10 "
        title="Process"
        description="Starting with Polestar as our concept focus, we crafted a series of designs that integrated a 3D deep field effect for the central display and a water simulation for the side panels. After several iterations, we refined the concept to enhance viewer engagement and showcase the interactive potential of the displays."
        left
      />
      <DetailSection
        className="px-5 md:px-10 "
        title="Results"
        description="The final product is a visually stunning advertising concept that not only effectively showcases Polestar vehicles but also serves as a testament to Standard Vision's capability to create immersive and technologically advanced advertising solutions. It successfully highlights the potential of the Circa display for creating novel advertising experiences, setting a new benchmark for digital outdoor advertising."
        left={false}
      />
    </div>
  );
};

export default Canary;

"use client";
import React from "react";
import Context from "../../common/context";
import AIM from "../../common/aim";
import DetailSection from "../../common/detailSection";
// import { IMAGES } from "@/app/assets/images";
// import Section from "@/app/common/Section";
// import Image from "next/image";
// import { FancyButton } from "@/app/common/FancyButton";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import ZigzagHeader from "../../common/zigzagHeader";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";
import VideoPlayerResponsiveBG from "../../common/VideoPlayerResponsiveBG";

const NRF = () => {
  return (
    <div className="w-full text-white">
      <VideoPlayerResponsiveBG
        vidDesktop="/Media/NRF/BubbleBG.mp4"
        vidMobile="/Media/NRF/BubbleBGMobile.mp4"
      />

      <div className="bg-black h-12 md:h-0" />
      <VideoPlayerInternal video="/Media/NRF/NRF_Hero.mp4" />
      <div className="bg-gradient-to-b from-black to-transparentw-full h-8 md:h-24" />

      <ZigzagHeader
        title="Clear Canvas"
        description="Reimagining Retail: Elegantly showcasing the affordances of a novel form of digital signage"
        extendedDescription="Unveiled at NRF Expo 2024, Standard Vision introduced Clear Canvas, a transparent screen technology set to transform retail spaces. In collaboration with their team, we created eye-catching graphics that illustrate the technology’s unique capabilities, from enhancing customer engagement to showcasing products in novel ways."
        time="2023 // Standard Vision"
        role="3D Graphic Design"
        tools={["Blender"]}
      />

      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/w1dcv-u8B8Y?si=6d-IPrKqSVz8dc0b"
      />

      <Context
        title="CONTEXT"
        className="mt-24"
        context="At the NRF Expo 2024 in New York, Standard Vision introduced Clear Canvas, a groundbreaking transparent screen technology, that can revolutionize retail experiences. This innovation allows for dynamic, interactive displays that blend seamlessly into retail environments."
      />
      <AIM
        className="mt-16"
        aim="Our goal was to create modern, visually captivating graphics that underscore the innovative capabilities of Clear Canvas's transparent screen technology for retail experiences."
      />

      <DetailSection
        className="px-5 md:px-10 "
        title="Results"
        description="Each graphic we developed serves to highlight a distinct affordance of the transparent screen technology:"
        left
      />
      <div className="px-10">
        <p>
          Bounding Box Scale: A sleek bubble animation demonstrates the
          technology's capability to display graphics from edge to edge,
          emphasizing the expansive scale of the screen.
        </p>
        <p>
          Transparency Effect: We created a glass effect graphic to showcase the
          screen's clear nature, allowing for an immersive viewing experience
          that maintains visibility of the physical products behind it.
        </p>
        <p>
          Retail Use Case - Sale: A vibrant, eye-catching graphic designed to
          attract attention to sales and promotions, demonstrating the
          technology's potential to enhance retail marketing strategies.
        </p>
        <p>
          Dynamic Content Integration: Featuring a purse from one of the
          designers, displayed on a mannequin behind the screen. This graphic
          exemplifies how the content can dynamically change based on what's
          physically present behind the screen, offering a unique, context-aware
          presentation
        </p>
      </div>

      <h4 className="px-5 md:px-10 mt-16 md:font-thin">
        Each of these graphics not only underscores the innovative features of
        Clear Canvas's transparent screen technology but also showcases our
        ability to blend creativity with technology to push the boundaries of
        retail experiences.
      </h4>

      <DetailSection
        className="px-5 md:px-10 "
        title="Process"
        description="Collaboration was key in our journey to innovation. Working closely with the Clear Canvas team, we brainstormed ideas, developed concepts, and iterated designs. Our focus remained on creating high-quality assets that adhere to specific specifications, ensuring each graphic not only looked stunning but also served its purpose effectively."
        left={false}
      />
    </div>
  );
};

export default NRF;

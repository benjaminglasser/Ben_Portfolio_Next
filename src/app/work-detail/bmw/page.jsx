"use client";
import React from "react";
import ZigzagHeader from "../../common/zigzagHeader";
import Context from "../../common/context";
import DetailSection from "../../common/detailSection";
import VideoPlayerResponsiveBG from "../../common/VideoPlayerResponsiveBG";
import { FancyButton } from "@/app/common/FancyButton";

const bmw = () => {
  // Media sits in a narrower column with an empty column to the right.
  const Media = ({ children, className = "" }) => (
    <div className="grid-ed">
      <div className={`col-span-12 md:col-start-3 md:col-span-8 ${className}`}>
        {children}
      </div>
    </div>
  );

  const bullets = [
    "Led the end-to-end development of a real-time, interactive Mixed Reality (MR) product utilizing Unreal Engine and state-of-the-art headsets under fast paced, tight corporate deadline.",
    "Designed various AR applications to express ideas and present to my team for weekly reviews. Packaged and handed off approved assets to the engineering team for integration.",
    "Created 3D renderings in Blender, Unity, and Unreal Engine to be displayed on various displays. Tasks included virtual cinematics, materials and texturing using PBR based workflows, Unity scripting and UE blueprints, special effects, character rigging and animation, and workflows between various software.",
    "Worked extensively with VFX graph (Unity), Niagara (Unreal Engine), and Particle Systems (Blender) as well as built custom shaders to prototype novel effects that translate across multiple platforms.",
    "I was invited to present my work to the BMW board at their annual conference. The project then was approved and selected for the next rounds of innovation.",
    "Proposed and collaborated on several novel inventions culminating in being credited with signing two patents (details coming soon).",
  ];

  return (
    <div className="w-full text-white">
      {/* Car simulator as a fixed background (no hero block) */}
      <VideoPlayerResponsiveBG
        vidDesktop="/Media/BMW/car-sim.mp4"
        vidMobile="/Media/BMW/carSimPhone.mp4"
      />

      {/* Masthead at the top */}
      <ZigzagHeader
        title="BMW"
        description="Developing next-generation XR products and systems"
        extendedDescription="Designed and implemented XR prototypes for the future interaction between human and vehicle as part of the BMW design and research team in Munich."
        time="April 2022 - February 2023"
        role="XR Interaction"
        tools={["Unreal Engine", "Unity", "Blender", "Adobe Suite", "Figma"]}
      />

      <Context
        title="Context"
        context="Contracted as a Mixed Reality Interaction Designer at the headquarters in Munich, Germany. My team was focused on researching and developing HMI (Human Machine Interactions) products to ultimately be released within the next 5-7 years."
      />

      <DetailSection spanClass="md:col-span-8" title="Update">
        <div className="relative w-full aspect-[16/9] mt-8">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/zwOfrRDtd9E"
            title="BMW at CES 2024"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="subtext desc-mono max-w-3xl mt-6">
          During CES 2024, the BMW team presented work that I contributed to
          during my time.
        </p>
      </DetailSection>

      <DetailSection
        spanClass="md:col-span-8"
        title="Experience"
        description="Details limited by NDA."
      >
        <ul className="list-disc pl-5 space-y-2 subtext desc-mono mt-8">
          {bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
        <FancyButton fullWidth size="medium" className="mt-20">
          <a href="mailto:glasserben@gmail.com">Contact For More Info</a>
        </FancyButton>
      </DetailSection>

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default bmw;

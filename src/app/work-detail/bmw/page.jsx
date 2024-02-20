import React from "react";
import { VIDEO } from "../../assets/video";
import Context from "../../common/context";
import AIM from "../../common/aim";
import DetailSection from "../../common/detailSection";
import { IMAGES } from "@/app/assets/images";
import Section from "@/app/common/Section";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import ResponsiveBMWVideo from "../../common/bmwVideo";

const bmw = () => {
  const BOARDS = [
    IMAGES.BOARD1,
    IMAGES.BOARD2,
    IMAGES.BOARD3,
    IMAGES.BOARD4,
    IMAGES.BOARD5,
  ];
  return (
    <div className="w-full text-white">
      <ResponsiveBMWVideo />
      <ZigzagHeader
        title="BMW"
        description="Developing next-generation XR products and systems"
        extendedDescription="Designed and implemented XR prototypes for the future interaction between human and vehicle as part of the BMW design and research team in Munich."
        time="Summer 2022 - Fall 2022"
        role="XR Interaction"
        tools={["Unreal Engine", "Unity", "Blender", "Abode Suite", "Figma"]}
      />
      <Context
        title="Experience"
        className="pt-16 my-16"
        titleBorder
        bullets={[
          "Developed a real time interactive XR experience using Unreal Engine on a fast paced, corporate deadline.",
          "Designed various AR applications to express ideas and present to my team for weekly reviews. Packaged and handed off approved assets to the engineering team for integration.",
          "Created 3D renderings in Blender, Unity, and Unreal Engine to be displayed on various displays. Tasks included virtual cinematics, materials and texturing using PBR based workflows, Unity scripting and UE blueprints, special effects, character rigging and animation, and workflows between various software.",
          "Worked extensively with VFX graph (Unity), Niagara (Unreal Engine), and Particle Systems (Blender) as well as built custom shaders to prototype novel effects that translate across multiple platforms.",
        ]}
      />
    </div>
  );
};

export default bmw;

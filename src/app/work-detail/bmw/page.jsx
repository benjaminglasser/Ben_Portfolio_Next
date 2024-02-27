"use client";
import React from "react";
import Context from "../../common/context";
import ZigzagHeader from "../../common/zigzagHeader";
import ResponsiveBMWVideo from "../../common/bmwVideo";
import Section from "@/app/common/Section";

const bmw = () => {
  const bullets = [
          "Developed a real time interactive XR experience using Unreal Engine on a fast paced, corporate deadline.",
          "Designed various AR applications to express ideas and present to my team for weekly reviews. Packaged and handed off approved assets to the engineering team for integration.",
          "Created 3D renderings in Blender, Unity, and Unreal Engine to be displayed on various displays. Tasks included virtual cinematics, materials and texturing using PBR based workflows, Unity scripting and UE blueprints, special effects, character rigging and animation, and workflows between various software.",
          "Worked extensively with VFX graph (Unity), Niagara (Unreal Engine), and Particle Systems (Blender) as well as built custom shaders to prototype novel effects that translate across multiple platforms.",
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
      {/* <Context
        title="Experience"
        className="pt-16 my-16"
        titleBorder
        bullets={[
          "Developed a real time interactive XR experience using Unreal Engine on a fast paced, corporate deadline.",
          "Designed various AR applications to express ideas and present to my team for weekly reviews. Packaged and handed off approved assets to the engineering team for integration.",
          "Created 3D renderings in Blender, Unity, and Unreal Engine to be displayed on various displays. Tasks included virtual cinematics, materials and texturing using PBR based workflows, Unity scripting and UE blueprints, special effects, character rigging and animation, and workflows between various software.",
          "Worked extensively with VFX graph (Unity), Niagara (Unreal Engine), and Particle Systems (Blender) as well as built custom shaders to prototype novel effects that translate across multiple platforms.",
        ]}
      /> */}

      <Section>
        <div className="text-center px-10 mt-16 mb-72">
          <h1 className="mb-3">EXPERIENCE</h1>
          <div className="w-full flex justify-center">
            <ul className="w-full md:w-2/3 lg:w-3/6 text-left list-disc">
              {bullets?.map((bullet, idx) => (
                <li className="leading-8 text-base">{bullet}</li>
              ))}
            <p>By the end of my time there, I was fortunate enough to present one of my high fidelity prototypes to the BMW Board at their yearly conference. I also had the pleasure of being part of signing two novel invention patents that are currently pending.</p>
            </ul>
          </div>
        </div>
      </Section>

    </div>
  );
};

export default bmw;

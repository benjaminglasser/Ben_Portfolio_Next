"use client";
import React from "react";
import Context from "../../common/context";
import VideoPlayerResponsiveBG from "../../common/VideoPlayerResponsiveBG";
import Section from "@/app/common/Section";
import DetailSection from "../../common/detailSection";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";
import { FancyButton } from "@/app/common/FancyButton";

const bmw = () => {
  const bullets = [
    "Led the end-to-end development of a real-time, interactive Mixed Reality (MR) product utilizing Unreal Engine and state-of-the-art headsets under fast paced, tight corporate deadline.",
    "Designed various AR applications to express ideas and present to my team for weekly reviews. Packaged and handed off approved assets to the engineering team for integration.",
    "Created 3D renderings in Blender, Unity, and Unreal Engine to be displayed on various displays. Tasks included virtual cinematics, materials and texturing using PBR based workflows, Unity scripting and UE blueprints, special effects, character rigging and animation, and workflows between various software.",
    "Worked extensively with VFX graph (Unity), Niagara (Unreal Engine), and Particle Systems (Blender) as well as built custom shaders to prototype novel effects that translate across multiple platforms.",
    "I was invited to present my work to the BMW board at their annual conference. The project then was approved and selected for the next rounds of innovation.",
    "Proposed and collaborated on several novel inventions culminating in being credited with signing two patents (details coming soon)",
  ];

  return (
    <div className="w-full text-white">
      <div className="relative">
        <VideoPlayerResponsiveBG
          vidDesktop="/Media/BMW/car-sim.mp4"
          vidMobile="/Media/BMW/carSimPhone.mp4"
        />

        <div className="absolute top-0">
          <Context
            title="CONTEXT"
            className="mt-72 md:mt-72 mb-24"
            context="Contracted as a Mixed Reality Interaction Designer at the headquarters in Munich, Germany. My team was focused on researching and developing HMI (Human Machine Interactions) products to ultimately be released within the next 5-7 years."
          />

          <div className="flex justify-center">
            <div className="w-full px-5 md:w-3/5 text-pink">
              <h4 className="font-normal">UPDATE!</h4>
            </div>
          </div>

          <VideoPlayerExternal
            widthFull
            className="aspect-w-16 aspect-h-9"
            src="https://www.youtube.com/embed/zwOfrRDtd9E?si=rBPDZ6Qhx4Q0dW2L"
          />

          <div className=" px-5 md:px-10 mt-12 flex justify-center">
            <p>
              During CES 2024, the BMW team presented work that I contributed to
              during my time.
            </p>
          </div>

          <Section>
            <div className="text-center px-5 md:px-10 mt-16 mb-72 ">
              <DetailSection className=" mb-3 " title="EXPERIENCE" center />
              <div className="w-full flex flex-col items-center justify-center">
                <h6 className="mb-3 font-normal">DETAILS LIMITED BY NDA</h6>
                <ul className="w-full px-4 md:w-1/2 text-left list-disc">
                  {bullets?.map((bullet, idx) => (
                    // Adjust "mb-4" for more space between bullets and "leading-snug" for tighter line spacing within a bullet
                    <li className="mb-4 leading-snug text-base">{bullet}</li>
                  ))}
                </ul>
                <FancyButton className="p-0 ml-0 px-2 mr-2 mt-8 mb-2 hover:text-white">
                  <a href="mailto:glasserben@gmail.com" target="_blank">
                    CONTACT FOR MORE INFO
                  </a>
                </FancyButton>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default bmw;

{
  /* </div> */
}
{
  /* <ZigzagHeader
          title="BMW"
          description="Developing next-generation XR products and systems"
          extendedDescription="Designed and implemented XR prototypes for the future interaction between human and vehicle as part of the BMW design and research team in Munich."
          time="Summer 2022 - Fall 2022"
          role="XR Interaction"
          tools={["Unreal Engine", "Unity", "Blender", "Abode Suite", "Figma"]}
        /> */
}
{
  /* <Context
          title="Experience"
          className="pt-16 my-16"
          titleBorder
          bullets={[
            "Developed a real time interactive XR experience using Unreal Engine on a fast paced, corporate deadline.",
            "Designed various AR applications to express ideas and present to my team for weekly reviews. Packaged and handed off approved assets to the engineering team for integration.",
            "Created 3D renderings in Blender, Unity, and Unreal Engine to be displayed on various displays. Tasks included virtual cinematics, materials and texturing using PBR based workflows, Unity scripting and UE blueprints, special effects, character rigging and animation, and workflows between various software.",
            "Worked extensively with VFX graph (Unity), Niagara (Unreal Engine), and Particle Systems (Blender) as well as built custom shaders to prototype novel effects that translate across multiple platforms.",
          ]}
        /> */
}

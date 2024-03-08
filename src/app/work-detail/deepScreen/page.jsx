"use client";
import React from "react";
import Context from "../../common/context";
import AIM from "../../common/aim";
import DetailSection from "../../common/detailSection";
// import { IMAGES } from "@/app/assets/images";
import Section from "@/app/common/Section";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import ImageGrid from "@/app/common/ImageGrid";

const Canary = () => {
  const images = [
    {
      url: "/Media/DeepScreen/DeepScreen Concept Board_Page_2.png",
      // caption: "Image 1 Caption",
      width: 4000,
      height: 2280,
    },
    {
      url: "/Media/DeepScreen/DeepScreen Concept Board_Page_3.png",
      // caption: "Image 2 Caption",
      width: 4000,
      height: 2280,
    },
    {
      url: "/Media/DeepScreen/DeepScreen Concept Board_Page_5.png",
      // caption: "Image 2 Caption",
      width: 4000,
      height: 2280,
    },
    {
      url: "/Media/DeepScreen/DeepScreen Concept Board_Page_6.png",
      // caption: "Image 2 Caption",
      width: 4000,
      height: 2280,
    },
  ];

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
        extendedDescription="We developed a cutting-edge advertising concept for Polestar, utilizing the Circa building's curved display in Downtown LA to showcase Standard Vision's DeepScreen technology. The design featured a 3D deep field effect paired with interactive water simulations across three screens, creating an immersive triptych visual effect. Through creative iteration, a final concept emerged that married technology with design to captivate viewers and ultimately showcase new horizons in digital advertising."
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
          aim="The aim was to demonstrate Standard Vision's in-house graphics capabilities and the novel opportunities provided by their large scale curved displays, enticing other companies to engage our services for high-impact advertising projects."
        />
      </Section>

      <DetailSection
        className="px-5 md:px-10 "
        title="Process"
        description="Beginning with Polestar as our inspiration, we merged their branding with a narrative-enhancing 3D deep field effect and water simulations, moving beyond mere visual appeal to storytelling. Iterative refinements aimed to boost engagement and leverage the displays' interactivity, deepening audience connection through enriched storytelling."
        left
      />

      <Section>
        <div className="px-5 md:px-10 pb-20">
          <div className="bg-greyDark py-1">
            <ImageGrid images={images} />
            <Image
              src="/Media/DeepScreen/Storyboard.png"
              alt="era"
              className="w-full h-full p-10"
              width="3000"
              height="1988"
            />
          </div>
        </div>
      </Section>

      <Section>
        <DetailSection
          className="px-5 md:px-10 "
          title="Results"
          description="The final concept is a visually striking advertisement that showcases Standard Vision's ability to craft immersive and technologically sophisticated marketing solutions, perfectly aligning with brand and advertising objectives. It underscores the Circa display's capacity to foster innovative advertising experiences, thereby establishing a new standard in digital outdoor advertising."
          center
          widthFull
        />
      </Section>
      <Section>
        <VideoPlayerInternal
          className="mb-24"
          centered
          video="/Media/DeepScreen/ScreenCapOfProject2_1.mp4"
        />
      </Section>
    </div>
  );
};

export default Canary;

"use client";
import React from "react";
import DetailSection from "../../common/detailSection";
import Contained from "@/app/common/Contained";
import ImageWithLoader from "@/app/common/ImageWithLoader";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import ZigzagHeader from "../../common/zigzagHeader";

const DeepScreen = () => {
  const conceptBoards = [
    {
      url: "/Media/DeepScreen/DeepScreen Concept Board_Page_2.png",
      width: 4000,
      height: 2280,
    },
    {
      url: "/Media/DeepScreen/DeepScreen Concept Board_Page_3.png",
      width: 4000,
      height: 2280,
    },
    {
      url: "/Media/DeepScreen/DeepScreen Concept Board_Page_5.png",
      width: 4000,
      height: 2280,
    },
    {
      url: "/Media/DeepScreen/DeepScreen Concept Board_Page_6.png",
      width: 4000,
      height: 2280,
    },
  ];

  return (
    <div className="w-full text-white">
      {/* Full-bleed cropped hero */}
      <div className="full-bleed hero-crop">
        <VideoPlayerInternal video="/Media/DeepScreen/WaterTest.mp4" />
      </div>

      {/* Masthead */}
      <ZigzagHeader
        title="Circa DeepScreen"
        description="Innovative DeepScreen Advertising Concept for Polestar on Downtown LA's Circa's Curved Display"
        extendedDescription="We developed a cutting-edge advertising concept for Polestar, utilizing the Circa building's curved display in Downtown LA to showcase Standard Vision's DeepScreen technology. The design featured a 3D depth effect paired with interactive water simulations across three screens, creating an immersive triptych visual effect. Through creative iteration, a final concept emerged that married technology with design to captivate viewers and ultimately showcase new horizons in digital advertising."
        time="Fall 2023"
        role="3D Graphics and Simulation"
        tools={["Blender"]}
        collaborator="Sunny Chen"
        collaboratorLink="https://sunny.design/"
      />

      {/* Final render (contained) */}
      <Contained
        className="mt-16 md:mt-24"
        spanClass="md:col-start-3 md:col-span-8"
      >
        <VideoPlayerInternal video="/Media/DeepScreen/FINAL_1.mp4" />
      </Contained>

      {/* Context + Aim as two side-by-side columns */}
      <div className="grid-ed gap-y-10 mt-16 md:mt-24">
        <div className="col-span-12 md:col-start-3 md:col-span-4">
          <h3 className="edge-label text-[#b45314] mb-3">Context</h3>
          <p className="subtext desc-mono">
            Set against the backdrop of the Circa building&apos;s striking curved
            display in Downtown Los Angeles, this project sought to leverage the
            unique architectural canvas to introduce an innovative advertising
            medium that blends art with technology.
          </p>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-8">
          <h3 className="edge-label text-[#b45314] mb-3">Aim</h3>
          <p className="subtext desc-mono">
            The aim was to demonstrate Standard Vision&apos;s in-house graphics
            capabilities and the novel opportunities provided by their large
            scale curved displays, enticing other companies to engage our
            services for high-impact advertising projects.
          </p>
        </div>
      </div>

      <div className="full-bleed mt-16 md:mt-24">
        <VideoPlayerInternal video="/Media/DeepScreen/Waterfall.mp4" />
      </div>

      <DetailSection
        title="Process"
        description="Beginning with Polestar as our inspiration, we merged their branding with a narrative-enhancing 3D deep field effect and water simulations, moving beyond mere visual appeal to storytelling. Iterative refinements aimed to boost engagement and leverage the displays' interactivity, deepening audience connection through enriched storytelling."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          {conceptBoards.map((img) => (
            <ImageWithLoader
              key={img.url}
              src={img.url}
              alt="DeepScreen concept board"
              width={img.width}
              height={img.height}
              wrapperClassName="!rounded-none"
            />
          ))}
        </div>
        <ImageWithLoader
          src="/Media/DeepScreen/Storyboard.png"
          alt="DeepScreen storyboard"
          width={3000}
          height={1988}
          wrapperClassName="!rounded-none mt-3"
        />
      </DetailSection>

      <DetailSection
        title="Results"
        description="The final concept is a visually striking advertisement that showcases Standard Vision's ability to craft immersive and technologically sophisticated marketing solutions, perfectly aligning with brand and advertising objectives. It underscores the Circa display's capacity to foster innovative advertising experiences, thereby establishing a new standard in digital outdoor advertising."
      >
        <div className="mt-8">
          <VideoPlayerInternal video="/Media/DeepScreen/ScreenCapOfProject2_1.mp4" />
        </div>
      </DetailSection>

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default DeepScreen;

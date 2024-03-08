"use client";
import React from "react";
import Context from "../../common/context";
import AIM from "../../common/aim";
import DetailSection from "../../common/detailSection";
// import { IMAGES } from "@/app/assets/images";
import Section from "@/app/common/Section";

// import { FancyButton } from "@/app/common/FancyButton";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import ZigzagHeader from "../../common/zigzagHeader";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";
import VideoPlayerResponsiveBG from "../../common/VideoPlayerResponsiveBG";
import VideoGrid from "@/app/common/VideoGrid";
import ImageGrid from "@/app/common/ImageGrid";

const NRF = () => {
  const videos = [
    {
      url: "/Media/NRF/Clear_Canvas_Proj.mp4",
      title: "Title2",
      caption: "01 // Transparency Effect",
    },
    {
      url: "/Media/NRF/Purse_Proj.mp4",
      title: "Title3",
      caption: "02 // Bounding Box Scale",
    },
    {
      url: "/Media/NRF/SALE_Proj.mp4",
      title: "Title4",
      caption: "03 // Dynamic Content Integration",
    },
    {
      url: "/Media/NRF/Bubbles_Glass_Proj.mp4",
      title: "Title1",
      caption: "04 // Creative Possibilities",
    },
  ];

  const videos2 = [
    {
      url: "/Media/NRF/TestNRF_1.mp4",
      // caption: "01 // Transparency Effect",
    },
    {
      url: "/Media/NRF/TestNRF_2.mp4",
      // caption: "02 // Bounding Box Scale",
    },
  ];

  const images = [
    {
      url: "/Media/NRF/NRFBooth1.png",
      // caption: "Image 1 Caption",
      width: 1600,
      height: 900,
    },
    {
      url: "/Media/NRF/NRFBooth2.png",
      // caption: "Image 2 Caption",
      width: 1600,
      height: 900,
    },
    // Add more images as needed
  ];

  function MyPage() {
    return <ImageGrid images={images} />;
  }

  return (
    <div className="w-full text-white">
      <VideoPlayerResponsiveBG
        vidDesktop="/Media/NRF/BubbleBG.mp4"
        vidMobile="/Media/NRF/BubbleBGMobile.mp4"
      />
      <div className="bg-black h-12 md:h-0" />
      <VideoPlayerInternal video="/Media/NRF/NRF_Hero.mp4" />
      <div className="bg-gradient-to-b from-black to-transparentw-full h-8 md:h-24" />
      <Section>
        <ZigzagHeader
          title="Clear Canvas"
          description="Reimagining Retail: Elegantly showcasing the affordances of a novel form of digital signage"
          extendedDescription="Unveiled at NRF Expo 2024, Standard Vision introduced Clear Canvas, a transparent screen technology set to transform retail spaces. In collaboration with their team, we created eye-catching graphics that illustrate the technology’s unique capabilities, from enhancing customer engagement to showcasing products in novel ways."
          time="2023 // Standard Vision"
          role="3D Graphic Design"
          tools={["Blender"]}
        />
      </Section>
      <Section>
        <VideoPlayerInternal centered video="/Media/NRF/FinalNRFDisplay.mp4" />
      </Section>
      <Section>
        <Context
          title="CONTEXT"
          className="mt-24"
          context="At the NRF Expo 2024 in New York, Standard Vision introduced Clear Canvas, a groundbreaking transparent screen technology, that can revolutionize retail experiences. This innovation allows for dynamic, interactive displays that blend seamlessly into retail environments."
        />
        <AIM
          className="mt-16"
          aim="Our goal was to create modern, visually captivating graphics that underscore the innovative capabilities of Clear Canvas's transparent screen technology for retail experiences."
        />
      </Section>
      <Section>
        <DetailSection
          className="px-5 md:px-10 "
          title="Results"
          description="Each graphic we developed serves to highlight a distinct affordance of the transparent screen technology:"
          left
        />
      </Section>
      <Section>
        <div className="px-5 md:px-10">
          <div className="bg-greyDark pb-10">
            <div>
              <VideoGrid videos={videos} />
            </div>
            <h2 className="px-5 md:px-10 md:font-thin">
              Each of these graphics not only underscores the innovative
              features of Clear Canvas's transparent screen technology but also
              showcases our ability to blend creativity with technology to push
              the boundaries of retail experiences.
            </h2>
          </div>
        </div>
      </Section>
      <Section>
        <DetailSection
          className="px-5 md:px-10 "
          title="Process"
          description="Collaboration was key in our journey to innovation. Working closely with the Clear Canvas team, we brainstormed ideas, developed concepts, and iterated designs. Our focus remained on creating high-quality assets that adhere to specific specifications, ensuring each graphic not only looked stunning but also served its purpose effectively."
          widthFull
        />
      </Section>
      <Section>
        <div className="px-5 md:px-10 pb-20">
          <div className="bg-greyDark py-1">
            <ImageGrid images={images} />;
            <VideoPlayerInternal
              className="px-5 md:px-10"
              video="/Media/NRF/TestNRF.mp4"
            />
            <div>
              <VideoGrid videos={videos2} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default NRF;

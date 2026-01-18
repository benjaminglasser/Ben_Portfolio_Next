"use client";
import React from "react";
import Context from "../../common/context";
import DetailSection from "../../common/detailSection";
import Section from "@/app/common/Section";

import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import ZigzagHeader from "../../common/zigzagHeader";

import VideoGrid from "@/app/common/VideoGrid";
import ImageGrid from "@/app/common/ImageGrid";

const DTLAMarriott = () => {
  const videos = [
    // {
    //   url: "/Media/DTLAMarriott/video1.mp4",
    //   title: "Title1",
    //   caption: "01 // Caption",
    // },
  ];

  const images = [
    // {
    //   url: "/images/dtlaMarriott/image1.png",
    //   width: 1600,
    //   height: 900,
    // },
  ];

  return (
    <div className="w-full text-white">
      <div className="bg-black h-12 md:h-0" />
      <VideoPlayerInternal video="/Media/DTLAMarriott/MarriotHero.mp4" />
      <div className="bg-gradient-to-b from-black to-transparentw-full h-8 md:h-24" />
      <Section>
        <ZigzagHeader
          title="DTLA Marriott Artist Spotlight"
          description="Public art animation on large scale display in Downtown LA"
          extendedDescription="Selected to create a custom animation interspersed between advertisements on a large-scale display in downtown Los Angeles near LA Live. The goal was to bring a sense of joy, wonder, and beauty back into the urban landscape. In a world where our attention is constantly harvested for capitalistic gain, it's vital not to lose these qualities and to pause amidst the chaos and allow our imagination to run free."
          time="Fall 2025"
          role="3D Artist"
          tools={["Blender"]}
          // collaborator={"Collaborator Name"}
          // collaboratorLink={"https://collaborator.com/"}
        />
      </Section>
      <Section>
        <VideoPlayerInternal centered video="/Media/DTLAMarriott/MarriotFinalVidMain.mp4" />
      </Section>

      <Section>
        <Context
          title="CONTEXT"
          className="mt-24"
          context="Los Angeles maintains a public art fund dedicated to spotlighting local artists throughout the city, bringing creative works to prominent urban spaces and fostering cultural engagement within the community. This initiative provided the opportunity to bring an original animation to a large-scale display near LA Live, reaching thousands of passersby daily."
        />
      </Section>
      {videos.length > 0 && (
        <Section>
          <div className="px-5 md:px-10">
            <div className="bg-greyDark pb-10">
              <div>
                <VideoGrid videos={videos} />
              </div>
            </div>
          </div>
        </Section>
      )}
      <Section>
        <DetailSection
          className="px-5 md:px-10 "
          title="Process"
          widthFull
        />
      </Section>
      <Section>
        <VideoPlayerInternal centered video="/Media/DTLAMarriott/MarriotProcess.mp4" />
      </Section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {images.length > 0 && (
        <Section>
          <div className="px-5 md:px-10 pb-20">
            <div className="bg-greyDark py-1">
              <ImageGrid images={images} />
            </div>
          </div>
        </Section>
      )}
    </div>
  );
};

export default DTLAMarriott;

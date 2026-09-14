"use client";
import React from "react";
import Context from "../../common/context";
import DetailSection from "../../common/detailSection";
import Contained from "@/app/common/Contained";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import ZigzagHeader from "../../common/zigzagHeader";

const DTLAMarriott = () => {
  return (
    <div className="w-full text-white">
      {/* Full-bleed cropped hero */}
      <div className="full-bleed hero-crop">
        <VideoPlayerInternal video="/Media/DTLAMarriott/MarriotHero.mp4" />
      </div>

      {/* Masthead */}
      <ZigzagHeader
        title="DTLA Marriott Artist Spotlight"
        description="Public art animation on large scale display in Downtown LA"
        extendedDescription="Selected to create a custom animation interspersed between advertisements on a large-scale display in downtown Los Angeles near LA Live. The goal was to bring a sense of joy, wonder, and beauty back into the urban landscape. In a world where our attention is constantly harvested for capitalistic gain, it's vital not to lose these qualities and to pause amidst the chaos and allow our imagination to run free."
        time="Fall 2025"
        role="3D Artist"
        tools={["Blender"]}
      />

      {/* Final render (contained) */}
      <Contained className="mt-16 md:mt-24">
        <VideoPlayerInternal video="/Media/DTLAMarriott/MarriotFinalVidMain.mp4" />
      </Contained>

      <Context
        title="Context"
        context="Los Angeles maintains a public art fund dedicated to spotlighting local artists throughout the city, bringing creative works to prominent urban spaces and fostering cultural engagement within the community. This initiative provided the opportunity to bring an original animation to a large-scale display near LA Live, reaching thousands of passersby daily."
      />

      <DetailSection title="Process">
        <div className="mt-8">
          <VideoPlayerInternal video="/Media/DTLAMarriott/MarriotProcess.mp4" />
        </div>
      </DetailSection>

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default DTLAMarriott;

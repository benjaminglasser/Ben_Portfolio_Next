"use client";
import React from "react";
import ZigzagHeader from "../../common/zigzagHeader";
import DetailSection from "../../common/detailSection";
import VideoPlayerClickable from "@/app/common/VideoPlayerClickable";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import { FancyButton } from "@/app/common/FancyButton";

const Adobe = () => {
  const redirectToReviewer = () => {
    window.open(
      "https://reviewer.substance3d.adobe.com/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="w-full text-white">
      {/* Masthead */}
      <ZigzagHeader
        title="Adobe"
        description="Projects I've worked on as a Staff Experience Designer at Adobe"
        extendedDescription="Staff Experience Designer on Adobe's 3D and Immersive team, designing and prototyping next-generation tools for 3D creation and collaboration across web, desktop, and immersive platforms."
        time="2024 - Present"
        role="Staff Experience Designer"
        tools={["Figma", "Prototyping", "Blender", "Unity"]}
      />

      <DetailSection
        spanClass="md:col-span-8"
        descWide
        title="Adobe Substance 3D Reviewer"
        description="Reviewer is a collaborative design tool that enables teams to review and provide feedback on 3D product models at an early stage in development. Accessible on both web and VR, it brings together stakeholders to streamline decision-making and enhance product quality."
      >
        <div className="mt-6">
          <FancyButton fullWidth size="medium" onClick={redirectToReviewer}>
            Check It Out
          </FancyButton>
        </div>
        <div className="mt-8">
          <VideoPlayerInternal video="/Media/Reviewer/reviewerTrailer.mp4" />
        </div>
      </DetailSection>

      <DetailSection spanClass="md:col-span-8" title="Product Demo">
        <div className="mt-8">
          <VideoPlayerClickable src="/Media/Reviewer/reviewerDemo.mp4" />
        </div>
      </DetailSection>

      <DetailSection
        spanClass="md:col-span-8"
        descWide
        title="3D Integration in Frame.io"
        description="The Frame.io 3D integration has launched and the early results have been strong. As of late May, roughly 440 accounts are actively using 3D features in Frame, and monthly 3D asset creation has grown from single digits a year ago to 13,582 assets in the most recent month, a clear sign that the workflows are landing with partners. We also saw over 3,900 3D assets downloaded from Frame in May alone, which points to real usage inside partner pipelines rather than one off testing."
      >
        <div className="mt-8">
          <VideoPlayerClickable
            src="/Media/Frame/3DinFrame.mp4"
            poster="/Media/Frame/3DinFrame_poster.jpg"
          />
        </div>
      </DetailSection>

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default Adobe;

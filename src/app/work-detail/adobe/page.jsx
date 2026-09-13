"use client";
import React from "react";
import ZigzagHeader from "../../common/zigzagHeader";
import Section from "@/app/common/Section";
import DetailSection from "../../common/detailSection";
import { FancyButton } from "@/app/common/FancyButton";
import VideoPlayerClickable from "@/app/common/VideoPlayerClickable";

const Adobe = () => {
  const redirectToReviewer = () => {
    window.open("https://reviewer.substance3d.adobe.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full text-white">
      <Section>
        <ZigzagHeader
          title="Adobe"
          description="Projects I've worked on as a Staff Experience Designer at Adobe"
          extendedDescription="Staff Experience Designer on Adobe's 3D and Immersive team, designing and prototyping next-generation tools for 3D creation and collaboration across web, desktop, and immersive platforms."
          time="2024 - Present"
          role="Staff Experience Designer"
          tools={["Figma", "Prototyping", "Blender", "Unity"]}
        />
      </Section>

      <DetailSection
        widthFull
        title="Adobe Substance 3D Reviewer"
        description="Reviewer is a collaborative design tool that enables teams to review and provide feedback on 3D product models at an early stage in development. Accessible on both web and VR, it brings together stakeholders to streamline decision-making and enhance product quality."
        video="/Media/Reviewer/reviewerTrailer.mp4"
      />
      <Section>
        <div className="w-full text-center px-5">
          <FancyButton
            className="uppercase w-full md:w-3/5 mt-8 ojuju p-1 hover:text-white"
            size="medium"
            onClick={redirectToReviewer}
          >
            CHECK IT OUT
          </FancyButton>
        </div>
      </Section>

      <Section>
        <div className="flex justify-center w-full mt-14">
          <VideoPlayerClickable src="/Media/Reviewer/reviewerDemo.mp4" />
        </div>
      </Section>

      <DetailSection
        widthFull
        title="3D Integration in Frame.io"
        description="The Frame.io 3D integration has launched and the early results have been strong. As of late May, roughly 440 accounts are actively using 3D features in Frame, and monthly 3D asset creation has grown from single digits a year ago to 13,582 assets in the most recent month, a clear sign that the workflows are landing with partners. We also saw over 3,900 3D assets downloaded from Frame in May alone, which points to real usage inside partner pipelines rather than one off testing."
        video="/Media/Frame/3DinFrame.mp4"
      />
    </div>
  );
};

export default Adobe;

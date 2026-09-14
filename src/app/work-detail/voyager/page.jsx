"use client";
import React from "react";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import { PLUR } from "../../../../public/images/PLUR";
import DetailSection from "../../common/detailSection";
import Contained from "@/app/common/Contained";
import Context from "../../common/context";
import { FancyButton } from "@/app/common/FancyButton";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";

const voyager = () => {
  const redirectToFinalWebsite = () => {
    window.location.href = "https://www.whereistheplur.com/";
  };

  return (
    <div className="w-full text-white">
      {/* Full-bleed cropped hero */}
      <div className="full-bleed hero-crop">
        <VideoPlayerInternal video="/Media/Voyager/voyagerPlanetHero.mp4" />
      </div>

      {/* Masthead */}
      <ZigzagHeader
        title="Voyager"
        description="Interactive gamefied website, branding, and album art for voyager record label"
        extendedDescription="Artwork, album layouts, and an interactive website for a label called Voyager. Currently, the website is a simple tour announcement website with plans to build out a gamefied universe for users to navigate through 3D space. Planets will be added when musical releases come out. As users navigate to each planet, they can experience the released music, merch, etc."
        time="2022 // Freelance"
        role="Web Development, Designs, 3D Models"
        tools={[
          "HTML",
          "CSS",
          "JavaScript",
          "Next.js",
          "Three.js",
          "p5.js",
          "Blender",
          "TouchDesigner",
          "Figma",
          "Photoshop",
          "Illustrator",
        ]}
      />

      <Contained
        className="mt-16 md:mt-24"
        spanClass="md:col-start-3 md:col-span-8"
      >
        <VideoPlayerExternal src="https://www.youtube.com/embed/JksvVszrUDM" />
      </Contained>

      <Contained className="mt-8" spanClass="md:col-start-3 md:col-span-8">
        <FancyButton
          fullWidth
          className="uppercase"
          size="medium"
          onClick={redirectToFinalWebsite}
        >
          FINAL WEBSITE
        </FancyButton>
      </Contained>

      <Context
        title="Context"
        context="For their Voyager series, Fantastic Voyage Records commisioned me to create a new brand identity inspired by retro space aesthetics."
      />

      <DetailSection
        title="Tour Visuals Package"
        description={`First, I created a mood board with various sources of inspiration. This included radar, weather graphics, 80s video games, futurism, heads up displays, terminal screens, and airplane cockpits`}
      >
        <div className="mt-8">
          <Image
            src={PLUR.INSPO}
            alt="Mood board of retro space and HUD inspiration"
            className="w-full h-auto"
          />
        </div>
        <p className="subtext desc-mono max-w-3xl mt-8">
          The team setteld on the idea of using wireframes of 3D space objects as
          a place to start. I created some concepts in Blender and overlayed some
          heads up display elements. I created a feedback texture in TouchDesigner
          to mimic old VHS distortion.
        </p>
        <div className="mt-8">
          <Image
            src={PLUR.PROCESS2}
            alt="Process visualization showing wireframe 3D space objects with HUD elements"
            className="w-full h-auto"
          />
        </div>
      </DetailSection>
      <div className="full-bleed mt-8">
        <VideoPlayerInternal video="/Media/Voyager/voyagerHero_2_1.mp4" />
      </div>

      <DetailSection
        title="Vinyl + Merch"
        description={`Using the design language that we settled on, vinyl artwork and shirts were created for the first release`}
      >
        <div className="mt-8">
          <Image
            src={PLUR.VINYL}
            alt="Voyager vinyl artwork design"
            className="w-full h-auto"
          />
        </div>
        <div className="mt-8">
          <Image
            src={PLUR.LABEL}
            alt="Voyager vinyl label design"
            className="w-full h-auto"
          />
        </div>
        <div className="mt-8">
          <Image
            src={PLUR.SHIRT}
            alt="Voyager merchandise t-shirt design"
            className="w-full h-auto"
          />
        </div>
      </DetailSection>

      <DetailSection
        title="Web Design"
        description={`After this was finalized, I took the concepts into Figma to create various ideas for the first version of the website which would be centered around a tour announcement.`}
      >
        <div className="mt-8">
          <Image
            src={PLUR.PROCESS}
            alt="Website design process showing tour announcement concepts"
            className="w-full h-auto"
          />
        </div>
      </DetailSection>
      <div
        className="full-bleed band-crop mt-8"
        style={{ "--band-h": "clamp(300px, 56vh, 720px)" }}
      >
        <VideoPlayerInternal video="/Media/Voyager/gallery editWeb_2.mp4" />
      </div>

      <DetailSection
        title="Artist Visuals Package"
        description={`Lastly, for the lead artist on the label (Justin Jay), I created a cohesive visual package that combined Voyager aesthetics with thematic elements from his most recent album. The 3D objects were created in Blender and animated/iterated upon in TouchDesigner. In the future, we have plans to implement live video manipulation to compliment his musical performance.`}
      >
        <div className="mt-8">
          <VideoPlayerExternal src="https://player.vimeo.com/video/588617470" />
        </div>
      </DetailSection>

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default voyager;

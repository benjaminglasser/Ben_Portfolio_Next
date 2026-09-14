"use client";
import React from "react";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import { IMAGES } from "../../../../public/images";
import DetailSection from "../../common/detailSection";
import Contained from "@/app/common/Contained";
import { FancyButton } from "@/app/common/FancyButton";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";

const Canary = () => {
  const TRANSPARENCY_IMAGES = [IMAGES.TRANS_HOME, IMAGES.INFO, IMAGES.PRESS];

  const redirectToFinalWebsite = () => {
    window.location.href = "https://canary-alt.vercel.app/";
  };

  return (
    <div className="w-full text-white">
      {/* Full-bleed cropped hero */}
      <div className="full-bleed hero-crop">
        <VideoPlayerInternal video="/Media/Canary/canaryHero.mp4" />
      </div>

      {/* Masthead */}
      <ZigzagHeader
        title="The Canary Test"
        description="Web Design and Development for Los Angeles based art gallery"
        time="Spring 2022"
        role="UI / Web Development"
        tools={["Figma", "NextJS", "Framer Motion", "Contentful"]}
      />

      {/* Context + Aim as two side-by-side columns */}
      <div className="grid-ed gap-y-10 mt-16 md:mt-24">
        <div className="col-span-12 md:col-start-3 md:col-span-4">
          <h3 className="edge-label text-[#b45314] mb-3">Context</h3>
          <p className="subtext desc-mono">
            Canary is a program for sound, video, performance, and installation
            work. Through site-specific exhibitions they expect artists to use
            their unique resources and platform to challenge audiences with
            critical work and subject matter.
          </p>
        </div>
        <div className="col-span-12 md:col-start-8 md:col-span-3">
          <h3 className="edge-label text-[#b45314] mb-3">Aim</h3>
          <p className="subtext desc-mono">
            The gallery requested a sleak and minimal website that allows for
            them to showcase the multiplicity of artists that come through their
            space.
          </p>
        </div>
      </div>

      <Contained className="mt-8" spanClass="md:col-start-3 md:col-span-8">
        <FancyButton fullWidth size="medium" onClick={redirectToFinalWebsite}>
          Final Website
        </FancyButton>
      </Contained>

      <DetailSection
        title="UI Considerations"
        description="A key feature of this build involved including a 24hr livestream of the gallery at all times to be displayed soley on the landing page. It was important to create a design language that wouldn't overshadow this focal point."
      >
        <div className="mt-8">
          <Image
            src={IMAGES.UI_CONSIDERATION}
            alt="UI considerations showing gallery livestream integration"
            className="w-full h-auto"
          />
        </div>
      </DetailSection>

      <DetailSection
        title="Transparency"
        description='The main theme of this website was centered around transparency. Therefore, transparent "glasslike" modals were used to reinforce this concept to display necesarry information about the gallery, press information, and specific shows (current and previous).'
      >
        {TRANSPARENCY_IMAGES.map((image, idx) => (
          <div key={idx} className="mt-8">
            <Image
              src={image}
              alt={`Transparency design example ${idx + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </DetailSection>

      <DetailSection
        title="Tech Stack"
        description="It was necessary to build a headless CMS for the client to easily update and add specfic content while also allowing for the customizability and flexibility of a modern frontend framework. Therfore, it was decided to use Contentful for the content management that would easily hook into a Next JS custom front end. Careful consideration was given to the designs to allow for the flexibility of ever changing content."
      >
        <div className="mt-8">
          <VideoPlayerInternal video="/Media/Canary/CMS.mp4" />
        </div>
      </DetailSection>

      <DetailSection
        title="Mobile Responsiveness"
        description="The site needed to be available on mobile as well because a large demographic would be visiting on their phones."
      >
        <div className="mt-8">
          <Image
            src={IMAGES.MOBILE_VIEW}
            alt="Mobile responsive design view of the gallery website"
            className="w-full h-auto"
          />
        </div>
      </DetailSection>

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default Canary;

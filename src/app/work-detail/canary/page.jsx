"use client";
import React from "react";
import Context from "../../common/context";
import AIM from "../../common/aim";
import DetailSection from "../../common/detailSection";
import { IMAGES } from "@/app/assets/images";
import Section from "@/app/common/Section";
import Image from "next/image";
import { FancyButton } from "@/app/common/FancyButton";
import VideoPlayerInternal from '@/app/common/VideoPlayerInternal.jsx'


const Canary = () => {
  const TRANPARENCY_IMAGES = [IMAGES.TRANS_HOME, IMAGES.INFO, IMAGES.PRESS];
  const redirectToFinalWebsite = () => {
    window.location.href = "https://canary-alt.vercel.app/";
  };
  return (
    <div className="w-full text-white">
      

      <VideoPlayerInternal 
        className="mt-12 md:h-[750px] md:mt-0"
        video="/Media/Canary/canaryHero.mp4"
      />


      <Section>
        <div className="w-full text-center px-10">
          <FancyButton
            className="uppercase w-full p-1 font-sprat hover:text-white"
            size="medium"
            onClick={redirectToFinalWebsite}
          >
            FINAL WEBSITE
          </FancyButton>
        </div>
      </Section>

      <Context
        title="CONTEXT"
        className="mt-24"
        context="Canary is a program for sound, video, performance, and installation work. Through site-specific exhibitions they expect artists to use their unique resources and platform to challenge audiences with critical work and subject matter."
      />
      <AIM
        className="mt-16"
        aim="The gallery requested a sleak and minimal website that allows for them to showcase the multiplicity of artists that come through their space."
      />
      <DetailSection
        className="px-10 "
        title="UI Considerations"
        description="A key feature of this build involved including a 24hr livestream of the gallery at all times to be displayed soley on the landing page. It was important to create a design language that wouldn't overshadow this focal point."
        left={false}
        // images={[IMAGES.UI_CONSIDERATION]}
      />

      <div className="flex justify-center w-full px-5 md:px-0 mt-5">
        <Image src={IMAGES.UI_CONSIDERATION} alt="light mode" />
      </div>
      
      <DetailSection
        className="px-10 "
        title="Transparency"
        description='The main theme of this website was centered around transparency. Therefore, transparent "glasslike" modals were used to reinforce this concept to display necesarry information about the gallery, press information, and specific shows (current and previous).'
        center
      />
      {TRANPARENCY_IMAGES?.map((image, idx) => (
        <Section>
          <div className="w-full flex justify-center mt-16">
            <Image
              className="w-4/5 md:w-3/5"
              src={image}
              key={idx}
              alt="transparency images"
            />
          </div>
        </Section>
      ))}
      <DetailSection
        className="px-10 "
        title="Tech Stack"
        description="It was necessary to build a headless CMS for the client to easily update and add specfic content while also allowing for the customizability and flexibility of a modern frontend framework. Therfore, it was decided to use Contentful for the content management that would easily hook into a Next JS custom front end. Careful consideration was given to the designs to allow for the flexibility of ever changing content."
        left
      />

      {/* <div className="flex justify-center w-full">
        <video className="w-full mx-10 md:w-5/6 md:mx-0" autoPlay muted loop src="/Media/Canary/CMS.mp4" />
      </div> */}

      <VideoPlayerInternal 
        video="/Media/Canary/CMS.mp4"
      />

      <DetailSection
        className="px-10 "
        title="Mobile Responsiveness"
        description="The site needed to be available on mobile as well because a large demographic would be visiting on their phones."
        left={false}
        // images={[IMAGES.MOBILE_VIEW]}
      />
      <div className="flex justify-center w-full px-5 mt-5">
        <Image src={IMAGES.MOBILE_VIEW} alt="light mode" />
      </div>
    </div>
  );
};

export default Canary;

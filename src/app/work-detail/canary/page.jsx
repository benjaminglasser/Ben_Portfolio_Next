import React from "react";
import { VIDEO } from "../../assets/video";
import Context from "../components/context";
import AIM from "../components/aim";
import DetailSection from "../components/detailSection";
import { IMAGES } from "@/app/assets/images";
import Section from "@/app/common/Section";
import Image from "next/image";
import ZigzagHeader from "../components/zigzagHeader";
import ResponsiveBMWVideo from "../components/bmwVideo";
import { FancyButton } from "@/app/common/FancyButton";

const Canary = () => {
  const TRANPARENCY_IMAGES = [IMAGES.TRANS_HOME, IMAGES.INFO, IMAGES.PRESS];
  return (
    <div className="w-full text-white">
      <Section>
        <div className="w-full text-center">
          <FancyButton
            className="uppercase mt-28 font-sprat  p-1 hover:text-white"
            size="medium"
            // onClick={()=>}
          >
            FINAL WEBSITE
          </FancyButton>
        </div>
      </Section>
      <video autoPlay muted loop src={IMAGES.CANARY_MAIN} />
      <Context
        title="CONTEXT"
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
        images={[IMAGES.UI_CONSIDERATION]}
      />
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
              className="w-full md:w-1/2"
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
      <div className="flex justify-center w-full">
        <video className="w-5/6" autoPlay muted loop src={IMAGES.CMS} />
      </div>
      <DetailSection
        className="px-10 "
        title="Mobile Responsiveness"
        description="The site needed to be available on mobile as well because a large demographic would be visiting on their phones."
        left={false}
        images={[IMAGES.MOBILE_VIEW]}
      />
    </div>
  );
};

export default Canary;

"use client";
import React from "react";
import { VIDEO } from "../../assets/video";
import Context from "../../common/context";
import AIM from "../../common/aim";
import DetailSection from "../../common/detailSection";
import { IMAGES } from "@/app/assets/images";
import Section from "@/app/common/Section";
import Image from "next/image";

const stemport = () => {
  const BOARDS = [
    IMAGES.BOARD1,
    IMAGES.BOARD2,
    IMAGES.BOARD3,
    IMAGES.BOARD4,
    IMAGES.BOARD5,
  ];
  return (
    <div className="w-full text-white">
    

      <section className="block aspect-w-16 aspect-h-9">
        <video autoPlay muted loop className="block mt-10 md:mt-0">
          <source src={VIDEO.STEMPORT} type="video/mp4"/>
        </video>
      </section>
        
      <Context
        title="CONTEXT"
        context='Music production consists of breaking down individual instrument tracks into many smaller units known as "stems". Organizing and labeling large project files can very quickly become cluttered and difficult to sift through - especially as production teams scale.'
      />
      <AIM aim="Stemport uses a machine learning algorithm to analyze, organize, and re-label musical stems to aid in streamlining the creative workflow." />
      <DetailSection
        className="px-10 "
        title="Visual Identity"
        description="To enhance the ML experience, a visual identity was created to signify the AI processes. Inspired by the way in which sound can create beautiful ripples in water, a virtual avatar guides the user along the journey."
        left
        video={IMAGES.VISUAL_IDENTITY}
      />
      <DetailSection
        className="px-10 "
        title="User Flow"
        description="Due to the fact that this application is meant to streamline the process of stem organization so that musicians can get to the music making process quicker, It was integral to have the least amount of screens possible to mitigate any risk of adding any friction to the user flow. Therefore, it was necessary early on to clarify the user's journey so that the shortest path to completion could be created while still having all the necessary tools available at hand."
        left={false}
        // images={[IMAGES.USERFLOW_TRANS]}
      />

      <div className="flex justify-center w-full px-10 mt-5">
        <Image src={IMAGES.USERFLOW_TRANS} alt="light mode" />
      </div>

      <DetailSection
        className="px-10 "
        title="UI Considerations"
        description="When rolling out all the screens, careful attention was paid so that the user flow was clear and simple. Negative space and a minimilistic design was used generously to keep the layouts uncluttered."
        left={false}
        widthFull
        images={[IMAGES.MOCKUP_SCREEN]}
      />
      {BOARDS?.map((image, idx) => (
        <Section>
          <div className="w-full flex justify-center mt-16">
            <Image
              className="w-4/5 md:w-3/5"
              src={image}
              key={idx}
              alt="boards"
            />
          </div>
        </Section>
      ))}
      <Context
        title="Light / Dark mode"
        context="The client requested light and dark mode options for their designs so it was imperative to keep in mind elements that would work on both a light and dark backdrop"
        titleBorder
      />
      <video
        autoPlay
        muted
        loop
        src={IMAGES.DARK_LIGHT_MODE}
        className="mt-10"
      />
      <div className="flex justify-center w-full mt-5">
        <Image src={IMAGES.LIGHT_MODE} alt="light mode" />
      </div>
      <div className="flex justify-center w-full mt-5">
        <Image src={IMAGES.DESKTOP_MOCKUP} alt="light mode" />
      </div>
    </div>
  );
};

export default stemport;

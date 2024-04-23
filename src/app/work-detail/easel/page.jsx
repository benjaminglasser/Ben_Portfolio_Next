"use client";
import React from "react";
import Context from "../../common/context";
import ZigzagHeader from "../../common/zigzagHeader";
import DetailSection from "../../common/detailSection";
import Section from "@/app/common/Section";
import Image from "next/image";
import { FancyButton } from "@/app/common/FancyButton";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";

const Canary = () => {
  const redirectToFinalWebsite = () => {
    window.location.href = "https://www.easelapps.ai/";
  };
  const redirectToTechCrunch = () => {
    window.location.href = "https://tcrn.ch/4d7ZF8i";
  };

  return (
    <div className="w-full text-white">
      <Section>
        <div>
          <Image
            src="/images/easel/banner.png"
            alt="font design"
            width="1920"
            height="891"
          />
        </div>
      </Section>

      <Section>
        <ZigzagHeader
          title="Easel AI"
          description="Lead Product Designer at Easel. An AI-powered personal avatar app directly in iMessage"
          extendedDescription="As Lead Product Designer, I spearheaded the design process, from conceptualization to the development of a cohesive design system, ensuring every interface is intuitive, brand-aligned, and fosters a creative social interaction. An AI-first social chat experience, Easel AI transforms how users connect and express themselves through photorealistic and creative avatars. Integrated seamlessly within iMessage, it invites users to create, remix, and share avatars in novel and imaginative ways."
          time="2023 - Present"
          role="Lead Product Designer"
          tools={[
            "Figma",
            "Stable Diffusion XL",
            "After Effects",
            "Unreal Engine",
            "Premiere Pro",
            "Design Thinking",
            "User Studies",
          ]}
        />
      </Section>

      <Section>
        <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/wsxNn9A56BQ?si=ntoM4eAVuQhC5n6S"
        />
      </Section>

      <Section>
        <div className="w-full text-center px-5">
          <FancyButton
            className="uppercase w-full md:w-3/5 mt-28 ojuju p-1 hover:text-white"
            size="medium"
            onClick={redirectToFinalWebsite}
          >
            PRODUCT WEBSITE
          </FancyButton>
        </div>
      </Section>

      <Section>
        <div className="w-full text-center px-5 pb-10">
          <FancyButton
            className="uppercase w-full md:w-3/5 mt-8 ojuju p-1 hover:text-white"
            size="medium"
            onClick={redirectToTechCrunch}
          >
            READ OUR WRITEUP IN TECH CRUNCH
          </FancyButton>
        </div>
      </Section>

      <Section>
        <Context
          title="CONTEXT"
          context="In a rapidly evolving digital landscape, Easel AI stands out by enriching communication with personalized, AI-powered avatars, making every interaction memorable and uniquely expressive."
        />
      </Section>

      <Section>
        <DetailSection
          className="px-5 md:px-10"
          title="User Interface Design"
          description="Crafted user-centric interfaces for Easel AI's app, emphasizing simplicity and intuitiveness while remaining true to our brand guidelines. My role extended to designing a low-friction onboarding process for avatar training and implementing a system for gathering and acting on user feedback for continual updates."
          center
          widthFull
        />
      </Section>
      <Section>
        <div className="flex justify-center w-full px-5 md:px-10 mt-5">
          <Image
            src="/images/easel/Flow.png"
            alt="font design"
            width="1920"
            height="611"
          />
        </div>
      </Section>

      <Section>
        <h4 className="mt-8 md:font-thin px-5 md:px-10">
          Collaborating with a skilled engineering team, we crafted a backend
          system that abstracts intricate prompt engineering, accepting simple
          user inputs. This method demystifies AI for users, encouraging
          everyday creativity while ensuring outputs are diverse, realistic, and
          deeply personal, thereby enhancing the social chat experience."
        </h4>

        <Section>
          <div className="flex justify-center w-full px-5 md:px-10 mt-5">
            <Image
              src="/images/easel/EaselScreens.png"
              alt="font design"
              width="1920"
              height="611"
            />
          </div>
        </Section>
      </Section>
      {/* <DetailSection
        className="px-10 "
        title="Collaboration and Workflow Management"
        description="Led a synergistic effort between product, engineering, and AI teams, ensuring seamless workflows and the successful realization of product features."
        left={false}
      /> */}
      <Section>
        <DetailSection
          className="px-5 md:px-10"
          title="Feature Development"
          description="Developed a comprehensive design system that scales, fostering the integration of key features such as diverse avatar styles, text overlays, and an explore feed, thereby enriching user interaction. Simultaneously, I led a synergistic effort among product, engineering, and AI teams to ensure seamless workflows, facilitating the successful realization of these product features."
          center
          widthFull
        />
      </Section>
      <Section>
        <VideoPlayerExternal
          center
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/smcIkta5rR8?si=K-_T4XT4l7POqkda"
        />
      </Section>
      <Section>
        <DetailSection
          className="px-5 md:px-10"
          title="Multiplayer"
          description="Oversaw the design, implementation, and launch of our most recent major feature: multiplayer capabilities, a complex project that emphasized ethical consent and real-time user interaction. This role involved navigating the challenges of integrating seamless, consent-based multiplayer experiences, culminating in the development of compelling launch assets to ensure user engagement and understanding"
          center
          widthFull
        />
      </Section>
      <Section>
        <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/l8W-Vv5kQ-4?si=SpxebEcIPqc1_7Q2"
        />
      </Section>
      <Section>
        <DetailSection
          className="px-5 md:px-10 "
          title="Brand Identity and Design System Development"
          description="Defined and evolved the Easel AI brand, establishing a visual language through logos, typefaces, and color schemes that resonate with our diverse user base."
          left
        />
      </Section>
      <Section>
        <div className="flex justify-center w-full px-5 md:px-10 mt-5">
          <Image
            src="/images/easel/LogoDesign.png"
            alt="logo design"
            width="1920"
            height="611"
          />
        </div>
      </Section>
      <Section>
        <div className="flex justify-center w-full px-5 md:px-10 mt-5">
          <Image
            src="/images/easel/ColorDesign.png"
            alt="color design"
            width="1920"
            height="611"
          />
        </div>
      </Section>
      <Section>
        <div className="flex justify-center w-full px-5 md:px-10 mt-5">
          <Image
            src="/images/easel/fontDesign.png"
            alt="font design"
            width="1920"
            height="891"
          />
        </div>
      </Section>
    </div>
  );
};

export default Canary;

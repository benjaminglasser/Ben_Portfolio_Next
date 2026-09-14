"use client";
import { FancyButton } from "../common/FancyButton";
import Section from "../common/Section";
import { Suspense } from "react";

// import ThreeComponent from './three'
import dynamic from "next/dynamic";

const Info = () => {
  const tools = [
    "Unity",
    "Unreal Engine",
    "Figma",
    "MadMapper",
    "TouchDesigner",
    "Raspberry Pi",
    "Arduino",
    "Blender",
    "Illustrator",
    "Photoshop",
    "Premiere",
    "After Effects",
    "InDesign",
    "Ableton",
    "Pencils + Paper",
    "3D printing",
    "Wood",
  ];

  const platforms = [
    "C#",
    "Javascript",
    "CSS",
    "HTML",
    "Python",
    "Java",
    "a bit of GLSL",
    "React",
    "Gatsby",
    "MongoDB",
    "Express",
    "NodeJS",
    "P5.js",
    "Processing",
    "Three.js",
  ];

  const ThreeComponent = dynamic(() => import("./three"), { ssr: false });

  return (
    <div className="mt-16 md:mt-24">
      {/* Intro: Info rail + statement + portrait */}
      <div className="grid-ed gap-y-8">
        <div className="col-span-12 md:col-span-2">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            Info
          </h4>
        </div>
        <div className="col-span-12 md:col-span-6">
          <Section>
            <h1 className="desc-mono bio">
              Exploring the unknown with curiosity and passion, I blend
              audio-visual storytelling with innovative design across 2D, 3D,
              and mixed reality. Currently working on some fun projects at Adobe.
            </h1>
          </Section>
        </div>
        <div className="col-span-12 md:col-span-4">
          <Section>
            <div className="h-[380px] md:h-[440px]">
              <Suspense fallback={<Loader />}>
                <ThreeComponent className="h-2px" />
              </Suspense>
            </div>
          </Section>
        </div>
      </div>

      {/* Tools */}
      <div className="grid-ed mt-20 md:mt-28">
        <div className="col-span-12 md:col-span-2 mb-4 md:mb-0">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            Tools
          </h4>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1">
            {tools?.map((item, idx) => (
              <p className="subtext desc-mono text-mute" key={idx}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="grid-ed mt-16 md:mt-20">
        <div className="col-span-12 md:col-span-2 mb-4 md:mb-0">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            Code
          </h4>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1">
            {platforms?.map((item, idx) => (
              <p className="subtext desc-mono text-mute" key={idx}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="grid-ed mt-16 md:mt-20">
        <div className="col-span-12 md:col-span-2 mb-4 md:mb-0">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            Education
          </h4>
        </div>
        <div className="col-span-12 md:col-span-10 subtext desc-mono text-mute space-y-1">
          <p>MFA Candidate Media Design Practices, ArtCenter College of Design</p>
          <p>BA Cognitive Science, University of Southern California</p>
          <p>General Assembly Web Development Immersive</p>
        </div>
      </div>

      {/* Links */}
      <div className="grid-ed mt-16 md:mt-20 mb-8">
        <div className="col-span-12 md:col-span-2 mb-4 md:mb-0">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            Links
          </h4>
        </div>
        <div className="col-span-12 md:col-span-10 flex flex-wrap gap-2">
          <FancyButton className="px-3">
            <a href="/pdf/Benjamin_Glasser_Resume.pdf" target="_blank">
              RESUME
            </a>
          </FancyButton>
          <FancyButton className="px-3">
            <a href="https://github.com/benjaminglasser" target="_blank">
              GITHUB
            </a>
          </FancyButton>
          <FancyButton className="px-3">
            <a href="https://www.instagram.com/bbbbb.stuff/" target="_blank">
              INSTAGRAM
            </a>
          </FancyButton>
          <FancyButton className="px-3">
            <a href="mailto:glasserben@gmail.com" target="_blank">
              CONTACT
            </a>
          </FancyButton>
          <FancyButton className="px-3">
            <a
              href="https://open.spotify.com/artist/4lP1lKWYqNLYWYtnuTh8OF?si=Z19kgdcvRzyKWn0C8BK3cQ"
              target="_blank"
            >
              Music
            </a>
          </FancyButton>
        </div>
      </div>
    </div>
  );
};

export default Info;

export const Loader = () => {
  return "Loading ...";
};

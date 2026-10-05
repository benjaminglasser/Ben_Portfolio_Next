"use client";
import { FancyButton } from "../common/FancyButton";
import Section from "../common/Section";
import { Suspense, useState } from "react";
import { useDesignVersion } from "../common/design/DesignVersion";
import { TYPES, TYPE_ORDER } from "../common/design/types";

// Which project types each tool or language is used for (legend highlight).
const TOOL_TYPES = {
  Unity: ["spatial"],
  "Unreal Engine": ["spatial", "motion"],
  Figma: ["web"],
  MadMapper: ["physical"],
  TouchDesigner: ["physical", "motion"],
  "Raspberry Pi": ["physical"],
  Arduino: ["physical"],
  Blender: ["motion", "spatial"],
  Illustrator: ["web"],
  Photoshop: ["web"],
  Premiere: ["motion"],
  "After Effects": ["motion"],
  InDesign: ["web"],
  Ableton: ["physical"],
  "3D printing": ["physical"],
  Wood: ["physical"],
  "C#": ["spatial"],
  Javascript: ["web"],
  CSS: ["web"],
  HTML: ["web"],
  Python: ["physical"],
  Java: ["web"],
  "a bit of GLSL": ["motion"],
  React: ["web"],
  Gatsby: ["web"],
  MongoDB: ["web"],
  Express: ["web"],
  NodeJS: ["web"],
  "P5.js": ["motion"],
  Processing: ["motion"],
  "Three.js": ["web", "motion"],
};

// import ThreeComponent from './three'
import dynamic from "next/dynamic";

const ThreeComponent = dynamic(() => import("./three"), { ssr: false });

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

  const { level } = useDesignVersion();
  const isSpec = level >= 3;
  const [pinnedType, setPinnedType] = useState(null);
  const [hoverType, setHoverType] = useState(null);
  const activeType = hoverType || pinnedType;

  const labelNo = (n) => String(n + (isSpec && n >= 2 ? 1 : 0)).padStart(2, "0");
  const rowClass = isSpec ? "spec-row" : "";
  const listClass = `grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-1 ${
    isSpec && activeType ? "spec-dim" : ""
  }`;
  const itemClass = (item) =>
    `spec-item subtext desc-mono text-mute ${
      activeType && TOOL_TYPES[item]?.includes(activeType) ? "is-match" : ""
    }`;

  const secClass =
    "col-span-12 md:col-span-8 grid grid-cols-8 gap-x-[var(--gutter)]";


  return (
    <div className="mt-16 md:mt-24">
      {/* Intro: Info rail + statement; portrait pinned in the right column */}
      <div className="grid-ed gap-y-8">
        <div className={secClass}>
          <div className="col-span-8 md:col-span-2">
            <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
              <span className="label-index">01</span>Info
            </h4>
          </div>
          <div className="col-span-8 md:col-span-6">
            <Section>
              <h1 className="desc-mono bio">
                Exploring the unknown with curiosity and passion, I blend
                audio-visual storytelling with innovative design across 2D, 3D,
                and mixed reality. Currently working on some fun projects at Adobe.
              </h1>
            </Section>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 md:row-start-1 md:row-span-6 md:self-start md:sticky md:top-24">
          <Section>
            <div className="h-[300px] md:h-[460px]">
              <Suspense fallback={<Loader />}>
                <ThreeComponent className="h-2px" />
              </Suspense>
            </div>
          </Section>
        </div>

      {/* Project-type legend (version C) */}
      {isSpec && (
        <div className={`${secClass} md:mt-4`}>
          <div className="col-span-8 md:col-span-2 mb-4 md:mb-0">
            <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
              <span className="label-index">02</span>Types
            </h4>
          </div>
          <div className={`col-span-8 md:col-span-6 ${rowClass}`}>
            <p className="subtext desc-mono text-mute mb-3">
              Select a type to see the tools behind it.
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Project types">
              {TYPE_ORDER.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="type-key"
                  aria-pressed={pinnedType === t}
                  onClick={() => setPinnedType(pinnedType === t ? null : t)}
                  onMouseEnter={() => setHoverType(t)}
                  onMouseLeave={() => setHoverType(null)}
                  onFocus={() => setHoverType(t)}
                  onBlur={() => setHoverType(null)}
                >
                  {TYPES[t].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tools */}
      <div className={`${secClass} md:mt-12`}>
        <div className="col-span-8 md:col-span-2 mb-4 md:mb-0">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            <span className="label-index">{labelNo(2)}</span>Tools
          </h4>
        </div>
        <div className={`col-span-8 md:col-span-6 ${rowClass}`}>
          <div className={listClass}>
            {tools?.map((item, idx) => (
              <p className={itemClass(item)} key={idx}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className={`${secClass} md:mt-12`}>
        <div className="col-span-8 md:col-span-2 mb-4 md:mb-0">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            <span className="label-index">{labelNo(3)}</span>Code
          </h4>
        </div>
        <div className={`col-span-8 md:col-span-6 ${rowClass}`}>
          <div className={listClass}>
            {platforms?.map((item, idx) => (
              <p className={itemClass(item)} key={idx}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className={`${secClass} md:mt-12`}>
        <div className="col-span-8 md:col-span-2 mb-4 md:mb-0">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            <span className="label-index">{labelNo(4)}</span>Education
          </h4>
        </div>
        <div className={`col-span-8 md:col-span-6 subtext desc-mono text-mute space-y-1 ${rowClass}`}>
          <p>MFA Candidate Media Design Practices, ArtCenter College of Design</p>
          <p>BA Cognitive Science, University of Southern California</p>
          <p>General Assembly Web Development Immersive</p>
        </div>
      </div>

      {/* Links */}
      <div className={`${secClass} md:mt-12 mb-8`}>
        <div className="col-span-8 md:col-span-2 mb-4 md:mb-0">
          <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
            <span className="label-index">{labelNo(5)}</span>Links
          </h4>
        </div>
        <div className={`col-span-8 md:col-span-6 flex flex-wrap gap-2 ${rowClass}`}>
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
    </div>
  );
};

export default Info;

export const Loader = () => {
  return "Loading ...";
};

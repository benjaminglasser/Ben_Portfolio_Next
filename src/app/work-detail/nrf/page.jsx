"use client";
import React from "react";
import Image from "next/image";
import DetailSection from "../../common/detailSection";
import Contained from "@/app/common/Contained";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import ZigzagHeader from "../../common/zigzagHeader";

const NRF = () => {
  const tile = "relative overflow-hidden bg-gray-800";

  const resultVideos = [
    { url: "/Media/NRF/clear_canvas.mp4", caption: "01 // Transparency Effect" },
    { url: "/Media/NRF/Purse_Proj.mp4", caption: "02 // Bounding Box Scale" },
    {
      url: "/Media/NRF/SALE_Proj.mp4",
      caption: "03 // Dynamic Content Integration",
    },
    {
      url: "/Media/NRF/Bubbles_Glass_Proj.mp4",
      caption: "04 // Creative Possibilities",
    },
  ];

  return (
    <div className="w-full text-white">
      {/* Full-height hero with the masthead overlaid at the bottom */}
      <div className="full-bleed relative">
        <div className="hero-full">
          <VideoPlayerInternal video="/Media/NRF/NRF_Hero.mp4" />
        </div>
        {/* Bottom scrim for legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 md:px-10 pb-6 md:pb-10">
          <ZigzagHeader
            title="Clear Canvas"
            description="Reimagining Retail: Elegantly showcasing the affordances of a novel form of digital signage"
            extendedDescription="Unveiled at the NRF retail technology expo in 2024, Standard Vision introduced Clear Canvas, a transparent screen technology set to transform retail spaces. In collaboration with their team, we created eye-catching graphics that illustrate the technology’s unique capabilities, from enhancing customer engagement to showcasing products in novel ways."
            time="2023 // Standard Vision"
            role="3D Graphic Design"
            tools={["Blender"]}
            collaborator="Sunny Chen"
            collaboratorLink="https://sunny.design/"
          />
        </div>
      </div>

      {/* Final display (contained, autoplay loop) */}
      <Contained
        className="mt-16 md:mt-24"
        spanClass="md:col-start-3 md:col-span-8"
      >
        <VideoPlayerInternal video="/Media/NRF/FinalNRFDisplay.mp4" />
      </Contained>

      {/* Context + Aim as two side-by-side columns */}
      <div className="grid-ed gap-y-10 mt-16 md:mt-24">
        <div className="col-span-12 md:col-start-3 md:col-span-4">
          <h3 className="edge-label text-[var(--rust)] mb-3">Context</h3>
          <p className="subtext desc-mono">
            At the NRF Expo 2024 in New York, Standard Vision introduced Clear
            Canvas, a groundbreaking transparent screen technology, that can
            revolutionize retail experiences. This innovation allows for
            dynamic, interactive displays that blend seamlessly into retail
            environments.
          </p>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-8">
          <h3 className="edge-label text-[var(--rust)] mb-3">Aim</h3>
          <p className="subtext desc-mono">
            Our goal was to create modern, visually captivating graphics that
            underscore the innovative capabilities of Clear Canvas&apos;s
            transparent screen technology for retail experiences.
          </p>
        </div>
      </div>

      <DetailSection
        title="Results"
        description="Each graphic we developed serves to highlight a distinct affordance of the transparent screen technology:"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          {resultVideos.map((v) => (
            <figure key={v.url}>
              <VideoPlayerInternal video={v.url} />
              <figcaption className="mt-3 subtext desc-mono text-mute">
                {v.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="subtext desc-mono max-w-3xl mt-8">
          Each of these graphics not only underscores the innovative features of
          Clear Canvas&apos;s transparent screen technology but also showcases
          our ability to blend creativity with technology to push the boundaries
          of retail experiences.
        </p>
      </DetailSection>

      <DetailSection
        title="Process"
        description="Collaboration was key in our journey to innovation. Working closely with the Clear Canvas team, we brainstormed ideas, developed concepts, and iterated designs. Our focus remained on creating high-quality assets that adhere to specific specifications, ensuring each graphic not only looked stunning but also served its purpose effectively."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          <div className={`aspect-[16/9] ${tile}`}>
            <Image
              src="/Media/NRF/NRFBooth1.png"
              alt="Clear Canvas booth at NRF"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className={`aspect-[16/9] ${tile}`}>
            <Image
              src="/Media/NRF/NRFBooth2.png"
              alt="Clear Canvas booth at NRF"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-3">
          <VideoPlayerInternal video="/Media/NRF/TestNRF.mp4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <VideoPlayerInternal video="/Media/NRF/TestNRF_1.mp4" />
          <VideoPlayerInternal video="/Media/NRF/TestNRF_2.mp4" />
        </div>
      </DetailSection>

      {/* Closing water video — full width, autoplay loop, flush to bottom */}
      <div className="full-bleed mt-16 md:mt-24 -mb-36 md:-mb-10">
        <VideoPlayerInternal video="/Media/NRF/Bubbles_Web.mp4" />
      </div>
    </div>
  );
};

export default NRF;

"use client";
import React from "react";
import AIM from "../../common/aim";
import DetailSection from "../../common/detailSection";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import ZigzagHeader from "../../common/zigzagHeader";

const Odyssey = () => {
  // Media sits in a narrower column with an empty column to the right.
  const Media = ({ children, className = "" }) => (
    <div className="grid-ed">
      <div className={`col-span-12 md:col-start-3 md:col-span-8 ${className}`}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="w-full text-white">
      {/* Full-bleed cropped hero */}
      <div className="full-bleed hero-crop">
        <VideoPlayerInternal video="/Media/Odyssey/odysseyHero.mp4" />
      </div>

      {/* Masthead */}
      <ZigzagHeader
        title="Beyond The Infinite"
        description="A Virtual Production Odyssey"
        extendedDescription="For the 2023 Cinegear Expo in Los Angeles, our team showcased our in-house soundstage's capabilities by blending physical and digital elements to recreate &quot;2001: A Space Odyssey's&quot; opening sequence. Using Unreal Engine, I crafted a realistic desert scene that integrated with physical props, demonstrating the fusion of traditional and innovative filmmaking techniques. This immersive experience paid homage to cinema's history while previewing the future of storytelling."
        time="2023 // Standard Vision"
        role="Virtual Production, In Camera VFX"
        tools={["Unreal Engine"]}
      />

      <Media className="mt-16 md:mt-24">
        <div className="relative w-full aspect-[16/9] bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/w1dcv-u8B8Y?autoplay=1&mute=1&loop=1&playlist=w1dcv-u8B8Y&controls=0&modestbranding=1&rel=0&playsinline=1"
            title="Beyond The Infinite"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Media>

      <AIM aim="Our goal was to spotlight the virtual production space's potential, attracting new business and networking opportunities at the expo." />

      <DetailSection
        spanClass="md:col-span-8"
        title="Background"
        description='The project leveraged the cutting-edge technology soundstages equipped with large-scale LED screens, to create immersive virtual backgrounds using game engines like Unreal Engine. This innovative approach, popularized by its use in the TV series "The Mandalorian," offers numerous advantages for film production.'
      >
        <div className="relative w-full aspect-[16/9] bg-black mt-8">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/bErPsq5kPzE?rel=0"
            title="ICVFX explained"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="subtext desc-mono mt-8">
          ICVFX enables realistic bounce lighting, parallax effects through the
          synchronization of virtual and physical cameras, and the affordance of
          controlled environments that also allow for real-time changes in
          background scenery. This technology not only enhances the visual
          storytelling but also creates a more engaging environment for actors,
          facilitating a more authentic performance. The use of ICVFX represents
          a significant shift in filmmaking, merging the physical and digital
          worlds to achieve unprecedented levels of realism and flexibility on
          set.
        </p>
      </DetailSection>

      <DetailSection
        spanClass="md:col-span-8"
        title="Process"
        description='For this project, the challenge was to compose a desert scene reminiscent of the iconic intro scene from "2001: A Space Odyssey."'
      >
        <div className="mt-8">
          <VideoPlayerInternal video="/Media/Odyssey/Process.mp4" />
        </div>
        <p className="subtext desc-mono mt-8">
          This involved careful shot composition, including a detailed day/night
          sequence, to capture the essence of the original film while showcasing
          the capabilities of our virtual production space. The process required
          a robust pipeline for color correction, especially challenging given
          that the assets were delivered just a day before the event.
        </p>
        <div className="mt-8">
          <VideoPlayerInternal video="/Media/Odyssey/Process_1.mp4" />
        </div>
        <p className="subtext desc-mono mt-8">
          This tight turnaround necessitated quick adaptation and precise
          calibration to ensure that the digital environment seamlessly matched
          the physical set pieces. The goal was to create an experience that was
          not only visually stunning but also faithful to the atmospheric and
          thematic elements of the source material, demonstrating the potential
          of virtual production technology to recreate and enhance classic
          cinematic moments.
        </p>
      </DetailSection>

      <DetailSection
        spanClass="md:col-span-8"
        title="Project Outcomes"
        description="The project was a resounding success, achieving its aim of demonstrating the potential of in-house virtual production technologies and attracting interest from industry professionals. It highlighted the benefits of using LED volumes for enhanced realism and storytelling, sparking interest in the future of virtual production. The positive reception affirmed the industry's readiness for innovative filmmaking technologies."
      />

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default Odyssey;

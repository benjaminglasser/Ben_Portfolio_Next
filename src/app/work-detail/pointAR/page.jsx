"use client";
import React from "react";
import Image from "next/image";
import { POINTAR } from "../../../../public/images/PointAR";
import ZigzagHeader from "../../common/zigzagHeader";
import DetailSection from "../../common/detailSection";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";

const PointAR = () => {
  const nextSteps = [
    "One of the most important next steps that we encountered was the possibility of turning the haptic system into a much more high definition prototype to test this design concept.",
    "Iterate the project using other AR glasses to have a much more broader understanding of the state of the art of the AR tech.",
    "We are always hungry for user feedback and as the project keeps on evolving, a never ending step is to go out and user test.",
  ];

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
        <VideoPlayerInternal video="/Media/Pointar/PointAR2_Hero.mp4" />
      </div>

      {/* Masthead */}
      <ZigzagHeader
        title="PointAR"
        description="Your personal museum tour guide"
        extendedDescription="An Augmented Reality museum guide tailor-made to each user. It can be experienced throughout the museum or remotely at any other location."
        time="Fall 2022"
        role="AR UX / UI Design"
        tools={["Unity", "Unreal Engine", "Blender"]}
      />

      <Media className="mt-16 md:mt-24">
        <VideoPlayerExternal src="https://www.youtube.com/embed/fvOwZU6CShI" />
      </Media>

      {/* Context + Aim as two side-by-side columns */}
      <div className="grid-ed gap-y-10 mt-16 md:mt-24">
        <div className="col-span-12 md:col-start-3 md:col-span-4">
          <h3 className="edge-label text-[var(--rust)] mb-3">Context</h3>
          <p className="subtext desc-mono">
            Museums with huge collections are bound to their geographical
            location, as well as their building size. Their curatorial layouts
            are far from customized to the interests of the visitors by
            attempting to encompass massive timespans, materials and dimensional
            scopes that overwhelm the visitors and leave them feeling as though
            their visit was incomplete. This is heightened by experiencing a
            sense of distance from the intimacy that is desired with particular
            pieces.
          </p>
        </div>
        <div className="col-span-12 md:col-start-8 md:col-span-3">
          <h3 className="edge-label text-[var(--rust)] mb-3">Aim</h3>
          <p className="subtext desc-mono">
            How might we leverage the power of Augmented Reality to enhance the
            way visitors experience a museum visually and tactilely?
          </p>
        </div>
      </div>

      <DetailSection
        spanClass="md:col-span-8"
        title="Team"
        description="This project is a joint effort between Benjamin Glasser and Mario Santanilla. While we both were R&D XR Design interns at BMW in Munich, Germany, we spent much of our time in museums of all sorts."
      />

      <DetailSection
        spanClass="md:col-span-8"
        title="Approach"
        description="Through field research, we broke the museum experience down into a clear visual language, then explored how that language could carry from a phone survey into a fully augmented tour."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
          <Image src={POINTAR.ERA} alt="Evolution of the app" className="w-full h-auto" />
          <Image src={POINTAR.START} alt="Start screen" className="w-full h-auto" />
          <Image src={POINTAR.NEXT} alt="Next steps interface" className="w-full h-auto" />
        </div>
      </DetailSection>

      {/* App mockup — full-bleed */}
      <div className="full-bleed mt-8">
        <Image src={POINTAR.DIVIDER} alt="PointAR app mockup" className="w-full h-auto" />
      </div>

      <DetailSection
        spanClass="md:col-span-8"
        title="Survey"
        description="In our research, one of the key factors that led to museum disappointment was a sense of confusion and overwhelm felt when entering vast collections. Even when one goes on a guided tour, they are far from tailored to the individual's interests. Therefore, it was imperative that PointAR start with a survey to understand the user's specific desires and interests in order to be able to structure the most precisely tailored tour."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8 items-start">
          <p className="subtext desc-mono">
            For this, it was necessary to define a language that could easily
            transition to the AR experience. Through field research, we broke
            down the museum into three categories: time period, geography, and
            material form. We focused on these attributes to guide the user
            through the survey. This took us on a rich UI visual exploration,
            guided by rigorous UX research and testing.
          </p>
          <Image
            src={POINTAR.ERA_GIF}
            alt="Survey interface in the PointAR app"
            className="w-full max-w-[240px] h-auto"
          />
        </div>
      </DetailSection>

      <DetailSection
        spanClass="md:col-span-8"
        title="Tour"
        description="When brainstorming how to improve the experience of touring through a museum, immersion was an aspect that we wanted to improve through helpful guidance. We knew we would want to focus the user's attention by removing unnecessary stimuli visitors mentioned. We would do this by removing excess noise and highlighting targeted points of interest."
      >
        <p className="subtext desc-mono mt-8">
          An aspect of AR that excites us is the opportunity to get rid of the
          frame and restrictions of traditional screen borders. This is why,
          through various explorations on innovative guidance systems that AR
          affords, we landed on the inspiration of Particle Systems: a fluid
          tool that is malleable and adapts to each unique environment. This
          system helps focus the visual attention of the user while following
          it, aided by a voice over tour guide that immerses the spectator on the
          journey from piece to piece.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          <Image src={POINTAR.TOUR3} alt="Tour interface" className="w-full h-auto" />
          <Image src={POINTAR.TOUR6} alt="Tour interface" className="w-full h-auto" />
          <Image src={POINTAR.TOUR5} alt="Tour interface" className="w-full h-auto" />
          <Image src={POINTAR.TOUR4} alt="Tour interface" className="w-full h-auto" />
        </div>
      </DetailSection>

      <DetailSection
        spanClass="md:col-span-8"
        title="Haptic Experience"
        description="While discussing ways to improve museum immersion, we realized that we did not need to be limited to augmenting museum experience through visual cues alone. We thought specifically of old carved sculptures and that a common aspect of the modern museum experience is that users cannot interact directly with the pieces in fear of damaging the expensive, fragile works. However, this adds another layer of distancing in a museum. Our hope is to provide the user with the experience of touch to get them closer to the intimacy of what the sculptor was feeling through their creative process."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8 items-start">
          <div>
            <p className="subtext desc-mono">
              The haptic experience is where PointAR ties all of these various
              elements together. Inspired by experiments in particle systems, we
              explored Point Cloud LiDAR scanners that have become more
              accessible in recent years. We decided to push the limits of this
              tool, to record not only visual 3D assets, but to integrate them in
              a system of haptic rings that allows the user to feel and touch the
              sculptures.
            </p>
            <p className="subtext desc-mono mt-5">
              This also allows for PointAR to reach users that are unable to
              visit particular museums and still have the opportunity to
              experience these pieces in the comfort of their own environment to
              explore, feel, and study.
            </p>
          </div>
          <Image src={POINTAR.HAND} alt="Haptic ring interaction" className="w-full h-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          <Image src={POINTAR.TOUR1} alt="Haptic experience" className="w-full h-auto" />
          <Image src={POINTAR.TOUR2} alt="Haptic experience" className="w-full h-auto" />
        </div>
      </DetailSection>

      <DetailSection
        spanClass="md:col-span-8"
        title="Mixed Reality"
        description="The current state of the art technology allows for novel interactions with sculptures and pieces that could not have been experienced prior. In this example, a user can see how a statue may have looked, in full color, at the time of it's inception adding new layers of depth to the museum experience."
      >
        <div className="mt-8">
          <VideoPlayerInternal video="/Media/Pointar/StatueTransition_3_1.mp4" />
        </div>
      </DetailSection>

      {/* Full-bleed particle stream — a touch taller than a standard band */}
      <div
        className="full-bleed band-crop mt-8"
        style={{ "--band-h": "clamp(280px, 52vh, 680px)" }}
      >
        <VideoPlayerInternal video="/Media/Pointar/ParticleStream.mp4" />
      </div>

      <DetailSection
        spanClass="md:col-span-8"
        title="Process"
        description="The goal of this project was to explore how we could use the tools we know with AR prototyping and gain a deeper understanding of them by focusing on a possible use case in one of our areas of interests, art."
      >
        <p className="subtext desc-mono mt-8">
          Our initial approach to the project was based on long hours of
          conversation we had on the current affordances of using individual
          vertices to structure computer generated imagery. Advancements in the
          usability of LiDAR Point Cloud recordings of 3D spaces and Particle
          Systems to simulate real life physical behaviors rid the need for the
          physical restrictions of the traditional frame imposed by standard
          screen hardware with fixed resolutions.
        </p>
        <Image src={POINTAR.POINTAR_FLOW} alt="PointAR system flow diagram" className="w-full h-auto mt-8" />
        <p className="subtext desc-mono mt-8">
          Our three part system consists of the survey, the tour and the haptic
          experience. The survey is the initial encounter the visitor has, when a
          series of multiple choice questions asked on their phone application
          determines their specific areas of interest. The walk through uses this
          information to create a tailored AR tour that uses a malleable Particle
          System to guide the user from the different locations. The haptics are
          activated when the user reaches a specific art piece that they want to
          explore further so that they can feel and interact with the piece.
        </p>
        <Image src={POINTAR.POINTAR_UI} alt="PointAR UI system" className="w-full h-auto mt-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8 items-start">
          <p className="subtext desc-mono">
            Using particle systems, PointAR can successfully and dynamically
            transition between realities and technologies. As many AR
            applications are currently hosted on phone apps, we felt it would be
            intuitive to host the survey on the phone screen, then transition
            seamlessly into AR space via a particle system that begins on the
            phone screen and transitions into the augmented space, keeping the
            consistency of our visual system.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Image src={POINTAR.MOBILE_VIEW_INTRO} alt="Mobile view intro transition" className="w-full h-auto" />
            <Image src={POINTAR.WAVE} alt="Particle wave transition" className="w-full h-auto" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8 items-start">
          <p className="subtext desc-mono">
            To prototype this guidance experience, we used Unity to create the
            Particle System that guides the user around the museum, based on a
            Bezier curve that dynamically adapts to a series of objects that
            function as &quot;magnets&quot; guiding the particle system to
            distinct points in real time. We built a UI system to manually move,
            rotate and activate the start, middle and end points of each section
            so we could test the system in real museum spaces.
          </p>
          <Image
            src={POINTAR.PARTICLE_UI}
            alt="Particle system prototyping UI"
            className="w-full h-auto"
          />
        </div>
      </DetailSection>

      <DetailSection spanClass="md:col-span-8" title="Next Steps">
        <ul className="list-disc pl-5 space-y-2 subtext desc-mono mt-4">
          {nextSteps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </DetailSection>

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default PointAR;

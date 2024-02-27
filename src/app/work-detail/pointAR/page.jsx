"use client";
import React from "react";
import { POINTAR } from "@/app/assets/images/PointAR";
import DetailSection from "../../common/detailSection";
import Image from "next/image";
import { Grid } from "@mui/material";
import Context from "../../common/context";
import AIM from "../../common/aim";
import Section from "@/app/common/Section";
import VideoPlayer from "@/app/common/CenteredVideoPlayer";

const PointAR = () => {
  const bullets = [
    "One of the most important next steps that we encountered was the possibility of turning the haptic system into a much more high definition prototype to test this design concept.",
    "Iterate the project using other AR glasses to have a much more broader understanding of the state of the art of the AR tech.",
    "We are always hungry for user feedback and as the project keeps on evolving, a never ending step is to go out and user test.",
  ];
  return (
    <div className="w-full text-white">
      <div className="relative">
        <video autoPlay muted loop src={POINTAR.POINTEAR_MAIN} />


        <div className="font-bold absolute bottom-0 md:bottom-1/3 w-full text-center flex justify-center">
          <h1 className="w-full md:w-2/3 px-6">
            An Augmented Reality museum guide tailor-made to each user. It can
            be experienced throughout the museum or remotely at any other
            location.
          </h1>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <VideoPlayer
          className="w-full md:w-3/4 h-full sm:h-[34rem] md:h-[38rem] lg:h-[42rem]"
          widthFull
          src="https://www.youtube.com/embed/fvOwZU6CShI"
        />
      </div>
      <Grid container className="flex justify-between">
        <Grid item md={6}>
          <DetailSection
            className="px-5 md:px-10 "
            title="TEAM"
            description={`This project is a joint effort between Benjamin Glasser and Mario Santanilla. While we both were R&D XR Design interns at BMW in Munich, Germany, we spent much of our time in museums of all sorts.`}
            widthFull
            left
          />
        </Grid>
        <Grid item md={6}>
          <DetailSection
            className="px-5 md:px-10 "
            title="APPROACH"
            description="A key feature of this build involved including a 24hr livestream of the gallery at all times to be displayed soley on the landing page. It was important to create a design language that wouldn't overshadow this focal point."
            widthFull
            left={false}
          />
        </Grid>
      </Grid>
      <div className="flex items-start justify-center">
        <Grid container className="w-4/5">
          <Grid item xs={4}>
            <Image src={POINTAR.ERA} alt="era" className="w-full h-full" />
          </Grid>
          <Grid item xs={4}>
            <Image src={POINTAR.START} alt="start" className="w-full h-full" />
          </Grid>
          <Grid item xs={4}>
            <Image src={POINTAR.NEXT} alt="next" className="w-full h-full" />
          </Grid>
        </Grid>
      </div>
      <Context
        title="CONTEXT"
        context="Museums with huge collections are bound to their geographical location, as well as their building size. Their curatorial layouts are far from customized to the interests of the visitors by attempting to encompass massive timespans, materials and dimensional scopes that overwhelm the visitors and leave them feeling as though their visit was incomplete. This is heightened by experiencing a sense of distance from the intimacy that is desired with particular pieces."
      />
      <AIM aim="How might we leverage the power of Augmented Reality to enhance the way visitors experience a museum visually and tactilely?" />
      <Image src={POINTAR.DIVIDER} className="w-full my-10" />
      {/* Feature 1 */}
      <div className="px-5 md:px-10 mt-5 md:mt-10">
        <h5>Feature #1</h5>
        <h1>Survey</h1>
        <Grid container className="w-full">
          <Grid item xs={12} md={8}>
            <p className="px-5 md:px-10">
              In our research, one of the key factors that led to museum
              disappointment was a sense of confusion and overwhelm felt when
              entering vast collections. Even when one goes on a guided tour,
              they are far from tailored to the individual's interests.
              Therefore, it was imperative that PointAR start with a survey to
              understand the user’s specific desires and interests in order to
              be able to structure the most precisely tailored tour.
              <br />
              <br />
              For this, it was necessary to define a language that could easily
              transition to the AR experience. Through field research, we broke
              down the museum into three categories: time period, geography, and
              material form. We focused on these attributes to guide the user
              through the survey. This took us on a rich UI visual exploration,
              guided by rigorous UX research and testing.
            </p>
          </Grid>
          <Grid item xs={12} md={4} className="flex justify-center">
            <Image
              src={POINTAR.ERA_GIF}
              alt="start"
              className="w-1/2 md:w-4/5"
            />
          </Grid>
        </Grid>
      </div>

      {/* Feature 2 */}

      <div className="px-5 md:px-10 mt-5 md:mt-10 flex flex-col items-center">
        <div className="w-full text-left">
          <h5>Feature #2</h5>
          <h1>Tour</h1>
        </div>
        <Grid container className="w-full" spacing={3}>
          <Grid item xs={12} md={6}>
            <Image src={POINTAR.TOUR3} alt="tour" className="w-full" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Image src={POINTAR.TOUR6} alt="tour" className="w-full" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Image src={POINTAR.TOUR5} alt="tour" className="w-full" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Image src={POINTAR.TOUR4} alt="tour" className="w-full" />
          </Grid>
          <Grid item xs={12} md={6}>
            <p>
              When brainstorming how to improve the experience of touring
              through a museum, immersion was an aspect that we wanted to
              improve through helpful guidance. We knew we would want to focus
              the user's attention by removing unnecessary stimuli visitors
              mentioned. We would do this by removing excess noise and
              highlighting targeted points of interest.
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <p>
              An aspect of AR that excites us is the opportunity to get rid of
              the frame and restrictions of traditional screen borders. This is
              why, through various explorations on innovative guidance systems
              that AR affords, we landed on the inspiration of Particle Systems:
              a fluid tool that is malleable and adapts to each unique
              environment. This system helps focus the visual attention of the
              user while following it, aided by a voice over tour guide that
              immerses the spectator on the journey from piece to piece.
            </p>
          </Grid>
        </Grid>
      </div>

      {/* Feature 3 */}
      <div className="px-5 md:px-10 mt-5 md:mt-10 flex flex-col items-center">
        <Grid container className="w-full px-5 md:px-10" spacing={3}>
          <Grid item xs={12} md={6}>
            <Image src={POINTAR.HAND} alt="hand" className="w-full" />
          </Grid>

          <Grid item xs={12} md={6}>
            <h5>Feature #3</h5>
            <h1>Haptic Experience</h1>
            <p>
              While discussing ways to improve museum immersion, we realized
              that we did not need to be limited to augmenting museum experience
              through visual cues alone. We thought specifically of old carved
              sculptures and that a common aspect of the modern museum
              experience is that users cannot interact directly with the pieces
              in fear of damaging the expensive, fragile works. However, this
              adds another layer of distancing in a museum. Our hope is to
              provide the user with the experience of touch to get them closer
              to the intimacy of what the sculptor was feeling through their
              creative process.
              <br />
              <br />
              The haptic experience is where PointAR ties all of these various
              elements together. Inspired by experiments in particle systems, we
              explored Point Cloud LiDAR scanners that have become more
              accessible in recent years. We decided to push the limits of this
              tool, to record not only visual 3D assets, but to integrate them
              in a system of haptic rings that allows the user to feel and touch
              the sculptures. We prototyped a haptic set of rings that could
              communicate with our application to get the individual that much
              closer to their favorite pieces.
              <br />
              <br />
              This also allows for PointAR to reach users that are unable to
              visit particular museums and still have the opportunity to
              experience these pieces in the comfort of their own environment to
              explore, feel, and study.
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <Image src={POINTAR.TOUR1} alt="tour" className="w-full" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Image src={POINTAR.TOUR2} alt="tour" className="w-full" />
          </Grid>
        </Grid>
      </div>

      {/* Feature 4 */}
      <div className="px-5 md:px-10 mt-5 md:mt-10">
        <h5>Feature #4</h5>
        <h1>Mixed Reality</h1>
        <Grid container className="w-full" spacing={3}>
          <Grid item xs={12} md={3}>
            <p>
              The current state of the art technology allows for novel
              interactions with sculptures and pieces that could not have been
              experienced prior. In this example, a user can see how a statue
              may have looked, in full color, at the time of it's inception
              adding new layers of depth to the museum experience
            </p>
          </Grid>

          <Grid item xs={12} md={9}>
            <video
              autoPlay
              muted
              loop
              src={POINTAR.STATUE}
              className="w-full"
            />
          </Grid>
        </Grid>
      </div>
      <video
        autoPlay
        muted
        loop
        src={POINTAR.PARTICLE_STREAM}
        className="w-full"
      />
      <div>
        <Section>
          <div className="flex justify-center w-full my-5 px-10">
            <div className="w-full md:w-2/3">
              <h1 className="mb-3">Process</h1>
              <h2 className="text-left text-subheading">
                The goal of this project was to explore how we could use the
                tools we know with AR prototyping and gain a deeper
                understanding of them by focusing on a possible use case in one
                of our areas of interests, art.
                <br /> <br /> Our initial approach to the project was based on
                long hours of conversation we had on the current affordances of
                using individual vertices to structure computer generated
                imagery. Advancements in the usability of LiDAR Point Cloud
                recordings of 3D spaces and Particle Systems to simulate real
                life physical behaviors rid the need for the physical
                restrictions of the traditional frame imposed by standard screen
                hardware with fixed resolutions.
              </h2>
            </div>
          </div>
        </Section>
        <Section>
          <Image
            src={POINTAR.POINTAR_FLOW}
            alt="tour"
            className="my-5 md:my-10 w-full"
          />
        </Section>
        <div className="flex justify-center w-full my-5 px-10">
          <h2 className="w-full md:w-2/3 text-left text-subheading">
            Our three part system consists of the survey, the tour and the
            haptic experience. The survey is the initial encounter the visitor
            has, when a series of multiple choice questions asked on their phone
            application determines their specific areas of interest. The walk
            through uses this information to create a tailored AR tour that uses
            a malleable Particle System to guide the user from the different
            locations. The haptics are activated when the user reaches a
            specific art piece that they want to explore further so that they
            can feel and interact with the piece.Using particle systems, PointAR
            can successfully and dynamically transition between realities and
            technologies. For instance, as many AR applications are currently
            hosted on phone apps, we felt it would be intuitive to host the
            survey on the phone screen which is where users currently feel most
            comfortable interacting with virtual buttons, but then transition
            seamlessly into AR space via a particle system that begins on the
            phone screen and transitions into the augmented space. This
            continues with the consistency of our visual system. Through this
            strategic prototyping, we created a system that could adapt in real
            time to have a dynamic and useful prototype to showcase and express
            our idea.
          </h2>
        </div>
        <Section>
          <Image
            src={POINTAR.POINTAR_UI}
            alt="tour"
            className="my-5 md:my-10 w-full"
          />
        </Section>
      </div>

      <div className="px-5 md:px-10 mt-5 md:mt-10 flex flex-col items-center">
        <Grid container className="w-full px-5 md:px-10" spacing={3}>
          <Grid item xs={12} md={6}>
            <p>
              Using particle systems, PointAR can successfully and dynamically
              transition between realities and technologies. For instance, as
              many AR applications are currently hosted on phone apps, we felt
              it would be intuitive to host the survey on the phone screen which
              is where users currently feel most comfortable interacting with
              virtual buttons, but then transition seamlessly into AR space via
              a particle system that begins on the phone screen and transitions
              into the augmented space. This continues with the consistency of
              our visual system. Through this strategic prototyping, we created
              a system that could adapt in real time to have a dynamic and
              useful prototype to showcase and express our idea.{" "}
            </p>
          </Grid>
          <Grid item xs={6} md={3}>
            <Image
              src={POINTAR.MOBILE_VIEW_INTRO}
              alt="tour"
              className="w-full"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Image src={POINTAR.WAVE} alt="tour" className="w-full" />
          </Grid>
        </Grid>
      </div>

      <br />
      <br />
      <br />
      <div className="flex justify-center w-full my-5 px-10">
        <h2 className="w-full md:w-2/3 text-left text-subheading">
          To prototype this guidance experience, we used Unity to create the
          Particle System that guides the user around the museum. This system is
          based on a Bezier curve that dynamically adapts to a series of objects
          that function as “magnets” that guide the particle system to distinct
          points in real time.
        </h2>
      </div>
      <br />
      <br />
      <br />

      <div className="px-5 md:px-10 mt-5 md:mt-10 flex flex-col items-center">
        <Grid container className="w-full px-5 md:px-10" spacing={3}>
          <Grid item xs={12} md={6}>
            <p>
              For the prototype we created a UI system that would allow us to
              manually move, rotate and activate the start, middle and end
              points of each Particle System section. This was necessary so that
              we could go into a museum environment to test this system in
              various spaces. By testing this, we found that these systems are
              successfully free of their borders and can grow, shrink, and move
              in space outside of screen restrictions which allows them to more
              properly delineate directional information within tight enclosed
              spaces. Furthermore, these systems that are made up of individual
              dots allow for the creation of digital twins of untouchable
              objects. This also keeps a consistent visual language throughout
              the museum tour.
            </p>
          </Grid>
          <Grid item xs={6} md={6}>
            <Image src={POINTAR.PARTICLE_UI} alt="tour" className="w-full" />
          </Grid>
        </Grid>
      </div>
      <div className="px-10">
        <div className="h-[0.25px] bg-pink" />
      </div>
      <Section>
        <div className="text-center mt-5 px-10">
          <h1 className="mb-3">NEXT STEPS</h1>
          <div className="w-full flex justify-center">
            <ul className="w-full md:w-2/3 lg:w-3/5 text-left list-disc">
              {bullets?.map((bullet, idx) => (
                <li className="mb-2 leading-8 text-base">{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default PointAR;

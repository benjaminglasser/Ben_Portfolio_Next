"use client";
import React from "react";
import DetailSection from "../components/detailSection";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import VideoPlayer from "@/app/common/VerticalVideoPlayer";
import Section from "@/app/common/Section";

const plantasia = () => {
  return (
    <div className="w-full text-white">
      <div className="flex justify-center items-center mt-8 px-10">
        {/* <ReactPlayer
          url="https://youtu.be/QPqFVQ77BWg"
          width="60%"
          height="80%"
          controls
          fallback={<Loader />}
        /> */}
        <VideoPlayer
          className="w-full md:w-3/5 h-full md:h-[36rem]"
          widthFull
          src="https://www.youtube.com/embed/QPqFVQ77BWg"
        />
      </div>
      <DetailSection
        className="px-5 md:px-10 "
        title="BRIEF"
        description={`Create a system that allows you to play music (and possibly video) from your computer using a physical custom interface of your own design and creation. Will you make it for your own personal use or more general, usable by a larger group of people? Is it mean for solo preformance or multiple people? Will it be specific to a genre of music? How do you select the parameters that you can manipulate.`}
        widthFull
        left
      />
      <DetailSection
        className="px-5 md:px-10 "
        title="VERSION 1"
        widthFull
        left
      />
      <Grid container className="w-full px-5 md:px-10">
        <Grid xs={12} md={7} className="mt-14">
          <p>
            My initial idea was to use piezo touch sensors as a way to drive the
            sound. My first test was to simply get the piezo working and hooked
            up to my plant to see how the interaction felt
          </p>
        </Grid>
        <Grid xs={12} md={5} className="flex justify-center w-full mt-14">
          <VideoPlayer src="https://www.youtube.com/embed/Hc8VXcVx78s" />
        </Grid>
        <Grid xs={12} md={5} className="flex justify-center w-full mt-14">
          <VideoPlayer src="https://www.youtube.com/embed/XA7ckpYhOTw" />
        </Grid>
        <Grid xs={12} md={7} className="mt-14">
          <p>
            Before connecting it to processing, I hooked up a simple piezo
            speaker to test out the system. I started to become hesitant about
            using piezo touch sensors for this instrument as they wouldn't
            trigger the note reliably which is an important aspect of music
            creation
          </p>
        </Grid>
        <Grid xs={12} md={7} className="mt-14">
          <p>Nonetheless, I finished the build to give it a solid chance</p>
        </Grid>
        <Grid xs={12} md={5} className="flex justify-center w-full mt-14">
          <VideoPlayer src="https://www.youtube.com/embed/afN5NSKE45s" />
        </Grid>
      </Grid>
      <p className="w-full px-5 md:px-10 mt-5">
        Some initial musical tests with the piezo setup:
      </p>
      <Grid container className="w-full px-5 md:px-10">
        <Grid xs={12} md={6} className="px-0 mt-5 md:px-8">
          <VideoPlayer
            widthFull
            src="https://www.youtube.com/embed/k9XjZfkSzuw"
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full mt-5 px-0 md:px-8"
        >
          <VideoPlayer
            widthFull
            src="https://www.youtube.com/embed/nJkmiRYUuxQ"
          />
        </Grid>
      </Grid>

      <DetailSection
        className="px-5 md:px-10 "
        title="VERSION 2"
        description={`While researching this project, I stumbled across a capacitive touch breakout board built for arduino that seemed like it may be a more reliable alternative and, if it worked correctly, would include the plant into the system more directly rather than being more of an illusion gimmick.
            `}
        widthFull
        left
      />
      <p className="px-5 mt-5 md:px-10 ">
        First, I needed to test if my plant would function well as a capacitive
        sensor:
      </p>
      <div className="flex justify-center items-center mt-10">
        <VideoPlayer
          widthFull
          className="h-full md:h-[28rem] px-5 md:px-10 w-full"
          src="https://www.youtube.com/embed/8qa0jOqhEsE"
        />
      </div>
      <p className="px-5 mt-5 md:px-10 ">
        With the succesful first test, I decided to move forward with this
        build. Due to the fact that the breakout board allowed for multiple
        connections via one data stream, It was relatively straightforward to
        connect more inputs to communicate with processing. I built out a basic
        synth in processing that would randomly cycle through various octaves
        per note trigger to create an ambient but musical interaction
      </p>
      <Grid container className="w-full px-5 md:px-10">
        <Grid xs={12} md={6} className="flex justify-center w-full mt-14">
          <VideoPlayer src="https://www.youtube.com/embed/CAaADyYSqOs" />
        </Grid>
        <Grid xs={12} md={6} className="flex justify-center w-full mt-14">
          <VideoPlayer src="https://www.youtube.com/embed/8qa0jOqhEsE" />
        </Grid>
      </Grid>
      <p className="px-5 mt-5 md:px-10 ">
        Instead of having the octaves jump around randomly, I felt it would be
        more playable to put the octave control onto a slider as well as give
        the user attack and release controls on a knob. Enter the multiple
        serial communication basics!
      </p>
      <Grid container className="w-full px-5 md:px-10">
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full px-0 md:px-10 mt-10"
        >
          <VideoPlayer
            widthFull
            src="https://www.youtube.com/embed/CAaADyYSqOs"
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full px-0 md:px-10 mt-10"
        >
          <VideoPlayer
            widthFull
            src="https://www.youtube.com/embed/8qa0jOqhEsE"
          />
        </Grid>
      </Grid>
      <p className="px-5 mt-5 md:px-10 ">Control surface + prototype casing:</p>
      <Grid container className="w-full px-5 md:px-10">
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full px-0 md:px-10 mt-10"
        >
          <VideoPlayer
            widthFull
            src="https://www.youtube.com/embed/CAaADyYSqOs"
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full px-0 md:px-10 mt-10"
        >
          <VideoPlayer
            widthFull
            src="https://www.youtube.com/embed/8qa0jOqhEsE"
          />
        </Grid>
      </Grid>

      <p className="px-5 mt-5 md:px-10 ">
        Lastly, I created a visual component to supplement the note choices that
        the user would input
      </p>
      <Grid container className="w-full px-5 md:px-10">
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full px-0 md:px-10 mt-10"
        >
          <VideoPlayer
            widthFull
            className="h-full md:h-[28rem] w-full"
            src="https://www.youtube.com/embed/CAaADyYSqOs"
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          className="flex justify-center w-full px-0 md:px-10 mt-10"
        >
          <VideoPlayer
            widthFull
            className="h-full md:h-[28rem] w-full"
            src="https://www.youtube.com/embed/8qa0jOqhEsE"
          />
        </Grid>
      </Grid>
      <DetailSection
        className="px-5 md:px-10 mt-5"
        title="FINAL PERFORMANCE"
        widthFull
        left
      />

      <div className="w-full flex justify-center items-center mt-10 px-10">
        <VideoPlayer
          widthFull
          className="h-full md:h-[28rem] w-full"
          src="https://www.youtube.com/embed/QPqFVQ77BWg"
        />
      </div>
      <DetailSection
        className="px-5 md:px-10 "
        title="REFLECTIONS"
        description="This was a very exciting and useful project for myself. Getting to bring my background in music into this instrument was a very fun and rewarding way to apply some basic yet important hardware principles all together in one unified project. I would like to expand on the idea by adding more notes to make up a full 12 note scale, restricting to specific keys, and synthesizing a more unique sound rather than a simple sine wave (Which I will admit does work well with the plant theme as is). I look forward to utilizing these tools in future projects!."
        widthFull
        left
      />
      <Section>
        <p className="px-5 md:px-10 ">Instructor: Maxim Safioulline</p>
      </Section>
    </div>
  );
};

export default plantasia;

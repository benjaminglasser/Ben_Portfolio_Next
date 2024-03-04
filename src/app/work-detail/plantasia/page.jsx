"use client";
import React, { Suspense } from "react";
import DetailSection from "../../common/detailSection";
import Context from "../../common/context";
import { Grid } from "@mui/material";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";
import Section from "@/app/common/Section";
import { PLANTASIA } from "@/app/assets/images/plantasia";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";

const plantasia = () => {
  return (
    <div className="w-full text-white">
      <VideoPlayerInternal
        className="md:h-[600px]"
        video="/Media/Plantasia/plantasiaHero.mp4"
      />

      <ZigzagHeader
        title="Plantasia"
        description="Custom Plant Based Musical Instrument"
        extendedDescription="A capacitive touch based instrument that can connect to any water/metal based items to control a C major scale and animation via serial communication on a computer"
        time="FALL 2021 // Personal Project"
        role="Engineer, Creative Coder"
        tools={[
          "Arduino",
          "Capacitive Touch MPR121",
          "Processing",
          "Succulent",
          "Banana",
          "Lemon",
          "Rosarita Vegetarian",
          "Refried Beans",
        ]}
      />

      {/* <div className="flex justify-center items-center mt-8 px-10"> */}
      <Suspense fallback={<p className="text-white">Loading video...</p>}>
        <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/QPqFVQ77BWg"
        />
      </Suspense>

      {/* </div> */}
      {/* <DetailSection
        className="px-5 md:px-10 "
        title="BRIEF"
        description={`Create a system that allows you to play music (and possibly video) from your computer using a physical custom interface of your own design and creation. Will you make it for your own personal use or more general, usable by a larger group of people? Is it mean for solo preformance or multiple people? Will it be specific to a genre of music? How do you select the parameters that you can manipulate.`}
        widthFull
        left
      /> */}

      <Context
        className="mt-10"
        title="CONTEXT"
        context="Create a system that allows you to play music (and possibly video) from your computer using a physical custom interface of your own design and creation. Will you make it for your own personal use or more general, usable by a larger group of people? Is it mean for solo preformance or multiple people? Will it be specific to a genre of music? How do you select the parameters that you can manipulate."
      />

      <DetailSection
        className="px-5 md:px-10 "
        title="VERSION 1"
        description="My initial idea was to use piezo touch sensors as a way to drive the
            sound. My first test was to simply get the piezo working and hooked
            up to my plant to see how the interaction felt"
        left={false}
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/Hc8VXcVx78s"
        caption="My initial idea was to use piezo touch sensors as a way to drive the
          sound. My first test was to simply get the piezo working and hooked
          up to my plant to see how the interaction felt."
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/XA7ckpYhOTw"
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/afN5NSKE45s"
        caption="Nonetheless, I finished the build to give it a solid chance"
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/nJkmiRYUuxQ"
        caption="Initial musical tests with the piezo setup:"
      />

      <DetailSection
        className="px-5 md:px-10 "
        title="VERSION 2"
        description="While researching this project, I stumbled across a capacitive touch breakout board built for arduino that seemed like it may be a more reliable alternative and, if it worked correctly, would include the plant into the system more directly rather than being more of an illusion gimmick."
        left
      />

      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/65gG3CXnHwYs"
        caption="First, I needed to test if my plant would function well as a capacitive
        sensor:"
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/CAaADyYSqOs"
        caption="With the succesful first test, I decided to move forward with this
        build. Due to the fact that the breakout board allowed for multiple
        connections via one data stream, It was relatively straightforward to
        connect more inputs to communicate with processing. I built out a basic
        synth in processing that would randomly cycle through various octaves
        per note trigger to create an ambient but musical interaction"
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/8qa0jOqhEsE"
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/K3gu2yQ1a1o"
        caption="Instead of having the octaves jump around randomly, I felt it would be
        more playable to put the octave control onto a slider as well as give
        the user attack and release controls on a knob. Enter the multiple
        serial communication basics!"
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/sMfN2c0luGI"
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/51GiHw1cHqg"
        caption="Control surface + prototype casing:"
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/kdhnHj_8S-g"
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/Cen5mqOoNO0"
        caption="Lastly, I created a visual component to supplement the note choices that the user would input"
      />
      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9"
        src="https://www.youtube.com/embed/l0bzxHGF-24"
      />

      <DetailSection
        className="px-5 md:px-10 mt-5"
        title="FINAL PERFORMANCE"
        widthFull
        left
      />

      <VideoPlayerExternal
        widthFull
        className="aspect-w-16 aspect-h-9 mb-40"
        src="https://www.youtube.com/embed/QPqFVQ77BWg"
      />

      {/* <DetailSection
        className="px-5 md:px-10 "
        title="REFLECTIONS"
        description="This was a very exciting and useful project for myself. Getting to bring my background in music into this instrument was a very fun and rewarding way to apply some basic yet important hardware principles all together in one unified project. I would like to expand on the idea by adding more notes to make up a full 12 note scale, restricting to specific keys, and synthesizing a more unique sound rather than a simple sine wave (Which I will admit does work well with the plant theme as is). I look forward to utilizing these tools in future projects!."
        widthFull
        left
      /> */}
    </div>
  );
};

export default plantasia;

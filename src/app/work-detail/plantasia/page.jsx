"use client";
import React from 'react'
import ReactPlayer from "react-player";
import Context from "../components/context";
import DetailSection from "../components/detailSection";
import { Grid } from "@mui/material";

const plantasia = () => {
  return (

    <div className="w-full text-white">
        <div className="flex justify-center items-center h-screen">
        <ReactPlayer
            url="https://youtu.be/QPqFVQ77BWg"
            width="60%" 
            height="80%"
            controls
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
        <div className="flex items-start justify-center">
            <Grid container className="w-4/5">
            <Grid item xs={6}>
                <Grid className="mt-2">
                    <Grid item xs={6}> 
                        <p>My initial idea was to use piezo touch sensors as a way to drive the sound. My first test was to simply get the piezo working and hooked up to my plant to see how the interaction felt</p>
                    </Grid>
                    <Grid item xs={6}> 
                        <p>My initial idea was to use piezo touch sensors as a way to drive the sound. My first test was to simply get the piezo working and hooked up to my plant to see how the interaction felt</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid className="mt-2">
                    <Grid item xs={6}> 
                        <p>piezo touch sensors as a way to drive the sound. My first test was to simply get the piezo working and hooked up to my plant to see how the interaction felt</p>
                    </Grid>
                    <Grid item xs={6}> 
                        <p> to drive the sound. My first test was to simply get the piezo working and hooked up to my plant to see how the interaction felt</p>
                    </Grid>
                </Grid>
            </Grid>
            </Grid>
        </div>

        <DetailSection
            className="px-5 md:px-10 "
            title="VERSION 2"
            description={`While researching this project, I stumbled across a capacitive touch breakout board built for arduino that seemed like it may be a more reliable alternative and, if it worked correctly, would include the plant into the system more directly rather than being more of an illusion gimmick.
            `}
            widthFull
            left
        />
        <p className="px-5 mt-5 md:px-10 " >
            First, I needed to test if my plant would function well as a capacitive sensor:
        </p>
        <div className="flex justify-center items-center h-screen">
            <ReactPlayer
                url="https://youtu.be/65gG3CXnHwY"
                width="60%" 
                height="80%"
                controls
            />
        </div>
        <p className="px-5 mt-5 md:px-10 " >
            With the succesful first test, I decided to move forward with this build. Due to the fact that the breakout board allowed for multiple connections via one data stream, It was relatively straightforward to connect more inputs to communicate with processing. I built out a basic synth in processing that would randomly cycle through various octaves per note trigger to create an ambient but musical interaction
        </p>
        <Grid container className="w-full flex justify-center items-center h-screen" >
            <Grid item xs={12} md={6}>
            <div className="w-full flex justify-center items-center">
                <ReactPlayer
                        url="https://youtu.be/Cen5mqOoNO0"
                    />
            </div>
            </Grid>
            <Grid item xs={12} md={6}>
            <div className="w-full flex justify-center items-center">
                <ReactPlayer
                    url="https://youtu.be/l0bzxHGF-24"
                />
                </div>
            </Grid>
        </Grid>
        <p className="px-5 mt-5 md:px-10 " >
            Instead of having the octaves jump around randomly, I felt it would be more playable to put the octave control onto a slider as well as give the user attack and release controls on a knob. Enter the multiple serial communication basics!
        </p>

        <p className="px-5 mt-5 md:px-10 " >
        Control surface + prototype casing:
        </p>
        <Grid container className="w-full flex justify-center items-center h-screen" >
            <Grid item xs={12} md={6}>
                <ReactPlayer
                        url="https://youtu.be/Cen5mqOoNO0"
                        width="90%" 
                        height="20%"
                        controls
                    />
            </Grid>
            <Grid item xs={12} md={6}>
                <ReactPlayer
                    url="https://youtu.be/l0bzxHGF-24"
                    width="90%" 
                    height="20%"
                    controls
                />
            </Grid>
        </Grid>

        
        <p className="px-5 mt-5 md:px-10 " >
        Lastly, I created a visual component to supplement the note choices that the user would input
        </p>
        <Grid container className="w-full flex justify-center items-center h-screen" >
            <Grid item xs={12} md={6}>
            <div className="w-full flex justify-center items-center">
                <ReactPlayer
                        url="https://youtu.be/Cen5mqOoNO0"
                    />
            </div>
            </Grid>
            <Grid item xs={12} md={6}>
            <div className="w-full flex justify-center items-center">
                <ReactPlayer
                    url="https://youtu.be/l0bzxHGF-24"
                />
                </div>
            </Grid>
        </Grid>
        <DetailSection
            className="px-5 md:px-10 "
            title="PERFORMANCE"
            widthFull
            left
        />
        
        <div className="w-full flex justify-center items-center h-screen">
        <ReactPlayer
            url="https://youtu.be/MfHfZkrkM6s"
            width="90%" 
            height="100%"
            controls
        />
        </div>
        <DetailSection
            className="px-5 md:px-10 "
            title="REFLECTIONS"
            description={`This was a very exciting and useful project for myself. Getting to bring my background in music into this instrument was a very fun and rewarding way to apply some basic yet important hardware principles all together in one unified project. I would like to expand on the idea by adding more notes to make up a full 12 note scale, restricting to specific keys, and synthesizing a more unique sound rather than a simple sine wave (Which I will admit does work well with the plant theme as is). I look forward to utilizing these tools in future projects!.
            `}
            widthFull
            left
        />
        <p className="px-5 md:px-10 ">Instructor: Maxim Safioulline</p>
    </div>
       
  ) 
}

export default plantasia
"use client";
import React from "react";
import Context from "../../common/context";
import AIM from "../../common/aim";
import DetailSection from "../../common/detailSection";
import { IMAGES } from "@/app/assets/images";
import Section from "@/app/common/Section";
import Image from "next/image";
import { FancyButton } from "@/app/common/FancyButton";
import VideoPlayerInternal from '@/app/common/VideoPlayerInternal.jsx'
import ZigzagHeader from "../../common/zigzagHeader";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";


const Canary = () => {
  
  return (
    <div className="w-full text-white">
      

      <VideoPlayerInternal 
        className="md:h-[550px] md:mt-0"
        video="/Media/Odyssey/odysseyHero.mp4"
      />
      

      {/* <ZigzagHeader
        title="Beyond The Infinite"
        description="A Virtual Production Odyssey"
        extendedDescription="For the 2023 Cinegear Expo in Los Angeles, our team embarked on an ambitious project to showcase potential use cases for an in house soundstage while simultaneously celebrating the rich history of cinema through an interactive virtual production experience. To do this, we seamlessly blended the physical with the digital to recreate the iconic opening sequence of &quot;2001: A Space Odyssey.&quot; By utilizing Unreal Engine, I meticulously crafted a realistic desert scene that integrated effortlessly with practical physical props. This immersive experience not only paid homage to a cinematic masterpiece but also demonstrated the boundless possibilities of combining traditional and cutting-edge filmmaking methods, offering attendees a glimpse into the future of storytelling."
        time="2023 // Standard Vision"
        role="Virtual Production, In Camera VFX"
        tools={[
          "Unreal Engine"
        ]}
      />       */}
      <ZigzagHeader
        title="Beyond The Infinite"
        description="A Virtual Production Odyssey"
        extendedDescription="For the 2023 Cinegear Expo in Los Angeles, our team showcased our in-house soundstage's capabilities by blending physical and digital elements to recreate &quot;2001: A Space Odyssey's&quot; opening sequence. Using Unreal Engine, I crafted a realistic desert scene that integrated with physical props, demonstrating the fusion of traditional and innovative filmmaking techniques. This immersive experience paid homage to cinema's history while previewing the future of storytelling."
        time="2023 // Standard Vision"
        role="Virtual Production, In Camera VFX"
        tools={[
          "Unreal Engine"
        ]}
      />      

        <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/ssOC4cfJClI?si=fRwBrms03D-CBvkd"
        />



       <Context
        title="CONTEXT"
        className="mt-24"
        context="This project, premiered at the Cinegear Expo, highlighted the evolution of filmmaking through the integration of traditional methods and emerging virtual production technologies. It featured the innovative use of the companies LED screens that could be used for shooting in-camera VFX and leveraged Unreal Engine for building virtual sets with high-fidelity world creation assets, showcasing the company's commitment to pioneering cutting-edge storytelling techniques in their in-house virtual production space."
      />
      <AIM
        className="mt-16"
        aim="Our goal was to spotlight the virtual production space's potential, attracting new business and networking opportunities at the expo."
      />

      <DetailSection
        className="px-10 "
        title="Background"
        description="The project leveraged the cutting-edge technology soundstages equipped with large-scale LED screens, to create immersive virtual backgrounds using game engines like Unreal Engine. This innovative approach, popularized by its use in the TV series &quot;The Mandalorian,&quot; offers numerous advantages for film production."
        center
        widthFull
      />

        <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/bErPsq5kPzE?si=3lF1h4aCi103ZZG0"
        />

      <h4 className="px-10 mt-16 md:font-thin">It enables realistic bounce lighting, parallax effects through the synchronization of virtual and physical cameras, and interactivity, allowing for real-time changes in background scenery. This technology not only enhances the visual storytelling but also creates a more engaging environment for actors, facilitating a more authentic performance. The use of ICVFX represents a significant shift in filmmaking, merging the physical and digital worlds to achieve unprecedented levels of realism and flexibility on set.</h4>
      
      <DetailSection
        className="px-10 "
        title="Process"
        description="For this project, the challenge was to compose a desert scene reminiscent of the iconic intro scene from &quot;2001: A Space Odyssey.&quot;"
        widthFull
        left
      />

        <VideoPlayerInternal 
            className="mt-10 w-full px-10 md:w-3/5"
            video="/Media/Odyssey/Process.mp4"
            centered
        />

        <h4 className="px-10 mt-16 md:font-thin">This involved careful shot composition, including a detailed day/night sequence, to capture the essence of the original film while showcasing the capabilities of our virtual production space. The process required a robust pipeline for color correction, especially challenging given that the assets were delivered just a day before the event. </h4>

        <VideoPlayerInternal 
            video="/Media/Odyssey/Process_1.mp4"
            centered
        />

        <h4 className="px-10 mt-16 md:font-thin">This tight turnaround necessitated quick adaptation and precise calibration to ensure that the digital environment seamlessly matched the physical set pieces. The goal was to create an experience that was not only visually stunning but also faithful to the atmospheric and thematic elements of the source material, demonstrating the potential of virtual production technology to recreate and enhance classic cinematic moments.</h4> 

      <DetailSection
        className="px-10 mb-20"
        title="Project Outcomes"
        description="The project was a resounding success, achieving its aim of demonstrating the potential of in-house virtual production technologies and attracting interest from industry professionals.It highlighted the benefits of using LED volumes for enhanced realism and storytelling, sparking interest in the future of virtual production. The positive reception affirmed the industry's readiness for innovative filmmaking technologies."
        center
        widthFull

      />
   

    </div>
  );
};

export default Canary;

"use client";
import React from "react";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import { REAKT } from "../../../../public/images/reakt";
import { Grid } from "@mui/material";
import DetailSection from "../../common/detailSection";
import VideoPlayerExternal from "@/app/common/VideoPlayerExternal";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import FancyCarousel from "@/app/common/Carousel";

const reaktLights = () => {
  const source = [
    {
      url: "https://www.youtube.com/embed/7znbWZne4Nk",
    },
    {
      url: "https://www.youtube.com/embed/d45Ef3S-61w",
    },
    {
      url: "https://player.vimeo.com/video/589537817",
    },
  ];
  const source2 = [
    {
      url: "https://www.youtube.com/embed/HJ8bRSWIQpQ",
    },
    {
      url: "https://www.youtube.com/embed/ZXU8C1nDULM",
    },
  ];
  const source3 = [
    {
      url: "https://www.youtube.com/embed/pXBFflD6ALo",
    },
    {
      url: "https://www.youtube.com/embed/8Mm1Mv-THHY",
    },
  ];

  return (
    <div className="w-full text-white">
      <VideoPlayerInternal
        className="md:h-[600px] lg:h-[700px] xl:h-auto"
        video="/Media/Reakt/reaktHero.mp4"
        scaleOnLargeScreens={true}
      />

      <ZigzagHeader
        title="REAKT LIGHTS"
        description="Customizable audio reactive lighting system"
        extendedDescription="Reakt Lights is an audio-reactive lighting system originally commissioned for The Canary Test gallery in Los Angeles, CA, along with an easy-to-use interface for the gallery to program future sound pieces. It has since grown into a broader effort: building an affordable, plug-and-play lighting system for venues that want responsive, professional-feeling lighting without the cost of professional gear."
        time="2021 // Canary Gallery"
        role="Designer / Engineer"
        tools={[
          "TouchDesigner",
          "Chauvet DMX Dimmer/Switch Pack",
          "DMXKing eDMX1 PRO Ethernet DMX Controller",
        ]}
      />

      <div className="mt-20">
        <FancyCarousel SOURCE={source} />
      </div>

      <DetailSection
        className="px-5 md:px-10 "
        title="BACKEND + INTERFACE BUILD"
        description={`Input audio signals are fed to TouchDesigner where set frequencies can be isolated, normalized then convert DMX. The signal is then converted and fed into a Chauvet DMX Dimmer/Switch Pack that can break out up to 4 channels.`}
        widthFull
        left
      />
      <Image src={REAKT.system} alt="reakt" className="w-full h-full" />

      {/* <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/ZXU8C1nDULM"
        />
      <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/HJ8bRSWIQpQ"
        /> */}

      <div className="mt-20">
        <FancyCarousel SOURCE={source2} />
      </div>

      <DetailSection
        className="px-5 md:px-10 "
        title="EARLY TESTS"
        widthFull
        left
      />

      {/* <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9"
          src="https://www.youtube.com/embed/pXBFflD6ALo"
        />
        <VideoPlayerExternal
          widthFull
          className="aspect-w-16 aspect-h-9 mb-24"
          src="https://www.youtube.com/embed/8Mm1Mv-THHY"
        /> */}

      <div className="my-20">
        <FancyCarousel SOURCE={source3} />
      </div>

      <DetailSection
        className="px-5 md:px-10 "
        title="VERSION 2"
        description={`Next up was to get rid of the computer and put the code onto a raspberry pi. Then wire it up to a basic prototype for controls. "Make it exist first, then make it pretty"`}
        widthFull
        left
      />

      <div className="px-5 md:px-10 mt-8 mb-24">
        <div className="grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 aspect-[1/2] md:aspect-[2/1] gap-3 max-w-[1400px] mx-auto">
          <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v2_1.jpg"
              alt="Raspberry Pi HAT wired to potentiometers"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="col-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v2_2.jpg"
              alt="Prototype control layout with labeled knobs"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v2_3.jpg"
              alt="Cardboard prototype enclosure, front"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v2_4.jpg"
              alt="Cardboard prototype enclosure, inside"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto mt-3">
          <video
            className="w-full rounded-lg bg-black"
            controls
            playsInline
            preload="metadata"
            poster="/Media/Reakt/reaktV2_1_poster.jpg"
          >
            <source src="/Media/Reakt/reaktV2_1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <DetailSection
        className="px-5 md:px-10 "
        title="VERSION 3"
        description={`Now to make it pretty. To reduce cost and make it manufacturable and reproducible, I printed my own custom PCB, removed expensive interfaces and 3D printed a case to house everything.`}
        widthFull
        left
      />

      <div className="px-5 md:px-10 mt-8 mb-24">
        <div className="max-w-[1400px] mx-auto">
          <video
            className="w-full rounded-lg bg-black"
            controls
            playsInline
            preload="metadata"
            poster="/Media/Reakt/reaktV3_1_poster.jpg"
          >
            <source src="/Media/Reakt/reaktV3_1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-6 md:grid-rows-2 aspect-[2/3] md:aspect-[3/1] gap-3 max-w-[1400px] mx-auto mt-3">
          <div className="col-span-2 md:row-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v3_2.jpg"
              alt="Custom printed PCB"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v3_1.jpg"
              alt="3D printed enclosure parts"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v3_3.jpg"
              alt="PCB installed in the 3D printed case"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v3_4.jpg"
              alt="Finished controller"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v3_5.jpg"
              alt="Finished controller with tools"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <DetailSection
        className="px-5 md:px-10 "
        title="VERSION 4"
        description={`We wanted to increase screen size, update the UI, implement a higher quality audio interface, panel mount the components on an updated pcb, print a new case with the controls at an angle for ease of use and create better cable management which got us to our current design.`}
        widthFull
        left
      />

      <div className="px-5 md:px-10 mt-8 mb-24">
        <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 aspect-[1/1] md:aspect-[2/1] gap-3 max-w-[1400px] mx-auto">
          <div className="col-span-2 md:row-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v4_1.jpg"
              alt="Current design enclosure"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v4_2.jpg"
              alt="Internal wiring and cable management"
              fill
              sizes="(max-width: 768px) 50vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-2 relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v4_3.jpg"
              alt="Updated control panel PCB"
              fill
              sizes="(max-width: 768px) 50vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto mt-3">
          <video
            className="w-full rounded-lg bg-black"
            controls
            playsInline
            preload="metadata"
            poster="/Media/Reakt/reaktV4_1_poster.jpg"
          >
            <source src="/Media/Reakt/reaktV4_1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <figure className="max-w-[1400px] mx-auto mt-3">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/images/reakt/v4_4.jpg"
              alt="Cardboard prototype next to the finished design"
              fill
              sizes="(max-width: 768px) 100vw, 1400px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-center text-subheading">
            we&apos;ve come so far :&apos;)
          </figcaption>
        </figure>
      </div>

      <DetailSection
        className="px-5 md:px-10 "
        title="PRODUCT INSTALLED"
        widthFull
        left
      />

      <div className="px-5 md:px-10 mt-8">
        <div className="max-w-[1400px] mx-auto">
          <video
            className="w-full rounded-lg bg-black"
            controls
            playsInline
            preload="metadata"
            poster="/Media/Reakt/reaktInstalled_poster.jpg"
          >
            <source src="/Media/Reakt/reaktInstalled.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <DetailSection
        className="px-5 md:px-10"
        title="NEXT STEPS"
        widthFull
        left
      />

      <div className="px-5 md:px-10 mt-2 mb-24">
        <ul className="list-disc pl-5 space-y-3 text-subheading max-w-[1400px]">
          <li>
            Continue minimizing component cost by integrating a full all-in-one PCB with an onboard CPU and audio interface to get off the Raspberry Pi completely.
          </li>
          <li>
            Partner with manufacturers to produce components at scale so the product can be distributed to other DIY venues that want to install their own audio-reactive lighting systems at a fraction of the cost.
          </li>
          <li>
            Continue to refine the product to balance quality and cost.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default reaktLights;

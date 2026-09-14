"use client";
import React from "react";
import Image from "next/image";
import ZigzagHeader from "../../common/zigzagHeader";
import { REAKT } from "../../../../public/images/reakt";
import DetailSection from "../../common/detailSection";
import VideoPlayerInternal from "@/app/common/VideoPlayerInternal.jsx";
import VideoPlayerClickable from "@/app/common/VideoPlayerClickable";

const reaktLights = () => {
  const tile = "relative overflow-hidden bg-gray-800";

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
        <VideoPlayerInternal video="/Media/Reakt/reaktHero.mp4" />
      </div>

      {/* Masthead */}
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

      <Media className="mt-16 md:mt-24">
        <VideoPlayerClickable src="/Media/Reakt/reaktDemo1.mp4" />
      </Media>

      <DetailSection
        spanClass="md:col-span-8"
        title="Backend + Interface Build"
        description="Input audio signals are fed to TouchDesigner where set frequencies can be isolated, normalized then convert DMX. The signal is then converted and fed into a Chauvet DMX Dimmer/Switch Pack that can break out up to 4 channels."
      >
        <div className="mt-8">
          <Image src={REAKT.system} alt="Reakt system diagram" className="w-full h-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-16 md:mt-24">
          <VideoPlayerClickable src="/Media/Reakt/reaktTest1.mp4" />
          <VideoPlayerClickable src="/Media/Reakt/reaktTest2.mp4" />
        </div>
      </DetailSection>

      <DetailSection spanClass="md:col-span-8" title="Early Tests">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          <VideoPlayerClickable src="/Media/Reakt/reaktEarly1.mp4" />
          <VideoPlayerClickable src="/Media/Reakt/reaktEarly2.mp4" />
        </div>
      </DetailSection>

      <DetailSection
        spanClass="md:col-span-8"
        title="Version 2"
        description={`Next up was to get rid of the computer and put the code onto a raspberry pi. Then wire it up to a basic prototype for controls. "Make it exist first, then make it pretty."`}
      >
        <div className="grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 aspect-[1/2] md:aspect-[2/1] gap-3 mt-8">
          <div className={`col-span-2 row-span-2 ${tile}`}>
            <Image src="/images/reakt/v2_1.jpg" alt="Raspberry Pi HAT wired to potentiometers" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className={`col-span-2 ${tile}`}>
            <Image src="/images/reakt/v2_2.jpg" alt="Prototype control layout with labeled knobs" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className={tile}>
            <Image src="/images/reakt/v2_3.jpg" alt="Cardboard prototype enclosure, front" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
          </div>
          <div className={tile}>
            <Image src="/images/reakt/v2_4.jpg" alt="Cardboard prototype enclosure, inside" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
          </div>
        </div>
        <VideoPlayerClickable className="mt-3" src="/Media/Reakt/reaktV2_1.mp4" poster="/Media/Reakt/reaktV2_1_poster.jpg" />
      </DetailSection>

      <DetailSection
        spanClass="md:col-span-8"
        title="Version 3"
        description="Now to make it pretty. To reduce cost and make it manufacturable and reproducible, I printed my own custom PCB, removed expensive interfaces and 3D printed a case to house everything."
      >
        <div className="mt-8">
          <VideoPlayerClickable src="/Media/Reakt/reaktV3_1.mp4" poster="/Media/Reakt/reaktV3_1_poster.jpg" />
        </div>
        <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-6 md:grid-rows-2 aspect-[2/3] md:aspect-[3/1] gap-3 mt-3">
          <div className={`col-span-2 md:row-span-2 ${tile}`}>
            <Image src="/images/reakt/v3_2.jpg" alt="Custom printed PCB" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </div>
          <div className={`md:col-span-2 ${tile}`}>
            <Image src="/images/reakt/v3_1.jpg" alt="3D printed enclosure parts" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
          </div>
          <div className={`md:col-span-2 ${tile}`}>
            <Image src="/images/reakt/v3_3.jpg" alt="PCB installed in the 3D printed case" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
          </div>
          <div className={`md:col-span-2 ${tile}`}>
            <Image src="/images/reakt/v3_4.jpg" alt="Finished controller" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
          </div>
          <div className={`md:col-span-2 ${tile}`}>
            <Image src="/images/reakt/v3_5.jpg" alt="Finished controller with tools" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
          </div>
        </div>
      </DetailSection>

      <DetailSection
        spanClass="md:col-span-8"
        title="Version 4"
        description="We wanted to increase screen size, update the UI, implement a higher quality audio interface, panel mount the components on an updated pcb, print a new case with the controls at an angle for ease of use and create better cable management which got us to our current design."
      >
        <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 aspect-[1/1] md:aspect-[2/1] gap-3 mt-8">
          <div className={`col-span-2 md:row-span-2 ${tile}`}>
            <Image src="/images/reakt/v4_1.jpg" alt="Current design enclosure" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className={`md:col-span-2 ${tile}`}>
            <Image src="/images/reakt/v4_2.jpg" alt="Internal wiring and cable management" fill sizes="(max-width: 768px) 50vw, 50vw" className="object-cover" />
          </div>
          <div className={`md:col-span-2 ${tile}`}>
            <Image src="/images/reakt/v4_3.jpg" alt="Updated control panel PCB" fill sizes="(max-width: 768px) 50vw, 50vw" className="object-cover" />
          </div>
        </div>
        <VideoPlayerClickable className="mt-3" src="/Media/Reakt/reaktV4_1.mp4" poster="/Media/Reakt/reaktV4_1_poster.jpg" />
        <figure className="mt-3">
          <div className={`w-full aspect-[4/3] ${tile}`}>
            <Image src="/images/reakt/v4_4.jpg" alt="Cardboard prototype next to the finished design" fill sizes="(max-width: 768px) 100vw, 1400px" className="object-cover" />
          </div>
          <figcaption className="mt-3 subtext desc-mono text-mute">
            we&apos;ve come so far :&apos;)
          </figcaption>
        </figure>
      </DetailSection>

      <DetailSection spanClass="md:col-span-8" title="Product Installed">
        <div className="mt-8">
          <VideoPlayerClickable src="/Media/Reakt/reaktInstalled.mp4" poster="/Media/Reakt/reaktInstalled_poster.jpg" />
        </div>
      </DetailSection>

      <DetailSection spanClass="md:col-span-8" title="Next Steps">
        <ul className="list-disc pl-5 space-y-2 subtext desc-mono max-w-3xl mt-4">
          <li>
            Continue minimizing component cost by integrating a full all-in-one
            PCB with an onboard CPU and audio interface to get off the Raspberry
            Pi completely.
          </li>
          <li>
            Partner with manufacturers to produce components at scale so the
            product can be distributed to other DIY venues that want to install
            their own audio-reactive lighting systems at a fraction of the cost.
          </li>
          <li>Continue to refine the product to balance quality and cost.</li>
        </ul>
      </DetailSection>

      <div className="h-16 md:h-24" />
    </div>
  );
};

export default reaktLights;

"use client";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { IMAGES } from "@/app/assets/images";

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="reveal-in">
      <span
        style={{
          transform: isInView ? "none" : "translateY(50px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </span>
    </section>
  );
}

const WorkCard = () => {
  return (
    <Section>
      <div className="hover:border-b cursor-pointer pb-1">
        <Image src={IMAGES.STEMPORT} alt="stemport gif" className="thumbnail" />
        <div className="flex justify-between font-light text-xs border-b-mute border-b py-2">
          <div>Role: UX/UI Designer</div>
          <div>Time: Spring 2023</div>
        </div>
        <h1 className="text-3xl font-sprat py-2">The Spatial Age</h1>
        <h2 className="font-sprat text-lg pb-1">
          How spatialization is redefining our reality, memory, and experience
        </h2>
        <p className="text-xs text-mute">
          Tool: Unity, Blender, Unreal Engine, Instant-ngp
        </p>
      </div>
    </Section>
  );
};

export default WorkCard;

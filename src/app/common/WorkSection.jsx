"use client";

// import Grid from "@mui/system/Unstable_Grid/Grid";
import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import WorkCard from "./WorkCard";
import { useDesignVersion } from "./design/DesignVersion";
import DotDigits from "./design/DotDigits";

// Fixed "03 / 11" readout showing which project is in view (version C).
const ProjectCounter = ({ gridRef, total }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll("[data-card-index]"));
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.dataset.cardIndex);
          if (e.isIntersecting) visible.set(idx, e.intersectionRatio);
          else visible.delete(idx);
        });
        setCurrent(visible.size ? Math.min(...visible.keys()) + 1 : 0);
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [gridRef]);

  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div
      className="project-counter hidden md:flex"
      style={{ opacity: current ? 1 : 0 }}
      aria-hidden="true"
    >
      <span>Project</span>
      <DotDigits value={`${pad(current || 1)}/${pad(total)}`} pitch={2.4} />
    </div>
  );
};

const WorkSection = ({ preloadThumbnails = false }) => {
  const { level } = useDesignVersion();
  const gridRef = useRef(null);
  const WORK_CONTENT = [
    {
      id: 1,
      type: "motion",
      role: "3D Artist",
      time: "Fall 2025",
      title: "DTLA Marriott Artist Spotlight",
      description: "Public art animation on large scale display in Downtown LA",
      thumbnail: "/images/dtlaMarriott/MarriotThumb.gif",
      path: "work-detail/dtlaMarriott",
      tools: ["Blender"],
    },
    {
      id: 4,
      type: "motion",
      role: "3D Graphic Design",
      time: "Fall 2023",
      title: "Clear Canvas",
      description:
        "Reimagining Retail: Elegantly showcasing the affordances of a novel form of digital signage",
      thumbnail: "/Media/NRF/Clear_Canvas_Thumb.gif",
      path: "work-detail/nrf",
      tools: ["Blender"],
    },
    {
      id: 3,
      type: "physical",
      role: "Designer / Engineer",
      time: "2020 - 2026",
      title: "Reakt Light",
      description: "Customizable audio reactive lighting system",
      thumbnail: "/images/reakt/reaktHero3.gif",
      path: "work-detail/reaktLights",
      tools: [
        "TouchDesigner",
        "Chauvet DMX Dimmer/Switch Pack",
        "DMXKing eDMX1 PRO Ethernet DMX Controller",
      ],
    },
    {
      id: 3.5,
      type: "spatial",
      role: "XR Interaction",
      time: "April 2022 - February 2023",
      title: "BMW",
      description: "Developing next-generation XR products and systems",
      extendedDescription:
        "Designed and implemented XR prototypes for the future interaction between human and vehicle as part of the BMW design and research team in Munich.",
      thumbnail: "/images/bmw/dancingCar.gif",
      path: "work-detail/bmw",
      tools: ["Unreal Engine", "Unity", "Blender", "Abode Suite", "Figma"],
      workDetail: {
        innerBox: true,
      },
    },
    // {
    //   id: 5,
    //   role: "Lead Product Designer",
    //   time: "2023 - 2024",
    //   title: "Easel AI",
    //   description:
    //     "Lead Product Designer at Easel. An AI-powered personal avatar app directly in iMessage",
    //   thumbnail: "/Media/Easel/EaselThumb2.gif",
    //   path: "work-detail/easel",
    //   tools: [
    //     "Figma",
    //     "Stable Diffusion XL",
    //     "After Effects",
    //     "Unreal Engine",
    //     "Premiere Pro",
    //     "Design Thinking",
    //     "User Studies",
    //   ],
    // },
    {
      id: 6,
      type: "motion",
      role: "3D Graphics and Simulation",
      time: "Fall 2023",
      title: "Circa DeepScreen",
      description:
        "Innovative DeepScreen Advertising Concept for Polestar on Downtown LA's Circa’s Curved Display",
      thumbnail: "/Media/DeepScreen/_WaterTest.gif",
      path: "work-detail/deepScreen",
      tools: ["Blender"],
    },
    {
      id: 7,
      type: "motion",
      role: "Virtual Production, In Camera VFX",
      time: "Spring 2023",
      title: "Beyond The Infinite",
      description: "A Virtual Production Odyssey",
      thumbnail: "/Media/Odyssey/odysseyThumb.gif",
      path: "work-detail/odyssey",
      tools: ["Unreal Engine"],
    },
    {
      id: 8,
      type: "spatial",
      role: "AR UX / UI Design",
      time: "Fall 2022",
      title: "PointAR",
      description: "Your personal museum tour guide",
      thumbnail: "/images/PointAR/pointAR_Home.gif",
      path: "work-detail/pointAR",
      tools: ["Unity, Unreal Engine, Blender"],
      //   workDetail: {
      //     video: IMAGES.POINTAR_HERO,
      //   },
    },
    {
      id: 10,
      type: "web",
      role: "Web Development, Designs, 3D Modeling, Performance Visuals",
      time: "2021",
      title: "Voyager",
      description:
        "Interactive gamefied website, branding, and album art for the Voyager record label",
      thumbnail: "/Media/Voyager/VoyagerThumb.gif",
      path: "work-detail/voyager",
      tools: [
        "HTML",
        "CSS",
        "JavaScript",
        "Next.js",
        "Three.js",
        "p5.js",
        "Blender",
        "TouchDesigner",
        "Figma",
        "Photoshop",
        "Illustrator",
      ],
    },
    // {
    //   id: 11,
    //   role: "UX/UI Designer",
    //   time: "Spring 2023",
    //   title: "Stemport",
    //   description: "Analyze - Organize - Import",
    //   thumbnail: "/images/stemport/stemportHeroThumb.gif",
    //   path: "work-detail/stemport",
    //   tools: ["Unity", "Blender", "Unreal Engine", "Instant-ngp"],
    // },
    // {
    //   role: "Engineer, Creative Coder",
    //   time: "FALL 2021 // Creative Technology",
    //   title: "Plantasia",
    //   description: "Custom Musical Instrument",
    //   thumbnail: IMAGES?.PLANT_THUMB,
    //   path: "work-detail/plantasia",
    //   tools: [
    //     "Arduino",
    //     "Capacitive Touch MPR121",
    //     "Processing",
    //     "Succulent",
    //     "Banana",
    //     "Lemon",
    //     "Rosarita Vegetarian Refried Beans",
    //   ],
    //   workDetail: {
    //     externalVideo: "https://youtu.be/QPqFVQ77BWg",
    //   },
    // },
    {
      id: 0,
      type: "web",
      role: "Staff Experience Designer",
      time: "2024 - Present",
      title: "Adobe",
      description:
        "Projects I've worked on as a Staff Experience Designer at Adobe",
      thumbnail: "/images/adobe/adobeThumb.webp",
      path: "work-detail/adobe",
      tools: ["Figma", "Prototyping", "Blender", "Unity"],
      thumbnailBorder: true,
    },
    // Hidden from the work list (page still exists at /work-detail/meaningfulPursuits)
    // {
    //   id: 13,
    //   role: "Animator / Creative Director",
    //   time: "2019",
    //   title: "Meaningful Pursuits",
    //   description: "Album Visuals",
    //   thumbnail: "/images/meaningfulPursuits/Hero1.gif",
    //   path: "work-detail/meaningfulPursuits",
    //   tools: ["TouchDesigner", "Premiere Pro"],
    // },
  ].sort((a, b) => a.id - b.id);

  // Uniform 2-up grid, held in a narrower column with generous side
  // padding so the images read smaller and several are visible at a glance.
  const items = WORK_CONTENT.map((content, idx) => ({
    ...content,
    number: String(idx + 1).padStart(2, "0"),
  }));

  return (
    <div className="grid-ed">
      {/* Left rail: section label pinned in its own column, magazine-style. */}
      <div className="col-span-12 md:col-span-2 mb-6 md:mb-0">
        <h4 className="edge-label text-mute md:sticky md:top-24 whitespace-nowrap">
          <span className="label-index">01</span>Selected Works
        </h4>
      </div>

      {/* Works column: uniform 3-up grid. */}
      <div className="col-span-12 md:col-span-10">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
          {items.map((item, idx) => (
            <div key={item.number} data-card-index={idx}>
            <Section>
              <WorkCard
                number={item.number}
                role={item.role}
                path={item.path}
                time={item.time}
                title={item.title}
                description={item.description}
                thumbnail={item.thumbnail}
                preload={preloadThumbnails}
                animationSource={item.thumbnail.endsWith(".gif") ? `${item.thumbnail}.halftone.mp4` : undefined}
                externalLink={item.externalLink}
                aspectClass="aspect-[3/2]"
              />
            </Section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkSection;

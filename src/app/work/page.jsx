"use client";
import Grid from "@mui/system/Unstable_Grid/Grid";
import Section from "../common/Section";
import { IMAGES } from "../assets/images";
import dynamic from "next/dynamic";

const WorkCard = dynamic(() => import("../common/WorkCard"), { ssr: false });

const Work = () => {
  const WORK_CONTENT = [
    {
      role: "Lead Product Designer",
      time: "Spring 2023-Present",
      title: "Easel AI",
      description: "Express with Easel",
      thumbnail: IMAGES?.EASEL_HERO,
      path: "https://www.easelapps.ai/",
      externalLink: true,
      tools: ["Figma", "Stable Diffusion XL", "After Effects", "Unreal Engine", "Premiere Pro", "Design Thinking", "User Studies"],
    },    
    {
      role: "Virtual Production, In Camera VFX",
      time: "Spring 2023",
      title: "Beyond The Infinite",
      description: "A Virtual Production Odyssey",
      thumbnail: "/Media/Odyssey/odysseyThumb.gif",
      path: "work-detail/odyssey",
      tools: ["Unreal Engine"],
    },
    {
      role: "XR Interaction",
      time: "Summer 2022 - Fall 2022",
      title: "BMW",
      description: "Developing next-generation XR products and systems",
      extendedDescription:
        "Designed and implemented XR prototypes for the future interaction between human and vehicle as part of the BMW design and research team in Munich.",
      thumbnail: IMAGES?.DANCING_CAR,
      path: "work-detail/bmw",
      tools: ["Unreal Engine", "Unity", "Blender", "Abode Suite", "Figma"],
      workDetail: {
        innerBox: true,
      },
    },
    {
      role: "UX/UI Designer",
      time: "Spring 2023",
      title: "Stemport",
      description: "Analyze - Organize - Import",
      thumbnail: IMAGES?.STEMPORT_THUMB,
      path: "work-detail/stemport",
      tools: ["Unity", "Blender", "Unreal Engine", "Instant-ngp"],
    },
    {
      role: "Spatial Design Research ans Speculation",
      time: "October 2022 - April 2023",
      title: "The Spatial Page",
      description:
        "How spatialization is redefining our reality, memory, and experience",
      thumbnail: IMAGES?.SPATIAL_TUNMB,
      path: "https://radiancefields.com/unlocking-the-spatial-age-how-nerf-technology-is-redefining-our-reality-memory-and-experience/",
      externalLink: true,
      tools: ["Figma", "Adobe XD", "Sketch", "InVision"],
    },
    {
      role: "UI / Web Development",
      time: "Spring 2023",
      title: "The Canary Test",
      description:
        "Web Design and Development for Los Angeles based art gallery",
      thumbnail: IMAGES?.CANARY_THUMB,
      path: "work-detail/canary",
      tools: ["Figma", "NextJS", "Framer Motion", "Contentful"],
    },
    {
      role: "AR UX / UI Design",
      time: "FALL 2022",
      title: "PointAR",
      description: "Your personal museum tour guide",
      thumbnail: IMAGES?.POINTAR_THUMB,
      path: "work-detail/pointAR",
      tools: ["Figma", "NextJS", "Framer Motion", "Contentful"],
      workDetail: {
        video: IMAGES.POINTAR_HERO,
      },
    },
    {
      role: "Engineer, Creative Coder",
      time: "FALL 2021 // Creative Technology",
      title: "Plantasia",
      description: "Custom Musical Instrument",
      thumbnail: IMAGES?.PLANT_THUMB,
      path: "work-detail/plantasia",
      tools: [
        "Arduino",
        "Capacitive Touch MPR121",
        "Processing",
        "Succulent",
        "Banana",
        "Lemon",
        "Rosarita Vegetarian Refried Beans",
      ],
      workDetail: {
        externalVideo: "https://youtu.be/QPqFVQ77BWg",
      },
    },
    {
      role: "Web Development, Designs, 3D Models",
      time: "2022 // Freelance",
      title: "Voyager",
      description:
        "Interactive gamefied website, branding, and album art for voyager record label",
      thumbnail: IMAGES?.PLUR,
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
    {
      role: "Engineer, Creative Coder",
      time: "FALL 2021 // Creative Technology",
      title: "Reakt Light",
      description: "Custom Musical Instrument",
      thumbnail: IMAGES?.REAKT,
      path: "work-detail/reaktLights",
      tools: [
        "Arduino",
        "Capacitive Touch MPR121",
        "Processing",
        "Succulent",
        "Banana",
        "Lemon",
        "Rosarita Vegetarian Refried Beans",
      ],
    },
    {
      role: "Animator / Creative Director",
      time: "2021 // Artist Album AV",
      title: "Meaningful Pursuits",
      description: "Album Visuals",
      thumbnail: IMAGES?.MEAN_THUMB,
      path: "work-detail/meaningfulPursuits",
      tools: ["TouchDesigner", "Premiere Pro"],
    },
  ];

  return (
    <Grid container spacing={5} className="mt-5">
      {WORK_CONTENT?.map((content, idx) => (
        <Grid key={idx} xs={12} md={6}>
          <Section>
            <WorkCard
              role={content?.role}
              path={content?.path}
              time={content?.time}
              title={content?.title}
              description={content?.description}
              tools={content?.tools}
              thumbnail={content?.thumbnail}
              extendedDescription={content?.extendedDescription}
              workDetail={content?.workDetail}
              externalLink={content?.externalLink}
            />
          </Section>
        </Grid>
      ))}
    </Grid>
  );
};

export default Work;

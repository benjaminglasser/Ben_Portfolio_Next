// import Grid from "@mui/system/Unstable_Grid/Grid";
import Section from "./Section";
import WorkCard from "./WorkCard";

const WorkSection = () => {
  const WORK_CONTENT = [
    {
      role: "Lead Product Designer",
      time: "2023 - Present",
      title: "Easel AI",
      description:
        "Lead Product Designer at Easel. An AI-powered personal avatar app directly in iMessage",
      thumbnail: "/Media/Easel/EaselThumb2.gif",
      path: "work-detail/easel",
      tools: [
        "Figma",
        "Stable Diffusion XL",
        "After Effects",
        "Unreal Engine",
        "Premiere Pro",
        "Design Thinking",
        "User Studies",
      ],
    },
    {
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
    {
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
      role: "Virtual Production, In Camera VFX",
      time: "Spring 2023",
      title: "Beyond The Infinite",
      description: "A Virtual Production Odyssey",
      thumbnail: "/Media/Odyssey/odysseyThumb.gif",
      path: "work-detail/odyssey",
      tools: ["Unreal Engine"],
    },
    {
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
      role: "Spatial Design Research and Speculation",
      time: "October 2022 - April 2023",
      title: "The Spatial Page",
      description:
        "How spatialization is redefining our reality, memory, and experience",
      thumbnail: "/images/SpatialAge/spatialAge.gif",
      path: "https://radiancefields.com/unlocking-the-spatial-age-how-nerf-technology-is-redefining-our-reality-memory-and-experience/",
      externalLink: true,
      tools: ["Figma", "Adobe XD", "Sketch", "InVision"],
    },
    {
      role: "Web Development, Designs, 3D Models",
      time: "2022",
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
    {
      role: "UX/UI Designer",
      time: "Spring 2023",
      title: "Stemport",
      description: "Analyze - Organize - Import",
      thumbnail: "/images/stemport/stemportHeroThumb.gif",
      path: "work-detail/stemport",
      tools: ["Unity", "Blender", "Unreal Engine", "Instant-ngp"],
    },
    {
      role: "UI / Web Development",
      time: "Spring 2022",
      title: "The Canary Test",
      description:
        "Web Design and Development for Los Angeles based art gallery",
      thumbnail: "/images/canary/canaryHero4.gif",
      path: "work-detail/canary",
      tools: ["Figma", "NextJS", "Framer Motion", "Contentful"],
    },
    {
      role: "Designer / Engineer",
      time: "Fall 2021",
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
      role: "Animator / Creative Director",
      time: "2021",
      title: "Meaningful Pursuits",
      description: "Album Visuals",
      thumbnail: "/images/meaningfulPursuits/Hero1.gif",
      path: "work-detail/meaningfulPursuits",
      tools: ["TouchDesigner", "Premiere Pro"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {WORK_CONTENT?.map((content, idx) => (
        <div key={idx} className="col-span-1">
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
        </div>
      ))}
    </div>
  );
};

export default WorkSection;

import { Grid } from "@mui/material";
import { FancyButton } from "../common/FancyButton";
import Section from "../common/Section";
import { Suspense } from "react";

// import ThreeComponent from './three'
import dynamic from "next/dynamic";

const Info = () => {
  const tools = [
    "Unity",
    "Unreal Engine",
    "MadMapper",
    "TouchDesigner",
    "Raspberry Pi",
    "Arduino",
    "Blender",
    "Illustrator",
    "Photoshop",
    "Premiere",
    "After Effects",
    "InDesign",
    "XD",
    "Ableton",
    "Pencils + Paper",
  ];

  const platforms = [
    "C#",
    "Javascript",
    "CSS",
    "HTML",
    "Python",
    "Java",
    "a bit of GLSL",
    "React",
    "Gatsby",
    "MongoDB",
    "Express",
    "NodeJS",
    "Blender",
    "P5.js",
    "Processing",
    "Three.js",
    "EDUCATION",
  ];

  const ThreeComponent = dynamic(() => import("./three"), { ssr: false });

  return (
    <Grid container className="mt-1 px-0  md:mt-6" spacing={4}>
      <Grid item md={8}>
        <Section>
          <h1 className="text-justify ojuju mb-10 bio">
            Exploring the unknown with curiosity and passion, I blend
            audio-visual storytelling with innovative design across 2D, 3D, and
            mixed reality. Currently leading Product Design at
            {/* I am drawn to the reciprocity between seemingly
            disparate realms: nature and architecture, the analog and digital
            worlds, light and sound, and chaos and order. Ultimately, I seek to
            uncover the humanity nestled within their convergences.  */}
            <FancyButton
              className="normal-case ml-2 text-md p-0 px-2 hover:text-white"
              // size="large"
            >
              <a href="https://www.easelapps.ai" target="_blank">
                Easel AI
              </a>
            </FancyButton>
            {/* <div className="w-100 flex  md:items-center md:justify-start text-black py-4">
              I also create music sometimes under the name
              <FancyButton
                className="normal-case ml-2 text-md p-0 px-2 hover:text-white"
                // size="large"
              >
                <a
                  href="https://open.spotify.com/artist/4lP1lKWYqNLYWYtnuTh8OF?si=Z19kgdcvRzyKWn0C8BK3cQ"
                  target="_blank"
                >
                  Benny Bridges
                </a>
              </FancyButton>
            </div> */}
          </h1>
          <h4 className="mb-2 mt-16 font-normal ">A FEW TOOLS I USE:</h4>
          <Grid container>
            {tools?.map((item, idx) => (
              <Grid className="pb-1" xs={6} sm={4} md={3} lg={2} key={idx}>
                <p>{item}</p>
              </Grid>
            ))}
          </Grid>
          <h4 className="mb-2 mt-16 font-normal">10010110101 WITH:</h4>
          <Grid container>
            {platforms?.map((item, idx) => (
              <Grid className="pb-1" xs={6} sm={4} md={3} lg={2} key={idx}>
                <p>{item}</p>
              </Grid>
            ))}
          </Grid>
          <h4 className="mb-0 mt-16 font-normal">EDUCATION</h4>
          <p className="w-full md:w-1/2 text-justify">
            MFA Media Design Practices, ArtCenter College of Design{" "}
          </p>
          <p className="w-full md:w-1/2 text-justify">
            BA Cognitive Science, University of Southern California
          </p>
          <p className="w-full md:w-1/2 text-justify">
            General Assembly Web Development Immersive
          </p>
        </Section>
      </Grid>
      <Grid item md={4}>
        <Section>
          <div className="h-[500px]">
            <Suspense fallback={<Loader />}>
              <ThreeComponent className="h-2px" />
            </Suspense>
          </div>

          <div className="links mx-0">
            <h4 className="mb-2 font-normal">LINKS</h4>
            <FancyButton className="p-0 ml-0 px-2 mr-2 mb-2 hover:text-white">
              <a
                href="/pdf/Benjamin_Glasser_Resume_Oct_2023.pdf"
                target="_blank"
              >
                RESUME
              </a>
            </FancyButton>
            <FancyButton className="p-0 ml-0 px-2 mr-2 mb-2 hover:text-white">
              <a href="https://github.com/benjaminglasser" target="_blank">
                GITHUB
              </a>
            </FancyButton>
            <FancyButton className="p-0 ml-0 px-2 mr-2 mb-2 hover:text-white">
              <a href="https://www.instagram.com/bbbbb.stuff/" target="_blank">
                INSTAGRAM
              </a>
            </FancyButton>
            <FancyButton className="p-0 ml-0 px-2 mr-2 mb-2 hover:text-white">
              <a href="mailto:glasserben@gmail.com" target="_blank">
                CONTACT
              </a>
            </FancyButton>
            <FancyButton className="p-0 ml-0 px-2 mr-2 mb-2 hover:text-white">
              <a
                href="https://open.spotify.com/artist/4lP1lKWYqNLYWYtnuTh8OF?si=Z19kgdcvRzyKWn0C8BK3cQ"
                target="_blank"
              >
                Music
              </a>
            </FancyButton>
          </div>
        </Section>
      </Grid>
    </Grid>
  );
};

export default Info;

export const Loader = () => {
  return "Loading ...";
};

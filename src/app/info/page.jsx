import { Grid } from "@mui/material";
import { FancyButton } from "../common/FancyButton";
import Section from "../common/Section";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Three from "./three";

const Info = () => {
  const tools = [
    "unity",
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
  return (
    <Grid container className="mt-1" spacing={4}>
      <Grid item md={8}>
        <Section>
          <h1 className="text-justify bio">
            I really like to make things that I don't know to make. There's a
            lot I don't yet understand, but I seek to learn a bit more every day
            by exploring the unknown with wide-eyed curiosity. I frequently work
            with various 2D + 3D software tools, mixed-media illustration, code,
            and physical computing. Currently, I'm pursuing an
            <span className="font-sprat inline opacity-100">
              {" "}
              MFA in Media Design Practices
            </span>{" "}
            from
            <span className="font-sprat inline opacity-100">
              {" "}
              ArtCenter College of Design in Pasadena, CA.
            </span>
            <div className="w-100 flex items-center justify-start text-black py-4">
              I also create music sometimes under the name
              <FancyButton
                className="normal-case ml-2 font-sprat p-0 text-xl p-1 hover:text-white"
                size="large"
              >
                Benny Bridges
              </FancyButton>
            </div>
          </h1>
          <h1 className="text-2xl mb-1">A FEW TOOLS I USE:</h1>
          <Grid container>
            {tools?.map((item, idx) => (
              <Grid className="pb-1" xs={6} sm={4} md={3} lg={2} key={idx}>
                <p>{item}</p>
              </Grid>
            ))}
          </Grid>
          <h1 className="text-2xl mb-1">10010110101 WITH:</h1>
          <Grid container>
            {platforms?.map((item, idx) => (
              <Grid className="pb-1" xs={6} sm={4} md={3} lg={2} key={idx}>
                <p>{item}</p>
              </Grid>
            ))}
          </Grid>
          <h1 className="text-2xl mb-0 mt-5">EDUCATION</h1>
          <p className="w-full md:w-1/2 text-justify">
            MFA Media Design Practices, ArtCenter College of Design BA Cognitive
            Science, University of Southern California General Assembly Web
            Development Immersive
          </p>
        </Section>
      </Grid>
      <Grid item md={4}>
        <Section>
          {/* <Canvas
            shadowMap
            colorManagement
            camera={{ position: [-12, 2, 10], fov: 6 }}
          >
            <Suspense fallback={<Loader />}>
              <Three />
            </Suspense>
          </Canvas> */}
          <div className="links ">
            <h1 className="text-2xl mb-2">LINKS</h1>
            <FancyButton className="p-0 px-2 mr-2 mb-2">
              <a
                href="https://github.com/benjaminglasser"
                className="font-sprat"
              >
                GITHUB
              </a>
            </FancyButton>
            <FancyButton className="p-0 px-2 mr-2 mb-2">
              <a
                href="https://www.instagram.com/bbbbb.stuff/"
                className="font-sprat"
              >
                INSTAGRAM
              </a>
            </FancyButton>
            <FancyButton className="p-0 px-2 mr-2 mb-2">
              <a href="/contact" className="font-sprat">
                CONTACT
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

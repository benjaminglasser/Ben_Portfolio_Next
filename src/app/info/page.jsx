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
    <Grid container className="mt-5 pt-5" spacing={4}>
      <Grid item md={8}>
        <Section>
          <h1 className="text-justify text-xl tracking-wide">
            I really like to make things that I don't know to make. There's a
            lot I don't yet understand, but I seek to learn a bit more every day
            by exploring the unknown with wide-eyed curiosity. I frequently work
            with various 2D + 3D software tools, mixed-media illustration, code,
            and physical computing. Currently, I'm pursuing an{" "}
            <span className="font-sprat text-xl">MFA in Media Design</span>
            Practices from{" "}
            <span className="font-sprat text-xl">
              ArtCenter College of Design in Pasadena, CA.
            </span>
            <br />
            <div className="w-100 flex items-center justify-start text-black py-8">
              I also create music sometimes under the name
              <FancyButton
                className="ml-2 font-hellplague hover:text-white"
                size="large"
              >
                Benny Bridges
              </FancyButton>
            </div>
          </h1>
          <h1 className="text-2xl mb-2">A FEW TOOLS I USE:</h1>
          <Grid container>
            {tools?.map((item, idx) => (
              <Grid className="py-1" xs={6} sm={4} md={2} key={idx}>
                {item}
              </Grid>
            ))}
          </Grid>
          <h1 className="text-2xl mb-2">10010110101 WITH:</h1>
          <Grid container>
            {platforms?.map((item, idx) => (
              <Grid className="py-1" xs={6} sm={4} md={2} key={idx}>
                {item}
              </Grid>
            ))}
          </Grid>
          <h1 className="text-2xl mb-2">EDUCATION</h1>
          <p className="w-1/2 text-justify mt-5">
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
          <div className="links">
            <h1 className="text-2xl mb-2">EDUCATION</h1>
            {/* <a href="../pdf/Benjamin Glasser_Resume_Nov_2022.pdf">RESUME</a> */}
            <FancyButton className="p-1 px-2 mr-2">
              <a href="https://github.com/benjaminglasser">GITHUB</a>
            </FancyButton>
            <FancyButton className="p-1 px-2 mr-2">
              <a href="https://www.instagram.com/bbbbb.stuff/">INSTAGRAM</a>
            </FancyButton>
            <FancyButton className="p-1 px-2 mr-2">
              <a href="/contact">CONTACT</a>
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

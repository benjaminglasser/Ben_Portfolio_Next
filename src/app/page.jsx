import Image from "next/image";
import { IMAGES } from "./assets/images";
import Grid from "@mui/system/Unstable_Grid/Grid";

export default function Home() {
  return (
    <div className="home-wrapper" style={{ height: "calc(100vh - 300px)" }}>
      <div className="cross-hair-grid">
        <div className="cross-hairs">
          {[...Array(20)].map((_, index) => (
            <div className="cross-hair" key={index}>
              <Image
                className="sky"
                src={IMAGES.CROSS_HAIR_SM}
                alt="crosshair"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="one hidden lg:block">
        <div className="box1"></div>
        <div className="box2"></div>
      </div>
      <Grid container className="mt-5 md:mt-10 h-full flex items-center">
        <Grid xs={12} md={9}>
          <div className="px-0 lg:px-24">
            <Image
              className="sky-gif w-full"
              src={IMAGES.SKY_GIF}
              alt="generative sky"
            />
            <div className="border-b mt-5 md:mt-10" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

"use client";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Section from "../common/Section";
import { FancyButton } from "../common/FancyButton";
import { IMAGES } from "../assets/images";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const Play = () => {

  const itemData = [
    "/Media/Play/play18.gif",
    IMAGES.PLAY_18,
    IMAGES.PLAY_1,
    IMAGES.PLAY_2,
    IMAGES.PLAY_3,
    IMAGES.PLAY_34,
    IMAGES.PLAY_4,
    IMAGES.PLAY_6,
    IMAGES.PLAY_10,
    IMAGES.PLAY_11,
    IMAGES.PLAY_35,
    IMAGES.PLAY_12,
    IMAGES.PLAY_13,
    IMAGES.PLAY_14,
    IMAGES.PLAY_7,
    IMAGES.PLAY_15,
    IMAGES.PLAY_5,
    IMAGES.PLAY_17,
    IMAGES.PLAY_16,
    IMAGES.PLAY_33,
    IMAGES.PLAY_19,
    IMAGES.PLAY_20,
    IMAGES.PLAY_32,
    IMAGES.PLAY_21,
    IMAGES.PLAY_22,
    IMAGES.PLAY_23,
    IMAGES.PLAY_24,
    IMAGES.PLAY_27,
    IMAGES.PLAY_26,
    IMAGES.PLAY_25,
    IMAGES.PLAY_28,
    IMAGES.PLAY_29,
    IMAGES.PLAY_30,
    IMAGES.PLAY_31,
  ];

  const [cols, setCols] = useState(4);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 900) {
        setCols(4);
      } else if (window.innerWidth >= 600) {
        setCols(3);
      } else if (window.innerWidth >= 400) {
        setCols(2);
      } else {
        setCols(1);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box className="mt-5">
      <p className="text-white text-lg py-3 text-center">
        I play in the various sandboxes of{" "}
        <span className="font-sprat text-base">
          Blender, Unity, Unreal Engine, Processing, TouchDesigner,
        </span>{" "}
        as well as other creative spaces in pursuit of stumbling upon pleasing
        surprises.
      </p>
      <p className="w-100 flex items-center justify-center text-white py-8">
        More expiriments can be found
        <FancyButton className="px-[0.25rem] py-0 ml-2">
              <a
                href="https://www.instagram.com/bbbbb.stuff/"
                target="_blank"
              >
                HERE
              </a>
        </FancyButton>
      </p>

      {/* <Image src="/Media/Play/play18.gif"
      width={500}
      height={500}
      alt="play pic"/> */}

      <ImageList variant="masonry" cols={cols} gap={24}>
        {itemData.map((item, idx) => (
          <Section key={idx}>
            <ImageListItem>
              <Image
                className="w-full"
                src={item}
                loading="lazy"
                width="100"
                height="100"
              />
            </ImageListItem>
          </Section>
        ))}
      </ImageList>
    </Box>
  );
};

export default Play;

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
  // const itemData = [
  //   {
  //     img: IMAGES.PLAY_1,
  //     title: "Bed",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
  //     title: "Books",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
  //     title: "Sink",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
  //     title: "Kitchen",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
  //     title: "Blinds",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
  //     title: "Chairs",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
  //     title: "Laptop",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
  //     title: "Doors",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
  //     title: "Coffee",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
  //     title: "Storage",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
  //     title: "Candle",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
  //     title: "Coffee table",
  //   },
  // ];

  const itemData = [
    IMAGES.PLAY_1,
    IMAGES.PLAY_2,
    IMAGES.PLAY_3,
    IMAGES.PLAY_4,
    IMAGES.PLAY_5,
    IMAGES.PLAY_6,
    IMAGES.PLAY_7,
    IMAGES.PLAY_8,
    IMAGES.PLAY_9,
    IMAGES.PLAY_10,
    IMAGES.PLAY_11,
    IMAGES.PLAY_12,
    IMAGES.PLAY_13,
    IMAGES.PLAY_14,
    IMAGES.PLAY_15,
    IMAGES.PLAY_16,
    IMAGES.PLAY_17,
    IMAGES.PLAY_18,
    IMAGES.PLAY_19,
    IMAGES.PLAY_20,
    IMAGES.PLAY_21,
    IMAGES.PLAY_22,
    IMAGES.PLAY_23,
    IMAGES.PLAY_24,
    IMAGES.PLAY_25,
    IMAGES.PLAY_26,
    IMAGES.PLAY_27,
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
      <p className="text-white py-3">
        I play in the various sandboxes of{" "}
        <span className="font-sprat font-light">
          Blender, Unity, Unreal Engine, Processing, TouchDesigner,
        </span>{" "}
        as well as other creative spaces in pursuit of stumbling upon pleasing
        surprises.
      </p>
      <p className="w-100 flex items-center justify-center text-white py-8">
        More expiriments can be found
        <FancyButton className="px-[0.25rem] py-0 ml-2 font-hellplague">
          <p>HERE</p>
        </FancyButton>
      </p>
      <ImageList variant="masonry" cols={cols} gap={24}>
        {itemData.map((item, idx) => (
          <Section key={idx}>
            <ImageListItem>
              <Image
                className="w-full"
                // srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={item}
                loading="lazy"
              />
            </ImageListItem>
          </Section>
        ))}
      </ImageList>
    </Box>
  );
};

export default Play;

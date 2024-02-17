"use client";
import Image from "next/image";
import { IMAGES } from "../assets/images";
import Video from "next-video";
import { VIDEO } from "../assets/video";
import ReactPlayer from "react-player";
import Section from "../common/Section";
import { Grid } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ResponsiveBMWVideo from "./components/bmwVideo";
import Context from "./components/context";

const workdetail = () => {
  const searchParams = useSearchParams();

  const role = searchParams?.get("role");
  const time = searchParams?.get("time");
  const title = searchParams?.get("title");
  const description = searchParams?.get("description");
  const extendedDescription = searchParams?.get("extendedDescription");
  let tools = searchParams?.get("tools");
  tools = tools && JSON.parse(tools);
  let workDetail = searchParams?.get("workDetail");

  workDetail = workDetail && JSON.parse(workDetail);

  function getFileExtension(src) {
    return src?.substring(src.lastIndexOf(".") + 1);
  }

  return (
    <div className="w-full text-white">
      {title === "BMW" && <ResponsiveBMWVideo />}
      {workDetail?.externalVideo && (
        <div className="w-full flex justify-center">
          <ReactPlayer url={workDetail?.externalVideo} />
        </div>
      )}
      {workDetail?.video &&
        (getFileExtension(workDetail?.video?.src) !== "mp4" ? (
          <Image src={workDetail?.video} alt="hero" className="w-full" />
        ) : (
          <video autoPlay muted loop src={workDetail?.video} />
        ))}
      {workDetail?.innerBox && (
        <Grid container className="mt-5">
          <Grid
            item
            md={3}
            className="border-0 lg:border-t lg:border-r border-pink p-3"
          >
            <h1 className="text-sm sm:text-base md:text-lg lg:text-3xl">
              {title}
            </h1>
            <h1 className="font-sprat text-xs sm:text-sm md:text-base lg:text-2xl">
              {description}
            </h1>
          </Grid>
          <Grid item md={9} className="border-0 lg:border-b border-pink p-3">
            <h2 className="text-xs sm:text-sm md:text-base lg:text-lg mb-6">
              {extendedDescription}
            </h2>
            <p className="text-xs mt-2">Time: {time}</p>
            <p className="text-xs mt-2">Role: {role}</p>
            <p className="text-xs mt-2">Tools: {tools?.join(",")}</p>
          </Grid>
        </Grid>
      )}
      {workDetail?.context && <Context context={workDetail?.context} />}
      {workDetail?.aim && (
        <Section>
          <h1 className="text-xl md:text-3xl text-justify font-normal my-16">
            AIM
            <br /> {workDetail?.aim}
          </h1>
        </Section>
      )}
      {workDetail?.detail?.map((detail, idx) => (
        <div key={idx}>
          <Section>
            <div
              className={`w-full flex ${
                idx % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`${
                  detail?.widthFull ? "w-full" : "w-full md:w-1/2"
                } my-10`}
              >
                {detail.title && (
                  <h1 className="text-xl md:text-3xl">{detail.title}</h1>
                )}
                <div className="border-b border-pink" />
                {detail?.description && (
                  <h1 className="text-justify text-xl mt-3 font-extralight">
                    {detail?.description}
                  </h1>
                )}
              </div>
            </div>
            {detail?.images?.map((image, index) => (
              <div key={index} className="flex justify-center w-full mt-5">
                <Image src={image} alt="userflow" />
              </div>
            ))}
          </Section>
        </div>
      ))}
    </div>
  );
};

export default workdetail;

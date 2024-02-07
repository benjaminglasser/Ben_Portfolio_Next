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

const workdetail = (props) => {
  console.log("VIDEO.STEMPORT", VIDEO.STEMPORT);

  const searchParams = useSearchParams();
  const router = useRouter();

  const { query } = router;

  // const { role, time, title, description, tools, thumbnail, workDetail } =
  //   router.query;
  const role = searchParams?.get("role");
  const time = searchParams?.get("time");
  const title = searchParams?.get("title");
  const description = searchParams?.get("description");
  const extendedDescription = searchParams?.get("extendedDescription");
  let tools = searchParams?.get("tools");
  tools = tools && JSON.parse(tools);
  let workDetail = searchParams?.get("workDetail");

  workDetail = workDetail && JSON.parse(workDetail);

  console.log("workDetail", workDetail?.innerBox);

  return (
    <div className="w-full text-white">
      {workDetail?.video && (
        <video autoPlay muted loop src={workDetail?.video} />
      )}
      {workDetail?.innerBox && (
        <Grid container className="mt-5">
          <Grid md={4} className="border-t border-r border-pink p-3">
            <h1 className="text-xl md:text-3xl">{title}</h1>
            <h1 className="font-sprat text-xl md:text-3xl">{description}</h1>
          </Grid>
          <Grid md={8} className="border-b border-pink p-3">
            <h2 className="text-base md:text-lg mb-6">{extendedDescription}</h2>
            <p className="text-xs mt-2">Time: {time}</p>
            <p className="text-xs mt-2">Role: {role}</p>
            <p className="text-xs mt-2">Tools: {tools?.join(",")}</p>
          </Grid>
        </Grid>
      )}
      {workDetail?.context && (
        <Section>
          <div className="text-center mt-5">
            <h1>CONTEXT</h1>
            <h2 className="flex justify-center w-full">
              <div className="w-full md:w-2/3">{workDetail?.context}</div>
            </h2>
          </div>
        </Section>
      )}
      {workDetail?.aim && (
        <Section>
          <h1 className="text-xl md:text-3xl text-left text-justify font-normal my-16">
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

"use client";
import Image from "next/image";
import { IMAGES } from "../assets/images";
import Video from "next-video";
import { VIDEO } from "../assets/video";
import ReactPlayer from "react-player";
import Section from "../common/Section";

const workdetail = () => {
  const DETAILS = [
    {
      title: "Visual Identity",
      description:
        "To enhance the ML experience, a visual identity was created to signify the AI processes. Inspired by the way in which sound can create beautiful ripples in water, a virtual avatar guides the user along the journey.",
      images: [IMAGES.USERFLOW_TRANS], // Replace "path/to/image1.jpg" with your actual image path
    },
    {
      title: "Second Item",
      description:
        "This is the second item description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      images: [IMAGES.DESKTOP_MOCKUP], // Replace "path/to/image2.jpg" with your actual image path
    },
    {
      title: "Third Item",
      description:
        "This is the third item description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      images: [IMAGES.USERFLOW_TRANS], // Replace "path/to/image3.jpg" with your actual image path
    },
    {
      title: "UI Consideration",
      description:
        "When rolling out all the screens, careful attention was paid so that the user flow was clear and simple. Negative space and a minimilistic design was used generously to keep the layouts uncluttered.",
      widthFull: true,
      images: [
        IMAGES.BOARD1,
        IMAGES.BOARD2,
        IMAGES.BOARD3,
        IMAGES.BOARD4,
        IMAGES.BOARD5,
      ], // Replace "path/to/image4.jpg" with your actual image path
    },
  ];

  console.log("VIDEO.STEMPORT", VIDEO.STEMPORT);
  return (
    <div className="w-full text-white">
      {/* <Video
        src={VIDEO.STEMPORT}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      /> */}
      <video autoPlay muted loop src={VIDEO.STEMPORT} />
      <Section>
        <div className="text-center mt-5">
          <h1>CONTEXT</h1>
          <h2 className="flex justify-center w-full">
            <div className="w-full md:w-2/3">
              Music production consists of breaking down individual instrument
              tracks into many smaller units known as "stems". Organizing and
              labeling large project files can very quickly become cluttered and
              difficult to sift through - especially as production teams scale.
            </div>
          </h2>
        </div>
      </Section>
      <Section>
        <h1 className="text-xl md:text-3xl text-left text-justify font-normal my-16">
          AIM
          <br /> Stemport uses a machine learning algorithm to analyze,
          organize, and re-label musical stems to aid in streamlining the
          creative workflow.
        </h1>
      </Section>
      {DETAILS?.map((detail, idx) => (
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
                <h1 className="text-xl md:text-3xl">{detail.title}</h1>
                <div className="border-b border-pink" />
                <h1 className="text-justify text-xl mt-3 font-extralight">
                  {detail.description}
                </h1>
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

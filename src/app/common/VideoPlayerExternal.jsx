import React, { useRef } from "react";
import { useInView } from "framer-motion";

const VideoPlayerExternal = ({ src, widthFull, className, caption }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="flex justify-center items-center">
      <div className="mt-10 w-full px-5 md:w-3/5 ">
        <div>{caption && <p className="mb-5 md:font-thin">{caption}</p>}</div>
        <div
          ref={ref}
          className={
            className ||
            `${
              !widthFull && "md:w-1/2 lg:w-1/3  md:h-[32rem] lg:h-[38rem]"
            } w-full h-full`
          }
        >
          <iframe
            style={{
              transform: isInView ? "none" : "translateY(50px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
            width="100%"
            height="100%"
            src={src}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerExternal;

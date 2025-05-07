import React, { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { PuffLoader } from "react-spinners";

const VideoPlayerExternal = ({ src, widthFull, className, caption }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [loading, setLoading] = useState(true);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-10 w-full px-5 md:w-3/5 ">
        <div>{caption && <p className="mb-5 md:font-thin">{caption}</p>}</div>
        <div
          ref={ref}
          className={`${
            className ||
            `${
              !widthFull && "md:w-1/2 lg:w-1/3  md:h-[32rem] lg:h-[38rem]"
            } w-full h-full`
          } relative`}
        >
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-10">
              <PuffLoader
                color="#ff477b"
                loading
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
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
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={handleIframeLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerExternal;

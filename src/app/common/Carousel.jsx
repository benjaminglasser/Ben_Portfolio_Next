import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import VideoPlayerExternal from "./VideoPlayerExternal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FancyCarousel = ({ SOURCE }) => {
  const [showIndicators, setShowIndicators] = useState(true);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setShowIndicators(false);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Carousel
      showStatus={false}
      showIndicators={showIndicators}
      renderArrowPrev={(onClickHandler, hasPrev) =>
        hasPrev && (
          <div
            className="absolute  left-0 bottom-0 w-1/6 h-full sm:h-[34rem] md:h-[38rem] lg:h-[42rem] z-10 flex justify-center items-center  hover:text-pink cursor-pointer ml-10"
            onClick={onClickHandler}
          >
            <IoIosArrowBack size={30} />
          </div>
        )
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && (
          <div
            className="absolute  right-0 bottom-0 w-1/6 h-full sm:h-[34rem] md:h-[38rem] lg:h-[42rem] z-10 flex justify-center items-center hover:text-pink cursor-pointer mr-10"
            onClick={onClickHandler}
          >
            <IoIosArrowForward size={30} />
          </div>
        )
      }
    >
      {SOURCE?.map((item, idx) => (
        <div
          key={idx}
          // className="w-full h-full flex justify-center items-center relative"
        >
          <VideoPlayerExternal
            widthFull
            className="aspect-w-16 aspect-h-9"
            src={item?.url}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default FancyCarousel;

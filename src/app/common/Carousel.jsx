import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import VideoPlayer from "./VerticalVideoPlayer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FancyCarousel = () => {
  const SOURCE = [
    {
      url: "https://www.youtube.com/embed/hK23aSLVaAk?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1",
    },
    {
      url: "https://www.youtube.com/embed/8Csz61fViZA?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3",
    },
    {
      url: "https://www.youtube.com/embed/VghFPjuuXhQ?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=5",
    },
    {
      url: "https://www.youtube.com/embed/6ScrKPMQPcw?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=7",
    },
    {
      url: "https://www.youtube.com/embed/HsI6URf6grg?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=9",
    },
    {
      url: "https://www.youtube.com/embed/CV9ECfroSgU?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=11",
    },
    {
      url: "https://www.youtube.com/embed/SxJNx4Ymk4M?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=13",
    },
    {
      url: "https://www.youtube.com/embed/kpQODCM1WYU?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=15",
    },
    {
      url: "https://www.youtube.com/embed/Uy7GpsWTLS0?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=17",
    },
    {
      url: "https://www.youtube.com/embed/5Oe320cKOl8?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=19",
    },
    {
      url: "https://www.youtube.com/embed/89wx2XuiLt0?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fbenjaminglasser.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=21",
    },
  ];

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
            className="absolute left-0 bottom-0 w-1/6 h-full sm:h-[34rem] md:h-[38rem] lg:h-[42rem] z-10 flex justify-center items-center border border-pink hover:bg-pink hover:opacity-80 cursor-pointer ml-10"
            onClick={onClickHandler}
          >
            <IoIosArrowBack size={30} />
          </div>
        )
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && (
          <div
            className="absolute right-0 bottom-0 w-1/6 h-full sm:h-[34rem] md:h-[38rem] lg:h-[42rem] z-10 flex justify-center items-center border border-pink hover:bg-pink hover:opacity-80 cursor-pointer mr-10"
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
          className="w-full h-full flex justify-center items-center relative"
        >
          <VideoPlayer
            widthFull
            className="h-full sm:h-[34rem] md:h-[38rem] lg:h-[42rem] w-full"
            src={item?.url}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default FancyCarousel;

import React, { useEffect, useState, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import VideoPlayerExternal from "./VideoPlayerExternal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PuffLoader } from "react-spinners";

const FancyCarousel = ({ SOURCE }) => {
  const [showIndicators, setShowIndicators] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [timestamp, setTimestamp] = useState(Date.now());

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

  useEffect(() => {
    if (SOURCE && SOURCE.length > 0) {
      setLoading(false);
    }
  }, [SOURCE]);

  const handleSlideChange = (index) => {
    setTimestamp(Date.now()); // Force reload of video
    setSelectedIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full h-[34rem] flex justify-center items-center">
        <PuffLoader
          color="#A9232C"
          loading
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <Carousel
          showStatus={false}
          showIndicators={false}
          selectedItem={selectedIndex}
          onChange={handleSlideChange}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <div
                className="absolute left-0 bottom-0 w-1/6 h-full sm:h-[34rem] md:h-[38rem] lg:h-[42rem] z-10 flex justify-center items-center hover:text-[#A9232C] cursor-pointer ml-10"
                onClick={onClickHandler}
              >
                <IoIosArrowBack size={30} />
              </div>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <div
                className="absolute right-0 bottom-0 w-1/6 h-full sm:h-[34rem] md:h-[38rem] lg:h-[42rem] z-10 flex justify-center items-center hover:text-[#A9232C] cursor-pointer mr-10"
                onClick={onClickHandler}
              >
                <IoIosArrowForward size={30} />
              </div>
            )
          }
        >
          {SOURCE?.map((item, idx) => (
            <div key={idx}>
              <VideoPlayerExternal
                widthFull
                className="aspect-w-16 aspect-h-9"
                src={item?.url.includes('?') 
                  ? item?.url.replace('controls=0', 'controls=1') + `&t=${timestamp}`
                  : `${item?.url}?controls=1&t=${timestamp}`
                }
              />
            </div>
          ))}
        </Carousel>
      </div>
      
      <div className="flex justify-center mt-2">
        {SOURCE?.map((_, idx) => (
          <button
            key={idx}
            className={`mx-2 w-3 h-3 rounded-full ${idx === selectedIndex ? 'bg-[#A9232C]' : 'bg-white/50'} hover:bg-[#A9232C] transition-colors`}
            onClick={() => handleSlideChange(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FancyCarousel;

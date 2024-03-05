import React, { useRef } from "react";
import { useInView } from "framer-motion";

const YouTubeBackground = () => {
  //   const embedUrl = `https://www.youtube.com/embed/xPO1LIJycfk?si=7OViC4sYjSOieEI7?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1`;
  const embedUrl = `https://www.youtube.com/embed/xPO1LIJycfk?autoplay=1&mute=1&enablejsapi=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1`;
  //   const embedUrl = `http://www.youtube.com/embed/-hX_rznqnM0?showinfo=0`;

  //   <iframe
  //     src="http://www.youtube.com/embed/-hX_rznqnM0?modestbranding=1"
  //     height="350"
  //     width="575"
  //   ></iframe>;

  return (
    <div className="absolute top-0 left-0 w-[150%] h-[150%] overflow-hidden translate-x-[-100px] translate-y-[-100px]">
      <iframe
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full -z-10"
        title="YouTube background video"
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default YouTubeBackground;

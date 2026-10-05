"use client";

import { useEffect, useState } from "react";
import LazyVideo from "./LazyVideo";

function VideoPlayerResponsiveBG({ vidDesktop, vidMobile }) {
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-black" aria-hidden="true">
      {mobile !== null && (
        <LazyVideo
          key={mobile ? vidMobile : vidDesktop}
          src={mobile ? vidMobile : vidDesktop}
          eager
          className="absolute inset-0 w-full h-full object-cover"
          tabIndex={-1}
        />
      )}
    </div>
  );
}

export default VideoPlayerResponsiveBG;

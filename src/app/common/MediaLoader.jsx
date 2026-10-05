"use client";

import { useEffect, useRef } from "react";

const MediaLoader = ({ className = "" }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    let visible = false;
    const update = () => {
      loader.style.animationPlayState = visible && !document.hidden ? "running" : "paused";
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(loader);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div ref={loaderRef} className={`img-loader ${className}`} aria-hidden="true">
      <span className="img-loader-scan" />
    </div>
  );
};

export default MediaLoader;

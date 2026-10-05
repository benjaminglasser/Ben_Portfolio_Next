"use client";

import { useEffect, useRef, useState } from "react";

const LazyVideo = ({ src, eager = false, onActivate, onError, onLoadedData, ...props }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(eager);
  const callbacks = useRef({ onActivate, onError, onLoadedData });
  callbacks.current = { onActivate, onError, onLoadedData };

  useEffect(() => {
    const video = ref.current;
    let visible = false;
    let pending = false;
    let cancelled = false;
    const play = () => {
      if (!visible || !video.paused || pending || video.readyState < 2) return;
      pending = true;
      video.play().catch((error) => {
        if (error.name !== "AbortError") console.warn("Video could not start playback.", src, error);
      }).finally(() => {
        pending = false;
        if (cancelled || !visible) video.pause();
      });
    };
    const near = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(true);
    }, { rootMargin: "200px" });
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else video.pause();
    });
    near.observe(video);
    visibility.observe(video);
    video.addEventListener("canplay", play);
    return () => {
      cancelled = true;
      near.disconnect();
      visibility.disconnect();
      video.removeEventListener("canplay", play);
      video.pause();
    };
  }, [src]);

  useEffect(() => {
    if (active) callbacks.current.onActivate?.();
  }, [active]);

  return (
    <video
      {...props}
      ref={ref}
      src={active || eager ? src : undefined}
      data-video-source={src}
      preload={active || eager ? "auto" : "none"}
      muted
      loop
      playsInline
      onLoadedData={(event) => callbacks.current.onLoadedData?.(event)}
      onError={(event) => {
        console.warn("Video could not load.", src, event.currentTarget.error);
        callbacks.current.onError?.(event);
      }}
    />
  );
};

export default LazyVideo;

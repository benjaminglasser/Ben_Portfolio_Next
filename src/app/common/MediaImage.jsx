"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LazyVideo from "./LazyVideo";
import gifMedia from "./gifMedia.json";
import { usePathname } from "next/navigation";
import MediaLoader from "./MediaLoader";

const byName = new Map();
for (const [path, media] of Object.entries(gifMedia)) {
  const name = path.split("/").pop();
  byName.set(name, byName.has(name) ? null : media);
}

export const getGifMedia = (src) => {
  const path = typeof src === "string" ? src : src?.src || src?.default?.src || src?.default;
  if (typeof path !== "string") return null;
  const clean = decodeURI(path.split(/[?#]/)[0]);
  if (gifMedia[clean]) return gifMedia[clean];
  if (!clean.startsWith("/_next/static/media/")) return null;
  return byName.get(clean.split("/").pop().replace(/\.[a-f0-9]+\.gif$/i, ".gif")) || null;
};

const AnimatedImage = ({ media, src, alt, className, style, width, height, fill, loading, onLoad, onError, posterFirst, sizes }) => {
  const [fallback, setFallback] = useState(false);
  const [active, setActive] = useState(loading === "eager");
  const [posterReady, setPosterReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  const posterRef = useRef(null);
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;
  useEffect(() => {
    if (active && posterRef.current?.complete && posterRef.current.naturalWidth > 0) {
      setPosterReady(true);
      if (posterFirst && !videoRef.current) {
        onLoadRef.current?.({ currentTarget: posterRef.current });
      }
    }
  }, [active, posterFirst]);
  if (fallback) {
    return <Image src={src} alt={alt} className={className} style={style} width={width} height={height} fill={fill} unoptimized onLoad={onLoad} onError={onError} />;
  }
  return (
    <>
    <LazyVideo
      src={media.video}
      poster={posterFirst ? undefined : media.poster}
      eager={loading === "eager"}
      aria-label={alt || undefined}
      aria-hidden={alt === "" ? true : undefined}
      data-animated-image="true"
      data-poster-ready={posterReady}
      width={media.width}
      height={media.height}
      className={className}
      style={fill ? { ...style, position: "absolute", inset: 0, width: "100%", height: "100%" } : style}
      onActivate={() => setActive(true)}
      onLoadedData={(event) => {
        videoRef.current = event.currentTarget;
        setVideoReady(true);
        onLoad?.(event);
      }}
      onError={() => setFallback(true)}
    />
    {active && posterFirst && !videoReady && (
      <Image
        ref={posterRef}
        data-thumbnail-poster="true"
        src={media.poster}
        alt={alt}
        width={media.width}
        height={media.height}
        sizes={sizes}
        loading="eager"
        className={className}
        style={{ ...style, position: "absolute", inset: 0, width: "100%", height: "100%" }}
        onLoad={(event) => {
          setPosterReady(true);
          if (!videoRef.current) onLoad?.(event);
        }}
        onError={() => console.warn("Animation poster could not load.", media.poster)}
      />
    )}
    {active && !posterFirst && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={posterRef}
        src={media.poster}
        alt=""
        aria-hidden="true"
        className="absolute w-px h-px opacity-0 pointer-events-none"
        onLoad={() => setPosterReady(true)}
        onError={() => {
          console.warn("Animation poster could not load.", media.poster);
          if (videoRef.current?.readyState >= 2) setPosterReady(true);
        }}
      />
    )}
    </>
  );
};

const MediaImage = ({ sizes = "(max-width: 768px) 100vw, 83vw", managedLoader = false, posterFirst = false, ...props }) => {
  const pathname = usePathname();
  const [loadedSource, setLoadedSource] = useState(null);
  const media = getGifMedia(props.src);
  const showLoader = !managedLoader && pathname.startsWith("/work-detail/");
  const handleLoad = (event) => {
    setLoadedSource(props.src);
    props.onLoad?.(event);
  };
  const contentProps = showLoader && !props.fill
    ? { ...props, className: "block w-full h-auto", style: undefined }
    : props;
  const content = media
    ? <AnimatedImage key={media.video} media={media} {...contentProps} sizes={sizes} posterFirst={posterFirst} onLoad={handleLoad} />
    : <Image sizes={sizes} {...contentProps} onLoad={handleLoad} onError={(event) => {
      console.warn("Image could not load.", props.src);
      setLoadedSource(props.src);
      props.onError?.(event);
    }} />;
  if (!showLoader) return content;
  return (
    <div className={props.fill ? "absolute inset-0" : `relative ${props.className || "w-full"}`} style={props.style}>
      {content}
      {loadedSource !== props.src && <MediaLoader className="absolute inset-0 z-10 pointer-events-none" />}
    </div>
  );
};

export default MediaImage;

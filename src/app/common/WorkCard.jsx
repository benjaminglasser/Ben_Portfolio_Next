"use client";

import ImageWithLoader from "./ImageWithLoader";
import Link from "next/link";
import { useDesignVersion } from "./design/DesignVersion";
import DotDigits from "./design/DotDigits";
import { useCallback, useEffect, useRef, useState } from "react";
import HalftoneCover from "./HalftoneCover";
import useMobileThumbnails from "./useMobileThumbnails";

const WorkCard = ({
  path,
  role,
  time,
  title,
  description,
  thumbnail,
  animationSource,
  halftoneDetail = 0,
  tone = "auto",
  levels,
  animateThumbnail = true,
  prepareThumbnail = true,
  preload = false,
  externalLink,
  number,
  aspectClass = "aspect-[3/2]",
}) => {
  const { level } = useDesignVersion();
  const mobile = useMobileThumbnails();
  const frameRef = useRef(null);
  const [loadedImage, setLoadedImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touchVisible, setTouchVisible] = useState(false);
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.5 });
  const handleImageReady = useCallback((element) => {
    setLoadedImage({ element, source: thumbnail });
  }, [thumbnail]);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)");
    let observer;
    const observe = () => {
      observer?.disconnect();
      setTouchVisible(false);
      if (!touch.matches) return;
      observer = new IntersectionObserver(([entry]) => {
        setTouchVisible(entry.isIntersecting);
      }, { threshold: 0.15 });
      observer.observe(frameRef.current);
    };
    observe();
    touch.addEventListener("change", observe);
    return () => {
      observer?.disconnect();
      touch.removeEventListener("change", observe);
    };
  }, []);

  const handleEnter = (event) => {
    if (event.pointerType === "touch") return;
    const rect = frameRef.current.getBoundingClientRect();
    setOrigin({
      x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
    });
    setHovered(true);
  };

  return (
    <Link
      href={{
        pathname: path,
      }}
      target={externalLink ? "_blank" : "_self"}
      onPointerEnter={handleEnter}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="group cursor-pointer w-full workcard">
        <div ref={frameRef} className="card-frame">
          <div className="card-ticks" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          {mobile !== null && <ImageWithLoader
            src={thumbnail}
            alt={`${title} - ${description}`}
            width="100"
            height="100"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="thumbnail"
            wrapperClassName={`!rounded-none ${aspectClass}`}
            unoptimized={typeof thumbnail === 'string' && (thumbnail.endsWith('.gif') || thumbnail.endsWith('.webp'))}
            onImageReady={handleImageReady}
            loading={!mobile && preload ? "eager" : undefined}
            posterFirst={mobile === true}
          >
            {loadedImage?.source === thumbnail && (
              <HalftoneCover
                key={typeof thumbnail === "string" ? thumbnail : thumbnail?.src}
                tone={tone}
                levels={levels}
                liveEnabled={animateThumbnail}
                prepareEnabled={prepareThumbnail}
                detailEnhancement={halftoneDetail}
                image={loadedImage.element}
                animationSource={mobile ? undefined : loadedImage.element.tagName === "VIDEO" ? undefined : animationSource}
                preload={!mobile && preload}
                animated={loadedImage.element.tagName === "VIDEO" || !mobile && /\.gif(?:$|[?#])/i.test(
                  typeof thumbnail === "string" ? thumbnail : thumbnail?.src || thumbnail?.default || ""
                )}
                revealed={hovered || focused || touchVisible}
                origin={origin}
              />
            )}
          </ImageWithLoader>}
        </div>
        <div className="flex gap-6 pt-3">
          <div className="desc-mono subtext text-black shrink-0">
            {level >= 2 ? (
              <span className="flex items-center gap-2 pt-[3px]">
                <DotDigits value={number} pitch={2.4} />
              </span>
            ) : (
              number
            )}
          </div>
          <div className="card-info w-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ease-out">
            <div className="spec-line text-black display-title font-normal">{title}</div>
            <h4 className="spec-line pt-1 text-mute subtext desc-mono">{description}</h4>
            <div className="spec-line flex justify-between gap-4 desc-mono uppercase tracking-wide text-[#a6564a] mt-4 text-[0.68rem] leading-relaxed">
              <div>Role: {role}</div>
              <div className="shrink-0">{time}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;

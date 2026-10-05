"use client";

import React, { useEffect, useRef, useState } from "react";
import { PuffLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import { useDesignVersion } from "./design/DesignVersion";
import DotDigits from "./design/DotDigits";
import HeroHalftone from "./HeroHalftone";

const VideoPlayerHome = ({ video1, className, centered, onLoadingChange, pageReady = true, loadingExpired = false, showLoader = true, onEntranceComplete, pixelEntrance = false, entranceReady = true }) => {
  const pathname = usePathname();
  const isBMWPage = pathname?.includes("/work-detail/bmw");
  const isPointARPage = pathname?.includes("/work-detail/pointAR");
  const shouldShowSpinner = !isBMWPage && !isPointARPage;

  const video1Ref = useRef(null);
  const containerRef = useRef(null);
  const loadingTimeoutRef = useRef(null);
  const fadeInRef = useRef(false);
  const rippleRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const { level } = useDesignVersion();
  const showBoot = level >= 3;
  const pageLoading = !pageReady || (loading && !loadingExpired);
  const showVideo = fadeIn && pageReady;

  const dispersePixels = (e) => {
    if (pageLoading || error || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    rippleRef.current?.send(e.detail === 0 ? { x: 0.5, y: 0.5 } : {
        x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    if (!e.repeat && !pageLoading && !error) rippleRef.current?.send({ x: 0.5, y: 0.5 });
  };

  useEffect(() => {
    const videos = [video1Ref.current].filter(Boolean);
    if (videos.length !== 1) return undefined;

    let cancelled = false;

    const waitUntilPlayable = (video) => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        const cleanUp = () => {
          video.removeEventListener("loadeddata", handleLoadedData);
          video.removeEventListener("canplay", handleLoadedData);
          video.removeEventListener("error", handleError);
        };
        const handleLoadedData = () => {
          cleanUp();
          resolve();
        };
        const handleError = () => {
          cleanUp();
          reject(new Error("Video failed to load"));
        };

        video.addEventListener("loadeddata", handleLoadedData, { once: true });
        video.addEventListener("canplay", handleLoadedData, { once: true });
        video.addEventListener("error", handleError, { once: true });
        video.load();
      });
    };

    const handleCanPlayThrough = (e) => {
      if (!cancelled && fadeInRef.current && e.target.paused) {
        e.target.play().catch((playError) => console.warn("Home video could not resume:", playError));
      }
    };

    const startVideos = async () => {
      try {
        loadingTimeoutRef.current = setTimeout(() => {
          if (!cancelled) {
            setError(true);
            setLoading(false);
          }
        }, 30000);

        videos.forEach((video) => {
          video.currentTime = 0;
          video.preload = "auto";
        });

        await Promise.all(videos.map(waitUntilPlayable));
        await Promise.all(videos.map((video) => video.play()));

        if (!cancelled) {
          setFadeIn(true);
          setLoading(false);
          videos.forEach((video) => {
            video.addEventListener("canplaythrough", handleCanPlayThrough);
          });
        }
      } catch (loadError) {
        console.error("Error loading home videos:", loadError);

        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      } finally {
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
      }
    };

    startVideos();

    return () => {
      cancelled = true;

      videos.forEach((video) => {
        video.removeEventListener("canplaythrough", handleCanPlayThrough);
      });
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fadeInRef.current = fadeIn;
  }, [fadeIn]);

  // Boot counter: real buffered progress of the video, so the number
  // reflects actual loading rather than a fake timer.
  useEffect(() => {
    if (!loading) {
      setBootProgress(100);
      return;
    }
    const read = (v) => {
      if (!v || !v.duration || !v.buffered?.length) return v?.readyState >= 3 ? 1 : 0;
      const end = v.buffered.end(v.buffered.length - 1);
      return Math.min(1, end / Math.min(v.duration, 4));
    };
    const id = setInterval(() => {
      const p = read(video1Ref.current);
      setBootProgress((prev) => Math.max(prev, Math.min(99, Math.round(p * 100))));
    }, 120);
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  useEffect(() => {
    if (error) onEntranceComplete?.();
  }, [error, onEntranceComplete]);

  const videoClassName = "object-cover w-full h-[500px] md:h-[70vh] absolute";
  const fadeStyle = {
    opacity: showVideo ? 1 : 0,
  };

  return (
    <div className={`${centered ? "flex justify-center items-center" : "block"}`}>
      <div
        ref={containerRef}
        className={`${className} w-full overflow-hidden flex justify-center h-[500px] md:h-[70vh] relative ${
          centered ? "mt-10 w-full px-5 md:w-3/5" : "md:w-full"
        }`}
      >
        {showLoader && pageLoading && shouldShowSpinner && showBoot && (
          <div
            className="absolute inset-0 flex justify-center items-center z-20"
            role="status"
          >
            <div className="boot-counter">
              <DotDigits
                value={String(pageReady ? bootProgress : Math.min(99, bootProgress)).padStart(3, "0")}
                pitch={5}
                label={`Loading ${pageReady ? bootProgress : Math.min(99, bootProgress)} percent`}
              />
              <div className="boot-counter__bar" aria-hidden="true">
                <span style={{ transform: `scaleX(${bootProgress / 100})` }} />
              </div>
              <span aria-hidden="true">Loading</span>
            </div>
          </div>
        )}
        {showLoader && pageLoading && shouldShowSpinner && !showBoot && (
          <div className="absolute inset-0 flex justify-center items-center z-20">
            <PuffLoader
              color="#b02b1a"
              loading
              size={100}
              aria-label="Loading spinner"
              data-testid="loader"
            />
          </div>
        )}

        {error ? (
          <div className="w-full h-full flex justify-center items-center bg-gray-100">
            <p className="text-gray-500">Failed to load video</p>
          </div>
        ) : (
          <>
            <video
              ref={video1Ref}
              className={videoClassName}
              style={fadeStyle}
              autoPlay
              loop
              playsInline
              muted
              preload="auto"
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <HeroHalftone
              videoRef={video1Ref}
              rippleRef={rippleRef}
              loaded={showVideo && entranceReady}
              pixelEntrance={pixelEntrance}
              onEntranceComplete={onEntranceComplete}
            />
          </>
        )}

        {!error && (
        <div
          className="absolute inset-0 z-30 hero-ripple-surface"
          role="button"
          tabIndex={0}
          aria-label="Disperse pixels through the video"
          aria-disabled={pageLoading}
          data-cursor="plain"
          onClick={dispersePixels}
          onKeyDown={handleKeyDown}
        />
        )}
      </div>
    </div>
  );
};

export default VideoPlayerHome;

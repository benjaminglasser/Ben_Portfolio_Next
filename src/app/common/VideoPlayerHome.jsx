"use client";

import React, { useEffect, useRef, useState } from "react";
import { PuffLoader } from "react-spinners";
import { usePathname } from "next/navigation";

const VideoPlayerHome = ({ video1, video2, className, centered, onLoadingChange }) => {
  const pathname = usePathname();
  const isBMWPage = pathname?.includes("/work-detail/bmw");
  const isPointARPage = pathname?.includes("/work-detail/pointAR");
  const shouldShowSpinner = !isBMWPage && !isPointARPage;

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const containerRef = useRef(null);
  const loadingTimeoutRef = useRef(null);
  const syncFrameRef = useRef(null);
  const fadeInRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const setMask = (x, y, size) => {
    if (!containerRef.current) return;

    containerRef.current.style.setProperty("--mask-x", `${x}px`);
    containerRef.current.style.setProperty("--mask-y", `${y}px`);
    containerRef.current.style.setProperty("--mask-size", `${size}px`);
  };

  const getMaskSize = (x, y, rect) => {
    const edgeThreshold = 100;
    const minSize = 16;
    const maxSize = 180;
    const minDistance = Math.min(x, rect.width - x, y, rect.height - y);

    if (minDistance >= edgeThreshold) return maxSize;

    return minSize + (maxSize - minSize) * (minDistance / edgeThreshold);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isHovering) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMask(x, y, getMaskSize(x, y, rect));
  };

  const handleMouseEnter = (e) => {
    setIsHovering(true);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMask(x, y, getMaskSize(x, y, rect));
    }

    window.dispatchEvent(new CustomEvent("videoPlayerHover", { detail: true }));
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    window.dispatchEvent(new CustomEvent("videoPlayerHover", { detail: false }));
  };

  useEffect(() => {
    const videos = [video1Ref.current, video2Ref.current].filter(Boolean);
    if (videos.length !== 2) return undefined;

    let cancelled = false;
    const [masterVideo, followerVideo] = videos;

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

    // Keep the follower locked to the master's timeline every frame so the
    // x-ray reveal always shows the same moment in both videos. Native
    // `loop` on each element would let them restart at slightly different
    // times and drift apart, so looping is handled manually below instead.
    const DRIFT_TOLERANCE = 0.05;
    const runSyncLoop = () => {
      if (cancelled) return;

      if (!masterVideo.paused && !masterVideo.seeking) {
        const drift = Math.abs(followerVideo.currentTime - masterVideo.currentTime);
        if (drift > DRIFT_TOLERANCE) {
          followerVideo.currentTime = masterVideo.currentTime;
        }
        if (followerVideo.paused) {
          followerVideo.play().catch(() => {});
        }
      }

      syncFrameRef.current = requestAnimationFrame(runSyncLoop);
    };

    const handleMasterEnded = () => {
      masterVideo.currentTime = 0;
      followerVideo.currentTime = 0;
      masterVideo.play().catch(() => {});
      followerVideo.play().catch(() => {});
    };

    // On a slower connection a video can briefly stall to buffer. Rather
    // than pausing both (which can permanently freeze them if the browser
    // never fires a "resume" event on its own), just make sure playback
    // resumes for whichever video the browser paused once it's ready again.
    // The per-frame sync loop above keeps the follower locked to the
    // master's timeline regardless, so a brief stall never causes drift.
    const handleCanPlayThrough = (e) => {
      if (!cancelled && fadeInRef.current && e.target.paused) {
        e.target.play().catch(() => {});
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
          masterVideo.addEventListener("ended", handleMasterEnded);
          videos.forEach((video) => {
            video.addEventListener("canplaythrough", handleCanPlayThrough);
          });
          syncFrameRef.current = requestAnimationFrame(runSyncLoop);
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

      if (syncFrameRef.current) {
        cancelAnimationFrame(syncFrameRef.current);
      }
      masterVideo.removeEventListener("ended", handleMasterEnded);
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

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  const videoClassName = "object-cover w-full h-[500px] md:h-[70vh] absolute";
  const fadeStyle = {
    opacity: fadeIn ? 1 : 0,
    transition: "opacity 1s ease-in-out",
  };

  return (
    <div className={`${centered ? "flex justify-center items-center" : "block"}`}>
      <div
        ref={containerRef}
        className={`${className} w-full overflow-hidden flex justify-center h-[500px] md:h-[70vh] relative ${
          centered ? "mt-10 w-full px-5 md:w-3/5" : "md:w-full"
        }`}
      >
        {loading && shouldShowSpinner && (
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
              ref={video2Ref}
              className={videoClassName}
              style={fadeStyle}
              autoPlay
              playsInline
              muted
              preload="auto"
            >
              <source src={video2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video
              ref={video1Ref}
              className={videoClassName}
              style={{
                ...fadeStyle,
                maskImage: isHovering
                  ? "radial-gradient(circle var(--mask-size) at var(--mask-x) var(--mask-y), transparent 99%, black 100%)"
                  : "none",
                WebkitMaskImage: isHovering
                  ? "radial-gradient(circle var(--mask-size) at var(--mask-x) var(--mask-y), transparent 99%, black 100%)"
                  : "none",
                transition:
                  "opacity 1s ease-in-out, mask-image 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-mask-image 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              autoPlay
              playsInline
              muted
              preload="auto"
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        )}

        <div
          className="absolute inset-0 z-30 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
};

export default VideoPlayerHome;

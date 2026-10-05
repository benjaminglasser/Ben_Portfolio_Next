"use client";
// import Image from "next/image";
// import { IMAGES } from "../../public/images";
// import Grid from "@mui/system/Unstable_Grid/Grid";
import WorkSection from "@/app/common/WorkSection";
import HomePageExtraInfo from "@/app/common/HomePageExtraInfo";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import VideoPlayerHome from "@/app/common/VideoPlayerHome.jsx";
import DotDigits from "@/app/common/design/DotDigits";
import { usePageTransition } from "@/app/common/PageTransition";
import useMobileThumbnails from "@/app/common/useMobileThumbnails";

let homeLoadedOnce = false;

export default function Home() {
  const routeTransition = usePageTransition();
  const mobileThumbnails = useMobileThumbnails();
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [fadeComplete, setFadeComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [revealStarted, setRevealStarted] = useState(false);
  const [returningHome, setReturningHome] = useState(false);
  const [heroResolved, setHeroResolved] = useState(false);
  const pageRef = useRef(null);
  const readyRef = useRef(false);
  const progressTargetRef = useRef(0);

  useLayoutEffect(() => {
    let loaded = homeLoadedOnce;
    try {
      loaded = loaded || sessionStorage.getItem("homeLoadedOnce") === "true";
    } catch (error) {
      console.warn("Home visit could not be restored from browser storage.", error);
    }
    if (!loaded) return;
    setReturningHome(true);
    setProgress(100);
    setRevealStarted(true);
    setFadeComplete(true);
    homeLoadedOnce = true;
  }, []);

  useEffect(() => {
    if (!fadeComplete || returningHome) return;
    homeLoadedOnce = true;
    try {
      sessionStorage.setItem("homeLoadedOnce", "true");
    } catch (error) {
      console.warn("Home visit could not be saved to browser storage.", error);
    }
  }, [fadeComplete, returningHome]);

  useEffect(() => {
    if (returningHome || mobileThumbnails === null) return;
    let cancelled = false;
    let fontsReady = false;
    document.fonts.ready.then(() => { fontsReady = true; });
    const interval = setInterval(() => {
      if (cancelled) return;
      const cards = [...pageRef.current.querySelectorAll(".card-frame")];
      const ready = cards.length > 0 && cards.every((card) => {
        const image = card.querySelector("img:not([aria-hidden])");
        const cover = card.querySelector("canvas");
        const animation = card.querySelector("video");
        const imageReady = image ? image.complete && image.naturalWidth > 0 : animation?.readyState >= 2;
        return imageReady &&
          cover?.dataset.ready === "true" &&
          (!animation || animation.readyState >= 2 && (!animation.dataset.animatedImage || animation.dataset.posterReady === "true"));
      });
      const hero = pageRef.current.querySelector("video");
      let total = 2;
      let complete = Number(fontsReady) + Number(hero?.readyState >= 2 && !hero.paused);
      (mobileThumbnails ? [] : cards).forEach((card) => {
        const image = card.querySelector("img:not([aria-hidden])");
        const cover = card.querySelector("canvas");
        const animation = card.querySelector("video");
        total += animation ? 3 : 2;
        complete += Number(image ? image.complete && image.naturalWidth > 0 : animation?.readyState >= 2) +
          Number(cover?.dataset.ready === "true") +
          (animation ? Number(animation.readyState >= 2) : 0);
      });
      progressTargetRef.current = Math.max(progressTargetRef.current, Math.min(99, Math.floor(complete / total * 100)));
      if (fontsReady && (mobileThumbnails || ready)) {
        setAssetsReady(true);
        clearInterval(interval);
      }
    }, 100);
    const timeout = setTimeout(() => {
      if (!cancelled && !readyRef.current) {
        setTimedOut(true);
        clearInterval(interval);
        console.warn("Home loading limit reached; showing the page while remaining assets load.");
      }
    }, 8000);
    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [returningHome, mobileThumbnails]);

  const pageReady = returningHome || timedOut || (assetsReady && !isVideoLoading);
  const selectedWorksReady = revealStarted && heroResolved;

  useEffect(() => {
    readyRef.current = pageReady;
    if (pageReady) progressTargetRef.current = 100;
  }, [pageReady]);

  useEffect(() => {
    if (returningHome) return;
    const timer = setInterval(() => {
      setProgress((value) => Math.min(progressTargetRef.current, value + Math.max(1, Math.ceil((progressTargetRef.current - value) / 4))));
    }, 60);
    return () => clearInterval(timer);
  }, [returningHome]);

  useEffect(() => {
    if (returningHome || !pageReady || progress !== 100) return;
    const timer = setTimeout(() => {
      setRevealStarted(true);
      setFadeComplete(true);
    }, 280);
    return () => clearTimeout(timer);
  }, [returningHome, pageReady, progress]);

  return (
    <div ref={pageRef} className="relative home-sequence" data-home-stage={revealStarted ? "ready" : "loading"} data-home-returning={returningHome} data-home-wave={heroResolved ? "ready" : "resolving"} aria-busy={!revealStarted}>
      {!fadeComplete && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center text-white desc-mono home-loading-screen" aria-hidden={revealStarted}>
          <div className="flex flex-col items-center gap-4" role="progressbar" aria-label="Loading home page" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <DotDigits value={String(progress).padStart(3, "0")} pitch={5} label={`Loading ${progress} percent`} />
            <span className="edge-label">Loading</span>
          </div>
        </div>
      )}
      <div className="full-bleed relative -mt-3 md:mt-0 home-hero-content" aria-hidden={!revealStarted} inert={!revealStarted ? "" : undefined}>
        <VideoPlayerHome
          video1="/Media/Home/optimized/water_wireframe_optimized.mp4"
          onLoadingChange={setIsVideoLoading}
          pageReady={revealStarted}
          loadingExpired={timedOut}
          showLoader={false}
          pixelEntrance
          entranceReady={routeTransition.ready}
          onEntranceComplete={() => setHeroResolved(true)}
        />
        {/* Tagline, bottom-right of the hero */}
        <HomePageExtraInfo isLoading={!selectedWorksReady} unifiedEntrance />
      </div>

      <div className="mt-16 md:mt-24 home-selected-works" aria-hidden={!selectedWorksReady} inert={!selectedWorksReady ? "" : undefined}>
        <WorkSection
          preloadThumbnails={!returningHome}
          animateThumbnails={selectedWorksReady}
          prepareThumbnails={!returningHome || selectedWorksReady}
        />
      </div>
    </div>
  );
}

// <div
// className="home-wrapper" style={{ height: "calc(100vh - 300px)" }}
// >
{
  /* <div className="cross-hair-grid">
        <div className="cross-hairs">
          {[...Array(20)].map((_, index) => (
            <div className="cross-hair" key={index}>
              <Image
                className="sky"
                src={IMAGES.CROSS_HAIR_SM}
                alt="crosshair"
              />
            </div>
          ))}
        </div>
      </div> */
}
{
  /* <div className="one hidden md:block">
        <div className="box1"></div>
        <div className="box2"></div>
      </div> */
}
{
  /* <Grid container className="mt-5 md:mt-10 h-full flex items-center"> */
}
{
  /* <Grid xs={12} md={9}>
          <div className="px-0 md:px-8 lg:px-32">
            <a href="mailto:glasserben@gmail.com" target="_blank">
              <Image
                className="sky-gif w-full"
                src={IMAGES.SKY_GIF}
                alt="generative sky"
              />
            </a>
            <div className="border-b mt-5 md:mt-10" />
          </div>
        </Grid> */
}
{
  /* </Grid> */
}
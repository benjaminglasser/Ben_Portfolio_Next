"use client";
import React, { useEffect, useRef, useState } from "react";

// Delay before the scroll hint appears once the user goes idle in the hero.
const IDLE_MS = 8000;

/**
 * Subtle "scroll" affordance for work-detail hero sections.
 * Appears fixed at the bottom of the fold after ~30s of no scrolling while the
 * user is still within the hero, and fades away as soon as they scroll.
 */
const ScrollHint = () => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Consider the user "in the hero" while they're near the top of the page.
    const isInHero = () => window.scrollY < window.innerHeight * 0.5;

    const startTimer = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (isInHero()) setVisible(true);
      }, IDLE_MS);
    };

    const handleScroll = () => {
      setVisible(false);
      if (isInHero()) startTimer();
      else clearTimeout(timerRef.current);
    };

    startTimer();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none
                  flex flex-col items-center gap-2 text-white
                  transition-opacity duration-700 ease-in-out
                  ${visible ? "opacity-70" : "opacity-0"}`}
    >
      <span className="text-xxs tracking-[0.3em] uppercase">Scroll</span>
      <svg
        className="w-6 h-6 animate-scrollNudge motion-reduce:animate-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
};

export default ScrollHint;

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PixelEntrance from "./PixelEntrance";
import DotDigits from "./design/DotDigits";

const ROLES = ["media", "experience", "product", "music", "whatever"];
const HOLD_DURATION = 2400;
const CHANGE_DURATION = 700;

const HomePageExtraInfo = ({ isLoading, unifiedEntrance = false }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [changePhase, setChangePhase] = useState("hold");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);
    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isLoading || reducedMotion || (unifiedEntrance && !entranceComplete)) {
      setChangePhase("hold");
      return undefined;
    }

    const phaseDuration = changePhase === "hold" ? HOLD_DURATION : CHANGE_DURATION;
    const timeout = window.setTimeout(() => {
      if (changePhase === "hold") {
        setChangePhase("dissolving");
      } else if (changePhase === "dissolving") {
        setRoleIndex((currentIndex) => (currentIndex + 1) % ROLES.length);
        setChangePhase("forming");
      } else {
        setChangePhase("hold");
      }
    }, phaseDuration);

    return () => window.clearTimeout(timeout);
  }, [changePhase, entranceComplete, isLoading, reducedMotion, unifiedEntrance]);

  const tagline = (
    <>
      <span className="sr-only">{ROLES[roleIndex]} designer</span>
      <span className="home-tagline-visual" aria-hidden="true">
        <span className={`home-tagline-role home-tagline-dots is-${changePhase}`}>
          <DotDigits value={ROLES[roleIndex]} pitch={1.6} ghost={false} />
        </span>
        <span className="home-tagline-fixed home-tagline-dots">
          <DotDigits value="designer" pitch={1.6} ghost={false} />
        </span>
      </span>
    </>
  );

  if (unifiedEntrance) {
    return (
      <div className="absolute bottom-5 md:bottom-8 right-5 md:right-10 z-10 home-hero-copy" aria-hidden={isLoading}>
        <PixelEntrance
          active={!isLoading}
          sharedSpeed
          onComplete={() => setEntranceComplete(true)}
        >
          <p className="edge-label text-white/70 text-right home-tagline">{tagline}</p>
        </PixelEntrance>
      </div>
    );
  }

  return (
    <motion.p
      className="absolute bottom-5 md:bottom-8 right-5 md:right-10 z-10 edge-label text-white/70 text-right home-tagline"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
    >
      {tagline}
    </motion.p>
  );
};

export default HomePageExtraInfo;

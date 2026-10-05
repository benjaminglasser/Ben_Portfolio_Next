"use client";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BACKGROUND_DURATION, routeBackground } from "./routeAppearance";

const BackgroundTransition = () => {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className="fixed inset-0 -z-10 site-background"
      initial={false}
      animate={{
        backgroundColor: routeBackground(pathname),
      }}
      transition={{
        duration: reducedMotion ? 0 : BACKGROUND_DURATION,
        ease: "easeInOut",
      }}
    />
  );
};

export default BackgroundTransition; 
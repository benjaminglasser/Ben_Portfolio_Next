"use client";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const BackgroundTransition = () => {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const isPlayPage = pathname === "/play";
  const isWorkDetailPage = pathname.startsWith("/work-detail");

  return (
    <motion.div
      className="fixed inset-0 -z-10 site-background"
      initial={false}
      animate={{
        backgroundColor: pathname === "/" || isPlayPage || isWorkDetailPage ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
      }}
      transition={{
        duration: reducedMotion ? 0 : pathname === "/" ? 0.8 : isPlayPage || pathname === "/info" ? 0.5 : 0,
        ease: "easeInOut",
      }}
    />
  );
};

export default BackgroundTransition; 
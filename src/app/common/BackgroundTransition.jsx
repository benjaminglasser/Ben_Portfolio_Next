"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const BackgroundTransition = () => {
  const pathname = usePathname();
  const isPlayPage = pathname === "/play";
  const isWorkDetailPage = pathname.startsWith("/work-detail");

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={false}
      animate={{
        backgroundColor: isPlayPage || isWorkDetailPage ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
      }}
      transition={{
        duration: isPlayPage || pathname === "/" || pathname === "/info" ? 0.5 : 0,
        ease: "easeInOut",
      }}
    />
  );
};

export default BackgroundTransition; 
"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const BackgroundTransition = () => {
  const pathname = usePathname();
  const isPlayPage = pathname === "/play";

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={false}
      animate={{
        backgroundColor: isPlayPage ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    />
  );
};

export default BackgroundTransition; 
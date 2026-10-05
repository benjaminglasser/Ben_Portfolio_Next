import { motion } from "framer-motion";
import PixelEntrance from "./PixelEntrance";

const HomePageExtraInfo = ({ isLoading, unifiedEntrance = false }) => {
  if (unifiedEntrance) {
    return (
      <div className="absolute bottom-5 md:bottom-8 right-5 md:right-10 z-10 home-hero-copy" aria-hidden={isLoading}>
      <PixelEntrance active={!isLoading} duration={350}>
      <p className="edge-label text-white/70 text-right">
        designer, media artist + musician
      </p>
      </PixelEntrance>
      </div>
    );
  }
  return (
    <motion.p
      className="absolute bottom-5 md:bottom-8 right-5 md:right-10 z-10 edge-label text-white/70 text-right"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
    >
      designer, media artist + musician
    </motion.p>
  );
};

export default HomePageExtraInfo;

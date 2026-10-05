"use client";

import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BACKGROUND_DURATION, routeBackground } from "./routeAppearance";

const PageTransitionContext = createContext({ navigating: false, ready: true });
export const usePageTransition = () => useContext(PageTransitionContext);

const PageEntrance = ({ children, pathname, previousPath }) => {
  const reducedMotion = useReducedMotion();
  const [entrance] = useState(() => ({
    navigating: previousPath !== null && previousPath !== pathname,
    changesBackground: previousPath !== null && routeBackground(previousPath) !== routeBackground(pathname),
  }));
  const [complete, setComplete] = useState(!entrance.navigating);

  return (
    <motion.div
      className="page-transition"
      data-route={pathname}
      data-transition-stage={complete || reducedMotion ? "ready" : "entering"}
      initial={{ opacity: entrance.navigating ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: reducedMotion ? 0 : entrance.changesBackground ? BACKGROUND_DURATION : 0,
        duration: reducedMotion || pathname === "/" || !entrance.navigating ? 0 : 0.5,
        ease: "easeInOut",
      }}
      inert={!complete && !reducedMotion ? "" : undefined}
      onAnimationComplete={() => setComplete(true)}
    >
      <PageTransitionContext.Provider value={{ navigating: entrance.navigating, ready: complete || !!reducedMotion }}>
        {children}
      </PageTransitionContext.Provider>
    </motion.div>
  );
};

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const previousPath = useRef(null);

  useLayoutEffect(() => {
    previousPath.current = pathname;
  }, [pathname]);

  return (
    <PageEntrance key={pathname} pathname={pathname} previousPath={previousPath.current}>
      {children}
    </PageEntrance>
  );
}

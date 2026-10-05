"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDesignVersion } from "./design/DesignVersion";
import ScatterName from "./design/ScatterName";

const DEVICE_KEYS = [
  { label: "Work", route: "/", match: (p) => p === "/" || p.startsWith("/work") },
  { label: "Play", route: "/play", match: (p) => p === "/play" },
  { label: "Info", route: "/info", match: (p) => p === "/info" },
];

// Refreshed nav: name drawn in dot-matrix that boots on load, pages as
// quiet text links with a small status light for the current page.
const DeviceBar = ({ pathname, color, level, scrolled }) => {
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setBooting(false), 1500);
    return () => clearTimeout(id);
  }, []);
  return (
  <div
    className={`device-bar relative flex justify-between items-center gap-4 px-5 md:px-10 py-3 ${
      level >= 2 && scrolled ? "is-ruled" : ""
    }`}
    style={{ color }}
  >
    <Link href="/" className="device-name" aria-label="Benjamin Glasser, home">
      <ScatterName
        value="Benjamin Glasser"
        className={`dot-name ${booting && pathname !== "/" ? "is-booting" : ""}`}
        label="Benjamin Glasser"
      />
    </Link>
    <nav aria-label="Main" className="flex items-center gap-4 md:gap-6">
      {DEVICE_KEYS.map((k, i) => {
        const active = k.match(pathname || "");
        return (
          <Link
            key={k.route}
            href={k.route}
            className={`device-link ${i === 0 ? "device-link--home" : ""} ${
              active ? "is-active" : ""
            }`}
            aria-current={active ? "page" : undefined}
          >
            <span className="device-link__dot" aria-hidden="true" />
            <span>{k.label}</span>
          </Link>
        );
      })}
    </nav>
  </div>
  );
};

const READING_CELLS = 24;

// Segmented progress meter: how far through a project page you are.
const ReadingMeter = ({ color }) => {
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setLit(Math.round(p * READING_CELLS));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      className="reading-meter mx-5 md:mx-10"
      style={{ color }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round((lit / READING_CELLS) * 100)}
    >
      {Array.from({ length: READING_CELLS }, (_, i) => (
        <span key={i} className={i < lit ? "is-on" : ""} />
      ))}
    </div>
  );
};

const Navbar = () => {
  const ROUTES = [
    { label: "PLAY", route: "/play" },
    { label: "INFO", route: "/info" },
  ];

  const pathname = usePathname();
  const { level } = useDesignVersion();
  const isPlayPage = pathname === "/play";
  const isWorkDetailPage = pathname.startsWith("/work-detail");
  const isDarkPage = pathname === "/" || isPlayPage || isWorkDetailPage;
  const isHome = pathname === "/";

  // The header is fixed and transparent at the top of the page, then fades
  // in a legible background once you scroll.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled
    ? isDarkPage
      ? "rgb(255, 255, 255)"
      : "#b02b1a"
    : isHome || isDarkPage
    ? "rgb(255, 255, 255)"
    : "#b02b1a";

  const bgColor = scrolled
    ? isDarkPage
      ? "rgb(0, 0, 0)"
      : "rgb(255, 255, 255)"
    : "rgba(0, 0, 0, 0)";

  const linkColor = { color: textColor };

  return (
    <motion.div
      initial={isHome ? false : { y: -100, opacity: 0 }}
      animate={isHome ? { opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 site-navbar"
    >
      {isWorkDetailPage && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 z-0 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300"
          style={{ opacity: scrolled ? 0 : 1 }}
        />
      )}
      <div
        className={`relative z-10 transition-colors duration-300 ${
          scrolled ? "backdrop-blur-md" : ""
        }`}
        style={{ backgroundColor: bgColor }}
      >
        {level >= 1 ? (
          <DeviceBar
            pathname={pathname}
            color={textColor}
            level={level}
            scrolled={scrolled}
          />
        ) : (
        <div className="navbar relative flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link href="/">
              <motion.h3
                className="cursor-pointer display-title pl-5 md:pl-10"
                animate={linkColor}
                whileHover={{ color: "#b02b1a" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                BENJAMIN GLASSER
              </motion.h3>
            </Link>
          </div>
          <div className="flex justify-end items-center pr-5 md:pr-10">
            {ROUTES.map((item, idx) => (
              <Link
                href={item.route}
                key={idx}
                className={`nav-key border-r border-t px-2.5 py-0.5 ${
                  idx < ROUTES.length - 1 ? "mr-2" : ""
                }`}
                style={{ borderColor: textColor }}
              >
                <motion.h3
                  className="ml-4 md:ml-8 display-title"
                  animate={linkColor}
                  whileHover={{ color: "#b02b1a" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {item.label}
                </motion.h3>
              </Link>
            ))}
          </div>
        </div>
        )}
        {level >= 3 && isWorkDetailPage && (
          <div className="pb-2">
            <ReadingMeter color={textColor} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;

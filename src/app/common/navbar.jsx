"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Navbar = () => {
  const ROUTES = [
    { label: "PLAY", route: "/play" },
    { label: "INFO", route: "/info" },
  ];

  const pathname = usePathname();
  const isPlayPage = pathname === "/play";
  const isWorkDetailPage = pathname.startsWith("/work-detail");
  const isDarkPage = isPlayPage || isWorkDetailPage;
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
      : "#b45314"
    : isHome || isDarkPage
    ? "rgb(255, 255, 255)"
    : "#b45314";

  const bgColor = scrolled
    ? isDarkPage
      ? "rgb(0, 0, 0)"
      : "rgb(255, 255, 255)"
    : "rgba(0, 0, 0, 0)";

  const linkColor = { color: textColor };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50"
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
        <div className="navbar flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link href="/">
              <motion.h3
                className="cursor-pointer display-title pl-5 md:pl-10"
                animate={linkColor}
                whileHover={{ color: "#b45314" }}
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
                className={`border-r border-t px-2.5 py-0.5 ${
                  idx < ROUTES.length - 1 ? "mr-2" : ""
                }`}
                style={{ borderColor: textColor }}
              >
                <motion.h3
                  className="ml-4 md:ml-8 display-title"
                  animate={linkColor}
                  whileHover={{ color: "#b45314" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {item.label}
                </motion.h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;

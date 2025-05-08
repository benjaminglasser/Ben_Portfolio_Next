'use client';

import Grid from "@mui/material/Grid";
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
  const [hasAnimated, setHasAnimated] = useState(false);
  const isPlayPage = pathname === "/play";

  useEffect(() => {
    // Set hasAnimated to true after the initial animation
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000); // Match this with the animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }}
    >
      <motion.div
        animate={{
          backgroundColor: isPlayPage ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
          borderColor: isPlayPage ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
          color: isPlayPage ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Grid
          container
          className="navbar sticky top-0 pt-2 z-50 flex justify-between items-center border-b"
        >
          <Grid item xs={6} className="flex items-center ">
            <Link href="/">
              <motion.h3 
                className="cursor-pointer"
                animate={{
                  color: isPlayPage ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
                }}
                whileHover={{
                  color: "#A9232C", // Global cursor red color
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                BENJAMIN GLASSER
              </motion.h3>
            </Link>
          </Grid>
          <Grid item xs={6} className="flex justify-end items-center ">
            {ROUTES.map((item, idx) => (
              <Link
                href={item.route}
                key={idx}
                className={`border-r border-t px-2.5 py-0.5 ${
                  idx < ROUTES.length - 1 ? "mr-2" : ""
                }`}
              >
                <motion.h3 
                  className="ml-4 md:ml-8"
                  animate={{
                    color: isPlayPage ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
                  }}
                  whileHover={{
                    color: "#A9232C", // Global cursor red color
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {item.label}
                </motion.h3>
              </Link>
            ))}
          </Grid>
        </Grid>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;

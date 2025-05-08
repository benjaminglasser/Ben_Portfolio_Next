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
      <Grid
        container
        className="navbar sticky top-0 pt-2 z-50 flex justify-between items-center border-b border-black dark:border-white bg-white dark:bg-black"
      >
        <Grid item xs={6} className="flex items-center ">
          <Link href="/">
            <h3 className="text-black dark:text-white cursor-pointer hover:text-pink dark:hover:text-pink">
              BENJAMIN GLASSER
            </h3>
          </Link>
        </Grid>
        <Grid item xs={6} className="flex justify-end items-center ">
          {ROUTES.map((item, idx) => (
            <Link
              href={item.route}
              key={idx}
              className={`border-r border-t border-black dark:border-white dark:text-white px-2.5 py-0.5 hover:text-pink dark:hover:text-pink ${
                idx < ROUTES.length - 1 ? "mr-2" : ""
              }`}
            >
              <h3 className="ml-4 md:ml-8">{item.label}</h3>
            </Link>
          ))}
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Navbar;

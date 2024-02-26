"use client";
// import { Lato } from "next/font/google";
import "./globals.css";
import "./assets/fonts/index.css";
import Navbar from "./components/navbar";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loader from "./common/Loader";

// const lato = Lato({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/play" || pathname?.includes("work-detail")) {
      document?.documentElement?.classList?.add("dark");
    } else {
      document?.documentElement?.classList?.remove("dark");
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={` ${
          pathname?.includes("work-detail") ? "p-0 work-detail" : "p-6  lg:p-10"
        } md:pt-12 bg-white dark:bg-black relative`}
      >
        <Navbar />
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </body>
    </html>
  );
}

"use client";
import Head from 'next/head'; // Import Head from next/head
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
    <Head>
        <title>Ben's Portfolio</title> {/* Set a default title for your app */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon2-32x32.png" /> {/* Link your favicon here */}
        {/* Include any other head elements you need here */}
    </Head>
      <body
        className={` ${
          pathname?.includes("work-detail") 
          // | pathname?.includes("play") 
          ? "p-0 work-detail" : "p-6  lg:p-10"
        } md:pt-0 bg-white dark:bg-black relative`}
      >
        <Navbar />
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </body>
    </html>
  );
}

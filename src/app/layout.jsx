"use client";
import Head from 'next/head';
import "./globals.css";
import "./assets/fonts/index.css";
import Navbar from "./components/navbar";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loader from "./common/Loader";

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
    <>
      <Head>
        <title>Ben's Portfolio</title>
      </Head>
      <Suspense fallback={<Loader />}>
        <Navbar />
        {children}
      </Suspense>
    </>
  );
}
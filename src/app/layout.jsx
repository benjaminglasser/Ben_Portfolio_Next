"use client";
import "./globals.css";
import "./assets/fonts/index.css";
import Navbar from "./common/navbar";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loader from "./common/Loader";
// import { useRouter } from "next/router";

// const lato = Lato({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  useEffect(() => {
    if (
      pathname === "/work" ||
      pathname === "/play" ||
      pathname?.includes("work-detail")
    ) {
      document?.documentElement?.classList?.add("dark");
    } else {
      document?.documentElement?.classList?.remove("dark");
    }
  }, [pathname]);

  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Benjamin Glasser</title>
          {/* <link rel="stylesheet" href="styles.css" /> */}
          <link rel="icon" type="image/png" href="/favicon2-32x32.png" />
        </head>
        <body className="px-5 pt-3 pb-36 md:px-10 md:pt-0 md:pb-10 bg-white dark:bg-black relative">
          <Suspense fallback={<Loader />}>
            <Navbar />
            {children}
          </Suspense>
        </body>
      </html>
    </>
  );
}

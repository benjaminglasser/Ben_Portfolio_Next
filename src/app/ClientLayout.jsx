'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { DesignVersionProvider } from "./common/design/DesignVersion";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/work" ||
      pathname === "/play" ||
      pathname?.includes("work-detail")
    ) {
      document?.documentElement?.classList?.add("dark");
    } else {
      document?.documentElement?.classList?.remove("dark");
    }

    // Text-color theme keyed to the actual background color:
    // black-background pages get white text, everything else gets rust.
    const root = document?.documentElement;
    const isDarkBg =
      pathname === "/" || pathname === "/play" || pathname?.startsWith("/work-detail");
    if (root) {
      root.classList.toggle("theme-dark", isDarkBg);
      root.classList.toggle("theme-light", !isDarkBg);
      root.classList.toggle("route-work-detail", !!pathname?.includes("work-detail"));
      root.classList.toggle("route-home", pathname === "/");
    }
  }, [pathname]);

  return (
    <DesignVersionProvider>
      {children}
    </DesignVersionProvider>
  );
} 
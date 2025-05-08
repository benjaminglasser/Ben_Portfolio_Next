'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ClientLayout({ children }) {
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

  return children;
} 
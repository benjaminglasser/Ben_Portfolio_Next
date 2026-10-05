"use client";

import { useLayoutEffect, useState } from "react";

export default function useMobileThumbnails() {
  const [mobile, setMobile] = useState(null);
  useLayoutEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return mobile;
}

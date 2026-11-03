"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const CLASS = "is-navigating";
const TIMEOUT = 15000;

// Replaces the cursor with the red spinning ring between a page link click and the next page appearing.
const NavigationCursor = () => {
  const pathname = usePathname();
  const ringRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.remove(CLASS);
  }, [pathname]);

  useEffect(() => {
    let timer = 0;
    const place = (x, y) => {
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const stop = () => {
      clearTimeout(timer);
      document.documentElement.classList.remove(CLASS);
    };
    const handleMove = (event) => {
      if (document.documentElement.classList.contains(CLASS)) place(event.clientX, event.clientY);
    };
    const handleClick = (event) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.hasAttribute("download")) return;
      if (link.target && link.target !== "_self") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      place(event.clientX, event.clientY);
      document.documentElement.classList.add(CLASS);
      clearTimeout(timer);
      timer = setTimeout(stop, TIMEOUT);
    };
    document.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("popstate", stop);
    window.addEventListener("pageshow", stop);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("popstate", stop);
      window.removeEventListener("pageshow", stop);
      stop();
    };
  }, []);

  return <div ref={ringRef} className="navigation-cursor" aria-hidden="true" />;
};

export default NavigationCursor;

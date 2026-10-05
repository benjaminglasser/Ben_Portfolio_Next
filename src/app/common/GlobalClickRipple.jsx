"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "select",
  "textarea",
  "video[controls]",
  "audio[controls]",
  "[role='button']",
  "[role='link']",
  "[role='menuitem']",
  "[role='checkbox']",
  "[role='radio']",
  "[role='switch']",
  "[role='slider']",
  "[role='tab']",
  "[role='option']",
  "[tabindex]:not([tabindex='-1'])",
  "[contenteditable]:not([contenteditable='false'])",
  "[class*='cursor-pointer']",
  "[onclick]",
  ".workcard",
  ".work-card",
  ".thumbnail",
  "[data-interactive]",
].join(", ");

const CELL_SIZE = 5.5;
const RIPPLE_DURATION = 1400;
const MAX_RIPPLES = 4;

const hash = (x, y) => {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

const smoothstep = (edge0, edge1, value) => {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

export default function GlobalClickRipple() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ripples = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (now) => {
      frame = 0;
      context.clearRect(0, 0, width, height);
      ripples = ripples.filter((ripple) => now - ripple.startedAt < RIPPLE_DURATION);

      ripples.forEach((ripple) => {
        const progress = (now - ripple.startedAt) / RIPPLE_DURATION;
        const spread = 24 + 100 * progress;
        const minColumn = Math.floor((ripple.x - spread) / CELL_SIZE);
        const maxColumn = Math.ceil((ripple.x + spread) / CELL_SIZE);
        const minRow = Math.floor((ripple.y - spread) / CELL_SIZE);
        const maxRow = Math.ceil((ripple.y + spread) / CELL_SIZE);

        context.fillStyle = ripple.color;
        for (let row = minRow; row <= maxRow; row++) {
          for (let column = minColumn; column <= maxColumn; column++) {
            const centerX = (column + 0.5) * CELL_SIZE;
            const centerY = (row + 0.5) * CELL_SIZE;
            const distance = Math.hypot(centerX - ripple.x, centerY - ripple.y);
            if (distance >= spread || hash(column, row) < progress * 0.85) continue;

            const falloff = 1 - smoothstep(spread * 0.25, spread, distance);
            context.globalAlpha = 0.6 * falloff * (1 - progress);
            context.beginPath();
            context.arc(centerX, centerY, 1.25 + hash(row, column) * 0.4, 0, Math.PI * 2);
            context.fill();
          }
        }
      });

      context.globalAlpha = 1;
      if (ripples.length) frame = requestAnimationFrame(draw);
    };

    const handleClick = (event) => {
      if (motion.matches || event.button !== 0) return;

      const path = event.composedPath();
      const isInteractive = path.some((element) => {
        if (!(element instanceof Element)) return false;
        if (element.matches(INTERACTIVE_SELECTOR)) return true;
        const inlineCursor = element.style?.cursor;
        return inlineCursor === "pointer" || inlineCursor === "zoom-in";
      });
      if (isInteractive) return;

      const isDarkPage = document.documentElement.classList.contains("theme-dark");
      ripples.push({
        x: event.clientX,
        y: event.clientY,
        startedAt: performance.now(),
        color: isDarkPage ? "#e8e8e8" : "#b02b1a",
      });
      ripples = ripples.slice(-MAX_RIPPLES);
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const clearForReducedMotion = () => {
      if (!motion.matches) return;
      ripples = [];
      cancelAnimationFrame(frame);
      frame = 0;
      context.clearRect(0, 0, width, height);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("click", handleClick);
    motion.addEventListener("change", clearForReducedMotion);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", handleClick);
      motion.removeEventListener("change", clearForReducedMotion);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ width: "100%", height: "100%", zIndex: 9998 }}
      aria-hidden="true"
    />
  );
}

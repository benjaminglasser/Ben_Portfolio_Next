"use client";

import { useEffect, useRef, useState } from "react";
import { getHomeRevealSpeed } from "./homeRevealTiming";
import { requestPointerHoverCheck } from "./pointerHover";

export default function PixelEntrance({ active, delay = 0, duration = 1800, sharedSpeed = false, children, className = "", onComplete }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  const completionNotifiedRef = useRef(false);
  const [complete, setComplete] = useState(false);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) {
      console.warn("Page pixel entrance skipped: canvas rendering is unavailable.");
      setComplete(true);
      if (active && !completionNotifiedRef.current) {
        completionNotifiedRef.current = true;
        onCompleteRef.current?.();
      }
      return;
    }
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      setComplete(true);
      if (active && !completionNotifiedRef.current) {
        completionNotifiedRef.current = true;
        onCompleteRef.current?.();
      }
    };
    const wrapper = wrapperRef.current;
    const paint = () => {
      if (!wrapper?.isConnected) return;
      const { width, height } = wrapper.getBoundingClientRect();
      if (canvas.width === Math.ceil(width) && canvas.height === Math.ceil(height)) return;
      if (started) {
        finish();
        return;
      }
      canvas.width = Math.ceil(width);
      canvas.height = Math.ceil(height);
      context.fillStyle = "#000";
      context.fillRect(0, 0, canvas.width, canvas.height);
    };
    paint();
    const observer = new ResizeObserver(paint);
    observer.observe(wrapper);
    const onMotion = () => {
      if (motion.matches && active) finish();
    };
    motion.addEventListener("change", onMotion);
    // Content becomes interactive as soon as its entrance starts, so pick up a cursor
    // already resting on it instead of waiting for the next pointer move.
    if (active) requestPointerHoverCheck();
    if (active) {
      if (motion.matches) finish();
      else {
        const cell = 8;
        const cells = [];
        for (let y = 0; y < canvas.height; y += cell) {
          for (let x = 0; x < canvas.width; x += cell) {
            const noise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
            cells.push({ x, y, threshold: 0.92 * y / Math.max(1, canvas.height) + 0.08 * (noise - Math.floor(noise)) });
          }
        }
        cells.sort((a, b) => a.threshold - b.threshold);
        const revealDuration = sharedSpeed ? canvas.height / (0.92 * getHomeRevealSpeed()) : duration;
        canvas.dataset.duration = String(revealDuration);
        const start = performance.now() + delay;
        let next = 0;
        const tick = (now) => {
          const progress = Math.max(0, Math.min(1, (now - start) / revealDuration));
          if (progress > 0) started = true;
          while (next < cells.length && cells[next].threshold <= progress) {
            const { x, y } = cells[next++];
            context.clearRect(x, y, cell, cell);
          }
          if (progress < 1) frame = requestAnimationFrame(tick);
          else finish();
        };
        frame = requestAnimationFrame(tick);
      }
    }
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", onMotion);
    };
  }, [active, delay, duration, sharedSpeed]);

  return (
    <div ref={wrapperRef} className={`relative ${className}`} inert={!active && !complete ? "" : undefined}>
      <div style={{ visibility: active || complete ? "visible" : "hidden" }}>{children}</div>
      {!complete && <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-20 h-full w-full pointer-events-none" style={{ background: active ? undefined : "#000" }} />}
    </div>
  );
}

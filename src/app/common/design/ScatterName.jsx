"use client";

import { useEffect, useRef } from "react";
import DotDigits from "./DotDigits";

const PITCH = 3;
const RADIUS = 16; // screen px around the cursor that breaks apart
const MAX_PUSH = 4; // max displacement, in dot cells

// Dot-matrix name that breaks apart around the cursor. Displaced dots snap
// to whole grid cells (no smooth easing) so it reads as 8-bit, then click
// back into place when the cursor moves on.
const ScatterName = ({ value, label, className = "" }) => {
  const wrapRef = useRef(null);
  const dotsRef = useRef([]);
  const frameRef = useRef(null);
  const pointRef = useRef(null);

  useEffect(() => {
    const svg = wrapRef.current?.querySelector("svg");
    if (!svg) return;
    dotsRef.current = Array.from(svg.querySelectorAll("circle.dot-on")).map(
      (el, i) => ({
        el,
        cx: Number(el.getAttribute("cx")),
        cy: Number(el.getAttribute("cy")),
        // Stable per-dot jitter so each bit breaks off a little differently.
        jx: Math.sin(i * 12.9898) * 0.5,
        jy: Math.cos(i * 78.233) * 0.5,
        off: false,
      })
    );
  }, [value]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const update = () => {
    frameRef.current = null;
    const svg = wrapRef.current?.querySelector("svg");
    const p = pointRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scale = rect.height / (7 * PITCH) || 1;

    dotsRef.current.forEach((d) => {
      if (!p) {
        if (d.off) {
          d.el.style.transform = "";
          d.el.classList.remove("is-loose");
          d.off = false;
        }
        return;
      }
      const sx = d.cx * scale;
      const sy = d.cy * scale;
      const dx = sx - p.x;
      const dy = sy - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist >= RADIUS) {
        if (d.off) {
          d.el.style.transform = "";
          d.el.classList.remove("is-loose");
          d.off = false;
        }
        return;
      }
      const force = 1 - dist / RADIUS;
      const nx = (dist ? dx / dist : 0) + d.jx;
      const ny = (dist ? dy / dist : -1) + d.jy;
      // Quantize to whole cells for a chunky, pixel-grid feel.
      const cellsX = Math.round(nx * force * MAX_PUSH);
      const cellsY = Math.round(ny * force * MAX_PUSH);
      d.el.style.transform = `translate(${cellsX * PITCH}px, ${cellsY * PITCH}px)`;
      d.el.classList.toggle("is-loose", cellsX !== 0 || cellsY !== 0);
      d.off = true;
    });
  };

  const schedule = () => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
  };

  const reduceMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e) => {
    if (reduceMotion()) return;
    const svg = wrapRef.current?.querySelector("svg");
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    pointRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    schedule();
  };

  const onLeave = () => {
    pointRef.current = null;
    schedule();
  };

  return (
    <span
      ref={wrapRef}
      className="scatter-name"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <DotDigits value={value} pitch={PITCH} label={label} className={className} />
    </span>
  );
};

export default ScatterName;

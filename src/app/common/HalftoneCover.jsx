"use client";

import { useEffect, useRef } from "react";

const CELL = 4.5;
const DURATION = 650;
const INK = "#000000";
const EFFECT_INK = "#b02b1a";

const HalftoneCover = ({ image, revealed, origin, animated = false, animationSource, preload = false }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const targetRef = useRef({ revealed, origin });

  useEffect(() => {
    targetRef.current = { revealed, origin };
    controlsRef.current?.animate();
  }, [revealed, origin]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    const sample = document.createElement("canvas");
    const sampleContext = sample.getContext("2d", { willReadFrequently: true });
    const paper = document.createElement("canvas");
    const paperContext = paper.getContext("2d");
    if (!context || !sampleContext || !paperContext) {
      console.warn("Thumbnail halftone skipped: canvas rendering is unavailable.");
      canvas.dataset.ready = "true";
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let progress = 0;
    let cells = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 0;
    let ready = false;
    let failed = false;
    let visible = false;
    let liveFrame = 0;
    let lastSample = 0;
    let playPending = false;
    const playVideo = () => {
      if (!video || !video.paused || playPending || failed) return;
      playPending = true;
      video.play().catch((error) => {
        failed = true;
        console.warn("Animated thumbnail could not play:", error);
      }).finally(() => { playPending = false; });
    };

    const updateLive = (now) => {
      liveFrame = 0;
      if (!animated || !visible || failed || progress === 1) {
        video?.pause();
        return;
      }
      if (now - lastSample >= 32) {
        prepare(true);
        lastSample = now;
      }
      if (!failed) liveFrame = requestAnimationFrame(updateLive);
    };
    const startLive = () => {
      if (animated && visible && !failed && progress < 1 && !liveFrame) {
        playVideo();
        liveFrame = requestAnimationFrame(updateLive);
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      if (!ready || progress === 1) return;
      context.drawImage(paper, 0, 0, width, height);
      if (progress === 0) return;
      const { x, y } = targetRef.current.origin;
      const ox = x * width;
      const oy = y * height;
      const farthest = Math.hypot(
        Math.max(ox, width - ox),
        Math.max(oy, height - oy)
      );
      for (const cell of cells) {
        const distance = Math.hypot(cell.x + CELL / 2 - ox, cell.y + CELL / 2 - oy);
        const threshold = 0.78 * Math.min(1, distance / farthest) + 0.22 * cell.seed;
        if (progress >= threshold) {
          context.clearRect(cell.x, cell.y, CELL, CELL);
        } else if (threshold - progress < 0.16) {
          context.save();
          context.beginPath();
          context.rect(cell.x, cell.y, CELL, CELL);
          context.clip();
          context.fillStyle = "#ffffff";
          context.fillRect(cell.x, cell.y, CELL, CELL);
          context.fillStyle = EFFECT_INK;
          context.beginPath();
          context.arc(cell.x + CELL / 2, cell.y + CELL / 2, cell.radius, 0, Math.PI * 2);
          context.fill();
          context.restore();
        }
      }
    };

    const animate = () => {
      cancelAnimationFrame(frame);
      const target = targetRef.current.revealed ? 1 : 0;
      if (motion.matches) {
        progress = target;
        draw();
        startLive();
        if (progress === 1) video?.pause();
        return;
      }
      if (!ready || progress === target) {
        draw();
        startLive();
        return;
      }
      const from = progress;
      const start = performance.now();
      const duration = DURATION * Math.abs(target - from);
      const tick = (now) => {
        const elapsed = Math.min(1, (now - start) / duration);
        progress = from + (target - from) * elapsed;
        draw();
        startLive();
        if (elapsed < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      startLive();
    };

    const prepare = (live = false) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height || !image.naturalWidth) return;
      const dpr = window.devicePixelRatio || 1;
      const resized = width !== rect.width || height !== rect.height || pixelRatio !== dpr;
      if (ready && !resized && !live) return;
      width = rect.width;
      height = rect.height;
      pixelRatio = dpr;
      if (resized) {
        canvas.width = paper.width = Math.ceil(width * dpr);
        canvas.height = paper.height = Math.ceil(height * dpr);
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        paperContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      if (resized) {
        sample.width = cols;
        sample.height = rows;
      }
      sampleContext.clearRect(0, 0, cols, rows);

      // Sample the same centered object-cover crop as the image underneath.
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const source = video?.readyState >= 2 ? video : image;
      const sourceWidth = source === image ? image.naturalWidth : video.videoWidth;
      const sourceHeight = source === image ? image.naturalHeight : video.videoHeight;
      const sourceScale = source === image ? scale : Math.max(width / sourceWidth, height / sourceHeight);
      const cropWidth = width / sourceScale;
      const cropHeight = height / sourceScale;
      sampleContext.drawImage(
        source,
        (sourceWidth - cropWidth) / 2,
        (sourceHeight - cropHeight) / 2,
        cropWidth,
        cropHeight,
        0,
        0,
        width / CELL,
        height / CELL
      );
      let pixels;
      try {
        pixels = sampleContext.getImageData(0, 0, cols, rows).data;
      } catch (error) {
        if (error.name !== "SecurityError") throw error;
        ready = false;
        failed = true;
        context.clearRect(0, 0, width, height);
        console.warn("Thumbnail halftone skipped: the image does not allow canvas sampling.", error);
        canvas.dataset.ready = "true";
        return;
      }

      cells = [];
      paperContext.fillStyle = "#ffffff";
      paperContext.fillRect(0, 0, width, height);
      paperContext.fillStyle = INK;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col;
          const offset = index * 4;
          const alpha = pixels[offset + 3] / 255;
          const luma = (
            pixels[offset] * 0.299 +
            pixels[offset + 1] * 0.587 +
            pixels[offset + 2] * 0.114
          ) / 255;
          const darkness = (1 - luma) * alpha;
          const shade = Math.max(0, Math.min(1, (darkness - 0.15) / 0.8));
          const radius = (0.1 + 0.45 * shade * shade * (3 - 2 * shade)) * CELL;
          const x = col * CELL;
          const y = row * CELL;
          const noise = Math.sin(col * 127.1 + row * 311.7) * 43758.5453;
          cells.push({ x, y, radius, seed: noise - Math.floor(noise) });
          paperContext.save();
          paperContext.beginPath();
          paperContext.rect(x, y, CELL, CELL);
          paperContext.clip();
          paperContext.beginPath();
          paperContext.arc(x + CELL / 2, y + CELL / 2, radius, 0, Math.PI * 2);
          paperContext.fill();
          paperContext.restore();
        }
      }
      ready = true;
      canvas.dataset.ready = "true";
      if (live) draw();
      else animate();
    };

    controlsRef.current = { animate };
    const resize = () => prepare();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLive();
      else {
        video?.pause();
        cancelAnimationFrame(liveFrame);
        liveFrame = 0;
      }
    });
    visibility.observe(canvas);
    window.addEventListener("resize", resize);
    motion.addEventListener("change", animate);
    const handleVideoError = () => {
      failed = true;
      video?.pause();
      console.warn("Animated thumbnail source could not load:", animationSource);
    };
    video?.addEventListener("error", handleVideoError);
    prepare();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(liveFrame);
      video?.pause();
      video?.removeEventListener("error", handleVideoError);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", animate);
      controlsRef.current = null;
    };
  }, [image, animated, animationSource]);

  return (
    <>
      {animationSource && (
        <video
          ref={videoRef}
          src={animationSource}
          className="hidden"
          muted
          loop
          playsInline
          preload={preload ? "auto" : "none"}
          aria-hidden="true"
        />
      )}
      <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      />
    </>
  );
};

export default HalftoneCover;

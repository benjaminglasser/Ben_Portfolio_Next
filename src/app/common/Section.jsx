"use client";

// Reveal animation intentionally disabled: content renders in place without
// fading in or translating on the Y axis.
export default function Section({ children }) {
  return <section className="reveal-in">{children}</section>;
}

export function getHomeRevealSpeed() {
  const height = document.querySelector(".home-selected-works")?.getBoundingClientRect().height;
  // Keep the works' existing 2.2-second pace as the reference for the whole sweep.
  return height > 0 ? height / (2200 * 0.92) : 0.7;
}

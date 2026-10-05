export const BACKGROUND_DURATION = 0.8;

export const routeBackground = (pathname) =>
  pathname === "/" || pathname === "/play" || pathname.startsWith("/work-detail")
    ? "rgb(0, 0, 0)"
    : "rgb(255, 255, 255)";

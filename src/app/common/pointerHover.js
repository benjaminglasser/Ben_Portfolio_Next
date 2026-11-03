// One shared pointer tracker for hover targets. Browsers only fire pointerenter when
// the pointer itself moves, so content that scrolls, resizes or mounts under a still
// cursor never registers. This re-checks the element under the last known pointer
// position once per frame after those changes and notifies subscribers.
const subscribers = new Set();
let pointer = null;
let frame = 0;
let listening = false;

const check = () => {
  frame = 0;
  const target = pointer ? document.elementFromPoint(pointer.x, pointer.y) : null;
  subscribers.forEach((subscriber) => subscriber(target, pointer));
};

const requestCheck = () => {
  if (!frame && subscribers.size) frame = requestAnimationFrame(check);
};

const handleMove = (event) => {
  if (event.pointerType === "touch") {
    pointer = null;
    return;
  }
  pointer = { x: event.clientX, y: event.clientY };
};

const handleLeave = (event) => {
  if (event.relatedTarget) return;
  pointer = null;
  requestCheck();
};

const listen = () => {
  if (listening) return;
  listening = true;
  window.addEventListener("pointermove", handleMove, { passive: true });
  window.addEventListener("pointerdown", handleMove, { passive: true });
  document.addEventListener("pointerout", handleLeave, { passive: true });
  window.addEventListener("scroll", requestCheck, { passive: true, capture: true });
  window.addEventListener("resize", requestCheck, { passive: true });
};

const unlisten = () => {
  if (!listening || subscribers.size) return;
  listening = false;
  cancelAnimationFrame(frame);
  frame = 0;
  window.removeEventListener("pointermove", handleMove);
  window.removeEventListener("pointerdown", handleMove);
  document.removeEventListener("pointerout", handleLeave);
  window.removeEventListener("scroll", requestCheck, { capture: true });
  window.removeEventListener("resize", requestCheck);
};

export const subscribePointerHover = (subscriber) => {
  subscribers.add(subscriber);
  listen();
  requestCheck();
  return () => {
    subscribers.delete(subscriber);
    unlisten();
  };
};

export const requestPointerHoverCheck = requestCheck;

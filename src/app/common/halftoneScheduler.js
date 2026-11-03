// Shares main-thread time between every live halftone thumbnail. Updates run
// round-robin inside a per-frame budget, and a duty-cycle cap leaves room for
// scrolling and input. Faster machines refresh every new video frame; slower
// ones refresh the dots less often instead of dropping page frames.
const FRAME_BUDGET = 6;
const MAX_DUTY = 0.35;

const queue = new Set();
let frame = 0;
let timer = 0;
let resumeAt = 0;

const schedule = () => {
  if (frame || timer || !queue.size) return;
  const wait = resumeAt - performance.now();
  if (wait > 1) {
    timer = setTimeout(() => {
      timer = 0;
      schedule();
    }, wait);
    return;
  }
  frame = requestAnimationFrame(run);
};

const run = () => {
  frame = 0;
  const start = performance.now();
  for (const task of queue) {
    queue.delete(task);
    try {
      task();
    } catch (error) {
      console.warn("Halftone update failed:", error);
    }
    if (performance.now() - start >= FRAME_BUDGET) break;
  }
  const spent = performance.now() - start;
  resumeAt = performance.now() + Math.max(0, spent / MAX_DUTY - spent - 16.7);
  schedule();
};

export const requestHalftoneUpdate = (task) => {
  queue.add(task);
  schedule();
};

export const cancelHalftoneUpdate = (task) => {
  queue.delete(task);
};

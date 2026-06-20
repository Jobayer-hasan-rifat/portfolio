/**
 * Module-level scroll state, updated by the Lenis smooth-scroll loop and read
 * inside the R3F render loop. Kept outside React so the 3D background can react
 * to scroll every frame without triggering re-renders.
 */
export const scrollState = {
  /** Overall scroll progress through the page, 0..1. */
  progress: 0,
  /** Instantaneous scroll velocity (px/frame-ish), smoothed. */
  velocity: 0,
  /** Pointer position in normalized device coords, -1..1. */
  pointerX: 0,
  pointerY: 0,
};

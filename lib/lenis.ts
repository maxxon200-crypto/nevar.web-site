import type Lenis from "lenis";

/**
 * Shared handle to the single Lenis instance created in SmoothScroll, so other
 * client components (e.g. HashScroll) can drive Lenis-coherent programmatic
 * scrolls instead of fighting it with native scrollIntoView.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}

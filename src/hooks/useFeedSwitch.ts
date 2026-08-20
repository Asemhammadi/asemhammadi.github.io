import { useCallback, useEffect, useRef } from 'react';
import { prefersReducedMotion } from './useScrollReveal';

/**
 * A brief scanline wipe when jumping between sections — the video wall cutting
 * to another feed. It covers the moment the page is scrolling anyway, so it
 * costs nothing in reading time, and it reinforces the hero motif instead of
 * introducing a new one.
 *
 * Skipped entirely under prefers-reduced-motion.
 */
export function useFeedSwitch() {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.id = 'feed-switch';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
    elRef.current = el;
    return () => { el.remove(); elRef.current = null; };
  }, []);

  return useCallback(() => {
    const el = elRef.current;
    if (!el || prefersReducedMotion()) return;
    el.classList.remove('is-cutting');
    // Force a reflow so the animation restarts on rapid successive clicks.
    void el.offsetWidth;
    el.classList.add('is-cutting');
  }, []);
}

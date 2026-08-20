import { useEffect } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals any [data-reveal] element as it scrolls into view, and keeps watching
 * for new ones so filtered lists (projects, articles) animate too.
 *
 * The hiding styles are scoped to a `reveal-ready` class this hook puts on <html>,
 * so if the script never runs the content is simply visible rather than stuck at
 * opacity 0. Reduced-motion users get everything revealed immediately.
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;

    if (prefersReducedMotion()) {
      root.classList.remove('reveal-ready');
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
      return;
    }

    root.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      },
      // Fire a little before the element reaches the viewport edge so the motion
      // finishes about when the reader's eye arrives.
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const observeAll = () =>
      document
        .querySelectorAll('[data-reveal]:not(.is-visible)')
        .forEach(el => io.observe(el));

    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}

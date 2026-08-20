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

    // Elements observed but not yet revealed.
    const pending = new Set<Element>();

    const reveal = (el: Element) => {
      el.classList.add('is-visible');
      pending.delete(el);
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target);
        }
      },
      // Fire a little before the element reaches the viewport edge so the motion
      // finishes about when the reader's eye arrives.
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    /**
     * IntersectionObserver only reports threshold *crossings*. An element that
     * goes from below the viewport to above it in a single frame — a nav jump, a
     * hash link, a fast flick — never intersects, so no callback ever fires and it
     * would stay stranded at opacity 0 forever. This sweep catches anything the
     * reader has already scrolled past.
     */
    let frame = 0;
    const sweep = () => {
      frame = 0;
      if (pending.size === 0) return;
      for (const el of [...pending]) {
        if (el.getBoundingClientRect().bottom < 0) reveal(el);
      }
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(sweep);
    };

    const observeAll = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(el => {
        if (pending.has(el)) return;
        pending.add(el);
        io.observe(el);
      });
      sweep();
    };

    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.classList.remove('reveal-ready');
    };
  }, []);
}

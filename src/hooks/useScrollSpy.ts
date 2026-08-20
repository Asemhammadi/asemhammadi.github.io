import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the nav can highlight it while
 * the reader scrolls, not only when they click. Returns the active section id.
 */
export function useScrollSpy(ids: string[], headerOffset = 120) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const onScroll = () => {
      const marker = window.scrollY + headerOffset;

      // Bottom of the page: the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 40) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, headerOffset]);

  return active;
}

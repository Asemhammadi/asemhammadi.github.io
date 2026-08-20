import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useScrollReveal';

interface CountUpProps {
  /** Display value such as "15+", "50+" or "3". Digits animate, the rest is kept. */
  value: string;
  className?: string;
  durationMs?: number;
}

// easeOutExpo — fast off the line, long settle. Reads as deceleration rather
// than a linear tick, which is what makes a counter feel physical.
const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function CountUp({ value, className, durationMs = 1400 }: CountUpProps) {
  const target = parseInt(value.replace(/\D/g, ''), 10);
  const suffix = value.replace(/[\d\s]/g, '');
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() =>
    Number.isNaN(target) || prefersReducedMotion() ? target : 0
  );

  useEffect(() => {
    if (Number.isNaN(target) || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          setDisplay(Math.round(ease(t) * target));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]);

  if (Number.isNaN(target)) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useScrollReveal';

/**
 * Ambient backdrop for the credentials and research section: expanding wavefronts
 * from a handful of transmitters, overlapping into an interference lattice.
 *
 * It sits behind his published work — space-time block codes for LTE-A, microstrip
 * antenna design, CDMA radio planning — so the section carries the visual language
 * of the research it lists rather than borrowing the hero's security motif.
 *
 * Cheap by construction: wavefronts are stroked arcs, not per-pixel field maths.
 * Capped frame rate, pauses off-screen and when the tab is hidden, and renders a
 * single still frame under prefers-reduced-motion.
 */

const FPS = 20;
const LINE = '45, 212, 191'; // teal-400
const RING_GAP = 74;         // wavelength, px
const SPEED = 15;            // px per second

interface Emitter { x: number; y: number; phase: number; strength: number }

export function PropagationField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let emitters: Emitter[] = [];
    let w = 0, h = 0, maxR = 0;
    let raf = 0, last = 0, t = 0;
    let visible = true;

    const build = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Placed off toward the edges so the lattice forms across the middle,
      // behind the copy, rather than putting a bullseye under the heading.
      emitters = [
        { x: w * 0.14, y: h * 0.22, phase: 0,    strength: 1 },
        { x: w * 0.86, y: h * 0.34, phase: 0.45, strength: 0.9 },
        { x: w * 0.52, y: h * 0.88, phase: 0.8,  strength: 0.75 }
      ];
      maxR = Math.hypot(w, h) * 0.78;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      for (const e of emitters) {
        const offset = ((t * SPEED) + e.phase * RING_GAP) % RING_GAP;
        for (let r = offset; r < maxR; r += RING_GAP) {
          if (r < 6) continue;
          // Fade with distance — energy falls off, and it keeps the far field quiet.
          const fade = (1 - r / maxR) ** 1.6;
          ctx.strokeStyle = `rgba(${LINE}, ${0.5 * fade * e.strength})`;
          ctx.beginPath();
          ctx.arc(e.x, e.y, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // transmitter node
        ctx.fillStyle = `rgba(${LINE}, ${0.55 * e.strength})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (now - last < 1000 / FPS) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      t += dt;
      draw();
    };

    build();

    if (prefersReducedMotion()) {
      draw();
      return;
    }

    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(host);
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { build(); draw(); }, 150);
    });
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div ref={hostRef} id="propagation-field" aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

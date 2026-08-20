import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useScrollReveal';

/**
 * Ambient video-wall backdrop for the hero: a grid of camera tiles with drifting
 * scanlines, ticking timestamps, motion-detection boxes and the occasional feed
 * switch. It nods at the actual job — central command infrastructure across three
 * hospital campuses — rather than being generic decoration.
 *
 * Kept cheap on purpose: the tile chrome (borders, labels) is rendered once to an
 * offscreen canvas and blitted each frame, so only the moving parts are redrawn.
 * The loop is capped well below 60fps, pauses when the hero scrolls away or the
 * tab is hidden, and never starts at all under prefers-reduced-motion.
 */

const TILE_MIN = 168;
const FPS = 20;
const LINE = '16, 185, 129'; // emerald-500

interface Tile {
  x: number; y: number; w: number; h: number;
  label: string;
  scan: number;      // 0..1 vertical position of the scanline
  scanSpeed: number;
  rec: boolean;
  box: { x: number; y: number; w: number; h: number; vx: number; vy: number } | null;
  flash: number;     // brief brightness bump when the "feed switches"
  clockOffset: number;
}

export function CommandWall() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let tiles: Tile[] = [];
    let chrome: HTMLCanvasElement | null = null;
    let w = 0, h = 0, dpr = 1;
    let raf = 0;
    let last = 0;
    let visible = true;
    // Pointer position in canvas space; -1 means the cursor is elsewhere.
    let px = -1, py = -1;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.max(2, Math.round(w / TILE_MIN));
      const rows = Math.max(2, Math.round(h / TILE_MIN));
      const tw = w / cols;
      const th = h / rows;

      tiles = [];
      let n = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * tw, y = r * th;
          tiles.push({
            x, y, w: tw, h: th,
            label: `CAM-${String(n++).padStart(2, '0')}`,
            scan: Math.random(),
            scanSpeed: rand(0.03, 0.09),
            rec: Math.random() < 0.35,
            box: Math.random() < 0.45 ? {
              x: rand(0.15, 0.6), y: rand(0.2, 0.6),
              w: rand(0.14, 0.26), h: rand(0.16, 0.3),
              vx: rand(-0.02, 0.02), vy: rand(-0.015, 0.015)
            } : null,
            flash: 0,
            clockOffset: Math.floor(rand(0, 5400))
          });
        }
      }

      // Static layer: tile frames, corner ticks and labels, drawn once.
      chrome = document.createElement('canvas');
      chrome.width = canvas.width;
      chrome.height = canvas.height;
      const cc = chrome.getContext('2d');
      if (!cc) return;
      cc.setTransform(dpr, 0, 0, dpr, 0, 0);
      cc.lineWidth = 1;

      for (const t of tiles) {
        const pad = 6;
        const x = t.x + pad, y = t.y + pad, tw2 = t.w - pad * 2, th2 = t.h - pad * 2;

        cc.strokeStyle = `rgba(${LINE}, 0.30)`;
        cc.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, Math.round(tw2), Math.round(th2));

        // corner ticks, the way a VMS marks an active pane
        cc.strokeStyle = `rgba(${LINE}, 0.65)`;
        const k = 9;
        cc.beginPath();
        cc.moveTo(x, y + k); cc.lineTo(x, y); cc.lineTo(x + k, y);
        cc.moveTo(x + tw2 - k, y); cc.lineTo(x + tw2, y); cc.lineTo(x + tw2, y + k);
        cc.moveTo(x, y + th2 - k); cc.lineTo(x, y + th2); cc.lineTo(x + k, y + th2);
        cc.moveTo(x + tw2 - k, y + th2); cc.lineTo(x + tw2, y + th2); cc.lineTo(x + tw2, y + th2 - k);
        cc.stroke();

        cc.fillStyle = `rgba(${LINE}, 0.75)`;
        cc.font = '600 9px ui-monospace, SFMono-Regular, Menlo, monospace';
        cc.fillText(t.label, x + 7, y + 15);
      }
    };

    const clock = (offset: number, now: number) => {
      const s = Math.floor(now / 1000) + offset;
      const hh = String(Math.floor(s / 3600) % 24).padStart(2, '0');
      const mm = String(Math.floor(s / 60) % 60).padStart(2, '0');
      const ss = String(s % 60).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    };

    const draw = (now: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);
      if (chrome) ctx.drawImage(chrome, 0, 0, w, h);

      ctx.font = '500 8px ui-monospace, SFMono-Regular, Menlo, monospace';

      for (const t of tiles) {
        const pad = 6;
        const x = t.x + pad, y = t.y + pad, tw2 = t.w - pad * 2, th2 = t.h - pad * 2;

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, tw2, th2);
        ctx.clip();

        // Panes near the cursor lift, so the wall reads as watched rather than looped.
        if (px >= 0) {
          const cx = t.x + t.w / 2, cy = t.y + t.h / 2;
          const d = Math.hypot(px - cx, py - cy);
          const reach = 260;
          if (d < reach) {
            const near = (1 - d / reach) ** 2;
            ctx.fillStyle = `rgba(${LINE}, ${0.10 * near})`;
            ctx.fillRect(x, y, tw2, th2);
            ctx.strokeStyle = `rgba(${LINE}, ${0.5 * near})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, tw2 - 1, th2 - 1);
          }
        }

        // brief brightness bump — reads as the pane switching feed
        if (t.flash > 0) {
          ctx.fillStyle = `rgba(${LINE}, ${0.05 * t.flash})`;
          ctx.fillRect(x, y, tw2, th2);
          t.flash = Math.max(0, t.flash - dt * 1.6);
        } else if (Math.random() < 0.0012) {
          t.flash = 1;
        }

        // scanline sweeping down the pane
        t.scan = (t.scan + t.scanSpeed * dt) % 1;
        const sy = y + t.scan * th2;
        const grad = ctx.createLinearGradient(0, sy - 14, 0, sy + 14);
        grad.addColorStop(0, `rgba(${LINE}, 0)`);
        grad.addColorStop(0.5, `rgba(${LINE}, 0.20)`);
        grad.addColorStop(1, `rgba(${LINE}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x, sy - 14, tw2, 28);

        // motion-detection box drifting inside the frame
        if (t.box) {
          const b = t.box;
          b.x += b.vx * dt; b.y += b.vy * dt;
          if (b.x < 0.05 || b.x + b.w > 0.95) b.vx *= -1;
          if (b.y < 0.12 || b.y + b.h > 0.88) b.vy *= -1;
          ctx.strokeStyle = `rgba(${LINE}, 0.55)`;
          ctx.setLineDash([3, 3]);
          ctx.lineWidth = 1;
          ctx.strokeRect(x + b.x * tw2, y + b.y * th2, b.w * tw2, b.h * th2);
          ctx.setLineDash([]);
        }

        // record indicator + running timestamp
        if (t.rec) {
          const pulse = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(now / 420));
          ctx.fillStyle = `rgba(${LINE}, ${0.85 * pulse})`;
          ctx.beginPath();
          ctx.arc(x + tw2 - 12, y + 11, 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${LINE}, 0.55)`;
        ctx.fillText(clock(t.clockOffset, now), x + 7, y + th2 - 7);

        ctx.restore();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (now - last < 1000 / FPS) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      draw(now, dt);
    };

    build();

    if (reduced) {
      draw(0, 0); // one static frame, no loop
      return;
    }

    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(host);

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    };
    const onLeave = () => { px = -1; py = -1; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    });
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={hostRef} id="command-wall" aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

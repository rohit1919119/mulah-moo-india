import { useEffect, useRef, useState } from "react";

/**
 * The hero background: a drifting field of points, one for every few people
 * in the network, that parts around the cursor and draws threads to the points
 * nearest it. Every few seconds one point lights up as a placement.
 *
 * Drawn on a 2D canvas. It pauses when the hero is off screen or the tab is
 * hidden, and renders one still frame for readers who prefer reduced motion.
 */

/** Where signals may appear, as fractions of the hero. Kept to the right so
 *  they never sit on the headline. */
const SPOTS: [number, number][] = [
  [0.7, 0.22], [0.8, 0.36], [0.66, 0.48], [0.78, 0.58], [0.6, 0.3], [0.74, 0.68],
];

type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; a: number; tw: number };

export function Constellation({ signals }: { signals: string[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const beacon = useRef<{ x: number; y: number; t: number } | null>(null);
  const [sig, setSig] = useState<{ i: number; spot: number } | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const host = canvas.parentElement as HTMLElement;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, raf = 0, running = true, visible = true;
    let pts: P[] = [];
    const mouse = { x: -9999, y: -9999, on: false };

    const make = (): P => {
      const roll = Math.random();
      const c = roll < 0.06 ? "245,197,66" : roll < 0.18 ? "167,128,255" : "214,200,255";
      return {
        x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0,
        r: roll < 0.06 ? 1.6 : Math.random() * 1.2 + 0.5,
        c, a: roll < 0.18 ? 0.85 : Math.random() * 0.35 + 0.18, tw: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      w = host.clientWidth; h = host.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(1100, Math.floor((w * h) / 1300));
      pts = Array.from({ length: n }, make);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const near: P[] = [];
      for (const p of pts) {
        // a slow flow field gives the drift its current
        const ang = Math.sin(p.x * 0.0017 + t * 0.00011) * Math.cos(p.y * 0.0021 - t * 0.00009) * Math.PI * 2;
        p.vx += (Math.cos(ang) * 0.28 - p.vx) * 0.03;
        p.vy += (Math.sin(ang) * 0.28 - p.vy) * 0.03;
        if (mouse.on) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 150 * 150) {
            const d = Math.sqrt(d2) || 1, f = (1 - d / 150) * 1.6;
            p.vx += (dx / d) * f; p.vy += (dy / d) * f;
            if (d2 < 120 * 120 && near.length < 16) near.push(p);
          }
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -5) p.x = w + 5; else if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5; else if (p.y > h + 5) p.y = -5;
        const a = p.a * (0.75 + 0.25 * Math.sin(t * 0.002 + p.tw));
        ctx.fillStyle = `rgba(${p.c},${a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      for (const p of near) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        ctx.strokeStyle = `rgba(214,200,255,${(1 - d / 120) * 0.45})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      }
      const b = beacon.current;
      if (b) {
        const bx = b.x * w, by = b.y * h, age = (t - b.t) / 1000;
        for (let k = 0; k < 3; k++) {
          const ph = (age * 0.8 + k / 3) % 1;
          ctx.strokeStyle = `rgba(245,197,66,${(1 - ph) * 0.55})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(bx, by, 6 + ph * 46, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.fillStyle = "rgba(245,197,66,1)";
        ctx.beginPath(); ctx.arc(bx, by, 4, 0, Math.PI * 2); ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (running && visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      mouse.on = mouse.y >= 0 && mouse.y <= r.height;
    };
    const onLeave = () => { mouse.on = false; };
    const onVis = () => { running = !document.hidden; };

    resize();
    if (still) { draw(0); } else { raf = requestAnimationFrame(loop); }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(host);
    const ro = new ResizeObserver(() => { resize(); if (still) draw(0); });
    ro.observe(host);
    window.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);

    // light one point at a time as a placement
    let i = 0, spot = 0;
    const fire = () => {
      spot = (spot + 1 + Math.floor(Math.random() * (SPOTS.length - 1))) % SPOTS.length;
      const [x, y] = SPOTS[spot];
      beacon.current = { x, y, t: performance.now() };
      setSig({ i: i % signals.length, spot });
      i++;
    };
    let timer = 0;
    if (!still) { fire(); timer = window.setInterval(fire, 3200); }

    return () => {
      cancelAnimationFrame(raf); window.clearInterval(timer);
      io.disconnect(); ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [signals]);

  return (
    <>
      <canvas ref={ref} className="cn-canvas" aria-hidden="true" />
      {sig && (
        <span
          key={`${sig.i}-${sig.spot}`}
          className="cn-signal"
          aria-hidden="true"
          style={{ left: `${SPOTS[sig.spot][0] * 100}%`, top: `${SPOTS[sig.spot][1] * 100}%` }}
        >
          {signals[sig.i]}
        </span>
      )}
    </>
  );
}

export const CN_CSS = `
.cn-canvas{ position:absolute; inset:0; display:block; }
.cn-signal{ position:absolute; transform:translate(14px,-50%); white-space:nowrap; pointer-events:none;
  font:600 12.5px/1 var(--ui); letter-spacing:.01em; color:#FFF6DE; padding:9px 13px; border-radius:999px;
  background:rgba(23,11,48,.72); border:1px solid rgba(245,197,66,.45); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
  animation:cnSig 3.2s ease both; }
@keyframes cnSig{ 0%{ opacity:0; transform:translate(4px,-50%); } 12%,78%{ opacity:1; transform:translate(14px,-50%); } 100%{ opacity:0; transform:translate(20px,-50%); } }
@media (max-width:820px){ .cn-signal{ display:none; } }
`;

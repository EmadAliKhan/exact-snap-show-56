import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number; r: number; tw: number };
type Star = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number };

export function HeroBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    let stars: Star[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(120, Math.round((w * h) / 15000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.7 + 0.6,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const LINK = 130;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;

      // particles
      for (const d of dots) {
        if (!reduced) {
          // gentle cursor repulsion
          const mdx = d.x - mouse.x;
          const mdy = d.y - mouse.y;
          const md = Math.hypot(mdx, mdy);
          if (md < 120 && md > 0.1) {
            const f = ((120 - md) / 120) * 0.35;
            d.vx += (mdx / md) * f * 0.12;
            d.vy += (mdy / md) * f * 0.12;
          }
          d.vx *= 0.985;
          d.vy *= 0.985;
          // keep a minimum drift
          if (Math.abs(d.vx) < 0.05) d.vx += (Math.random() - 0.5) * 0.02;
          if (Math.abs(d.vy) < 0.05) d.vy += (Math.random() - 0.5) * 0.02;
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0 || d.x > w) d.vx *= -1;
          if (d.y < 0 || d.y > h) d.vy *= -1;
        }
        const glow = 0.45 + Math.sin(t * 1.6 + d.tw) * 0.25;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 138, 61, ${glow})`;
        ctx.shadowColor = "rgba(255, 138, 61, 0.8)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // links
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]!;
          const b = dots[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 138, 61, ${(1 - dist / LINK) * 0.22})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // shooting stars
      if (!reduced && Math.random() < 0.008 && stars.length < 3) {
        const sx = Math.random() * w * 0.8;
        stars.push({
          x: sx,
          y: Math.random() * h * 0.4,
          vx: 6 + Math.random() * 4,
          vy: 2 + Math.random() * 1.5,
          life: 0,
          maxLife: 50 + Math.random() * 30,
        });
      }
      stars = stars.filter((s) => s.life < s.maxLife);
      for (const s of stars) {
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;
        const fade = 1 - s.life / s.maxLife;
        const grad = ctx.createLinearGradient(s.x - s.vx * 12, s.y - s.vy * 12, s.x, s.y);
        grad.addColorStop(0, "rgba(255, 170, 100, 0)");
        grad.addColorStop(1, `rgba(255, 170, 100, ${0.7 * fade})`);
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * 12, s.y - s.vy * 12);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
    />
  );
}

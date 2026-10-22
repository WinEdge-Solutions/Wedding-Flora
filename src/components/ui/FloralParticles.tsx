"use client";

import { useEffect, useRef } from "react";

/**
 * FloralParticles — rising gold bokeh + star particles rendered on
 * a canvas. Colors tuned for the dark aurora hero background.
 * Uses requestAnimationFrame, fully self-contained.
 */
export function FloralParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    // Brighter gold / warm tones against dark background
    const colors = [
      "#D4B87A", "#B79A5B", "#E8C88A", "#F0D9A0",
      "#C4A96A", "#FFE4A8", "#E8D5D0",
    ];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const COUNT = 55;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * (canvas.width || window.innerWidth),
      y: Math.random() * (canvas.height || window.innerHeight),
      size: Math.random() * 4 + 1.2,
      speedY: Math.random() * 0.65 + 0.2,
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.65 + 0.15,
      opacityDir: Math.random() < 0.5 ? 1 : -1,
      opacitySpeed: Math.random() * 0.006 + 0.002,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      isStar: Math.random() < 0.4,
    }));

    function drawStar(cx: number, cy: number, r: number, rot: number) {
      const spikes = 4;
      ctx!.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const angle  = (i * Math.PI) / spikes + rot;
        const radius = i % 2 === 0 ? r : r * 0.35;
        const px = cx + Math.cos(angle) * radius;
        const py = cy + Math.sin(angle) * radius;
        if (i === 0) {
          ctx!.moveTo(px, py);
        } else {
          ctx!.lineTo(px, py);
        }
      }
      ctx!.closePath();
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += p.opacityDir * p.opacitySpeed;
        p.rotation += p.rotSpeed;

        if (p.opacity > 0.85)  p.opacityDir = -1;
        if (p.opacity < 0.08)  p.opacityDir =  1;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20)              p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle   = p.color;
        ctx.shadowBlur  = 14;
        ctx.shadowColor = p.color;

        if (p.isStar) {
          drawStar(p.x, p.y, p.size, p.rotation);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

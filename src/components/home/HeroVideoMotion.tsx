'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

/**
 * Lightweight interactive hero motion backdrop.
 * Uses a pointer-reactive canvas lattice + SVG mesh (no heavy raw MP4s)
 * and automatically respects prefers-reduced-motion.
 */
export default function HeroVideoMotion() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      setIsPlaying(false);
    }
    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      setIsPlaying(!e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mousePos = { x: -1000, y: -1000, radius: 140 };
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const colors = ['#06B6D4', '#22D3EE', '#6366F1', '#8B5CF6'];
    const particleCount = Math.min(Math.floor(width / 38), 40);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.4 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (isPlaying && !reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          const mdx = p.x - mousePos.x;
          const mdy = p.y - mousePos.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mousePos.radius && mdist > 0) {
            const force = (mousePos.radius - mdist) / mousePos.radius;
            p.x += (mdx / mdist) * force * 1.6;
            p.y += (mdy / mdist) * force * 1.6;
          }

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 130) * 0.12;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (isPlaying && !reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying, reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Lightweight SVG Cybernetic Mesh Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: 'url(/brand/hero-video-loop.svg)',
          opacity: isPlaying ? 0.42 : 0.2,
        }}
        aria-hidden="true"
      />

      {/* Pointer-Reactive Canvas Particle Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: isPlaying ? 0.85 : 0.25 }}
      />

      {/* Multi-layer Obsidian Contrast Masks */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070E]/70 via-[#05070E]/85 to-[#05070E] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" />

      {/* Motion Control Badge */}
      {!reducedMotion && (
        <div className="absolute bottom-6 right-6 pointer-events-auto z-20">
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B101E]/85 hover:bg-[#121A2E] border border-white/10 hover:border-[#06B6D4]/40 text-[11px] font-mono text-slate-400 hover:text-white backdrop-blur-md transition-all shadow-lg"
            title={isPlaying ? 'Pause Motion Engine' : 'Resume Motion Engine'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#06B6D4]" />
                <span>Motion: Active</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-slate-400" />
                <span>Motion: Paused</span>
              </>
            )}
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}

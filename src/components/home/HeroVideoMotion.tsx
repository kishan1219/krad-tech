'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function HeroVideoMotion() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Attempt lazy playback when viewport is visible
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isPlaying) {
            video.play().catch(() => {
              // Non-blocking if autoplay policies require user interaction
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isPlaying]);

  // Canvas cybernetic particle wave (runs when video is preloaded or idle)
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

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ['#00D2FE', '#38BDF8', '#818CF8', '#A78BFA'];
    const particleCount = Math.min(Math.floor(width / 35), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint cybernetic connection lattice
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (isPlaying) {
          p.x += p.vx;
          p.y += p.vy;

          // Interactive subtle mouse repulsion
          const mdx = p.x - mousePos.x;
          const mdy = p.y - mousePos.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mousePos.radius && mdist > 0) {
            const angle = Math.atan2(mdy, mdx);
            const force = (mousePos.radius - mdist) / mousePos.radius;
            p.x += Math.cos(angle) * force * 1.8;
            p.y += Math.sin(angle) * force * 1.8;
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

        // Connect nearby points
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#00D2FE';
            ctx.globalAlpha = (1 - dist / 140) * 0.12;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Low-overhead HTML5 Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/brand/hero-mesh-poster.svg"
        onCanPlay={() => setVideoLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded && isPlaying ? 'opacity-25' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <source src="/brand/hero-loop.webm" type="video/webm; codecs=vp9" />
        <source src="/brand/hero-loop.mp4" type="video/mp4; codecs=avc1" />
      </video>

      {/* 2. Hardware-accelerated Particle Wave Fallback Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: isPlaying ? 0.85 : 0.2 }}
      />

      {/* 3. Multi-layer Radial Contrast Masks */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/70 via-[#050814]/85 to-[#050814] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,210,254,0.12),transparent_70%)] pointer-events-none" />

      {/* 4. Interactive Motion Control Badge */}
      <div className="absolute bottom-6 right-6 pointer-events-auto z-20">
        <button
          type="button"
          onClick={togglePlayback}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1120]/80 hover:bg-[#0B1120] border border-white/10 hover:border-[#00D2FE]/40 text-[11px] font-mono text-slate-400 hover:text-white backdrop-blur-md transition-all shadow-lg"
          title={isPlaying ? 'Pause Motion Engine' : 'Resume Motion Engine'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 text-[#00D2FE]" />
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
    </div>
  );
}

'use client';

import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  borderGlow?: boolean;
  variant?: 'engineering' | 'creative' | 'light';
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor,
  spotlightSize = 360,
  borderGlow = true,
  variant = 'engineering',
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const defaultGlow =
    variant === 'creative'
      ? 'rgba(139, 92, 246, 0.16)'
      : variant === 'light'
      ? 'rgba(6, 182, 212, 0.08)'
      : 'rgba(6, 182, 212, 0.14)';

  const borderGradientColor =
    variant === 'creative'
      ? 'rgba(139, 92, 246, 0.7)'
      : variant === 'light'
      ? 'rgba(6, 182, 212, 0.45)'
      : 'rgba(6, 182, 212, 0.65)';

  const resolvedSpotlight = spotlightColor ?? defaultGlow;

  const surfaceClasses =
    variant === 'light'
      ? 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
      : 'bg-[#0B101E] hover:bg-[#121A2E] border-white/[0.08]';

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setOpacity(1), []);
  const handleMouseLeave = useCallback(() => setOpacity(0), []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${surfaceClasses} ${className}`}
      {...props}
    >
      {/* Mouse-tracking radial gradient glow on card border */}
      {borderGlow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity,
            padding: '1px',
            background: `radial-gradient(240px circle at ${position.x}px ${position.y}px, ${borderGradientColor}, transparent 75%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          aria-hidden="true"
        />
      )}

      {/* Interior subtle radial spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${resolvedSpotlight}, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

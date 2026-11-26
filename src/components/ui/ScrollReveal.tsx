'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger index (each step adds 0.08s delay) */
  index?: number;
  delayMs?: number;
}

/**
 * Subtle scroll-reveal: y: 24px -> 0, opacity: 0 -> 1, stagger 0.08s per card.
 * Never bounces or overshoots. Respects prefers-reduced-motion.
 */
export default function ScrollReveal({
  children,
  className = '',
  index = 0,
  delayMs,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const computedDelay = delayMs ?? index * 80;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(24px)',
        transition: `opacity 480ms cubic-bezier(0.22, 1, 0.36, 1) ${computedDelay}ms, transform 480ms cubic-bezier(0.22, 1, 0.36, 1) ${computedDelay}ms`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

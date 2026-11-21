'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import StaticTechFallback from './StaticTechFallback';

// Dynamically import Three.js TechSphereCanvas with zero SSR and lightweight fallback
const TechSphereCanvas = dynamic(() => import('./TechSphereCanvas'), {
  ssr: false,
  loading: () => <StaticTechFallback />,
});

export default function Hero3DContainer() {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 1. Check screen width (desktop/tablet >= 768px)
    const isDesktop = window.innerWidth >= 768;

    // 2. Check user reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 3. Check WebGL support
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      hasWebGL = false;
    }

    if (isDesktop && !prefersReducedMotion && hasWebGL) {
      setShouldLoad3D(true);
    }
  }, []);

  if (!mounted) {
    return <StaticTechFallback />;
  }

  return (
    <div className="w-full flex items-center justify-center">
      {shouldLoad3D ? <TechSphereCanvas /> : <StaticTechFallback />}
    </div>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TechSphereCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 240;

    // WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Outer Geometry: Tech Particle Sphere
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const radius = 78;

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution over sphere
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      color: 0x00d2fe,
      size: 3.5,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Inner Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(72, 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const innerSphere = new THREE.Mesh(icoGeo, icoMat);
    scene.add(innerSphere);

    // Core Glowing Ring
    const torusGeo = new THREE.TorusGeometry(86, 0.8, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.45,
    });
    const ring = new THREE.Mesh(torusGeo, torusMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      particles.rotation.y += 0.0035;
      particles.rotation.x += 0.0015;
      innerSphere.rotation.y -= 0.002;
      innerSphere.rotation.x -= 0.001;
      ring.rotation.z += 0.004;

      scene.rotation.y = mouseX;
      scene.rotation.x = mouseY;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00D2FE]/15 via-transparent to-transparent rounded-full filter blur-3xl pointer-events-none" />
      {/* Canvas container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />
    </div>
  );
}

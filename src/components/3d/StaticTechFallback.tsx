'use client';

import React from 'react';

export default function StaticTechFallback() {
  return (
    <div className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00D2FE]/20 via-transparent to-transparent rounded-full filter blur-3xl animate-pulse-slow" />
      
      {/* Outer SVG Cyber Ring */}
      <svg
        className="w-full h-full max-w-[420px] max-h-[420px] animate-[spin_40s_linear_infinite]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="180" stroke="rgba(0, 210, 254, 0.15)" strokeWidth="1.5" strokeDasharray="6 8" />
        <circle cx="200" cy="200" r="140" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="12 12" />
        <circle cx="200" cy="200" r="100" stroke="rgba(0, 210, 254, 0.3)" strokeWidth="1.5" />

        {/* Orbiting nodes */}
        <circle cx="380" cy="200" r="5" fill="#00D2FE" filter="drop-shadow(0 0 6px #00D2FE)" />
        <circle cx="20" cy="200" r="4" fill="#6366F1" filter="drop-shadow(0 0 6px #6366F1)" />
        <circle cx="200" cy="20" r="4" fill="#00D2FE" filter="drop-shadow(0 0 6px #00D2FE)" />
        <circle cx="200" cy="380" r="3" fill="#38BDF8" />
        <circle cx="270" cy="90" r="4" fill="#00D2FE" />
        <circle cx="130" cy="310" r="4" fill="#6366F1" />
      </svg>

      {/* Counter-rotating inner ring */}
      <svg
        className="absolute w-[260px] h-[260px] animate-[spin_25s_linear_infinite_reverse]"
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="130" cy="130" r="115" stroke="rgba(0, 210, 254, 0.25)" strokeWidth="1.5" strokeDasharray="4 6" />
        <polygon points="130,25 220,180 40,180" stroke="rgba(0, 210, 254, 0.2)" strokeWidth="1" fill="none" />
      </svg>

      {/* Central 3D Cyber Core Card */}
      <div className="relative z-10 w-44 h-44 rounded-2xl bg-[#0A0F1D]/85 border border-[#00D2FE]/40 backdrop-blur-md shadow-cyan-glow flex flex-col items-center justify-center p-4">
        {/* Glowing Chevron Mark */}
        <div className="w-14 h-14 mb-2 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#00D2FE]/30 rounded-full blur-md" />
          <svg viewBox="0 0 48 48" className="w-12 h-12 relative z-10" fill="none">
            <polygon points="24,6 40,38 33,38 24,20 15,38 8,38" fill="#F8FAFC" />
            <polygon points="24,18 31,32 24,29 17,32" fill="#00D2FE" />
            <circle cx="24" cy="25" r="2" fill="#FFFFFF" />
          </svg>
        </div>
        <span className="text-xs font-bold tracking-widest text-[#00D2FE] uppercase">KRAD CORE</span>
        <span className="text-[10px] text-slate-400 mt-1 font-mono">v2.4 Active</span>
      </div>
    </div>
  );
}

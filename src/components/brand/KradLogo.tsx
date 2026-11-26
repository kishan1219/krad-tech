import React from 'react';

interface KradLogoProps {
  className?: string;
  showSubtext?: boolean;
}

/**
 * Custom geometric "K" monogram for KRAD Technology.
 * Splits precision engineering (Electric Cyan #06B6D4) and
 * creative/AI motion (Indigo/Violet #6366F1) into a unified mark.
 */
export function KradMonogram({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left precision vertical stem */}
      <path
        d="M8 7H14.5V33H8V7Z"
        fill="#F8FAFC"
      />
      {/* Upper diagonal engineering wing (Electric Cyan) */}
      <path
        d="M16.5 20L28.5 7H34.5L21 21.5L16.5 20Z"
        fill="#06B6D4"
      />
      {/* Lower diagonal motion/AI wing (Indigo-Violet gradient) */}
      <path
        d="M17.5 19.5L34.5 33H27.5L14.5 22L17.5 19.5Z"
        fill="url(#krad-k-grad)"
      />
      {/* Precision junction node */}
      <circle cx="14.5" cy="20" r="2.2" fill="#06B6D4" />
      <defs>
        <linearGradient id="krad-k-grad" x1="14.5" y1="19.5" x2="34.5" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" />
          <stop offset="0.55" stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function KradLogo({ className = '', showSubtext = true }: KradLogoProps) {
  return (
    <div className={`flex items-center gap-3 group shrink-0 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-[#0B101E] border border-[#06B6D4]/40 flex items-center justify-center shadow-[0_0_18px_-4px_rgba(6,182,212,0.35)] group-hover:border-[#06B6D4] group-hover:bg-[#121A2E] transition-all duration-200">
        <KradMonogram className="w-6 h-6" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className="text-lg sm:text-xl text-white font-extrabold tracking-wider">KRAD</span>
          <span className="text-lg sm:text-xl text-[#06B6D4] font-bold tracking-wide">TECHNOLOGY</span>
        </div>
        {showSubtext && (
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono hidden sm:inline-block">
            Engineering &bull; AI &bull; Creative Studio
          </span>
        )}
      </div>
    </div>
  );
}

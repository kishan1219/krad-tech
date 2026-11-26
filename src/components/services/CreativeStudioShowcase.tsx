'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Play,
  Pause,
  SlidersHorizontal,
  ArrowUpRight,
  Layers,
  Video,
  PenTool,
  Layout,
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { KradMonogram } from '@/components/brand/KradLogo';

interface ReelChapter {
  id: string;
  label: string;
  duration: string;
  serviceSlug: string;
  tools: string[];
  summary: string;
  accent: string;
}

const REEL_CHAPTERS: ReelChapter[] = [
  {
    id: 'animation-vfx',
    label: '2D/3D Animation & VFX',
    duration: '00:24',
    serviceSlug: 'animation-vfx',
    tools: ['Blender 3D', 'Cinema 4D', 'After Effects', 'Octane'],
    summary: 'Photorealistic 3D hardware teasers, particle physics simulations, and broadcast-grade motion reveals.',
    accent: '#8B5CF6',
  },
  {
    id: 'video-editing',
    label: 'Video Editing & Reels',
    duration: '00:18',
    serviceSlug: 'video-editing',
    tools: ['DaVinci Resolve', 'Premiere Pro', 'Audition'],
    summary: 'Rhythm-matched product launch films, DaVinci color grading, and high-retention social reels.',
    accent: '#6366F1',
  },
  {
    id: 'ui-ux-design',
    label: 'UI/UX Design Systems',
    duration: '00:20',
    serviceSlug: 'ui-ux-design',
    tools: ['Figma Variables', 'Storybook', 'Tailwind Tokens'],
    summary: 'WCAG 2.2 AA accessible interfaces, interactive micro-prototypes, and developer-ready token libraries.',
    accent: '#8B5CF6',
  },
  {
    id: 'logo-branding',
    label: 'Logo & Brand Identity',
    duration: '00:15',
    serviceSlug: 'logo-branding',
    tools: ['Illustrator', 'Figma', 'Vector Grid'],
    summary: 'Precision geometric monograms, typography hierarchies, and full print/digital brand books.',
    accent: '#6366F1',
  },
];

export default function CreativeStudioShowcase() {
  const [sliderPos, setSliderPos] = useState(56);
  const [comparisonMode, setComparisonMode] = useState<'ui' | '3d'>('ui');
  const [activeChapter, setActiveChapter] = useState<ReelChapter>(REEL_CHAPTERS[0]);
  const [reelPlaying, setReelPlaying] = useState(true);

  return (
    <section
      id="creative-studio"
      className="py-20 bg-[#F8FAFC] text-slate-900 border-y border-slate-200 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#6366F1]">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              KRAD Creative &amp; Motion Studio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Visual Proof Built to Convert
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Creative buyers purchase with their eyes. Explore interactive UI/UX transformations, 3D motion chapters, and precision brand identity systems crafted in-house.
            </p>
          </div>

          <Link
            href="/project-requirements?category=Animation%20%26%20VFX"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-95 shadow-violet-glow transition-all shrink-0"
          >
            <span>Book a Creative Sprint</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        {/* Row 1: Interactive Before/After Slider + Showreel Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Before / After Interactive Slider (6 cols) */}
          <ScrollReveal index={1} className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6366F1] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Interactive Before / After
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {comparisonMode === 'ui'
                    ? 'Legacy Wireframe → Production SaaS UI'
                    : 'Raw 3D Clay Mesh → Lit & Graded Render'}
                </h3>
              </div>

              <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setComparisonMode('ui')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    comparisonMode === 'ui' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  UI/UX
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonMode('3d')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    comparisonMode === '3d' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  3D / VFX
                </button>
              </div>
            </div>

            {/* Interactive Split Viewport */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 select-none bg-slate-100">
              {/* AFTER Layer (Full width underneath) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#05070E] via-[#0B101E] to-[#1E1B4B] p-5 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8B5CF6]/25 text-violet-200 border border-[#8B5CF6]/40">
                    AFTER &bull; {comparisonMode === 'ui' ? 'Production Design System' : 'Octane Final Grade'}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">60fps &bull; 4K Ready</span>
                </div>

                {comparisonMode === 'ui' ? (
                  <div className="grid grid-cols-3 gap-2.5 my-auto">
                    <div className="col-span-2 p-3 rounded-lg bg-[#121A2E] border border-[#8B5CF6]/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-violet-300">REVENUE VELOCITY</span>
                        <span className="text-xs font-bold text-emerald-400">+142%</span>
                      </div>
                      <div className="flex items-end gap-1.5 h-14 pt-2">
                        {[35, 52, 46, 68, 62, 85, 96].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-gradient-to-t from-[#6366F1] to-[#06B6D4]"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#121A2E] border border-white/10 flex flex-col justify-between">
                      <span className="text-[10px] font-mono text-slate-400">CONVERSION</span>
                      <span className="text-lg font-extrabold text-white">4.8x</span>
                      <span className="text-[10px] text-[#06B6D4] font-mono">WCAG AA</span>
                    </div>
                  </div>
                ) : (
                  <div className="my-auto flex items-center justify-center">
                    <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-tr from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] p-[2px] shadow-[0_0_40px_rgba(139,92,246,0.5)] rotate-12">
                      <div className="w-full h-full rounded-2xl bg-[#0B101E] flex items-center justify-center">
                        <KradMonogram className="w-14 h-14 -rotate-12" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Color Tokens + Micro-Motion</span>
                  <span>KRAD Studio Standard</span>
                </div>
              </div>

              {/* BEFORE Layer (Clipped by sliderPos) */}
              <div
                className="absolute inset-0 bg-slate-100 p-5 flex flex-col justify-between text-slate-500 border-r-2 border-[#6366F1]"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                    BEFORE &bull; {comparisonMode === 'ui' ? 'Raw Wireframe' : 'Clay Wireframe'}
                  </span>
                </div>

                {comparisonMode === 'ui' ? (
                  <div className="grid grid-cols-3 gap-2.5 my-auto">
                    <div className="col-span-2 p-3 rounded border border-dashed border-slate-300 bg-white space-y-2">
                      <div className="h-2.5 w-24 bg-slate-200 rounded" />
                      <div className="flex items-end gap-1.5 h-14 pt-2">
                        {[35, 52, 46, 68, 62, 85, 96].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-slate-300"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="p-3 rounded border border-dashed border-slate-300 bg-white flex flex-col justify-between">
                      <div className="h-2 w-12 bg-slate-200 rounded" />
                      <div className="h-5 w-10 bg-slate-300 rounded" />
                      <div className="h-2 w-8 bg-slate-200 rounded" />
                    </div>
                  </div>
                ) : (
                  <div className="my-auto flex items-center justify-center">
                    <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-400 bg-slate-200/70 rotate-12 flex items-center justify-center">
                      <span className="text-xs font-mono text-slate-500 -rotate-12">MESH_LOD0</span>
                    </div>
                  </div>
                )}

                <div className="text-[10px] font-mono text-slate-400">
                  Unstyled Structure &bull; Zero Motion
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#6366F1] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#6366F1] shadow-md flex items-center justify-center text-[#6366F1]">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Accessible Range Input Overlay */}
              <input
                type="range"
                min={10}
                max={90}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label="Before and after comparison slider"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>

            <p className="text-xs text-slate-500">
              Drag the slider to inspect how KRAD transforms rough concepts into production-grade interfaces and lit 3D assets.
            </p>
          </ScrollReveal>

          {/* Interactive Showreel Stage (6 cols) */}
          <ScrollReveal index={2} className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0B101E] text-white border border-slate-800 shadow-lg space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8B5CF6] flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  Motion &amp; Production Showreel
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {activeChapter.label}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setReelPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121A2E] hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 transition-colors"
              >
                {reelPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#06B6D4]" />
                    <span>Play</span>
                  </>
                )}
              </button>
            </div>

            {/* Lightweight Animated Showreel Viewport (WebP/SVG poster + CSS motion, zero heavy MP4) */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#05070E] border border-white/10 p-5 flex flex-col justify-between">
              <div
                className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.28),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.22),transparent_55%)] ${
                  reelPlaying ? 'animate-pulse-slow' : ''
                }`}
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-violet-300">
                  CHAPTER // {activeChapter.duration}
                </span>
                <span className="text-emerald-400">60 FPS &bull; Lazy Poster Frame</span>
              </div>

              {/* Centerpiece Chapter Visual */}
              <div className="relative z-10 my-auto flex flex-col items-center text-center space-y-3">
                <div
                  className={`w-16 h-16 rounded-2xl bg-[#121A2E] border border-[#8B5CF6]/40 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] ${
                    reelPlaying ? 'animate-float' : ''
                  }`}
                >
                  <KradMonogram className="w-9 h-9" />
                </div>
                <p className="text-xs sm:text-sm text-slate-200 max-w-md leading-relaxed">
                  {activeChapter.summary}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {activeChapter.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">Select chapter below</span>
                <Link
                  href={`/services/${activeChapter.serviceSlug}`}
                  className="text-[#8B5CF6] hover:text-violet-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>Explore {activeChapter.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Chapter Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {REEL_CHAPTERS.map((chap) => {
                const isActive = chap.id === activeChapter.id;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => setActiveChapter(chap)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      isActive
                        ? 'bg-[#121A2E] border-[#8B5CF6]/60 text-white'
                        : 'bg-[#05070E]/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[#8B5CF6] block">{chap.duration}</span>
                    <span className="text-[11px] font-semibold line-clamp-1 mt-0.5">{chap.label}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Row 2: 3 Creative Deliverable Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal index={0} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-[#8B5CF6]">
                <PenTool className="w-5 h-5" />
              </div>
              <Link href="/services/logo-branding" className="text-xs font-semibold text-[#6366F1] hover:underline inline-flex items-center gap-1">
                Brand Systems <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <h4 className="text-base font-bold text-slate-900">Logo &amp; Geometric Identity</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scalable SVG monograms, clear-space construction grids, and HEX/RGB/CMYK brand books ready for print and digital.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#05070E] border border-slate-300" />
                <span className="w-5 h-5 rounded-md bg-[#06B6D4]" />
                <span className="w-5 h-5 rounded-md bg-[#6366F1]" />
                <span className="w-5 h-5 rounded-md bg-[#8B5CF6]" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">SVG &bull; PDF &bull; AI</span>
            </div>
          </ScrollReveal>

          <ScrollReveal index={1} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6366F1]">
                <Layout className="w-5 h-5" />
              </div>
              <Link href="/services/ui-ux-design" className="text-xs font-semibold text-[#6366F1] hover:underline inline-flex items-center gap-1">
                UI/UX Design <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <h4 className="text-base font-bold text-slate-900">Figma Design Tokens &amp; Flows</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Auto-Layout component libraries, interactive click-through prototypes, and zero-ambiguity Tailwind CSS handoff.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600">
              <span>WCAG 2.2 AA</span>
              <span className="text-[#6366F1] font-bold">100% Tokenized</span>
            </div>
          </ScrollReveal>

          <ScrollReveal index={2} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-[#8B5CF6]">
                <Layers className="w-5 h-5" />
              </div>
              <Link href="/services/graphic-design" className="text-xs font-semibold text-[#6366F1] hover:underline inline-flex items-center gap-1">
                Graphic Design <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <h4 className="text-base font-bold text-slate-900">Pitch Decks &amp; Campaign Assets</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Investor decks, high-converting paid social creatives, and print-ready vector brochures engineered for brand authority.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600">
              <span>CMYK + Digital</span>
              <span className="text-[#8B5CF6] font-bold">48h Turnaround</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

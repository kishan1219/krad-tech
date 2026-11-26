'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { DEMONSTRATION_CASE_STUDIES } from '@/lib/constants';
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldAlert,
  Layers,
  Cpu,
  FileText,
  ListCheck,
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import ScrollReveal from '../ui/ScrollReveal';
import ArchitectureNodeFlow from './ArchitectureNodeFlow';

export default function FeaturedCaseStudies() {
  const { t } = useLanguage();
  const [activeTabs, setActiveTabs] = useState<
    Record<string, 'overview' | 'architecture' | 'stack' | 'features'>
  >({
    'omniflow-ai': 'overview',
    'pulsehealth-core': 'overview',
  });

  const setTab = (id: string, tab: 'overview' | 'architecture' | 'stack' | 'features') => {
    setActiveTabs((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section className="py-24 bg-[#F8FAFC] text-slate-900 relative border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#0891B2]">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
              Architecture Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.caseStudies.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {t.caseStudies.subtitle}
            </p>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shrink-0 shadow-sm"
          >
            <span>Explore All Architecture Blueprints</span>
            <ArrowUpRight className="w-4 h-4 text-[#06B6D4]" />
          </Link>
        </ScrollReveal>

        {/* Notice of Conceptual Demonstrations */}
        <ScrollReveal index={1} className="mb-10 p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3 text-xs text-slate-600 shadow-xs">
          <ShieldAlert className="w-4 h-4 text-[#0891B2] shrink-0" />
          <span>
            <strong className="text-slate-900 font-semibold">Transparency Notice:</strong> All showcase projects represent conceptual architecture demonstrations and reference engineering blueprints.
          </span>
        </ScrollReveal>

        {/* Grid of Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DEMONSTRATION_CASE_STUDIES.slice(0, 2).map((study, idx) => {
            const currentTab = activeTabs[study.id] || 'overview';
            const isOmniFlow = study.id === 'omniflow-ai';

            return (
              <ScrollReveal key={study.id} index={idx + 1}>
                <SpotlightCard
                  variant="light"
                  className="p-7 lg:p-9 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Category & Demo Label */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-50 text-[#0891B2] border border-cyan-200 font-semibold">
                        {study.category}
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                        {study.demoLabel}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl font-bold text-slate-900 leading-snug mb-1">
                      {study.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mb-6">
                      {study.tagline}
                    </p>

                    {/* Interactive Tabs Header */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 mb-5">
                      <button
                        type="button"
                        onClick={() => setTab(study.id, 'overview')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                          currentTab === 'overview'
                            ? 'bg-slate-900 text-white font-semibold shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Product UI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTab(study.id, 'architecture')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                          currentTab === 'architecture'
                            ? 'bg-slate-900 text-white font-semibold shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Architecture</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTab(study.id, 'stack')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                          currentTab === 'stack'
                            ? 'bg-slate-900 text-white font-semibold shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Tech Stack</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTab(study.id, 'features')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                          currentTab === 'features'
                            ? 'bg-slate-900 text-white font-semibold shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <ListCheck className="w-3.5 h-3.5" />
                        <span>Results</span>
                      </button>
                    </div>

                    {/* Tab 1: Product UI & Visual Architecture Preview */}
                    {currentTab === 'overview' && (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="rounded-xl bg-[#0B101E] border border-slate-200 overflow-hidden shadow-lg">
                          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#05070E] border-b border-white/10 text-[10px] font-mono text-slate-400">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                              <span className="ml-1 text-slate-200 font-sans font-semibold text-xs">
                                {isOmniFlow
                                  ? 'OmniFlow AI // Ingestion & Neural Routing Hub'
                                  : 'PulseHealth Core // Encrypted WebRTC & Biometrics'}
                              </span>
                            </div>
                            <span className="text-emerald-400 font-bold hidden sm:flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Interactive Preview
                            </span>
                          </div>

                          <div className="relative w-full aspect-[16/10] bg-[#070B16] overflow-hidden group/case">
                            <Image
                              src={isOmniFlow ? '/brand/showcase-omniflow.svg' : '/brand/showcase-pulsehealth.svg'}
                              alt={
                                isOmniFlow
                                  ? 'OmniFlow AI System Architecture Dashboard'
                                  : 'PulseHealth Telehealth & Biometric Waveform Console'
                              }
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover transition-transform duration-500 group-hover/case:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#05070E]/85 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-200 bg-[#0B101E]/90 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                              <span className="text-[#06B6D4] font-bold">
                                {isOmniFlow ? 'Meta WhatsApp Cloud API + RAG' : 'HIPAA Compliant WebRTC Stream'}
                              </span>
                              <span className="text-emerald-400">
                                {isOmniFlow ? 'E2E Latency: 372ms' : '60 FPS Continuous ECG'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Challenge & Solution Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                            <span className="font-semibold text-slate-900 block">The Challenge:</span>
                            <p className="text-slate-600 leading-relaxed text-[11px]">{study.challenge}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-cyan-50/60 border border-cyan-200 space-y-1">
                            <span className="font-semibold text-[#0891B2] block">Architectural Solution:</span>
                            <p className="text-slate-700 leading-relaxed text-[11px]">{study.solution}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Interactive Architecture Diagram */}
                    {currentTab === 'architecture' && (
                      <div className="rounded-xl bg-[#05070E] p-2 animate-fadeIn">
                        <ArchitectureNodeFlow studyId={study.id} />
                      </div>
                    )}

                    {/* Tab 3: Technology Stack */}
                    {currentTab === 'stack' && (
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                          Core Frameworks &amp; Infrastructure
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {study.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white text-slate-800 border border-slate-200 font-medium shadow-2xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 4: Verified Results */}
                    {currentTab === 'features' && (
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                          Verified Architectural Results
                        </span>
                        <div className="space-y-2.5">
                          {study.outcomes.map((outcome, oIdx) => (
                            <div key={oIdx} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                    <Link
                      href={`/case-studies#${study.id}`}
                      className="text-xs font-bold text-[#0891B2] hover:text-[#06B6D4] inline-flex items-center gap-1.5 hover:underline"
                    >
                      <span>{t.caseStudies.viewCaseStudy}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <span className="text-[10px] font-mono text-slate-500">
                      Production Architecture
                    </span>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

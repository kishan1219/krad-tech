'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Video, 
  Heart, 
  Lock
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import ArchitectureNodeFlow from './ArchitectureNodeFlow';

export default function FeaturedCaseStudies() {
  const { t } = useLanguage();
  const [activeTabs, setActiveTabs] = useState<Record<string, 'overview' | 'architecture' | 'stack' | 'features'>>({
    'omniflow-ai': 'overview',
    'pulsehealth-core': 'overview',
  });

  const setTab = (id: string, tab: 'overview' | 'architecture' | 'stack' | 'features') => {
    setActiveTabs((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section className="py-24 bg-[#050814] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
              Architecture Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.caseStudies.title}
            </h2>
            <p className="text-sm text-slate-400">
              {t.caseStudies.subtitle}
            </p>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D2FE] hover:underline shrink-0"
          >
            <span>Explore All Architecture Blueprints</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Notice of Conceptual Demonstrations */}
        <div className="mb-10 p-3.5 rounded-xl bg-[#0B1120] border border-white/10 flex items-center gap-3 text-xs text-slate-300">
          <ShieldAlert className="w-4 h-4 text-[#00D2FE] shrink-0" />
          <span>
            <strong className="text-white font-medium">Transparency Notice:</strong> All showcase projects represent conceptual architecture demonstrations and reference engineering blueprints.
          </span>
        </div>

        {/* Grid of Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DEMONSTRATION_CASE_STUDIES.slice(0, 2).map((study) => {
            const currentTab = activeTabs[study.id] || 'overview';
            const isOmniFlow = study.id === 'omniflow-ai';

            return (
              <SpotlightCard
                key={study.id}
                className="p-8 lg:p-9 flex flex-col justify-between border-white/10 bg-[#090D1A]"
                spotlightColor="rgba(0, 210, 254, 0.12)"
              >
                <div>
                  {/* Category & Demo Label */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#00D2FE] border border-white/10 font-medium">
                      {study.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {study.demoLabel}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00D2FE] transition-colors leading-snug mb-1">
                    {study.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mb-6">
                    {study.tagline}
                  </p>

                  {/* Interactive Tabs Header */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#060914] border border-white/10 mb-5">
                    <button
                      type="button"
                      onClick={() => setTab(study.id, 'overview')}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                        currentTab === 'overview'
                          ? 'bg-[#00D2FE] text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
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
                          ? 'bg-[#00D2FE] text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
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
                          ? 'bg-[#00D2FE] text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
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
                          ? 'bg-[#00D2FE] text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <ListCheck className="w-3.5 h-3.5" />
                      <span>Results</span>
                    </button>
                  </div>

                  {/* Tab 1: Product UI & Visual Architecture Preview */}
                  {currentTab === 'overview' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      {/* Realistic UI Product Preview Frame */}
                      <div className="rounded-xl bg-[#060914] border border-white/10 overflow-hidden shadow-2xl">
                        {/* Mockup Window Chrome */}
                        <div className="flex items-center justify-between px-3 py-2 bg-[#090E1C] border-b border-white/10 text-[10px] font-mono text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                            <span className="ml-1 text-slate-300 font-sans font-medium text-[11px]">
                              {isOmniFlow ? 'OmniFlow AI Console' : 'PulseHealth Telehealth Suite'}
                            </span>
                          </div>
                          <span className="text-emerald-400">Live Simulation</span>
                        </div>

                        {/* Mockup Body Content */}
                        <div className="p-4 space-y-3">
                          {isOmniFlow ? (
                            <>
                              {/* OmniFlow Live Metrics */}
                              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                  <span className="text-[10px] text-slate-400 block">Resolution Rate</span>
                                  <span className="font-bold text-[#00D2FE]">90.4%</span>
                                </div>
                                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                  <span className="text-[10px] text-slate-400 block">Avg Response</span>
                                  <span className="font-bold text-emerald-400">1.8s</span>
                                </div>
                                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                  <span className="text-[10px] text-slate-400 block">Daily Inbound</span>
                                  <span className="font-bold text-[#818CF8]">24,800+</span>
                                </div>
                              </div>
                              <div className="p-3 rounded-lg bg-[#0A0F1D] border border-white/5 text-[11px] text-slate-300 space-y-1">
                                <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                                  <span>Active Pipeline: WhatsApp Cloud API</span>
                                  <span className="text-emerald-400">Connected</span>
                                </div>
                                <p className="text-xs text-slate-200">
                                  &ldquo;Autonomous triage routed customer inquiry to Pinecone Knowledge Base with 0.96 cosine match.&rdquo;
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* PulseHealth Medical Vitals Stream */}
                              <div className="p-3 rounded-lg bg-[#0A0F1D] border border-white/5 space-y-2">
                                <div className="flex items-center justify-between text-xs font-mono">
                                  <span className="flex items-center gap-1.5 text-rose-400">
                                    <Heart className="w-3.5 h-3.5 animate-pulse" />
                                    <span>Real-Time Biometrics</span>
                                  </span>
                                  <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Encrypted WebRTC
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                                  <div className="p-1.5 rounded bg-white/5">
                                    <span className="text-[9px] text-slate-400 block">Pulse</span>
                                    <span className="text-rose-400 font-bold">72 BPM</span>
                                  </div>
                                  <div className="p-1.5 rounded bg-white/5">
                                    <span className="text-[9px] text-slate-400 block">SpO2</span>
                                    <span className="text-[#00D2FE] font-bold">98%</span>
                                  </div>
                                  <div className="p-1.5 rounded bg-white/5">
                                    <span className="text-[9px] text-slate-400 block">Latency</span>
                                    <span className="text-emerald-400 font-bold">&lt;180ms</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                <Video className="w-3.5 h-3.5 text-[#38BDF8]" />
                                <span>60 FPS multi-platform iOS/Android consulting room</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Challenge & Solution Summary */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#060914] border border-white/10 space-y-1">
                          <span className="font-semibold text-slate-200 block">The Challenge:</span>
                          <p className="text-slate-300 leading-relaxed text-[11px]">{study.challenge}</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#060914] border border-[#00D2FE]/20 space-y-1">
                          <span className="font-semibold text-[#00D2FE] block">Architectural Solution:</span>
                          <p className="text-slate-300 leading-relaxed text-[11px]">{study.solution}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Interactive Architecture Diagram */}
                  {currentTab === 'architecture' && (
                    <div className="animate-in fade-in duration-200">
                      <ArchitectureNodeFlow studyId={study.id} />
                    </div>
                  )}

                  {/* Tab 3: Technology Stack */}
                  {currentTab === 'stack' && (
                    <div className="p-5 rounded-xl bg-[#060914] border border-white/10 space-y-3 animate-in fade-in duration-200">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Core Frameworks & Infrastructure
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 text-slate-200 border border-white/10 hover:border-[#00D2FE]/50 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 4: Verified Results */}
                  {currentTab === 'features' && (
                    <div className="p-5 rounded-xl bg-[#060914] border border-white/10 space-y-3 animate-in fade-in duration-200">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Verified Architectural Results
                      </span>
                      <div className="space-y-2.5">
                        {study.outcomes.map((outcome, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/case-studies#${study.id}`}
                    className="text-xs font-semibold text-[#00D2FE] inline-flex items-center gap-1.5 hover:underline"
                  >
                    <span>{t.caseStudies.viewCaseStudy}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <span className="text-[10px] font-mono text-slate-500">
                    Production Architecture
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { DEMONSTRATION_CASE_STUDIES } from '@/lib/constants';
import { ArrowUpRight, CheckCircle2, ShieldAlert, Cpu, Terminal, ArrowRight } from 'lucide-react';

export default function CaseStudiesClient() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Architecture Studies' },
    { id: 'AI Solutions', name: 'AI Solutions' },
    { id: 'Mobile Applications', name: 'Mobile Applications' },
    { id: 'Custom Software', name: 'Custom Software' },
    { id: 'SaaS Platforms', name: 'SaaS Platforms' },
  ];

  const filtered =
    activeCategory === 'all'
      ? DEMONSTRATION_CASE_STUDIES
      : DEMONSTRATION_CASE_STUDIES.filter((c) => c.category === activeCategory);

  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Engineering Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.caseStudies.title}
          </h1>
          <p className="text-base text-slate-400">
            {t.caseStudies.subtitle}
          </p>
        </div>

        {/* Conceptual Transparency Alert */}
        <div className="mb-10 p-4 rounded-2xl bg-surface-card border border-[#00D2FE]/30 flex items-center gap-3 text-xs text-slate-300 shadow-lg">
          <ShieldAlert className="w-5 h-5 text-[#00D2FE] shrink-0" />
          <span>
            <strong className="text-white font-semibold">Engineering Disclaimer:</strong> The projects detailed below represent rigorously designed conceptual architecture demonstrations and reference engineering blueprints created by the KRAD Technology engineering team to demonstrate capabilities. No unverified metrics or fabricated clients are cited.
          </span>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#00D2FE] text-slate-900 font-semibold shadow-cyan-glow'
                  : 'bg-surface-card hover:bg-surface-light text-slate-300 border border-border-subtle'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Case Studies Deep Dive List */}
        <div className="space-y-12">
          {filtered.map((study) => (
            <article
              key={study.id}
              id={study.id}
              className="scroll-mt-28 rounded-3xl bg-surface-card border border-border-subtle hover:border-[#00D2FE]/40 p-8 sm:p-12 transition-all duration-300 shadow-xl"
            >
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-[#00D2FE] border border-[#00D2FE]/30">
                    {study.category}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {study.demoLabel}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-500">ID: {study.id}</div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {study.title}
              </h2>
              <p className="text-sm font-medium text-[#00D2FE] mb-6">
                {study.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
                {study.overview}
              </p>

              {/* Problem vs Solution Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-[#050814] border border-border-subtle space-y-2">
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>{t.caseStudies.problem}</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#050814] border border-border-subtle space-y-2">
                  <h3 className="text-xs font-mono font-bold text-[#00D2FE] uppercase tracking-wider flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#00D2FE]" />
                    <span>{t.caseStudies.solution}</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {study.solution}
                  </p>
                </div>
              </div>

              {/* Key Features & Simulated Benchmarks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Features */}
                <div className="p-6 rounded-2xl bg-[#050814] border border-border-subtle space-y-3">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Core Architectural Features
                  </h3>
                  <ul className="space-y-2">
                    {study.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div className="p-6 rounded-2xl bg-[#050814] border border-border-subtle space-y-3">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {t.caseStudies.outcomes}
                  </h3>
                  <ul className="space-y-2">
                    {study.outcomes.map((out, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technology Badges & Action */}
              <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs font-medium text-slate-400 mr-1">Stack:</span>
                  {study.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 text-slate-200 border border-border-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/project-requirements?template=${encodeURIComponent(study.title)}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow transition-all shrink-0"
                >
                  <span>Build Similar System</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

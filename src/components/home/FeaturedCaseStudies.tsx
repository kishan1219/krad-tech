'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { DEMONSTRATION_CASE_STUDIES } from '@/lib/constants';
import { ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function FeaturedCaseStudies() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#050814] relative border-t border-border-subtle">
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
        <div className="mb-8 p-3.5 rounded-xl bg-[#0B1120] border border-[#00D2FE]/20 flex items-center gap-3 text-xs text-slate-300">
          <ShieldAlert className="w-4 h-4 text-[#00D2FE] shrink-0" />
          <span>
            <strong className="text-white font-medium">Transparency Notice:</strong> All showcase projects represent conceptual architecture demonstrations and reference engineering blueprints.
          </span>
        </div>

        {/* Grid of Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DEMONSTRATION_CASE_STUDIES.slice(0, 4).map((study) => (
            <div
              key={study.id}
              className="group rounded-2xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 p-7 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Category & Demo Label */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#00D2FE] border border-[#00D2FE]/20">
                    {study.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {study.demoLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-[#00D2FE] transition-colors leading-snug">
                  {study.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-slate-400 font-medium">
                  {study.tagline}
                </p>

                {/* Challenge & Solution */}
                <div className="space-y-2 text-xs pt-1">
                  <div>
                    <span className="font-semibold text-slate-300 block mb-0.5">The Challenge:</span>
                    <p className="text-slate-400 line-clamp-2">{study.challenge}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#00D2FE] block mb-0.5">Architectural Solution:</span>
                    <p className="text-slate-300 line-clamp-2">{study.solution}</p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {study.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-border-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                  {study.technologies.length > 5 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500">
                      +{study.technologies.length - 5} more
                    </span>
                  )}
                </div>

                {/* Simulated Outcomes */}
                <div className="pt-2 border-t border-border-subtle/50 space-y-1">
                  {study.outcomes.slice(0, 2).map((outcome, oIdx) => (
                    <div key={oIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE] shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between">
                <Link
                  href={`/case-studies#${study.id}`}
                  className="text-xs font-semibold text-[#00D2FE] inline-flex items-center gap-1 hover:underline"
                >
                  <span>{t.caseStudies.viewCaseStudy}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

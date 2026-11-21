'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { CORE_CAPABILITIES } from '@/lib/constants';
import { MessageSquareText, Bot, Cpu, Mic, ArrowUpRight } from 'lucide-react';

export default function CorePillars() {
  const { t } = useLanguage();

  const iconMap: Record<string, React.ReactNode> = {
    MessageSquareText: <MessageSquareText className="w-6 h-6 text-[#00D2FE]" />,
    Bot: <Bot className="w-6 h-6 text-[#38BDF8]" />,
    Cpu: <Cpu className="w-6 h-6 text-[#818CF8]" />,
    Mic: <Mic className="w-6 h-6 text-[#A78BFA]" />,
  };

  return (
    <section className="py-20 bg-[#050814] relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Official Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.hero.capabilitiesHeadline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.hero.capabilitiesSubtext}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_CAPABILITIES.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="group relative rounded-2xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 p-6 transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#0A0F1D] border border-border-subtle group-hover:border-[#00D2FE]/50 flex items-center justify-center transition-all shadow-sm">
                    {iconMap[pillar.icon]}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00D2FE]/10 text-[#00D2FE] border border-[#00D2FE]/20">
                    {pillar.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#00D2FE] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    {pillar.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-4 border-t border-border-subtle/60 flex items-center justify-between text-xs font-semibold text-[#00D2FE]">
                <Link
                  href="/services#ai-business-solutions"
                  className="inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>Explore Capabilities</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <span className="font-mono text-slate-600 text-[10px]">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

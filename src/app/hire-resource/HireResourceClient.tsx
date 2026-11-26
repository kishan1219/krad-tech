'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { RESOURCE_ROLES, ENGAGEMENT_MODELS } from '@/lib/constants';
import HireResourceForm from '@/components/forms/HireResourceForm';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

const FEATURED_ROLE_COUNT = 6;

export default function HireResourceClient() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('Featured');

  const categories = [
    'Featured',
    'Frontend',
    'Backend',
    'Full Stack',
    'Mobile',
    'AI / Data',
    'Design & Creative',
    'DevOps & QA',
    'All (17)',
  ];

  const filteredRoles =
    selectedCategory === 'Featured'
      ? RESOURCE_ROLES.slice(0, FEATURED_ROLE_COUNT)
      : selectedCategory === 'All (17)'
      ? RESOURCE_ROLES
      : RESOURCE_ROLES.filter((r) => r.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 bg-[#05070E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#06B6D4]">
            Dedicated Engineering &amp; Creative Talent
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.hire.title}
          </h1>
          <p className="text-base text-slate-400">{t.hire.subtitle}</p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-[#06B6D4] font-mono">
            <span>&bull; Direct Communication</span>
            <span>&bull; Flexible Time-Zone Overlap</span>
            <span>&bull; Senior Evaluated Profiles</span>
          </div>
        </ScrollReveal>

        {/* Engagement Models Overview */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-white">Flexible Engagement Models</h2>
            <p className="text-xs text-slate-400">
              Choose the engagement structure that aligns with your product roadmap and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <ScrollReveal key={model.id} index={idx}>
                <SpotlightCard className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-[#06B6D4]">{model.title}</h3>
                    <p className="text-xs text-slate-300 font-medium">{model.tagline}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{model.description}</p>

                    <div className="pt-2 border-t border-white/[0.08] space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        Features:
                      </span>
                      {model.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.08] text-[11px] text-slate-500">
                    <strong className="text-slate-400">Best for:</strong> {model.bestFor}
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Roles Filter & Scannable Directory */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Available Disciplines</h2>
              <p className="text-xs text-slate-400 mt-1">
                Filter by discipline to avoid scroll fatigue—17 vetted roles across engineering, AI, and design.
              </p>
            </div>

            {/* Discipline Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isCreativeTab = cat === 'Design & Creative';
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? isCreativeTab
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold'
                          : 'bg-[#06B6D4] text-slate-950 font-semibold'
                        : 'bg-[#0B101E] text-slate-300 border border-white/[0.08] hover:text-white hover:bg-[#121A2E]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role, idx) => {
              const isCreative = role.category === 'Design & Creative';
              return (
                <ScrollReveal key={role.id} index={idx % 6}>
                  <SpotlightCard
                    variant={isCreative ? 'creative' : 'engineering'}
                    className="p-6 h-full flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border ${
                            isCreative
                              ? 'text-[#8B5CF6] border-[#8B5CF6]/25'
                              : 'text-[#06B6D4] border-[#06B6D4]/25'
                          }`}
                        >
                          {role.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{role.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{role.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {role.skills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#05070E] text-slate-300 border border-white/[0.08]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/[0.06]">
                      <a
                        href="#hiring-form"
                        className={`text-xs font-semibold inline-flex items-center gap-1 hover:underline ${
                          isCreative ? 'text-[#8B5CF6]' : 'text-[#06B6D4]'
                        }`}
                      >
                        <span>Request {role.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>

          {selectedCategory === 'Featured' && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('All (17)')}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-[#0B101E] hover:bg-[#121A2E] border border-white/10 hover:border-[#06B6D4]/40 transition-all"
              >
                View All 17 Engineering &amp; Creative Roles
              </button>
            </div>
          )}
        </div>

        {/* Integrated Hiring Form */}
        <div id="hiring-form" className="scroll-mt-28 max-w-4xl mx-auto">
          <HireResourceForm />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { RESOURCE_ROLES, ENGAGEMENT_MODELS } from '@/lib/constants';
import HireResourceForm from '@/components/forms/HireResourceForm';
import { CheckCircle2 } from 'lucide-react';

export default function HireResourceClient() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'AI / Data', 'Design & Creative', 'DevOps & QA'];

  const filteredRoles =
    selectedCategory === 'all'
      ? RESOURCE_ROLES
      : RESOURCE_ROLES.filter((r) => r.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Dedicated Engineering Talent
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.hire.title}
          </h1>
          <p className="text-base text-slate-400">
            {t.hire.subtitle}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-[#00D2FE] font-mono">
            <span>• Direct Communication</span>
            <span>• Flexible Time-Zone Overlap</span>
            <span>• Senior Evaluated Profiles</span>
          </div>
        </div>

        {/* Engagement Models Overview */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-white">Flexible Engagement Models</h2>
            <p className="text-xs text-slate-400">Choose the engagement structure that aligns with your product roadmap and budget.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.id}
                className="p-6 rounded-2xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white text-[#00D2FE]">
                    {model.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {model.tagline}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {model.description}
                  </p>

                  <div className="pt-2 border-t border-border-subtle/50 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Features:</span>
                    {model.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border-subtle/60 text-[11px] text-slate-500">
                  <strong className="text-slate-400">Best for:</strong> {model.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roles Filter & Directory */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Available Engineering Disciplines</h2>
              <p className="text-xs text-slate-400 mt-1">17 specialized roles available across full-stack and creative domains.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#00D2FE] text-slate-900 font-semibold'
                      : 'bg-surface-card text-slate-300 border border-border-subtle hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Roles' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-[#00D2FE]/30 transition-all duration-200 shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#00D2FE] border border-[#00D2FE]/20">
                      {role.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {role.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#050814] text-slate-300 border border-border-subtle"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrated Hiring Form */}
        <div id="hiring-form" className="scroll-mt-28 max-w-4xl mx-auto">
          <HireResourceForm />
        </div>
      </div>
    </div>
  );
}

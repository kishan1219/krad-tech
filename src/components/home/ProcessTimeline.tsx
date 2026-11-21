'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, PenTool, Code2, ShieldCheck, Rocket, RefreshCw } from 'lucide-react';

export default function ProcessTimeline() {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t.process.step1,
      desc: t.process.step1Desc,
      icon: <Compass className="w-5 h-5 text-[#00D2FE]" />,
    },
    {
      num: '02',
      title: t.process.step2,
      desc: t.process.step2Desc,
      icon: <PenTool className="w-5 h-5 text-[#38BDF8]" />,
    },
    {
      num: '03',
      title: t.process.step3,
      desc: t.process.step3Desc,
      icon: <Code2 className="w-5 h-5 text-[#818CF8]" />,
    },
    {
      num: '04',
      title: t.process.step4,
      desc: t.process.step4Desc,
      icon: <ShieldCheck className="w-5 h-5 text-[#A78BFA]" />,
    },
    {
      num: '05',
      title: t.process.step5,
      desc: t.process.step5Desc,
      icon: <Rocket className="w-5 h-5 text-[#00D2FE]" />,
    },
    {
      num: '06',
      title: t.process.step6,
      desc: t.process.step6Desc,
      icon: <RefreshCw className="w-5 h-5 text-[#38BDF8]" />,
    },
  ];

  return (
    <section className="py-20 bg-[#050814] relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Predictable Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.process.title}
          </h2>
          <p className="text-sm text-slate-400">
            {t.process.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-6 rounded-2xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 transition-all duration-300 shadow-md group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A0F1D] border border-border-subtle group-hover:border-[#00D2FE]/40 flex items-center justify-center transition-colors">
                  {step.icon}
                </div>
                <span className="text-xs font-mono font-bold text-[#00D2FE] px-2.5 py-1 rounded-full bg-[#00D2FE]/10 border border-[#00D2FE]/20">
                  Step {step.num}
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00D2FE] transition-colors mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

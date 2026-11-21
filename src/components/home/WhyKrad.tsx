'use client';

import React from 'react';
import { Users2, Code, ShieldCheck, Clock, Cpu, Award } from 'lucide-react';

export default function WhyKrad() {
  const points = [
    {
      title: 'Senior Technical Ownership',
      desc: 'Collaborate directly with senior full-stack architects and tech leads from day one. Zero bureaucratic account layers.',
      icon: <Users2 className="w-5 h-5 text-[#00D2FE]" />,
    },
    {
      title: 'Zero Technical Debt Mindset',
      desc: 'Clean modular code, complete TypeScript typing, strict linting, and comprehensive architecture diagrams.',
      icon: <Code className="w-5 h-5 text-[#38BDF8]" />,
    },
    {
      title: 'Verifiable Security Posture',
      desc: 'OWASP Top 10 mitigation, strict Content Security Policies, parameterized queries, and encrypted database pipelines.',
      icon: <ShieldCheck className="w-5 h-5 text-[#818CF8]" />,
    },
    {
      title: 'Transparent Sprint Cadence',
      desc: 'Two-week sprint cycles with weekly demonstrable builds, shared Jira/Linear boards, and real-time Slack/Teams communication.',
      icon: <Clock className="w-5 h-5 text-[#A78BFA]" />,
    },
    {
      title: 'End-to-End Capabilities',
      desc: 'From generative AI agents and WhatsApp APIs to mobile apps and 3D motion graphics, we cover the full digital spectrum.',
      icon: <Cpu className="w-5 h-5 text-[#00D2FE]" />,
    },
    {
      title: 'Flexible Engagement Models',
      desc: 'Choose from dedicated full-time talent, milestone-based fixed projects, or on-demand hourly consulting.',
      icon: <Award className="w-5 h-5 text-[#38BDF8]" />,
    },
  ];

  return (
    <section className="py-20 bg-[#050814] relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Engineering Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why KRAD Technology
          </h2>
          <p className="text-sm text-slate-400">
            We operate as your dedicated engineering partner, delivering software built to scale smoothly as your business grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt) => (
            <div
              key={pt.title}
              className="p-6 rounded-2xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 transition-all duration-300 shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0A0F1D] border border-border-subtle group-hover:border-[#00D2FE]/40 flex items-center justify-center mb-4 transition-colors">
                {pt.icon}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00D2FE] transition-colors mb-2">
                {pt.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pt.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

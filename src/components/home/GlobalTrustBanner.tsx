'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Globe2, 
  CheckCircle2
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

export default function GlobalTrustBanner() {
  const regions = [
    {
      flag: '🇮🇳',
      name: 'India (Engineering Hub)',
      desc: 'Core R&D, distributed microservices, AI pipelines, and mobile architecture teams.',
      sla: 'IST High-Velocity Sprints',
      currency: 'INR (₹) Billing Supported',
    },
    {
      flag: '🇺🇸',
      name: 'United States & Americas',
      desc: 'Enterprise cloud modernizations, HIPAA-aligned architectures, and SaaS scalability.',
      sla: 'EST & PST Overlap Coverage',
      currency: 'USD ($) Invoicing',
    },
    {
      flag: '🇪🇺',
      name: 'Europe & United Kingdom',
      desc: 'GDPR-compliant sovereign data storage, fintech security, and nearshore collaboration.',
      sla: 'CET & GMT Business Hours',
      currency: 'EUR (€) & GBP (£) Contracts',
    },
  ];

  const compliances = [
    { title: 'HIPAA Architecture', desc: 'BAA-ready, end-to-end encrypted telemetry for healthcare applications.' },
    { title: 'GDPR & DPDP Act', desc: 'Strict data residency with zero unauthorized third-party retention.' },
    { title: 'OWASP Top 10 Hardened', desc: 'Automated static analysis, penetration checks, and SQL/XSS mitigation.' },
    { title: 'SOC 2 Alignment', desc: 'Role-Based Access Control, audit logging, and immutable infrastructure.' },
  ];

  return (
    <section className="py-24 bg-[#070C1A] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <Globe2 className="w-3.5 h-3.5 text-[#00D2FE]" />
            <span>International Delivery Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Global Enterprises & High-Growth Startups
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Whether your headquarters is in Mumbai, London, New York, or Berlin, KRAD Technology provides localized currency contracts, strict regulatory compliance, and seamless timezone collaboration.
          </p>
        </div>

        {/* Global Regional Delivery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {regions.map((reg) => (
            <SpotlightCard
              key={reg.name}
              className="p-7 border-white/10 bg-[#0A1022] flex flex-col justify-between"
              spotlightColor="rgba(0, 210, 254, 0.12)"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl select-none">{reg.flag}</span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#00D2FE] border border-white/10 font-semibold">
                    {reg.currency}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white pt-1">
                  {reg.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {reg.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{reg.sla}</span>
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Enterprise Regulatory & Security Standards Strip */}
        <div className="p-8 rounded-2xl bg-[#050814] border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00D2FE]/10 border border-[#00D2FE]/30 flex items-center justify-center text-[#00D2FE]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Enterprise Security & Compliance Framework
                </h4>
                <p className="text-xs text-slate-400">
                  Every software release conforms to strict international regulatory frameworks.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shrink-0">
              Audit-Ready Deployments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {compliances.map((c) => (
              <div key={c.title} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <span className="font-bold text-white block text-sm">
                  {c.title}
                </span>
                <p className="text-slate-400 leading-relaxed text-xs">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

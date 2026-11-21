'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Smartphone, Bot, Layers, ArrowUpRight } from 'lucide-react';

export default function WhatWeBuild() {
  const items = [
    {
      title: 'Modern Web Applications',
      desc: 'High-performance SaaS platforms, responsive customer portals, and real-time dashboards with sub-second page loads.',
      icon: <Globe className="w-6 h-6 text-[#00D2FE]" />,
      tags: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      href: '/services#web-development',
    },
    {
      title: 'Mobile Applications',
      desc: 'Fluid, cross-platform apps with offline sync, native sensor integration, push notifications, and biometric authentication.',
      icon: <Smartphone className="w-6 h-6 text-[#38BDF8]" />,
      tags: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
      href: '/services#mobile-development',
    },
    {
      title: 'AI Business Systems',
      desc: 'Custom RAG knowledge engines, official WhatsApp Business API chatbots, autonomous agents, and conversational voice assistants.',
      icon: <Bot className="w-6 h-6 text-[#818CF8]" />,
      tags: ['OpenAI', 'Gemini', 'LangChain', 'Pinecone', 'WhatsApp API'],
      href: '/services#ai-business-solutions',
    },
    {
      title: 'Custom Enterprise Software',
      desc: 'Bespoke ERP, CRM, and workflow management systems engineered to replace rigid off-the-shelf software and eliminate recurring license fees.',
      icon: <Layers className="w-6 h-6 text-[#A78BFA]" />,
      tags: ['.NET Core', 'Python', 'FastAPI', 'Docker', 'Power BI'],
      href: '/services#custom-software',
    },
  ];

  return (
    <section className="py-20 bg-[#050814] relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Engineering Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What We Build
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Purpose-built digital systems designed for high performance, enterprise security, and effortless maintainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 p-8 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A0F1D] border border-border-subtle group-hover:border-[#00D2FE]/40 flex items-center justify-center transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00D2FE] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-slate-300 border border-border-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between">
                <Link
                  href={item.href}
                  className="text-xs font-semibold text-[#00D2FE] inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>View Specifications</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

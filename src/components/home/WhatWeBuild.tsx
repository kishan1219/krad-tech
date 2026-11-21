'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Fingerprint, 
  Wifi, 
  Battery 
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

export default function WhatWeBuild() {
  return (
    <section className="py-24 bg-[#050814] relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
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

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1: Modern Web Applications (Span 2 Columns with Browser Chrome Mockup) */}
          <SpotlightCard 
            className="md:col-span-2 p-7 lg:p-8 flex flex-col justify-between border-[#00D2FE]/25 bg-gradient-to-br from-[#0B1120] to-[#0A1020]"
            spotlightColor="rgba(0, 210, 254, 0.12)"
          >
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00D2FE]/10 border border-[#00D2FE]/30 flex items-center justify-center text-[#00D2FE]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#00D2FE] font-semibold tracking-wider uppercase block">
                      Production Web Systems
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Modern Web Applications & SaaS
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    Sub-Second Page Loads
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-2xl">
                High-concurrency SaaS platforms, real-time analytics portals, and customer-facing web applications built with Next.js 15 App Router, React 19, and scalable microservices.
              </p>

              {/* Browser Window Chrome Mockup */}
              <div className="rounded-xl bg-[#060914] border border-border-subtle/80 overflow-hidden shadow-2xl">
                {/* Browser Address Bar */}
                <div className="flex items-center gap-3 px-4 py-2.5 bg-[#090E1C] border-b border-border-subtle/70">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 max-w-md mx-auto px-3 py-1 rounded-md bg-[#050814] border border-border-subtle text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span className="text-slate-200">https://app.krad-enterprise.io/telemetry</span>
                  </div>
                </div>

                {/* Browser Content Area */}
                <div className="p-4 grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-border-subtle">
                    <span className="text-[10px] font-mono text-slate-400 block">P99 Latency</span>
                    <span className="text-sm font-bold text-[#00D2FE] font-mono">42ms</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-border-subtle">
                    <span className="text-[10px] font-mono text-slate-400 block">Edge SSR</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">100% Hit</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-border-subtle">
                    <span className="text-[10px] font-mono text-slate-400 block">Accessibility</span>
                    <span className="text-sm font-bold text-[#38BDF8] font-mono">WCAG 2.1 AA</span>
                  </div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-5">
                {['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-slate-300 border border-border-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between text-xs font-semibold text-[#00D2FE]">
              <Link href="/services#web-development" className="inline-flex items-center gap-1.5 hover:underline">
                <span>View Web Specifications</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Web Architecture</span>
            </div>
          </SpotlightCard>

          {/* Card 2: Mobile Applications (With Phone Bezel Mockup) */}
          <SpotlightCard 
            className="p-7 flex flex-col justify-between border-[#38BDF8]/25 bg-gradient-to-br from-[#0B1120] to-[#0A1224]"
            spotlightColor="rgba(56, 189, 248, 0.15)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                  iOS & Android
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                Mobile Applications
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Fluid, native-speed cross-platform apps with offline sync, sensor telemetry, and biometric auth.
              </p>

              {/* Smartphone Screen Bezel Mockup */}
              <div className="p-3 rounded-2xl bg-[#060914] border border-border-subtle/80 space-y-2.5 max-w-[240px] mx-auto shadow-xl">
                {/* Phone Status Bar */}
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 px-1">
                  <span>9:41</span>
                  <div className="w-10 h-2 bg-slate-800 rounded-full" />
                  <div className="flex items-center gap-1">
                    <Wifi className="w-2.5 h-2.5" />
                    <Battery className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Phone Mini Card */}
                <div className="p-2 rounded-xl bg-white/5 border border-border-subtle space-y-1 text-left">
                  <div className="flex items-center justify-between text-[10px] font-medium text-white">
                    <span className="flex items-center gap-1">
                      <Fingerprint className="w-3 h-3 text-[#38BDF8]" />
                      Biometric Auth
                    </span>
                    <span className="text-emerald-400 font-mono text-[9px]">Verified</span>
                  </div>
                  <p className="text-[9px] text-slate-400">120 FPS native render engine with background Bluetooth LE sync.</p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4">
                {['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-border-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between text-xs font-semibold text-[#38BDF8]">
              <Link href="/services#mobile-development" className="inline-flex items-center gap-1 hover:underline">
                <span>View Mobile Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Mobile Core</span>
            </div>
          </SpotlightCard>

          {/* Card 3: AI Business Systems */}
          <SpotlightCard 
            className="p-7 flex flex-col justify-between border-[#818CF8]/25 bg-gradient-to-br from-[#0B1120] to-[#0E1329]"
            spotlightColor="rgba(129, 140, 248, 0.15)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/30 flex items-center justify-center text-[#818CF8]">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#818CF8]/10 text-[#818CF8] border border-[#818CF8]/20">
                  RAG & Agents
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                AI Business Systems
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Private RAG knowledge engines, enterprise LangChain routing, and autonomous operational agents.
              </p>

              {/* Mini Vector Visualizer */}
              <div className="p-3 rounded-xl bg-[#060914] border border-border-subtle/80 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>Cosine Similarity</span>
                  <span className="text-[#818CF8] font-bold">0.964</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[96%] h-full bg-gradient-to-r from-[#00D2FE] to-[#818CF8] rounded-full" />
                </div>
                <span className="text-[10px] text-slate-400 block pt-0.5 font-mono">
                  Grounding: 100% Private Data Store
                </span>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4">
                {['OpenAI', 'Gemini 2.0', 'LangChain', 'Pinecone', 'WhatsApp API'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-border-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between text-xs font-semibold text-[#818CF8]">
              <Link href="/services#ai-business-solutions" className="inline-flex items-center gap-1 hover:underline">
                <span>View AI Systems</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">AI Architecture</span>
            </div>
          </SpotlightCard>

          {/* Card 4: Custom Enterprise Software (Span 2 Columns) */}
          <SpotlightCard 
            className="md:col-span-2 p-7 lg:p-8 flex flex-col justify-between border-[#A78BFA]/25 bg-gradient-to-br from-[#0B1120] to-[#0F1122]"
            spotlightColor="rgba(167, 139, 250, 0.12)"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A78BFA] font-semibold tracking-wider uppercase block">
                      Enterprise Modernization
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Custom Enterprise Software & Microservices
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20">
                  Zero Recurring SaaS Tax
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 max-w-2xl">
                Bespoke ERP, CRM, and workflow management systems engineered to replace rigid third-party licenses with custom, owned IP tailored exactly to your organizational data flow.
              </p>

              {/* Architecture Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#060914] border border-border-subtle/80 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#A78BFA]" />
                  <span className="text-slate-300">Async Event Bus</span>
                </div>
                <div className="p-3 rounded-xl bg-[#060914] border border-border-subtle/80 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">RBAC & mTLS</span>
                </div>
                <div className="p-3 rounded-xl bg-[#060914] border border-border-subtle/80 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00D2FE]" />
                  <span className="text-slate-300">99.99% Uptime</span>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-5">
                {['.NET 8 Core', 'Python / FastAPI', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-slate-300 border border-border-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between text-xs font-semibold text-[#A78BFA]">
              <Link href="/services#custom-software" className="inline-flex items-center gap-1.5 hover:underline">
                <span>View Enterprise Architecture</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Custom IP</span>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}

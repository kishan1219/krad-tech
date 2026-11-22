'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MessageSquareText, 
  Bot, 
  Mic, 
  ArrowUpRight, 
  Workflow 
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

export default function CorePillars() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#050814] relative border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00D2FE]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
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

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Enterprise WhatsApp Business API Infrastructure (2 Cols) */}
          <SpotlightCard 
            className="md:col-span-2 p-8 lg:p-9 flex flex-col justify-between border-white/10 bg-gradient-to-br from-[#0B1120] to-[#0A0E1D]"
            spotlightColor="rgba(0, 210, 254, 0.12)"
          >
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                    <MessageSquareText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#25D366] font-semibold tracking-wider uppercase block">
                      Enterprise Communication Infrastructure
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      WhatsApp Business API Solutions
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Official Meta Cloud API
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-2xl">
                We engineer scalable, high-concurrency WhatsApp infrastructure for enterprises. Connect verified customer engagement pipelines directly into your core PostgreSQL databases, ERP systems, and CRM workflows.
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#060914] border border-white/10 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Throughput</span>
                  <p className="text-white font-semibold font-mono">10,000+ msg/min</p>
                  <span className="text-[10px] text-slate-500">Auto-scalable edge workers</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Security</span>
                  <p className="text-emerald-400 font-semibold font-mono">HMAC-SHA256</p>
                  <span className="text-[10px] text-slate-500">End-to-end payload signature</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Integrations</span>
                  <p className="text-[#00D2FE] font-semibold font-mono">PostgreSQL & ERP</p>
                  <span className="text-[10px] text-slate-500">Direct bi-directional sync</span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#00D2FE]">
              <Link
                href="/services#ai-business-solutions"
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <span>Explore WhatsApp Infrastructure</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Capability 01</span>
            </div>
          </SpotlightCard>

          {/* Card 2: AI Voice Telephony & Conversational Audio */}
          <SpotlightCard 
            className="p-8 flex flex-col justify-between border-white/10 bg-gradient-to-br from-[#0B1120] to-[#0D1226]"
            spotlightColor="rgba(129, 140, 248, 0.12)"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/30 flex items-center justify-center text-[#818CF8]">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#818CF8]/10 text-[#818CF8] border border-[#818CF8]/20">
                  Conversational Audio
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Conversational Voice AI
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Sub-300ms ultra-low latency voice agents engineered for telephone booking, customer triage, and intelligent appointment dispatch.
              </p>

              {/* Technical Telemetry Strip */}
              <div className="p-3.5 rounded-xl bg-[#060914] border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Stream Protocol</span>
                  <span className="text-[#818CF8] font-bold">WebSockets / WebRTC</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Inference Latency</span>
                  <span className="text-emerald-400 font-bold">&lt; 280ms P99</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Audio Fidelity</span>
                  <span className="text-slate-200">Lossless 24kHz</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#818CF8]">
              <Link href="/services#ai-business-solutions" className="inline-flex items-center gap-1 hover:underline">
                <span>View Voice Specifications</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Capability 02</span>
            </div>
          </SpotlightCard>

          {/* Card 3: Business Automation & Event Pipelines */}
          <SpotlightCard 
            className="p-8 flex flex-col justify-between border-white/10 bg-gradient-to-br from-[#0B1120] to-[#0A1224]"
            spotlightColor="rgba(0, 210, 254, 0.12)"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#00D2FE]/10 border border-[#00D2FE]/30 flex items-center justify-center text-[#00D2FE]">
                  <Workflow className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00D2FE]/10 text-[#00D2FE] border border-[#00D2FE]/20">
                  Zero-Touch Operations
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Business Process Automation
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Resilient event-driven automation pipelines connecting databases, CRM systems, payment gateways, and custom ERPs with zero manual data entry.
              </p>

              {/* Technical Telemetry Strip */}
              <div className="p-3.5 rounded-xl bg-[#060914] border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Execution Model</span>
                  <span className="text-[#00D2FE] font-bold">Event-Driven Async</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Failure Recovery</span>
                  <span className="text-emerald-400 font-bold">Dead-Letter Queues</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Supported Tools</span>
                  <span className="text-slate-200">n8n, Zapier & Custom</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#00D2FE]">
              <Link href="/services#custom-software" className="inline-flex items-center gap-1 hover:underline">
                <span>View Automation Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Capability 03</span>
            </div>
          </SpotlightCard>

          {/* Card 4: Enterprise AI Chatbots & Knowledge RAG (2 Cols) */}
          <SpotlightCard 
            className="md:col-span-2 p-8 lg:p-9 flex flex-col justify-between border-white/10 bg-gradient-to-br from-[#0B1120] to-[#0A1020]"
            spotlightColor="rgba(56, 189, 248, 0.12)"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#38BDF8] font-semibold tracking-wider uppercase block">
                      Autonomous Intelligence
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Enterprise RAG & Autonomous Agents
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                  Private Knowledge Grounding
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-2xl">
                Ground your support teams and internal operations with strict, private knowledge retrieval. We engineer deterministic RAG architectures with citation references, zero data leakage, and strict security boundaries.
              </p>

              {/* Architecture Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#060914] border border-white/10 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Vector Storage</span>
                  <p className="text-white font-semibold font-mono">1536-dim Embeddings</p>
                  <span className="text-[10px] text-slate-500">Pinecone & pgvector</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Accuracy</span>
                  <p className="text-emerald-400 font-semibold font-mono">99.4% Factual Match</p>
                  <span className="text-[10px] text-slate-500">Zero-hallucination guardrails</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Data Privacy</span>
                  <p className="text-[#38BDF8] font-semibold font-mono">Zero Model Training</p>
                  <span className="text-[10px] text-slate-500">100% private enterprise store</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#38BDF8]">
              <Link href="/services#ai-business-solutions" className="inline-flex items-center gap-1.5 hover:underline">
                <span>Explore RAG Architectures</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Capability 04</span>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}

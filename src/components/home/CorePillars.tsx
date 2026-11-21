'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MessageSquareText, 
  Bot, 
  Cpu, 
  Mic, 
  ArrowUpRight, 
  CheckCheck, 
  Zap, 
  PhoneCall, 
  Workflow, 
  CheckCircle2 
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

export default function CorePillars() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#050814] relative border-t border-border-subtle">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00D2FE]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#6366F1]/5 rounded-full filter blur-3xl pointer-events-none" />

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
          
          {/* Card 1: Featured 2-Column WhatsApp Business API Card */}
          <SpotlightCard 
            className="md:col-span-2 p-7 lg:p-8 flex flex-col justify-between border-[#00D2FE]/25 bg-gradient-to-br from-[#0B1120] to-[#0A0E1D]"
            spotlightColor="rgba(37, 211, 102, 0.12)"
          >
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                    <MessageSquareText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#25D366] font-semibold tracking-wider uppercase block">
                      Official API Integration
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      WhatsApp Business API
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                    Meta Cloud API Verified
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-2xl">
                Automate mission-critical customer interactions with zero manual intervention. We engineer custom Meta Cloud API webhooks, dynamic message templates, verified payment checkouts, and multi-agent customer triage.
              </p>

              {/* Interactive Simulated Conversation Viewport */}
              <div className="p-4 rounded-xl bg-[#060914] border border-border-subtle/80 space-y-3 font-sans text-xs">
                {/* Simulated Customer Inbound */}
                <div className="flex items-start gap-2.5 justify-end">
                  <div className="max-w-md p-3 rounded-2xl rounded-tr-none bg-[#0B2E24] text-slate-100 border border-[#25D366]/20 shadow-sm">
                    <p className="text-xs">
                      Hi, can we integrate automated appointment booking directly into our PostgreSQL CRM with instant slot confirmation?
                    </p>
                    <span className="text-[10px] text-emerald-400/80 float-right mt-1 ml-2 flex items-center gap-1">
                      10:42 AM <CheckCheck className="w-3.5 h-3.5 inline text-[#25D366]" />
                    </span>
                  </div>
                </div>

                {/* Simulated Webhook Processing Pulse */}
                <div className="flex items-center justify-center gap-2 py-1 text-[10px] font-mono text-slate-400">
                  <Zap className="w-3 h-3 text-[#00D2FE]" />
                  <span>Webhook Event: Inbound Received • Signature Verified (12ms)</span>
                </div>

                {/* Simulated AI Agent Outbound */}
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#00D2FE]/20 border border-[#00D2FE]/40 flex items-center justify-center text-[#00D2FE] shrink-0 text-[10px] font-bold">
                    K
                  </div>
                  <div className="max-w-md p-3 rounded-2xl rounded-tl-none bg-[#111A2E] text-slate-200 border border-border-subtle shadow-sm">
                    <p className="text-xs">
                      ✅ Absolutely. OmniFlow webhook intercepts the booking request, queries your calendar API in 85ms, reserves the slot in PostgreSQL, and dispatches a verified WhatsApp ticket with an `.ics` calendar invite.
                    </p>
                    <span className="text-[10px] text-slate-400 float-right mt-1 ml-2">
                      10:42 AM • OmniFlow Agent
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between text-xs font-semibold text-[#00D2FE]">
              <Link
                href="/services#ai-business-solutions"
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <span>Explore WhatsApp Solutions</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Feature 01</span>
            </div>
          </SpotlightCard>

          {/* Card 2: AI Voice Assistants with Waveform */}
          <SpotlightCard 
            className="p-7 flex flex-col justify-between border-[#818CF8]/25 bg-gradient-to-br from-[#0B1120] to-[#0D1226]"
            spotlightColor="rgba(129, 140, 248, 0.15)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/30 flex items-center justify-center text-[#818CF8]">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#818CF8]/10 text-[#818CF8] border border-[#818CF8]/20">
                  Voice AI & Telephony
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                AI Voice Assistants
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Sub-300ms ultra-low latency voice agents for telephony, lead intake, and automated customer booking.
              </p>

              {/* Animated Audio Equalizer Waveform */}
              <div className="p-4 rounded-xl bg-[#060914] border border-border-subtle/80 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                    <span>Live Call: Active</span>
                  </span>
                  <span className="text-slate-500">Latency: 240ms</span>
                </div>

                <div className="h-10 flex items-center justify-center gap-1 px-2">
                  <div className="w-1.5 bg-[#818CF8] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4"></div>
                  <div className="w-1.5 bg-[#00D2FE] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-8"></div>
                  <div className="w-1.5 bg-[#818CF8] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-5"></div>
                  <div className="w-1.5 bg-[#38BDF8] rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-9"></div>
                  <div className="w-1.5 bg-[#818CF8] rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-6"></div>
                  <div className="w-1.5 bg-[#00D2FE] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-7"></div>
                  <div className="w-1.5 bg-[#818CF8] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4"></div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-border-subtle/60 pt-2">
                  <span>Speech-to-Text: Whisper</span>
                  <span>Audio Out: ElevenLabs</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between text-xs font-semibold text-[#818CF8]">
              <Link href="/services#ai-business-solutions" className="inline-flex items-center gap-1 hover:underline">
                <span>View Voice Capabilities</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Feature 02</span>
            </div>
          </SpotlightCard>

          {/* Card 3: Business Automation Pipeline */}
          <SpotlightCard 
            className="p-7 flex flex-col justify-between border-[#00D2FE]/25 bg-gradient-to-br from-[#0B1120] to-[#0A1224]"
            spotlightColor="rgba(0, 210, 254, 0.15)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00D2FE]/10 border border-[#00D2FE]/30 flex items-center justify-center text-[#00D2FE]">
                  <Workflow className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00D2FE]/10 text-[#00D2FE] border border-[#00D2FE]/20">
                  n8n / Custom Workflows
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                Business Automation
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Zero-touch operational data pipelines that eliminate repetitive manual workflows across ERP, CRM, and cloud services.
              </p>

              {/* Animated Step-by-Step Flow */}
              <div className="p-3.5 rounded-xl bg-[#060914] border border-border-subtle/80 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Event Pipeline</span>
                  <span className="text-emerald-400">100% Zero-Drop</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
                  <div className="p-1.5 rounded bg-white/5 border border-border-subtle text-slate-300">
                    Webhook
                  </div>
                  <div className="p-1.5 rounded bg-[#00D2FE]/10 border border-[#00D2FE]/30 text-[#00D2FE]">
                    Transform
                  </div>
                  <div className="p-1.5 rounded bg-white/5 border border-border-subtle text-slate-300">
                    Branch
                  </div>
                  <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    Sync DB
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 pt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE]" />
                  <span>Automated invoice generation & WhatsApp dispatch</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between text-xs font-semibold text-[#00D2FE]">
              <Link href="/services#custom-software" className="inline-flex items-center gap-1 hover:underline">
                <span>View Automation Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Feature 03</span>
            </div>
          </SpotlightCard>

          {/* Card 4: AI Chatbots & RAG Agents (Span 2 columns) */}
          <SpotlightCard 
            className="md:col-span-2 p-7 lg:p-8 flex flex-col justify-between border-[#38BDF8]/25 bg-gradient-to-br from-[#0B1120] to-[#0A1020]"
            spotlightColor="rgba(56, 189, 248, 0.15)"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#38BDF8] font-semibold tracking-wider uppercase block">
                      Autonomous Intelligence
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      AI Chatbots & Autonomous Agents
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                  LangChain • LlamaIndex • Pinecone
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 max-w-2xl">
                Equip your customer support and internal teams with high-precision RAG agents grounded in your private enterprise documentation. Zero hallucinations, strict permission boundaries, and instant citation references.
              </p>

              {/* RAG Knowledge Architecture Strip */}
              <div className="p-3.5 rounded-xl bg-[#060914] border border-border-subtle/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#38BDF8]" />
                  <span className="text-slate-300 font-medium">Vector Indexing:</span>
                  <span className="font-mono text-slate-400 text-[11px]">1536-dim Cohere / OpenAI Embeddings</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Zero Hallucination Guardrails Active</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between text-xs font-semibold text-[#38BDF8]">
              <Link href="/services#ai-business-solutions" className="inline-flex items-center gap-1.5 hover:underline">
                <span>Explore RAG Architectures</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="font-mono text-slate-500 text-[11px]">Feature 04</span>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}

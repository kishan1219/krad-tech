'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  Cpu, 
  Database, 
  Zap, 
  Layers, 
  Activity,
  Lock
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

export default function HeroEngineeringDashboard() {
  const [activeLayer, setActiveLayer] = useState<'edge' | 'services' | 'data'>('edge');

  const layers = {
    edge: {
      title: 'Edge Ingestion & Gateway Layer',
      subtitle: 'Global Cloudflare edge mesh with sub-30ms routing and zero-trust verification.',
      protocol: 'TLS 1.3 • HTTP/3 • WebSockets',
      security: 'HMAC-SHA256 • IP Throttling • DDoS Shield',
      throughput: '15,000+ req/sec',
      components: [
        { name: 'Meta WhatsApp Cloud API', role: 'Official Webhook Ingestion', status: 'Live 99.98%' },
        { name: 'Next.js 15 SSR Gateway', role: 'Edge-Rendered Web Clients', status: 'Sub-40ms P99' },
        { name: 'Cross-Platform Mobile Stream', role: 'Flutter / React Native WebSockets', status: 'Real-time' },
      ],
    },
    services: {
      title: 'Autonomous AI & Microservices Layer',
      subtitle: 'High-speed asynchronous Python & Node.js engines with strict RAG guardrails.',
      protocol: 'gRPC • Event-Driven Bus • REST',
      security: 'Zero Data Retention • Token Authorization',
      throughput: '450ms End-to-End Inference',
      components: [
        { name: 'LangChain & Agent Routers', role: 'Autonomous Multi-Agent Dispatch', status: 'Zero-Hallucination' },
        { name: 'FastAPI High-Speed Core', role: 'Async Business Logic Execution', status: 'Sub-15ms Run' },
        { name: 'Voice Telephony Synthesizer', role: 'Low-Latency Audio Streaming', status: '240ms Latency' },
      ],
    },
    data: {
      title: 'Persistent Data & Knowledge Mesh',
      subtitle: 'ACID-compliant relational clusters and high-dimensional vector embeddings.',
      protocol: 'PostgreSQL Wire • Redis Protocol',
      security: 'AES-256 at Rest • Encrypted in Transit',
      throughput: 'High-Concurrency Multi-AZ',
      components: [
        { name: 'PostgreSQL Relational DB', role: 'ACID Transactions & Audit Ledger', status: 'Multi-AZ' },
        { name: 'Pinecone Vector Storage', role: '1536-dim RAG Knowledge Retrieval', status: '0.96+ Cosine' },
        { name: 'Redis In-Memory Cache', role: 'Sub-5ms Key-Value & Session State', status: 'Sub-3ms Read' },
      ],
    },
  };

  const current = layers[activeLayer];

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col gap-4 select-none">
      {/* Background Ambient Radial Glow */}
      <div className="absolute -inset-4 bg-gradient-radial from-[#00D2FE]/15 via-[#3B82F6]/5 to-transparent rounded-3xl filter blur-3xl pointer-events-none" />

      {/* Control Console Window */}
      <SpotlightCard className="p-0 border-white/10 bg-[#0A0F1D]/90 shadow-2xl backdrop-blur-2xl overflow-hidden rounded-2xl">
        {/* Console Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0D1527] border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono font-medium text-slate-300 ml-2">
              KRAD System Architecture Console
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Operational</span>
          </div>
        </div>

        {/* Interactive Architecture Layer Switcher */}
        <div className="p-4 bg-[#070B16] border-b border-white/10">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setActiveLayer('edge')}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 ${
                activeLayer === 'edge'
                  ? 'bg-[#00D2FE]/15 border-[#00D2FE] shadow-[0_0_15px_rgba(0,210,254,0.25)]'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Globe className={`w-3.5 h-3.5 ${activeLayer === 'edge' ? 'text-[#00D2FE]' : 'text-slate-400'}`} />
                <span className="text-[11px] font-mono font-bold text-white">01. Edge Mesh</span>
              </div>
              <span className="text-[10px] text-slate-400 block truncate">Ingestion & Gateway</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveLayer('services')}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 ${
                activeLayer === 'services'
                  ? 'bg-[#818CF8]/15 border-[#818CF8] shadow-[0_0_15px_rgba(129,140,248,0.25)]'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Cpu className={`w-3.5 h-3.5 ${activeLayer === 'services' ? 'text-[#818CF8]' : 'text-slate-400'}`} />
                <span className="text-[11px] font-mono font-bold text-white">02. AI Services</span>
              </div>
              <span className="text-[10px] text-slate-400 block truncate">Agents & Microservices</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveLayer('data')}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 ${
                activeLayer === 'data'
                  ? 'bg-[#38BDF8]/15 border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Database className={`w-3.5 h-3.5 ${activeLayer === 'data' ? 'text-[#38BDF8]' : 'text-slate-400'}`} />
                <span className="text-[11px] font-mono font-bold text-white">03. Persistence</span>
              </div>
              <span className="text-[10px] text-slate-400 block truncate">ACID & Vectors</span>
            </button>
          </div>
        </div>

        {/* Selected Layer Technical Detail Pane */}
        <div className="p-5 space-y-4 bg-gradient-to-b from-[#090E1C] to-[#070B16]">
          {/* Layer Header */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00D2FE]" />
                {current.title}
              </h4>
              <span className="text-[10px] font-mono text-slate-400">Spec Sheet</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {current.subtitle}
            </p>
          </div>

          {/* Component Nodes Breakdown */}
          <div className="space-y-2 pt-1">
            {current.components.map((comp) => (
              <div
                key={comp.name}
                className="p-3 rounded-xl bg-[#050814]/80 border border-white/5 flex items-center justify-between hover:border-white/15 transition-colors"
              >
                <div>
                  <span className="text-xs font-semibold text-white block">
                    {comp.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {comp.role}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 text-emerald-400 border border-emerald-500/20 shrink-0">
                  {comp.status}
                </span>
              </div>
            ))}
          </div>

          {/* Architectural Metrics Strip */}
          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 space-y-0.5">
              <span className="text-[10px] text-slate-400 block flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#00D2FE]" />
                Encryption Standard
              </span>
              <span className="text-slate-200 text-[11px] font-semibold">{current.security}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 space-y-0.5">
              <span className="text-[10px] text-slate-400 block flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                Network Protocols
              </span>
              <span className="text-slate-200 text-[11px] font-semibold">{current.protocol}</span>
            </div>
          </div>
        </div>

        {/* Footer Audit Bar */}
        <div className="px-5 py-3 bg-[#050814] border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Activity className="w-3.5 h-3.5 text-[#00D2FE]" />
            <span>Infrastructure Health: Verified</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Enterprise Architecture Standard
          </span>
        </div>
      </SpotlightCard>

      {/* High-Trust Value Indicators */}
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="p-3 rounded-xl bg-[#0B1120]/80 border border-white/10 backdrop-blur-md">
          <span className="text-[10px] text-slate-400 block font-mono">Availability SLA</span>
          <span className="text-xs font-bold text-emerald-400 font-mono">99.98%</span>
        </div>
        <div className="p-3 rounded-xl bg-[#0B1120]/80 border border-white/10 backdrop-blur-md">
          <span className="text-[10px] text-slate-400 block font-mono">Global Edge</span>
          <span className="text-xs font-bold text-[#00D2FE] font-mono">Sub-30ms</span>
        </div>
        <div className="p-3 rounded-xl bg-[#0B1120]/80 border border-white/10 backdrop-blur-md">
          <span className="text-[10px] text-slate-400 block font-mono">Enterprise IP</span>
          <span className="text-xs font-bold text-[#818CF8] font-mono">100% Client Owned</span>
        </div>
      </div>
    </div>
  );
}

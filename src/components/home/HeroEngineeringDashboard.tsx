'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Cpu, 
  Database, 
  Globe, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

interface LogEntry {
  id: number;
  timestamp: string;
  tag: string;
  tagColor: string;
  message: string;
  activeNode: 'client' | 'gateway' | 'ai' | 'database';
}

const SIMULATED_LOGS: LogEntry[] = [
  {
    id: 1,
    timestamp: '14:22:01.104',
    tag: 'INBOUND',
    tagColor: 'text-[#25D366]',
    message: 'POST /api/v2/webhook/whatsapp (Payload: 1.4KB) - 200 OK',
    activeNode: 'client',
  },
  {
    id: 2,
    timestamp: '14:22:01.118',
    tag: 'AUTH',
    tagColor: 'text-[#00D2FE]',
    message: 'HMAC-SHA256 signature verified • Cloudflare Edge (Mumbai)',
    activeNode: 'gateway',
  },
  {
    id: 3,
    timestamp: '14:22:01.142',
    tag: 'INGEST',
    tagColor: 'text-amber-400',
    message: '"Inquire: Deploy multi-agent RAG pipeline for healthcare EHR"',
    activeNode: 'gateway',
  },
  {
    id: 4,
    timestamp: '14:22:01.178',
    tag: 'ROUTER',
    tagColor: 'text-[#818CF8]',
    message: 'Intent: Enterprise_Discovery -> Agent: OmniFlow_Core',
    activeNode: 'ai',
  },
  {
    id: 5,
    timestamp: '14:22:01.215',
    tag: 'VECTOR',
    tagColor: 'text-[#38BDF8]',
    message: 'Pinecone index: krad-knowledge-base (k=4, score=0.962)',
    activeNode: 'database',
  },
  {
    id: 6,
    timestamp: '14:22:01.320',
    tag: 'INFERENCE',
    tagColor: 'text-[#A78BFA]',
    message: 'Gemini 2.0 Flash • 48 tokens synthesized in 105ms',
    activeNode: 'ai',
  },
  {
    id: 7,
    timestamp: '14:22:01.385',
    tag: 'DISPATCH',
    tagColor: 'text-[#25D366]',
    message: 'WhatsApp Cloud API payload sent -> Status: Delivered (✓✓)',
    activeNode: 'client',
  },
];

export default function HeroEngineeringDashboard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Progressive streaming log timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= SIMULATED_LOGS.length - 1) {
          // Pause slightly on completed pipeline, then loop
          return 0;
        }
        return prev + 1;
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Auto-scroll terminal to newest log
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep]);

  const activeNode = SIMULATED_LOGS[currentStep]?.activeNode || 'gateway';

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col gap-4 select-none">
      {/* Background Ambient Glow */}
      <div className="absolute -inset-4 bg-gradient-radial from-[#00D2FE]/15 via-[#6366F1]/5 to-transparent rounded-3xl filter blur-2xl pointer-events-none" />

      {/* Top Floating Badge: Meta WhatsApp Cloud API */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1120]/90 border border-[#25D366]/30 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
          </span>
          <span className="text-[11px] font-mono text-slate-200 font-medium">Meta WhatsApp Cloud API</span>
          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#25D366]/10 text-[#25D366] font-semibold">
            CONNECTED
          </span>
        </div>

        <div className="inline-flex items-center gap-2 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#00D2FE]" />
            <span>P99: 142ms</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-medium">99.98% SLA</span>
        </div>
      </div>

      {/* Main Terminal Window with Spotlight */}
      <SpotlightCard className="p-0 border-[#00D2FE]/30 shadow-2xl bg-[#090D1A]/95">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0A1022] border-b border-border-subtle/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-1.5 ml-2 text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-[#00D2FE]" />
              <span className="text-xs font-mono font-medium text-slate-300">
                krad-gateway-cluster :: zsh
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 uppercase">
              Simulated Demo
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              title={isPlaying ? 'Pause simulation' : 'Play simulation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#00D2FE]" />}
            </button>
            <button
              onClick={() => setCurrentStep(0)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              title="Restart simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 font-mono text-[11px] leading-relaxed space-y-2 h-[195px] overflow-y-auto scrollbar-thin">
          {SIMULATED_LOGS.slice(0, currentStep + 1).map((log) => (
            <div key={log.id} className="flex items-start gap-2 animate-fadeIn">
              <span className="text-slate-500 select-none shrink-0 font-mono text-[10px]">
                {log.timestamp}
              </span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 bg-white/5 ${log.tagColor}`}>
                [{log.tag}]
              </span>
              <span className="text-slate-300 break-all">{log.message}</span>
            </div>
          ))}
          {/* Active Blinking Cursor */}
          <div className="flex items-center gap-1 text-[#00D2FE] pt-1">
            <span className="text-[10px] text-slate-600">→</span>
            <span className="animate-pulse">█</span>
          </div>
          <div ref={terminalEndRef} />
        </div>

        {/* Live System Topology Bar */}
        <div className="px-4 py-3 bg-[#060A14] border-t border-border-subtle/80 flex items-center justify-between text-xs">
          {/* Node 1: User / WhatsApp */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-300 ${
            activeNode === 'client' 
              ? 'bg-[#25D366]/15 border-[#25D366] text-white shadow-[0_0_12px_rgba(37,211,102,0.4)]' 
              : 'bg-white/5 border-border-subtle text-slate-400'
          }`}>
            <MessageSquare className={`w-3.5 h-3.5 ${activeNode === 'client' ? 'text-[#25D366]' : 'text-slate-500'}`} />
            <span className="text-[10px] font-mono font-medium">WhatsApp</span>
          </div>

          <span className="text-slate-600 text-[10px] font-mono">→</span>

          {/* Node 2: Gateway Router */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-300 ${
            activeNode === 'gateway' 
              ? 'bg-[#00D2FE]/15 border-[#00D2FE] text-white shadow-[0_0_12px_rgba(0,210,254,0.4)]' 
              : 'bg-white/5 border-border-subtle text-slate-400'
          }`}>
            <Globe className={`w-3.5 h-3.5 ${activeNode === 'gateway' ? 'text-[#00D2FE]' : 'text-slate-500'}`} />
            <span className="text-[10px] font-mono font-medium">Gateway</span>
          </div>

          <span className="text-slate-600 text-[10px] font-mono">→</span>

          {/* Node 3: AI Inference Engine */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-300 ${
            activeNode === 'ai' 
              ? 'bg-[#818CF8]/15 border-[#818CF8] text-white shadow-[0_0_12px_rgba(129,140,248,0.4)]' 
              : 'bg-white/5 border-border-subtle text-slate-400'
          }`}>
            <Cpu className={`w-3.5 h-3.5 ${activeNode === 'ai' ? 'text-[#818CF8]' : 'text-slate-500'}`} />
            <span className="text-[10px] font-mono font-medium">AI Core</span>
          </div>

          <span className="text-slate-600 text-[10px] font-mono">→</span>

          {/* Node 4: Vector & ACID Database */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-300 ${
            activeNode === 'database' 
              ? 'bg-[#38BDF8]/15 border-[#38BDF8] text-white shadow-[0_0_12px_rgba(56,189,248,0.4)]' 
              : 'bg-white/5 border-border-subtle text-slate-400'
          }`}>
            <Database className={`w-3.5 h-3.5 ${activeNode === 'database' ? 'text-[#38BDF8]' : 'text-slate-500'}`} />
            <span className="text-[10px] font-mono font-medium">Pinecone DB</span>
          </div>
        </div>
      </SpotlightCard>

      {/* Floating Bottom Metrics Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-2.5 rounded-xl bg-[#0B1120]/80 border border-border-subtle/80 backdrop-blur-md flex flex-col justify-between">
          <span className="text-[10px] font-mono text-slate-400">Agent Status</span>
          <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-white">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate">OmniFlow v2.4</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#0B1120]/80 border border-border-subtle/80 backdrop-blur-md flex flex-col justify-between">
          <span className="text-[10px] font-mono text-slate-400">Edge Gateway</span>
          <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-[#00D2FE]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="truncate">Cloudflare Worker</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#0B1120]/80 border border-border-subtle/80 backdrop-blur-md flex flex-col justify-between">
          <span className="text-[10px] font-mono text-slate-400">Concurrency</span>
          <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-[#38BDF8]">
            <Zap className="w-3.5 h-3.5" />
            <span className="truncate">Auto-Scalable</span>
          </div>
        </div>
      </div>
    </div>
  );
}

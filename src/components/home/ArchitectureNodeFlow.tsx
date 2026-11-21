'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Globe, 
  Cpu, 
  Database, 
  ArrowRight, 
  Activity, 
  Video, 
  Radio, 
  Server, 
  Smartphone,
  Layers,
  Zap
} from 'lucide-react';

interface ArchitectureNode {
  id: string;
  name: string;
  sub: string;
  icon: React.ReactNode;
  protocol?: string;
}

interface ArchitectureNodeFlowProps {
  studyId: string;
}

export default function ArchitectureNodeFlow({ studyId }: ArchitectureNodeFlowProps) {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);

  // Define architecture data flow for each project
  const architectures: Record<string, ArchitectureNode[]> = {
    'omniflow-ai': [
      { id: '1', name: 'WhatsApp User', sub: 'End Client', icon: <MessageSquare className="w-4 h-4 text-[#25D366]" />, protocol: 'HTTPS Mobile' },
      { id: '2', name: 'Meta Cloud API', sub: 'Webhook Dispatch', icon: <Globe className="w-4 h-4 text-[#00D2FE]" />, protocol: 'POST /v2/webhook' },
      { id: '3', name: 'Webhook Gateway', sub: 'Edge Ingestion', icon: <Server className="w-4 h-4 text-[#38BDF8]" />, protocol: 'HMAC-SHA256' },
      { id: '4', name: 'FastAPI Backend', sub: 'Async Processing', icon: <Zap className="w-4 h-4 text-[#818CF8]" />, protocol: 'gRPC / JSON' },
      { id: '5', name: 'AI Agent Core', sub: 'LangChain Routing', icon: <Cpu className="w-4 h-4 text-[#A78BFA]" />, protocol: 'Gemini 2.0 Flash' },
      { id: '6', name: 'Pinecone DB', sub: 'Vector Storage', icon: <Database className="w-4 h-4 text-[#00D2FE]" />, protocol: '1536d Cosine' },
      { id: '7', name: 'Response Engine', sub: 'Delivery Client', icon: <Activity className="w-4 h-4 text-[#25D366]" />, protocol: 'Meta Cloud Out' },
    ],
    'pulsehealth-core': [
      { id: '1', name: 'BLE Sensors', sub: 'Vital Monitor', icon: <Radio className="w-4 h-4 text-[#00D2FE]" />, protocol: 'Bluetooth LE' },
      { id: '2', name: 'Flutter App', sub: 'iOS / Android', icon: <Smartphone className="w-4 h-4 text-[#38BDF8]" />, protocol: '120fps Native' },
      { id: '3', name: 'WebSocket Gate', sub: 'Bidirectional Stream', icon: <Server className="w-4 h-4 text-[#818CF8]" />, protocol: 'WSS Sub-200ms' },
      { id: '4', name: 'Node.js Core', sub: 'Microservices', icon: <Layers className="w-4 h-4 text-[#A78BFA]" />, protocol: 'Express / Cluster' },
      { id: '5', name: 'WebRTC Room', sub: 'Video Telemetry', icon: <Video className="w-4 h-4 text-emerald-400" />, protocol: 'SRTP End-to-End' },
      { id: '6', name: 'PostgreSQL DB', sub: 'Encrypted Records', icon: <Database className="w-4 h-4 text-[#00D2FE]" />, protocol: 'HIPAA Compliant' },
    ],
    'apexlogix-cloud': [
      { id: '1', name: 'Fleet GPS', sub: '500+ Trucks', icon: <Radio className="w-4 h-4 text-amber-400" />, protocol: 'Cellular / CAN' },
      { id: '2', name: 'MQTT Broker', sub: 'IoT Ingestion', icon: <Server className="w-4 h-4 text-[#00D2FE]" />, protocol: '50k pings/min' },
      { id: '3', name: '.NET 8 Core', sub: 'High-Throughput', icon: <Zap className="w-4 h-4 text-[#818CF8]" />, protocol: 'C# Async Stream' },
      { id: '4', name: 'Redis Cache', sub: 'In-Memory State', icon: <Database className="w-4 h-4 text-rose-400" />, protocol: 'Sub-5ms Key-Val' },
      { id: '5', name: 'Next.js Console', sub: 'Live Dashboard', icon: <Globe className="w-4 h-4 text-[#38BDF8]" />, protocol: 'React 19 SSR' },
    ],
  };

  const nodes = architectures[studyId] || architectures['omniflow-ai'];

  return (
    <div className="w-full p-4 rounded-xl bg-[#060A14] border border-border-subtle/80 space-y-4">
      {/* Topology Header */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D2FE] animate-ping" />
          <span className="font-mono font-semibold text-slate-200 text-[11px] uppercase tracking-wider">
            Interactive Architecture Topology
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Click any node to inspect data layer
        </span>
      </div>

      {/* Nodes Horizontal Flow Container */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin">
        {nodes.map((node, idx) => {
          const isActive = activeNodeIndex === idx;
          return (
            <React.Fragment key={node.id}>
              {/* Architecture Node Card */}
              <button
                type="button"
                onClick={() => setActiveNodeIndex(isActive ? null : idx)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 shrink-0 min-w-[110px] sm:min-w-[125px] ${
                  isActive
                    ? 'bg-[#00D2FE]/15 border-[#00D2FE] shadow-[0_0_15px_rgba(0,210,254,0.35)] scale-105'
                    : 'bg-[#0B1120] hover:bg-[#111A2E] border-border-subtle hover:border-[#00D2FE]/40'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#050814] border border-border-subtle flex items-center justify-center mb-2">
                  {node.icon}
                </div>
                <span className="text-xs font-bold text-white block truncate w-full">
                  {node.name}
                </span>
                <span className="text-[10px] text-slate-400 block truncate w-full mt-0.5">
                  {node.sub}
                </span>
                {node.protocol && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#00D2FE] mt-2 border border-white/5">
                    {node.protocol}
                  </span>
                )}
              </button>

              {/* Data Transmission Arrow Indicator */}
              {idx < nodes.length - 1 && (
                <div className="flex items-center text-slate-600 shrink-0 px-1">
                  <ArrowRight className="w-4 h-4 text-[#00D2FE]/60 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Active Node Detail Inspector Box */}
      {activeNodeIndex !== null && (
        <div className="p-3 rounded-lg bg-[#0A1020] border border-[#00D2FE]/30 text-xs flex items-center justify-between text-slate-300 animate-in fade-in duration-200">
          <div>
            <span className="font-bold text-white mr-2">
              {nodes[activeNodeIndex].name}:
            </span>
            <span className="text-slate-300">
              {nodes[activeNodeIndex].sub} • Protocol: <code className="font-mono text-[#00D2FE]">{nodes[activeNodeIndex].protocol}</code>
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">Active Node verified</span>
        </div>
      )}
    </div>
  );
}

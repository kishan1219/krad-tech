'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Zap, 
  Cpu, 
  Database, 
  Globe, 
  CheckCheck, 
  PhoneCall, 
  RotateCcw,
  CheckCircle2,
  Terminal,
  Volume2
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  time: string;
  badge?: string;
  actionUrl?: string;
  actionText?: string;
}

export default function HeroEngineeringDashboard() {
  const [activeTab, setActiveTab] = useState<'chat' | 'network' | 'voice'>('chat');

  // ==========================================
  // TAB 1: INTERACTIVE WHATSAPP AI DEMO
  // ==========================================
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Hi! Can you build an automated WhatsApp customer booking engine connected to PostgreSQL?',
      time: '10:42 AM',
    },
    {
      id: '2',
      sender: 'agent',
      text: 'Yes! OmniFlow AI handles incoming webhooks in 14ms, validates the customer slot via PostgreSQL, and dispatches a verified WhatsApp ticket with an interactive calendar invite.',
      time: '10:42 AM',
      badge: 'OmniFlow AI v2.4 • 98ms',
      actionUrl: '/project-requirements',
      actionText: 'Start Similar Project →',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'How do you prevent hallucinations?',
    'What is your typical project timeline?',
    'Can you integrate Voice AI with CRM?',
  ];

  const handleSendPrompt = (prompt: string) => {
    if (isTyping) return;
    
    // Add user message
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: prompt,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate smart AI response after 600ms
    setTimeout(() => {
      let replyText = 'We engineer strict Zod schema validation, RAG cosine grounding with 1536d embeddings, and dynamic agent routers to guarantee 99.4% factual precision.';
      let badge = 'RAG Grounding: Verified';

      if (prompt.includes('timeline')) {
        replyText = 'Our agile sprints run in 2-week demonstrable cycles. Full MVP deployment typically ships within 4 to 8 weeks with complete test coverage.';
        badge = 'Agile Sprint Model';
      } else if (prompt.includes('Voice')) {
        replyText = 'Yes! We build sub-300ms latency voice agents using WebSockets, Whisper speech-to-text, and direct telephony bridges for 24/7 lead intake.';
        badge = 'Telephony WebRTC Core';
      }

      const agentMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'agent',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        badge,
        actionUrl: '/project-requirements',
        actionText: 'Discuss Scope with Architect →',
      };

      setChatMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 700);
  };

  // Safe internal scrolling (NEVER uses scrollIntoView to avoid window scroll hijacking)
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // ==========================================
  // TAB 2: LIVE EDGE GATEWAY TERMINAL & TOPOLOGY
  // ==========================================
  const [stepIndex, setStepIndex] = useState(0);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  const networkSteps = [
    { tag: 'EDGE', color: 'text-[#00D2FE]', text: 'Cloudflare Worker (Mumbai) intercepted POST /v2/webhook (12ms)' },
    { tag: 'AUTH', color: 'text-emerald-400', text: 'HMAC-SHA256 signature verified • Zero-trust perimeter check passed' },
    { tag: 'ROUTER', color: 'text-[#818CF8]', text: 'FastAPI Agent dispatched to OmniFlow_Cluster' },
    { tag: 'VECTOR', color: 'text-[#38BDF8]', text: 'Pinecone query: k=4 (Cosine score: 0.962) grounded' },
    { tag: 'SYNTHESIS', color: 'text-amber-400', text: 'Gemini 2.0 Flash generated 52 tokens in 108ms' },
    { tag: 'DELIVER', color: 'text-[#25D366]', text: 'Meta Cloud API 200 OK -> Delivery status: Read (✓✓)' },
  ];

  useEffect(() => {
    if (activeTab !== 'network') return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev >= networkSteps.length - 1 ? 0 : prev + 1));
    }, 2200);
    return () => clearInterval(interval);
  }, [activeTab, networkSteps.length]);

  // Safe internal scrolling for terminal (NO window scroll hijacking)
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [stepIndex]);

  // ==========================================
  // TAB 3: VOICE AI TELEPHONY STREAM
  // ==========================================
  const [isCalling, setIsCalling] = useState(true);

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col gap-3 select-none">
      {/* Iridescent Ambient Background Glow */}
      <div className="absolute -inset-4 bg-gradient-radial from-[#00D2FE]/20 via-[#6366F1]/10 to-transparent rounded-3xl filter blur-2xl pointer-events-none" />

      {/* Top Status Bar: Live Capability Tabs */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#080D1C]/90 border border-border-subtle/80 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Interactive AI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('network')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'network'
                ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Edge Gateway</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('voice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'voice'
                ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Voice Agent</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-[#0B1120]/80 px-2.5 py-1.5 rounded-xl border border-border-subtle">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">Live Architecture Demo</span>
        </div>
      </div>

      {/* Main Interactive Showcase Card with Spotlight */}
      <SpotlightCard className="p-0 border-[#00D2FE]/30 bg-[#070B16]/95 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* ======================================================== */}
        {/* TAB 1: INTERACTIVE WHATSAPP AI AGENT CHAT */}
        {/* ======================================================== */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[380px] animate-in fade-in duration-200">
            {/* Chat Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0A1022] border-b border-border-subtle/80">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] font-bold">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#0A1022]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white">OmniFlow AI Assistant</h4>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#25D366]/10 text-[#25D366] font-semibold">
                      VERIFIED
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Meta WhatsApp Cloud API • Sub-100ms Latency</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setChatMessages([
                    {
                      id: '1',
                      sender: 'user',
                      text: 'Hi! Can you build an automated WhatsApp customer booking engine connected to PostgreSQL?',
                      time: '10:42 AM',
                    },
                    {
                      id: '2',
                      sender: 'agent',
                      text: 'Yes! OmniFlow AI handles incoming webhooks in 14ms, validates the customer slot via PostgreSQL, and dispatches a verified WhatsApp ticket with an interactive calendar invite.',
                      time: '10:42 AM',
                      badge: 'OmniFlow AI v2.4 • 98ms',
                      actionUrl: '/project-requirements',
                      actionText: 'Start Similar Project →',
                    },
                  ]);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Body (Scrollable purely internally, zero window jump) */}
            <div
              ref={chatScrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin bg-gradient-to-b from-[#060914] to-[#080D1A]"
            >
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'agent' && (
                    <div className="w-6 h-6 rounded-full bg-[#00D2FE]/20 border border-[#00D2FE]/40 flex items-center justify-center text-[#00D2FE] shrink-0 text-[10px] font-bold mt-1">
                      K
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3 rounded-2xl shadow-sm space-y-1.5 ${
                      msg.sender === 'user'
                        ? 'rounded-tr-none bg-[#0D382B] text-slate-100 border border-[#25D366]/20'
                        : 'rounded-tl-none bg-[#0F172A] text-slate-200 border border-border-subtle'
                    }`}
                  >
                    <p className="text-xs leading-relaxed">{msg.text}</p>

                    {msg.badge && (
                      <div className="flex items-center gap-1 text-[10px] font-mono text-[#00D2FE] pt-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{msg.badge}</span>
                      </div>
                    )}

                    {msg.actionText && (
                      <div className="pt-2 mt-1 border-t border-white/10">
                        <a
                          href={msg.actionUrl}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#00D2FE] hover:underline"
                        >
                          <span>{msg.actionText}</span>
                        </a>
                      </div>
                    )}

                    <span className="text-[9px] text-slate-400 float-right mt-1 ml-2 flex items-center gap-1">
                      {msg.time}
                      {msg.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-[#25D366]" />}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                  <div className="w-6 h-6 rounded-full bg-[#00D2FE]/20 border border-[#00D2FE]/40 flex items-center justify-center text-[#00D2FE] shrink-0 text-[10px]">
                    K
                  </div>
                  <div className="p-2.5 rounded-xl rounded-tl-none bg-[#0F172A] border border-border-subtle flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FE] animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FE] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FE] animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Interactive Prompt Suggestions */}
            <div className="px-3 py-2 bg-[#080D1C] border-t border-border-subtle/60 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
              <span className="text-[10px] font-mono text-slate-400 shrink-0 mr-1">Ask:</span>
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSendPrompt(prompt)}
                  disabled={isTyping}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-[#00D2FE]/15 text-slate-300 hover:text-[#00D2FE] border border-border-subtle hover:border-[#00D2FE]/40 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-2.5 bg-[#0A1022] border-t border-border-subtle flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputText.trim()) {
                    handleSendPrompt(inputText.trim());
                    setInputText('');
                  }
                }}
                placeholder="Type a technical question or click a prompt above..."
                className="flex-1 bg-[#050814] border border-border-subtle rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D2FE]/60"
              />
              <button
                type="button"
                onClick={() => {
                  if (inputText.trim()) {
                    handleSendPrompt(inputText.trim());
                    setInputText('');
                  }
                }}
                disabled={!inputText.trim() || isTyping}
                className="p-2 rounded-xl bg-[#00D2FE] hover:bg-[#38BDF8] text-slate-900 font-bold transition-all disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: LIVE EDGE GATEWAY & TOPOLOGY */}
        {/* ======================================================== */}
        {activeTab === 'network' && (
          <div className="flex flex-col h-[380px] animate-in fade-in duration-200">
            {/* Visual Node Topology Strip */}
            <div className="p-3.5 bg-[#0A1022] border-b border-border-subtle flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-border-subtle">
                <Globe className="w-3.5 h-3.5 text-[#00D2FE]" />
                <span className="text-[11px] font-mono font-medium text-slate-200">Edge Mumbai</span>
              </div>
              <span className="text-[#00D2FE] font-mono animate-pulse">→ 14ms →</span>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#818CF8]/10 border border-[#818CF8]/30">
                <Cpu className="w-3.5 h-3.5 text-[#818CF8]" />
                <span className="text-[11px] font-mono font-medium text-[#818CF8]">FastAPI AI</span>
              </div>
              <span className="text-[#00D2FE] font-mono animate-pulse">→ 8ms →</span>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30">
                <Database className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="text-[11px] font-mono font-medium text-[#38BDF8]">Pinecone DB</span>
              </div>
            </div>

            {/* Terminal Log Stream (Internal scrolling only) */}
            <div
              ref={terminalScrollRef}
              className="flex-1 p-4 font-mono text-[11px] leading-relaxed space-y-2.5 overflow-y-auto scrollbar-thin bg-[#060914]"
            >
              <div className="flex items-center gap-2 text-slate-400 border-b border-white/5 pb-2">
                <Terminal className="w-3.5 h-3.5 text-[#00D2FE]" />
                <span>krad-edge-gateway-telemetry (Live Pipeline)</span>
              </div>

              {networkSteps.slice(0, stepIndex + 1).map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 animate-fadeIn">
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 bg-white/5 ${step.color}`}>
                    [{step.tag}]
                  </span>
                  <span className="text-slate-300">{step.text}</span>
                </div>
              ))}

              <div className="flex items-center gap-1 text-[#00D2FE] pt-1">
                <span className="text-[10px] text-slate-600">→</span>
                <span className="animate-pulse">█</span>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="p-3 bg-[#080D1C] border-t border-border-subtle flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>P99: 142ms</span>
              </span>
              <span className="text-slate-400">Zero-Downtime Architecture</span>
              <span className="text-[#00D2FE]">100% Request Uptime</span>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: VOICE AI TELEPHONY ASSISTANT */}
        {/* ======================================================== */}
        {activeTab === 'voice' && (
          <div className="flex flex-col h-[380px] animate-in fade-in duration-200 p-6 justify-between bg-gradient-to-b from-[#090E1F] to-[#060914]">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#818CF8] flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                  Telephony Voice AI Session
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {isCalling ? 'Call Active • 00:34' : 'Ready'}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white">
                Ultra-Low Latency Conversational Voice
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sub-300ms speech-to-speech engine. Understands conversational interruptions, nuances, and customer accents.
              </p>
            </div>

            {/* Siri / Waveform Equalizer Display */}
            <div className="p-6 rounded-2xl bg-[#050814] border border-[#818CF8]/30 flex flex-col items-center justify-center space-y-4">
              <div className="h-14 flex items-center justify-center gap-1.5 w-full max-w-xs">
                {[6, 12, 24, 40, 16, 32, 48, 28, 14, 38, 20, 8].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-[#00D2FE] via-[#818CF8] to-[#38BDF8] rounded-full transition-all duration-300"
                    style={{
                      height: isCalling ? `${Math.max(8, (h * (i % 2 === 0 ? 1.2 : 0.8)))}px` : '6px',
                      animation: isCalling ? `pulse ${0.4 + (i % 5) * 0.15}s ease-in-out infinite alternate` : 'none',
                    }}
                  />
                ))}
              </div>

              <div className="text-center font-mono text-xs text-slate-300">
                <span className="text-[#00D2FE] block font-semibold text-[11px] uppercase tracking-wide">
                  Live Simulated Transcription:
                </span>
                <p className="text-slate-300 mt-1 italic text-xs max-w-sm">
                  &ldquo;I need a secure healthcare patient dashboard with real-time biometric telemetry...&rdquo;
                </p>
              </div>
            </div>

            {/* Call Toggle Action */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setIsCalling(!isCalling)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isCalling
                    ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                    : 'bg-[#00D2FE] text-slate-900 font-bold shadow-cyan-glow'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{isCalling ? 'Pause Voice Stream' : 'Resume Voice Stream'}</span>
              </button>

              <span className="text-[11px] font-mono text-slate-400">
                Speech-to-Text Latency: <strong className="text-[#00D2FE]">240ms</strong>
              </span>
            </div>
          </div>
        )}
      </SpotlightCard>

      {/* Floating Bottom Trust Chips */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-[#0A0F1D]/80 border border-border-subtle/80 backdrop-blur-md">
          <span className="text-[10px] text-slate-400 block font-mono">Guaranteed SLA</span>
          <span className="text-xs font-bold text-emerald-400 font-mono">99.98%</span>
        </div>
        <div className="p-2 rounded-xl bg-[#0A0F1D]/80 border border-border-subtle/80 backdrop-blur-md">
          <span className="text-[10px] text-slate-400 block font-mono">API Architecture</span>
          <span className="text-xs font-bold text-[#00D2FE] font-mono">Sub-100ms</span>
        </div>
        <div className="p-2 rounded-xl bg-[#0A0F1D]/80 border border-border-subtle/80 backdrop-blur-md">
          <span className="text-[10px] text-slate-400 block font-mono">Data Security</span>
          <span className="text-xs font-bold text-[#818CF8] font-mono">Zero-Leak</span>
        </div>
      </div>
    </div>
  );
}

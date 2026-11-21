'use client';

import React, { useState } from 'react';
import { TechBrandIcons } from '../icons/TechBrandIcons';
import SpotlightCard from '../ui/SpotlightCard';
import { Layers } from 'lucide-react';

export default function TechStackMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Technologies' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Databases & Storage' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'ai', name: 'AI & Automation' },
    { id: 'cloud', name: 'Cloud & DevOps' },
  ];

  const technologies = [
    // Frontend
    { name: 'Next.js 15', category: 'frontend', desc: 'Production React 19 Framework', brandColor: '#FFFFFF' },
    { name: 'React.js', category: 'frontend', desc: 'Component Architecture', brandColor: '#61DAFB' },
    { name: 'TypeScript', category: 'frontend', desc: 'End-to-End Type Safety', brandColor: '#3178C6' },
    { name: 'Tailwind CSS', category: 'frontend', desc: 'Utility Design System', brandColor: '#38BDF8' },
    { name: 'Vue.js', category: 'frontend', desc: 'Progressive Client Framework', brandColor: '#41B883' },
    { name: 'Angular', category: 'frontend', desc: 'Enterprise Client Architecture', brandColor: '#DD0031' },

    // Backend
    { name: 'Node.js', category: 'backend', desc: 'Asynchronous Event-Driven Engine', brandColor: '#5FA04E' },
    { name: 'NestJS', category: 'backend', desc: 'Enterprise TypeScript Microservices', brandColor: '#E0234E' },
    { name: 'Python / FastAPI', category: 'backend', desc: 'High-Speed API Microservices', brandColor: '#059669' },
    { name: 'Django / DRF', category: 'backend', desc: 'Secure Rapid Web Services', brandColor: '#0C4B33' },
    { name: 'Laravel', category: 'backend', desc: 'Elegant PHP Architecture', brandColor: '#FF2D20' },
    { name: 'Spring Boot', category: 'backend', desc: 'Enterprise Java Microservices', brandColor: '#6DB33F' },
    { name: '.NET 8 Core', category: 'backend', desc: 'C# High-Throughput Systems', brandColor: '#512BD4' },

    // Database
    { name: 'PostgreSQL', category: 'database', desc: 'ACID Relational Standard', brandColor: '#336791' },
    { name: 'Supabase', category: 'database', desc: 'Open Source Cloud PostgreSQL', brandColor: '#3ECF8E' },
    { name: 'Redis', category: 'database', desc: 'In-Memory Cache & Key-Value', brandColor: '#DC382D' },
    { name: 'MongoDB', category: 'database', desc: 'Document Storage', brandColor: '#47A248' },
    { name: 'MySQL', category: 'database', desc: 'Relational Database Engine', brandColor: '#4479A1' },
    { name: 'Pinecone', category: 'database', desc: 'Vector Search for AI RAG', brandColor: '#00D2FE' },

    // Mobile
    { name: 'Flutter (Dart)', category: 'mobile', desc: 'Multi-Platform 120fps Engine', brandColor: '#02569B' },
    { name: 'React Native', category: 'mobile', desc: 'Cross-Platform React Apps', brandColor: '#61DAFB' },
    { name: 'Swift / SwiftUI', category: 'mobile', desc: 'Native iOS Architecture', brandColor: '#F05138' },
    { name: 'Kotlin / Compose', category: 'mobile', desc: 'Native Android Architecture', brandColor: '#7F52FF' },

    // AI & Automation
    { name: 'WhatsApp Business API', category: 'ai', desc: 'Official Cloud API Integration', brandColor: '#25D366' },
    { name: 'LangChain & LlamaIndex', category: 'ai', desc: 'LLM Orchestration & RAG', brandColor: '#00D2FE' },
    { name: 'OpenAI GPT-4o', category: 'ai', desc: 'State-of-the-Art Language Models', brandColor: '#FFFFFF' },
    { name: 'Google Gemini 2.0', category: 'ai', desc: 'Multimodal Generative AI', brandColor: '#4285F4' },
    { name: 'Anthropic Claude 3.5', category: 'ai', desc: 'Advanced Reasoning & Code', brandColor: '#D97706' },
    { name: 'n8n & Automations', category: 'ai', desc: 'Self-Hosted Event Workflows', brandColor: '#EA4B71' },

    // Cloud & DevOps
    { name: 'Amazon Web Services (AWS)', category: 'cloud', desc: 'Global Cloud Infrastructure', brandColor: '#FF9900' },
    { name: 'Google Cloud Platform', category: 'cloud', desc: 'Compute & Machine Learning', brandColor: '#4285F4' },
    { name: 'Microsoft Azure', category: 'cloud', desc: 'Enterprise Cloud Ecosystem', brandColor: '#0089D6' },
    { name: 'Docker', category: 'cloud', desc: 'Immutable Containerization', brandColor: '#2496ED' },
    { name: 'Kubernetes', category: 'cloud', desc: 'Container Orchestration', brandColor: '#326CE5' },
    { name: 'Vercel', category: 'cloud', desc: 'Edge Frontend Deployment', brandColor: '#FFFFFF' },
  ];

  const filtered =
    activeCategory === 'all'
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  return (
    <section className="py-24 bg-[#050814] relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Verified Tooling
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technologies We Work With
          </h2>
          <p className="text-sm text-slate-400">
            We engineer solutions with industry-standard, battle-tested frameworks, databases, and cloud infrastructure.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#00D2FE] text-slate-900 font-bold shadow-cyan-glow'
                  : 'bg-surface-card hover:bg-surface-light text-slate-300 border border-border-subtle hover:border-[#00D2FE]/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dynamic Tech Grid with Authentic Brand SVGs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((tech) => {
            const IconComponent = TechBrandIcons[tech.name];

            return (
              <SpotlightCard
                key={tech.name}
                className="p-4 rounded-xl border-border-subtle/80 hover:border-[#00D2FE]/50 bg-[#0A0F1D]/80 group transition-all"
                spotlightColor="rgba(0, 210, 254, 0.10)"
              >
                <div className="flex items-center gap-3.5">
                  {/* Brand SVG Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#050814] border border-border-subtle group-hover:border-[#00D2FE]/40 flex items-center justify-center shrink-0 p-2 text-slate-300 group-hover:text-white transition-colors">
                    {IconComponent ? (
                      <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110" />
                    ) : (
                      <Layers className="w-5 h-5 text-[#00D2FE]" />
                    )}
                  </div>

                  {/* Tech Details */}
                  <div className="overflow-hidden">
                    <span className="text-sm font-bold text-white group-hover:text-[#00D2FE] transition-colors block truncate">
                      {tech.name}
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate font-mono">
                      {tech.desc}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

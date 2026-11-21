'use client';

import React, { useState } from 'react';
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
    { name: 'Next.js 15', category: 'frontend', desc: 'React Framework for Production' },
    { name: 'React.js', category: 'frontend', desc: 'Component Architecture' },
    { name: 'TypeScript', category: 'frontend', desc: 'End-to-End Type Safety' },
    { name: 'Tailwind CSS', category: 'frontend', desc: 'Utility Design System' },
    { name: 'Vue.js', category: 'frontend', desc: 'Progressive Framework' },
    { name: 'Angular', category: 'frontend', desc: 'Enterprise Client Architecture' },

    // Backend
    { name: 'Node.js', category: 'backend', desc: 'Asynchronous Event-Driven Engine' },
    { name: 'NestJS', category: 'backend', desc: 'Enterprise TypeScript Microservices' },
    { name: 'Python / FastAPI', category: 'backend', desc: 'High-Speed API Microservices' },
    { name: 'Django / DRF', category: 'backend', desc: 'Secure Rapid Web Services' },
    { name: 'Laravel', category: 'backend', desc: 'Elegant PHP Architecture' },
    { name: 'Spring Boot', category: 'backend', desc: 'Enterprise Java Microservices' },
    { name: '.NET 8 Core', category: 'backend', desc: 'C# High-Throughput Systems' },

    // Database
    { name: 'PostgreSQL', category: 'database', desc: 'ACID Relational Standard' },
    { name: 'Supabase', category: 'database', desc: 'Open Source Cloud PostgreSQL' },
    { name: 'Redis', category: 'database', desc: 'In-Memory Cache & Key-Value' },
    { name: 'MongoDB', category: 'database', desc: 'Document Storage' },
    { name: 'MySQL', category: 'database', desc: 'Relational Database Engine' },
    { name: 'Pinecone', category: 'database', desc: 'Vector Search for AI RAG' },

    // Mobile
    { name: 'Flutter (Dart)', category: 'mobile', desc: 'Multi-Platform 120fps Engine' },
    { name: 'React Native', category: 'mobile', desc: 'Cross-Platform React Apps' },
    { name: 'Swift / SwiftUI', category: 'mobile', desc: 'Native iOS Architecture' },
    { name: 'Kotlin / Compose', category: 'mobile', desc: 'Native Android Architecture' },

    // AI & Automation
    { name: 'WhatsApp Business API', category: 'ai', desc: 'Official Cloud API Integration' },
    { name: 'LangChain & LlamaIndex', category: 'ai', desc: 'LLM Orchestration & RAG' },
    { name: 'OpenAI GPT-4o', category: 'ai', desc: 'State-of-the-Art Language Models' },
    { name: 'Google Gemini 2.0', category: 'ai', desc: 'Multimodal Generative AI' },
    { name: 'Anthropic Claude 3.5', category: 'ai', desc: 'Advanced Reasoning & Code' },
    { name: 'n8n & Automations', category: 'ai', desc: 'Self-Hosted Event Workflows' },

    // Cloud & DevOps
    { name: 'Amazon Web Services (AWS)', category: 'cloud', desc: 'Global Cloud Infrastructure' },
    { name: 'Google Cloud Platform', category: 'cloud', desc: 'Compute & Machine Learning' },
    { name: 'Microsoft Azure', category: 'cloud', desc: 'Enterprise Cloud Ecosystem' },
    { name: 'Docker', category: 'cloud', desc: 'Immutable Containerization' },
    { name: 'Kubernetes', category: 'cloud', desc: 'Container Orchestration' },
    { name: 'Vercel', category: 'cloud', desc: 'Edge Frontend Deployment' },
  ];

  const filtered =
    activeCategory === 'all'
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  return (
    <section className="py-20 bg-[#050814] relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Verified Tooling
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technologies We Work With
          </h2>
          <p className="text-sm text-slate-400">
            We select production-proven frameworks, databases, and cloud infrastructure engineered for long-term reliability.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#00D2FE] text-slate-900 font-semibold shadow-cyan-glow'
                  : 'bg-surface-card hover:bg-surface-light text-slate-300 border border-border-subtle'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-[#00D2FE] opacity-75 group-hover:opacity-100 group-hover:shadow-[0_0_8px_#00D2FE]" />
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00D2FE] transition-colors truncate">
                  {item.name}
                </h4>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

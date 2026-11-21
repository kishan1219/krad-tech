'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import {
  Globe,
  Smartphone,
  Bot,
  Layers,
  Palette,
  Video,
  Sparkles,
  PenTool,
  Layout,
  TabletSmartphone,
  KanbanSquare,
  Search,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

export default function ServicesClient() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-6 h-6 text-[#00D2FE]" />,
    Smartphone: <Smartphone className="w-6 h-6 text-[#38BDF8]" />,
    Bot: <Bot className="w-6 h-6 text-[#818CF8]" />,
    Layers: <Layers className="w-6 h-6 text-[#A78BFA]" />,
    Palette: <Palette className="w-6 h-6 text-[#00D2FE]" />,
    Video: <Video className="w-6 h-6 text-[#38BDF8]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#818CF8]" />,
    PenTool: <PenTool className="w-6 h-6 text-[#A78BFA]" />,
    Layout: <Layout className="w-6 h-6 text-[#00D2FE]" />,
    TabletSmartphone: <TabletSmartphone className="w-6 h-6 text-[#38BDF8]" />,
    KanbanSquare: <KanbanSquare className="w-6 h-6 text-[#818CF8]" />,
  };

  const filteredServices = SERVICE_CATEGORIES.filter((srv) => {
    const matchesCategory = selectedCategory === 'all' || srv.id === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      srv.useCases.some((u) => u.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Comprehensive Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.services.title}
          </h1>
          <p className="text-base text-slate-400">
            {t.services.subtitle}
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface-card border border-border-subtle shadow-lg">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services, tech (Next.js, Flutter, AI, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            />
          </div>

          {/* Category Dropdown & Counter */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
              aria-label="Filter by service category"
            >
              <option value="all">All Categories ({SERVICE_CATEGORIES.length})</option>
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <span className="text-[#00D2FE] font-bold">{filteredServices.length}</span>
              <span>Verticals</span>
            </div>
          </div>
        </div>

        {/* 11 Services Full Directory */}
        <div className="space-y-12">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-28 rounded-3xl bg-surface-card border border-border-subtle hover:border-[#00D2FE]/30 p-8 sm:p-10 transition-all duration-300 shadow-xl"
            >
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0A0F1D] border border-border-subtle flex items-center justify-center shrink-0">
                    {iconMap[service.iconName]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#00D2FE] font-bold">
                        Category {service.code}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mt-0.5">
                      {service.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/project-requirements?category=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow transition-all"
                  >
                    <span>Start Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/hire-resource?role=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-border-subtle transition-all"
                  >
                    <span>Hire Talent</span>
                  </Link>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed py-6">
                {service.description}
              </p>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* 1. What We Offer (Subcategories) */}
                <div className="space-y-4 p-5 rounded-2xl bg-[#050814] border border-border-subtle">
                  <h3 className="text-xs font-mono font-bold text-[#00D2FE] uppercase tracking-wider">
                    Core Technical Offerings
                  </h3>
                  <div className="space-y-3">
                    {service.subcategories.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <span className="text-xs font-semibold text-slate-200 block">
                          {sub.title}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {sub.items.map((item, iIdx) => (
                            <span
                              key={iIdx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-border-subtle"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Business Use Cases */}
                <div className="space-y-4 p-5 rounded-2xl bg-[#050814] border border-border-subtle">
                  <h3 className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                    Enterprise Use Cases
                  </h3>
                  <ul className="space-y-2.5">
                    {service.useCases.map((uc, uIdx) => (
                      <li key={uIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Measurable Benefits */}
                <div className="space-y-4 p-5 rounded-2xl bg-[#050814] border border-border-subtle">
                  <h3 className="text-xs font-mono font-bold text-[#818CF8] uppercase tracking-wider">
                    Key Engineering Benefits
                  </h3>
                  <ul className="space-y-2.5">
                    {service.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#818CF8] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-border-subtle/60">
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">
                      Related Capabilities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.relatedServices.map((relId) => {
                        const relObj = SERVICE_CATEGORIES.find((c) => c.id === relId);
                        return relObj ? (
                          <Link
                            key={relId}
                            href={`#${relId}`}
                            className="text-[10px] text-[#00D2FE] hover:underline"
                          >
                            • {relObj.title}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

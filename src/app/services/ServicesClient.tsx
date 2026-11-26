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
  PenTool,
  Layout,
  TabletSmartphone,
  KanbanSquare,
  Sparkles,
  Search,
  ArrowUpRight,
  Cpu,
} from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CreativeStudioShowcase from '@/components/services/CreativeStudioShowcase';

const CREATIVE_IDS = new Set([
  'graphic-design',
  'video-editing',
  'animation-vfx',
  'logo-branding',
  'ui-ux-design',
  'mobile-app-design',
]);

export default function ServicesClient() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [pillar, setPillar] = useState<'all' | 'engineering' | 'creative'>('all');

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-5 h-5 text-[#06B6D4]" />,
    Smartphone: <Smartphone className="w-5 h-5 text-[#06B6D4]" />,
    Bot: <Bot className="w-5 h-5 text-[#6366F1]" />,
    Layers: <Layers className="w-5 h-5 text-[#06B6D4]" />,
    KanbanSquare: <KanbanSquare className="w-5 h-5 text-[#06B6D4]" />,
    Palette: <Palette className="w-5 h-5 text-[#8B5CF6]" />,
    Video: <Video className="w-5 h-5 text-[#6366F1]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-[#8B5CF6]" />,
    PenTool: <PenTool className="w-5 h-5 text-[#8B5CF6]" />,
    Layout: <Layout className="w-5 h-5 text-[#6366F1]" />,
    TabletSmartphone: <TabletSmartphone className="w-5 h-5 text-[#8B5CF6]" />,
  };

  const filteredServices = SERVICE_CATEGORIES.filter((srv) => {
    const isCreative = CREATIVE_IDS.has(srv.id);
    const matchesPillar =
      pillar === 'all' ||
      (pillar === 'creative' && isCreative) ||
      (pillar === 'engineering' && !isCreative);

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === '' ||
      srv.title.toLowerCase().includes(q) ||
      srv.description.toLowerCase().includes(q) ||
      srv.technologies.some((tech) => tech.toLowerCase().includes(q)) ||
      srv.useCases.some((u) => u.toLowerCase().includes(q));

    return matchesPillar && matchesSearch;
  });

  return (
    <div className="pt-32 bg-[#05070E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#06B6D4]">
            Two Cohesive Pillars Under One Roof
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.services.title}
          </h1>
          <p className="text-base text-slate-400">
            {t.services.subtitle}
          </p>
        </ScrollReveal>

        {/* Pillar Switcher & Search Toolbar */}
        <div className="mb-10 flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0B101E] border border-white/[0.08] shadow-lg">
          {/* Pillar Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setPillar('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                pillar === 'all'
                  ? 'bg-white text-slate-950'
                  : 'bg-[#05070E] text-slate-300 border border-white/10 hover:text-white'
              }`}
            >
              All Verticals (11)
            </button>
            <button
              type="button"
              onClick={() => setPillar('engineering')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                pillar === 'engineering'
                  ? 'bg-[#06B6D4] text-slate-950 shadow-cyan-glow'
                  : 'bg-[#05070E] text-slate-300 border border-white/10 hover:border-[#06B6D4]/40'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Engineering &amp; AI (5)</span>
            </button>
            <button
              type="button"
              onClick={() => setPillar('creative')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                pillar === 'creative'
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-violet-glow'
                  : 'bg-[#05070E] text-slate-300 border border-white/10 hover:border-[#8B5CF6]/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creative &amp; Motion (6)</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services, Next.js, Blender, AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#05070E] border border-white/10 focus:border-[#06B6D4] text-white text-xs outline-none transition-colors"
            />
          </div>
        </div>

        {/* Compact Bento Grid Linking to Dedicated SEO Pages */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-[#0B101E] border border-white/10 text-slate-400 text-sm">
            No matching services found for &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => {
              const isCreative = CREATIVE_IDS.has(service.id);
              const accentText = isCreative ? 'text-[#8B5CF6]' : 'text-[#06B6D4]';

              return (
                <ScrollReveal key={service.id} index={idx % 6}>
                  <SpotlightCard
                    variant={isCreative ? 'creative' : 'engineering'}
                    className="p-6 sm:p-7 h-full flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#05070E] border border-white/10 flex items-center justify-center shrink-0">
                          {iconMap[service.iconName] ?? (
                            <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-semibold ${accentText}`}
                        >
                          {isCreative ? 'Creative Studio' : 'Engineering & AI'}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-white">{service.title}</h2>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {service.tagline}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {service.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#05070E] text-slate-300 border border-white/[0.08]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <Link
                        href={`/services/${service.id}`}
                        className={`text-xs font-bold inline-flex items-center gap-1 hover:underline ${accentText}`}
                      >
                        <span>Explore Capabilities</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/project-requirements?category=${encodeURIComponent(service.title)}`}
                        className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
                      >
                        Scope Project
                      </Link>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>

      {/* Light-Mode Contrast Break: Creative & Motion Visual Proof */}
      <CreativeStudioShowcase />
    </div>
  );
}

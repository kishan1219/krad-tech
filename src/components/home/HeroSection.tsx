'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Hero3DContainer from '../3d/Hero3DContainer';
import { COMPANY_DEFAULTS } from '@/lib/constants';
import { ArrowUpRight, Phone, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  const { t, getOverride } = useLanguage();

  const headline = getOverride('hero_headline_en', t.hero.headline);
  const subtext = getOverride('hero_subtext_en', t.hero.subtext);
  const phone = getOverride('contact_phone', COMPANY_DEFAULTS.phone);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-radial from-[#00D2FE]/10 via-[#6366F1]/5 to-transparent pointer-events-none filter blur-3xl" />
      
      {/* Subtle grid lines background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00D2FE 1px, transparent 1px), linear-gradient(90deg, #00D2FE 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-[#00D2FE]/30 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#00D2FE]" />
              <span className="text-xs font-mono text-slate-300 tracking-wide font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              {headline.split('. ')[0]}.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FE] via-[#38BDF8] to-[#818CF8]">
                {headline.split('. ')[1] || 'Building What\'s Next.'}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {subtext}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/project-requirements"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 transition-all duration-200"
              >
                <span>{t.hero.secondaryCta}</span>
              </Link>
            </div>

            {/* Direct Connect Quick Channels */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 border-t border-border-subtle/60">
              <a
                href={`tel:${COMPANY_DEFAULTS.phoneRaw}`}
                className="inline-flex items-center gap-2 hover:text-[#00D2FE] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#00D2FE]" />
                <span className="text-slate-500">{t.hero.callDirect}</span>
                <span className="font-mono font-medium text-slate-200">{phone}</span>
              </a>

              <a
                href={COMPANY_DEFAULTS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="text-slate-300 font-medium">WhatsApp Support</span>
              </a>
            </div>

            {/* Assurance Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE]" />
                <span>Zero Hallucination Guardrails</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE]" />
                <span>Modern High-Performance Stack</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE]" />
                <span>Dedicated Technical Teams</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Visual Tech Sphere (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <Hero3DContainer />
          </div>
        </div>
      </div>
    </section>
  );
}

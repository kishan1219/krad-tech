'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Hero3DContainer from '../3d/Hero3DContainer';
import HeroVideoMotion from './HeroVideoMotion';
import { COMPANY_DEFAULTS } from '@/lib/constants';
import { ArrowUpRight, Phone, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { t, getOverride } = useLanguage();

  const headline = getOverride('hero_headline_en', t.hero.headline);
  const subtext = getOverride('hero_subtext_en', t.hero.subtext);
  const phone = getOverride('contact_phone', COMPANY_DEFAULTS.phone);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* 0.8s Ultra-Low Overhead Video & Motion Background */}
      <HeroVideoMotion />

      {/* Background Layered Radial Mesh Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-radial from-[#00D2FE]/15 via-[#6366F1]/8 to-transparent pointer-events-none filter blur-3xl" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#00D2FE]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#818CF8]/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Cyber Grid Lines Overlay with Radial Mask */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00D2FE 1px, transparent 1px), linear-gradient(90deg, #00D2FE 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Headline, Value Proposition, & Human Trust (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Live Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1120]/90 border border-[#00D2FE]/40 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FE] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D2FE]"></span>
              </span>
              <span className="text-xs font-mono text-slate-200 tracking-wide font-medium">
                High-Concurrency Digital Engineering & AI
              </span>
            </div>

            {/* Main Display Headline with Gradient Mask */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              {headline.split('. ')[0]}.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FE] via-[#38BDF8] to-[#818CF8]">
                {headline.split('. ')[1] || 'Building What\'s Next.'}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {subtext}
            </p>

            {/* Action Buttons & Booking Promise */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/project-requirements"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-slate-900 bg-gradient-to-r from-[#00D2FE] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#00D2FE] shadow-cyan-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 transition-all duration-200"
              >
                <span>{t.hero.secondaryCta}</span>
              </Link>
            </div>

            {/* Direct Channels & Lead Architect Connection */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 border-t border-border-subtle/60">
              <a
                href={`tel:${COMPANY_DEFAULTS.phoneRaw}`}
                className="inline-flex items-center gap-2 hover:text-[#00D2FE] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#00D2FE]" />
                <span className="text-slate-400">Direct Line:</span>
                <span className="font-mono font-medium text-slate-200">{phone}</span>
              </a>

              <a
                href={COMPANY_DEFAULTS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="text-slate-200 font-medium">WhatsApp Support</span>
                <span className="text-[10px] font-mono text-emerald-400">(Avg. 5 min reply)</span>
              </a>
            </div>

            {/* Trust Assurances */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D2FE]" />
                <span>Zero Hallucination Guardrails</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>100% Owned Enterprise IP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#818CF8]" />
                <span>99.98% Uptime SLA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Delightful Interactive Sandbox (6 cols) */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <Hero3DContainer />
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { COMPANY_DEFAULTS } from '@/lib/constants';
import { ArrowUpRight, Phone, MessageCircle, Sparkles } from 'lucide-react';

export default function CtaBanner() {
  const { getOverride } = useLanguage();
  const phone = getOverride('contact_phone', COMPANY_DEFAULTS.phone);

  return (
    <section className="py-20 bg-[#050814] relative border-t border-border-subtle overflow-hidden">
      {/* Background neon radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00D2FE]/10 via-transparent to-transparent pointer-events-none filter blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="rounded-3xl bg-surface-card border border-[#00D2FE]/40 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle accent corner glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D2FE]/10 rounded-full filter blur-2xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FE]/10 border border-[#00D2FE]/25 text-[#00D2FE] text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready for Immediate Deployment</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Let&apos;s Build Your Next Digital Product Together
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Whether you need to scope a custom software architecture, launch a high-speed mobile app, or embed autonomous AI agents, KRAD Technology is ready.
            </p>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/project-requirements"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/hire-resource"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-border-subtle hover:border-[#00D2FE]/40 transition-all duration-200"
              >
                <span>Hire Dedicated Developers</span>
              </Link>
            </div>

            {/* Direct Connect Badges */}
            <div className="pt-6 border-t border-border-subtle/60 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <a
                href={`tel:${COMPANY_DEFAULTS.phoneRaw}`}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-[#00D2FE] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00D2FE]" />
                <span className="font-mono">{phone}</span>
              </a>

              <a
                href={COMPANY_DEFAULTS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

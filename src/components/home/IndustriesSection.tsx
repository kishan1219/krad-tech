'use client';

import React from 'react';
import { INDUSTRIES_SERVED } from '@/lib/constants';
import { CreditCard, HeartPulse, Truck, ShoppingBag, Cloud, GraduationCap } from 'lucide-react';

export default function IndustriesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    CreditCard: <CreditCard className="w-6 h-6 text-[#00D2FE]" />,
    HeartPulse: <HeartPulse className="w-6 h-6 text-[#38BDF8]" />,
    Truck: <Truck className="w-6 h-6 text-[#818CF8]" />,
    ShoppingBag: <ShoppingBag className="w-6 h-6 text-[#A78BFA]" />,
    Cloud: <Cloud className="w-6 h-6 text-[#00D2FE]" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-[#38BDF8]" />,
  };

  return (
    <section className="py-20 bg-[#050814] relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Sector Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industries We Serve
          </h2>
          <p className="text-sm text-slate-400">
            Tailoring technical architectures to match regulatory standards, user workflows, and high transaction volumes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_SERVED.map((ind) => (
            <div
              key={ind.name}
              className="p-6 rounded-2xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 transition-all duration-300 shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0A0F1D] border border-border-subtle group-hover:border-[#00D2FE]/40 flex items-center justify-center mb-4 transition-colors">
                {iconMap[ind.icon]}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00D2FE] transition-colors mb-2">
                {ind.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

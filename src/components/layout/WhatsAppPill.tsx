'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_DEFAULTS } from '@/lib/constants';

export default function WhatsAppPill() {
  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-6 right-6 z-40">
      <a
        href={COMPANY_DEFAULTS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact with KRAD Technology"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0B1120]/90 hover:bg-[#0E162A] text-white border border-white/10 hover:border-[#25D366]/60 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:scale-105"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
        </span>
        <MessageCircle className="w-4 h-4 text-[#25D366] transition-transform group-hover:rotate-12" />
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-slate-400 font-mono leading-none">Direct Channel</span>
          <span className="text-xs font-semibold text-slate-100 group-hover:text-[#25D366] transition-colors leading-tight">
            WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
}

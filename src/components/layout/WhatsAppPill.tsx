'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_DEFAULTS } from '@/lib/constants';

export default function WhatsAppPill() {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <a
        href={COMPANY_DEFAULTS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with KRAD Technology on WhatsApp"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0B1120]/90 hover:bg-[#0B1120] text-white border border-[#25D366]/40 hover:border-[#25D366] shadow-[0_4px_25px_-5px_rgba(37,211,102,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
        </span>
        <div className="w-5 h-5 flex items-center justify-center text-[#25D366]">
          <MessageCircle className="w-5 h-5 fill-[#25D366]/20 stroke-[#25D366]" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-slate-400 font-medium leading-none">Instant Chat</span>
          <span className="text-xs font-semibold text-slate-100 group-hover:text-[#25D366] transition-colors leading-tight">
            WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
}

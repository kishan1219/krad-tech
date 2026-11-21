'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_DEFAULTS } from '@/lib/constants';

export default function WhatsAppPill() {
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show polite introductory speech bubble after 2 seconds on desktop
    const timer = setTimeout(() => {
      if (!dismissed) {
        setBubbleOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBubbleOpen(false);
    setDismissed(true);
  };

  return (
    <aside aria-label="WhatsApp Technical Support" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Expandable Introductory Speech Bubble */}
      {bubbleOpen && !dismissed && (
        <div className="relative max-w-xs p-3.5 rounded-2xl bg-[#090E1C]/95 border border-[#25D366]/40 backdrop-blur-xl shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-start gap-2.5 pr-4">
            <div className="w-2 h-2 rounded-full bg-[#25D366] mt-1.5 shrink-0 animate-ping" />
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#25D366] block mb-0.5">
                Quick Technical Intake
              </span>
              <p className="text-xs text-slate-200 leading-snug">
                Have a technical requirement? Let&apos;s discuss your project with KRAD Technology.
              </p>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-border-subtle/60 flex items-center justify-between text-[11px]">
            <a
              href="https://wa.me/919111021438?text=Hello%20KRAD%20Technology%2C%20I%20have%20a%20technical%20project%20requirement."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] font-semibold hover:underline"
            >
              Start WhatsApp Chat →
            </a>
            <span className="text-[10px] text-slate-400 font-mono">+91 91110 21438</span>
          </div>
        </div>
      )}

      {/* Main Floating WhatsApp Action Button */}
      <a
        href={COMPANY_DEFAULTS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with KRAD Technology on WhatsApp"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0B1120]/95 hover:bg-[#0B1120] text-white border border-[#25D366]/40 hover:border-[#25D366] shadow-[0_4px_25px_-5px_rgba(37,211,102,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105"
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

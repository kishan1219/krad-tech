'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { COMPANY_DEFAULTS } from '@/lib/constants';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export default function ContactClient() {
  const { t, getOverride } = useLanguage();

  const phone = getOverride('contact_phone', COMPANY_DEFAULTS.phone);
  const email = getOverride('contact_email', COMPANY_DEFAULTS.email);

  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.contact.title}
          </h1>
          <p className="text-base text-slate-400">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 4 Contact Channels Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Direct Phone */}
          <a
            href={`tel:${COMPANY_DEFAULTS.phoneRaw}`}
            className="p-6 rounded-2xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/50 transition-all duration-300 shadow-lg group block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0A0F1D] border border-border-subtle group-hover:border-[#00D2FE]/40 flex items-center justify-center text-[#00D2FE] mb-4 transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-400 block">{t.contact.directCall}</span>
            <span className="text-sm font-bold text-white group-hover:text-[#00D2FE] font-mono mt-1 block">
              {phone}
            </span>
            <div className="pt-4 mt-4 border-t border-border-subtle/60 text-xs font-semibold text-[#00D2FE] flex items-center gap-1">
              <span>Click to Dial</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* 2. Instant WhatsApp */}
          <a
            href={COMPANY_DEFAULTS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#25D366]/50 transition-all duration-300 shadow-lg group block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0A0F1D] border border-border-subtle group-hover:border-[#25D366]/40 flex items-center justify-center text-[#25D366] mb-4 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-400 block">{t.contact.whatsappInstant}</span>
            <span className="text-sm font-bold text-white group-hover:text-[#25D366] font-mono mt-1 block">
              +91 91110 21438
            </span>
            <div className="pt-4 mt-4 border-t border-border-subtle/60 text-xs font-semibold text-[#25D366] flex items-center gap-1">
              <span>Open WhatsApp Chat</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* 3. Official Email */}
          <a
            href={`mailto:${email}`}
            className="p-6 rounded-2xl bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/50 transition-all duration-300 shadow-lg group block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0A0F1D] border border-border-subtle group-hover:border-[#00D2FE]/40 flex items-center justify-center text-[#00D2FE] mb-4 transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-400 block">{t.contact.officialEmail}</span>
            <span className="text-xs font-bold text-white group-hover:text-[#00D2FE] font-mono mt-1 block truncate">
              {email}
            </span>
            <div className="pt-4 mt-4 border-t border-border-subtle/60 text-xs font-semibold text-[#00D2FE] flex items-center gap-1">
              <span>Send Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* 4. Hours & Location */}
          <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-lg block">
            <div className="w-12 h-12 rounded-xl bg-[#0A0F1D] border border-border-subtle flex items-center justify-center text-slate-300 mb-4">
              <Clock className="w-6 h-6 text-[#818CF8]" />
            </div>
            <span className="text-xs font-medium text-slate-400 block">Operating Schedule</span>
            <span className="text-xs font-bold text-white font-mono mt-1 block">
              {COMPANY_DEFAULTS.workingHours}
            </span>
            <div className="pt-4 mt-4 border-t border-border-subtle/60 text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{COMPANY_DEFAULTS.address}</span>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

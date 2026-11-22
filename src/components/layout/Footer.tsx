'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { COMPANY_DEFAULTS, SERVICE_CATEGORIES } from '@/lib/constants';
import { Phone, Mail, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { t, getOverride } = useLanguage();

  const phone = getOverride('contact_phone', COMPANY_DEFAULTS.phone);
  const email = getOverride('contact_email', COMPANY_DEFAULTS.email);

  return (
    <footer className="bg-[#050814] border-t border-border-subtle pt-16 pb-12 text-slate-400 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-radial from-[#00D2FE]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border-subtle">
          {/* Column 1: Brand & Bio (2 cols wide on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#0B1120] border border-[#00D2FE]/40 flex items-center justify-center shadow-cyan-glow">
                <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none">
                  <polygon points="24,6 40,38 33,38 24,20 15,38 8,38" fill="#F8FAFC" />
                  <polygon points="24,18 31,32 24,29 17,32" fill="#00D2FE" />
                  <circle cx="24" cy="25" r="2" fill="#FFFFFF" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider text-white">
                  KRAD <span className="text-[#00D2FE]">TECHNOLOGY</span>
                </span>
                <span className="text-[10px] tracking-wider font-mono text-slate-400 uppercase">
                  Digital Engineering & AI
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <a
                href={`tel:${COMPANY_DEFAULTS.phoneRaw}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-[#00D2FE] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00D2FE]" />
                <span className="font-mono">{phone}</span>
              </a>

              <a
                href={COMPANY_DEFAULTS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Instant Connect</span>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-[#00D2FE] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#00D2FE]" />
                <span className="font-mono">{email}</span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{COMPANY_DEFAULTS.address}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">{t.nav.home}</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">{t.nav.services}</Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition-colors">{t.nav.caseStudies}</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">{t.nav.about}</Link>
              </li>
              <li>
                <Link href="/hire-resource" className="hover:text-white transition-colors">{t.nav.hireResource}</Link>
              </li>
              <li>
                <Link href="/project-requirements" className="hover:text-white transition-colors">{t.nav.projectRequirements}</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Technology Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              {t.footer.servicesLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICE_CATEGORIES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="hover:text-white transition-colors line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-[#00D2FE] inline-flex items-center gap-1 hover:underline pt-1">
                  View all 11 categories <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              {t.footer.legal}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link>
              </li>
              <li>
                <Link href="/about#security" className="hover:text-white transition-colors">Security Architecture</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {t.footer.allRightsReserved}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">{t.footer.terms}</Link>
            <span className="text-[11px] font-mono text-slate-600">Secure TLS 1.3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

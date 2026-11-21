'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { COMPANY_DEFAULTS } from '@/lib/constants';
import { Phone, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const { t, getOverride } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const phoneDisplay = getOverride('contact_phone', COMPANY_DEFAULTS.phone);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.caseStudies, href: '/case-studies' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.hireResource, href: '/hire-resource' },
    { name: t.nav.projectRequirements, href: '/project-requirements' },
    { name: t.nav.contact, href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050814]/90 backdrop-blur-xl border-b border-border-subtle shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            {/* Logo Icon Mark with Cyan Glow */}
            <div className="w-10 h-10 rounded-xl bg-[#0B1120] border border-[#00D2FE]/40 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(0,210,254,0.3)] group-hover:border-[#00D2FE] group-hover:shadow-cyan-glow transition-all">
              <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none">
                <polygon points="24,6 40,38 33,38 24,20 15,38 8,38" fill="#F8FAFC" />
                <polygon points="24,18 31,32 24,29 17,32" fill="#00D2FE" />
                <circle cx="24" cy="25" r="2" fill="#FFFFFF" />
              </svg>
            </div>
            {/* Logo Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-bold tracking-tight">
                <span className="text-xl text-white font-extrabold tracking-wider">KRAD</span>
                <span className="text-xl text-[#00D2FE] font-bold tracking-wide">TECHNOLOGY</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono hidden sm:inline-block">
                Digital Engineering & AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-[#00D2FE] bg-[#00D2FE]/10 font-semibold shadow-[inset_0_0_12px_rgba(0,210,254,0.15)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector */}
            <LanguageSwitcher />

            {/* Telephone Direct Call */}
            <a
              href={`tel:${COMPANY_DEFAULTS.phoneRaw}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-[#00D2FE] hover:bg-white/5 transition-all border border-border-subtle"
              title="Call KRAD Technology"
            >
              <Phone className="w-3.5 h-3.5 text-[#00D2FE]" />
              <span className="hidden xl:inline-block font-mono">{phoneDisplay}</span>
            </a>

            {/* Start Project CTA Button */}
            <Link
              href="/project-requirements"
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{t.nav.startProject}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-surface-card border border-border-subtle focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F1D]/98 border-b border-border-subtle backdrop-blur-2xl px-5 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#00D2FE] bg-[#00D2FE]/15 font-semibold'
                      : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-border-subtle space-y-2.5">
            <a
              href={`tel:${COMPANY_DEFAULTS.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium text-slate-200 bg-surface-card border border-border-subtle"
            >
              <Phone className="w-4 h-4 text-[#00D2FE]" />
              <span>{phoneDisplay}</span>
            </a>

            <Link
              href="/project-requirements"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] shadow-cyan-glow"
            >
              <span>{t.nav.startProject}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/admin"
              className="flex items-center justify-center gap-1.5 w-full py-2 text-[11px] text-slate-400 hover:text-[#00D2FE] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.nav.admin}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

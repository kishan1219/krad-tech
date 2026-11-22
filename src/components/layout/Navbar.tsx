'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { COMPANY_DEFAULTS } from '@/lib/constants';
import { 
  Phone, 
  Menu, 
  X, 
  ArrowUpRight, 
  ChevronDown, 
  Globe, 
  Smartphone, 
  Bot, 
  Layers,
  Building2,
  Users
} from 'lucide-react';
import { trackClarityEvent } from '@/lib/clarity';

export default function Navbar() {
  const { t, getOverride } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const companyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const phoneDisplay = getOverride('contact_phone', COMPANY_DEFAULTS.phone);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setCompanyDropdownOpen(false);
  }, [pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(e.target as Node)) {
        setCompanyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnterServices = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const handleMouseEnterCompany = () => {
    if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current);
    setCompanyDropdownOpen(true);
  };

  const handleMouseLeaveCompany = () => {
    companyTimeoutRef.current = setTimeout(() => {
      setCompanyDropdownOpen(false);
    }, 150);
  };

  const serviceCategories = [
    {
      title: 'Web Engineering',
      desc: 'Next.js 15, React SaaS & Real-Time Portals',
      href: '/services#web-development',
      icon: <Globe className="w-4 h-4 text-[#00D2FE]" />,
    },
    {
      title: 'Mobile Applications',
      desc: 'Fluid Flutter & React Native Multiplatform',
      href: '/services#mobile-development',
      icon: <Smartphone className="w-4 h-4 text-[#38BDF8]" />,
    },
    {
      title: 'AI Business Systems',
      desc: 'WhatsApp Cloud API, RAG & Voice AI',
      href: '/services#ai-business-solutions',
      icon: <Bot className="w-4 h-4 text-[#818CF8]" />,
    },
    {
      title: 'Custom Enterprise Software',
      desc: 'Bespoke ERP, CRM & Microservices',
      href: '/services#custom-software',
      icon: <Layers className="w-4 h-4 text-[#A78BFA]" />,
    },
  ];

  const companyItems = [
    {
      title: t.nav.about,
      desc: 'Our mission, leadership & engineering standards',
      href: '/about',
      icon: <Building2 className="w-4 h-4 text-[#00D2FE]" />,
    },
    {
      title: t.nav.hireResource,
      desc: 'Senior dedicated developers & architects for your team',
      href: '/hire-resource',
      icon: <Users className="w-4 h-4 text-[#818CF8]" />,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050814]/92 backdrop-blur-xl border-b border-border-subtle shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#0B1120] border border-[#00D2FE]/40 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(0,210,254,0.3)] group-hover:border-[#00D2FE] group-hover:shadow-cyan-glow transition-all">
              <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none">
                <polygon points="24,6 40,38 33,38 24,20 15,38 8,38" fill="#F8FAFC" />
                <polygon points="24,18 31,32 24,29 17,32" fill="#00D2FE" />
                <circle cx="24" cy="25" r="2" fill="#FFFFFF" />
              </svg>
            </div>
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

          {/* Decluttered Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            
            {/* 1. Services with Dropdown Menu */}
            <div 
              ref={servicesDropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnterServices}
              onMouseLeave={handleMouseLeaveServices}
            >
              <Link
                href="/services"
                onClick={() => setServicesDropdownOpen(false)}
                className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  pathname.startsWith('/services')
                    ? 'text-[#00D2FE] bg-[#00D2FE]/10 font-semibold shadow-[inset_0_0_12px_rgba(0,210,254,0.15)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{t.nav.services}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#00D2FE]' : 'text-slate-400'}`} />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 p-2.5 rounded-2xl bg-[#090D1A]/98 border border-[#00D2FE]/30 backdrop-blur-2xl shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="space-y-1">
                    {serviceCategories.map((s) => (
                      <Link
                        key={s.title}
                        href={s.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#0B1120] border border-border-subtle group-hover:border-[#00D2FE]/50 flex items-center justify-center shrink-0 transition-colors">
                          {s.icon}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white group-hover:text-[#00D2FE] transition-colors block">
                            {s.title}
                          </span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">
                            {s.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-border-subtle/60 px-2 py-1 flex items-center justify-between text-[11px]">
                    <Link
                      href="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-[#00D2FE] font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <span>All Services Overview</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Case Studies */}
            <Link
              href="/case-studies"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/case-studies'
                  ? 'text-[#00D2FE] bg-[#00D2FE]/10 font-semibold shadow-[inset_0_0_12px_rgba(0,210,254,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.nav.caseStudies}
            </Link>

            {/* 3. Partnerships (With subtle MOA badge) */}
            <Link
              href="/partnerships"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/partnerships'
                  ? 'text-[#00D2FE] bg-[#00D2FE]/10 font-semibold shadow-[inset_0_0_12px_rgba(0,210,254,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Partnerships</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00D2FE]/15 text-[#00D2FE] border border-[#00D2FE]/30 font-bold">
                MOA
              </span>
            </Link>

            {/* 4. Company Dropdown (About Us & Dedicated Developers) */}
            <div 
              ref={companyDropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnterCompany}
              onMouseLeave={handleMouseLeaveCompany}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  pathname === '/about' || pathname === '/hire-resource'
                    ? 'text-[#00D2FE] bg-[#00D2FE]/10 font-semibold shadow-[inset_0_0_12px_rgba(0,210,254,0.15)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Company</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${companyDropdownOpen ? 'rotate-180 text-[#00D2FE]' : 'text-slate-400'}`} />
              </button>

              {companyDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 p-2 rounded-2xl bg-[#090D1A]/98 border border-[#00D2FE]/30 backdrop-blur-2xl shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="space-y-1">
                    {companyItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setCompanyDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#0B1120] border border-border-subtle group-hover:border-[#00D2FE]/50 flex items-center justify-center shrink-0 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white group-hover:text-[#00D2FE] transition-colors block">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Contact Us */}
            <Link
              href="/contact"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/contact'
                  ? 'text-[#00D2FE] bg-[#00D2FE]/10 font-semibold shadow-[inset_0_0_12px_rgba(0,210,254,0.15)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 xl:gap-3">
            <LanguageSwitcher />

            {/* Telephone Direct Call */}
            <a
              href={`tel:${COMPANY_DEFAULTS.phoneRaw}`}
              onClick={() => trackClarityEvent('phone_call_clicked', { source: 'navbar' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-[#00D2FE] hover:bg-white/5 transition-all border border-border-subtle"
              title={`Direct Telephone: ${phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#00D2FE]" />
              <span className="hidden xl:inline-block font-mono text-[11px]">{phoneDisplay}</span>
            </a>

            {/* Start Project CTA Button */}
            <Link
              href="/project-requirements"
              onClick={() => trackClarityEvent('start_project_nav_clicked')}
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
            <Link
              href="/"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-[#00D2FE] bg-[#00D2FE]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Services in mobile */}
            <div className="py-1">
              <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Services
              </span>
              <div className="mt-1 space-y-0.5 pl-2 border-l border-[#00D2FE]/20">
                {serviceCategories.map((s) => (
                  <Link
                    key={s.title}
                    href={s.href}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-[#00D2FE]"
                  >
                    {s.icon}
                    <span>{s.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/case-studies"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/case-studies' ? 'text-[#00D2FE] bg-[#00D2FE]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {t.nav.caseStudies}
            </Link>

            <Link
              href="/partnerships"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/partnerships' ? 'text-[#00D2FE] bg-[#00D2FE]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Partnerships (MOA)
            </Link>

            <Link
              href="/about"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/about' ? 'text-[#00D2FE] bg-[#00D2FE]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {t.nav.about}
            </Link>

            <Link
              href="/hire-resource"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/hire-resource' ? 'text-[#00D2FE] bg-[#00D2FE]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {t.nav.hireResource}
            </Link>

            <Link
              href="/contact"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/contact' ? 'text-[#00D2FE] bg-[#00D2FE]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {t.nav.contact}
            </Link>
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
          </div>
        </div>
      )}
    </header>
  );
}

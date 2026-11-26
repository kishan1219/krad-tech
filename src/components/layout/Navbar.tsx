'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import KradLogo from '@/components/brand/KradLogo';
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
  KanbanSquare,
  Layout,
  TabletSmartphone,
  Palette,
  Video,
  Sparkles,
  PenTool,
  Mail,
} from 'lucide-react';
import { trackClarityEvent } from '@/lib/clarity';

export default function Navbar() {
  const { t, getOverride } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const phoneDisplay = getOverride('contact_phone', COMPANY_DEFAULTS.phone);
  const emailDisplay = getOverride('contact_email', COMPANY_DEFAULTS.email);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
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

  const engineeringServices = [
    {
      title: 'Web Engineering',
      desc: 'Next.js 15, React SaaS & Cloud Portals',
      href: '/services/web-development',
      icon: <Globe className="w-4 h-4 text-[#06B6D4]" />,
    },
    {
      title: 'Mobile Applications',
      desc: 'Flutter, React Native & Native iOS/Android',
      href: '/services/mobile-development',
      icon: <Smartphone className="w-4 h-4 text-[#06B6D4]" />,
    },
    {
      title: 'AI Business Systems',
      desc: 'WhatsApp Cloud API, RAG Agents & Voice AI',
      href: '/services/ai-business-solutions',
      icon: <Bot className="w-4 h-4 text-[#6366F1]" />,
    },
    {
      title: 'Custom Enterprise Software',
      desc: 'Bespoke ERP, CRM & Microservices',
      href: '/services/custom-software',
      icon: <Layers className="w-4 h-4 text-[#06B6D4]" />,
    },
    {
      title: 'Project Management',
      desc: 'Agile Scrum Sprints & DevOps Governance',
      href: '/services/project-management',
      icon: <KanbanSquare className="w-4 h-4 text-[#06B6D4]" />,
    },
  ];

  const creativeServices = [
    {
      title: 'Web Design & UI/UX',
      desc: 'Figma Design Systems & Conversion Interfaces',
      href: '/services/ui-ux-design',
      icon: <Layout className="w-4 h-4 text-[#8B5CF6]" />,
    },
    {
      title: 'Mobile App Design',
      desc: 'Apple HIG & Material You Ergonomic UX',
      href: '/services/mobile-app-design',
      icon: <TabletSmartphone className="w-4 h-4 text-[#8B5CF6]" />,
    },
    {
      title: '2D/3D Animation & VFX',
      desc: 'Blender 3D, CGI Product Reels & Motion',
      href: '/services/animation-vfx',
      icon: <Sparkles className="w-4 h-4 text-[#8B5CF6]" />,
    },
    {
      title: 'Video Editing & Production',
      desc: 'Product Demos, Color Grading & Reels',
      href: '/services/video-editing',
      icon: <Video className="w-4 h-4 text-[#6366F1]" />,
    },
    {
      title: 'Logo & Brand Identity',
      desc: 'Geometric Monograms & Brand Guidelines',
      href: '/services/logo-branding',
      icon: <PenTool className="w-4 h-4 text-[#8B5CF6]" />,
    },
    {
      title: 'Graphic Design',
      desc: 'Pitch Decks, Campaigns & Visual Collaterals',
      href: '/services/graphic-design',
      icon: <Palette className="w-4 h-4 text-[#6366F1]" />,
    },
  ];

  const navLinkClass = (active: boolean) =>
    `px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
      active
        ? 'text-[#06B6D4] bg-[#06B6D4]/10 font-semibold'
        : 'text-slate-300 hover:text-white hover:bg-white/5'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05070E]/92 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/50'
          : 'bg-[#05070E]/60 backdrop-blur-md border-b border-white/[0.04]'
      }`}
    >
      {/* Subtle Top Utility Bar (Desktop) */}
      <div
        className={`hidden lg:block border-b border-white/[0.06] bg-[#05070E]/90 transition-all duration-300 ${
          scrolled ? 'h-0 overflow-hidden opacity-0 border-b-0' : 'h-8 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${COMPANY_DEFAULTS.phoneRaw}`}
              onClick={() => trackClarityEvent('phone_call_clicked', { source: 'utility_bar' })}
              className="inline-flex items-center gap-1.5 hover:text-[#06B6D4] transition-colors font-mono"
            >
              <Phone className="w-3 h-3 text-[#06B6D4]" />
              <span>{phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${emailDisplay}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-mono"
            >
              <Mail className="w-3 h-3 text-slate-500" />
              <span>{emailDisplay}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-white transition-colors">
              {t.nav.contact}
            </Link>
            <span className="text-white/15">|</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Breathing Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-[68px]'}`}>
          {/* Brand Logo with Custom Geometric "K" Monogram */}
          <Link href="/" className="focus:outline-none">
            <KradLogo />
          </Link>

          {/* Cleanly Grouped Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {/* 1. Services Mega Menu */}
            <div
              ref={servicesDropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnterServices}
              onMouseLeave={handleMouseLeaveServices}
            >
              <Link
                href="/services"
                onClick={() => setServicesDropdownOpen(false)}
                className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  pathname.startsWith('/services')
                    ? 'text-[#06B6D4] bg-[#06B6D4]/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{t.nav.services}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#06B6D4]' : 'text-slate-400'
                  }`}
                />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/4 mt-2 w-[660px] p-5 rounded-2xl bg-[#0B101E]/98 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/85 z-50">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Column 1: Engineering & AI */}
                    <div>
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.07]">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#06B6D4]">
                          Engineering &amp; AI
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Systems &amp; Cloud</span>
                      </div>
                      <div className="space-y-1">
                        {engineeringServices.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#121A2E] transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#05070E] border border-white/[0.08] group-hover:border-[#06B6D4]/50 flex items-center justify-center shrink-0 transition-colors">
                              {s.icon}
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-white group-hover:text-[#06B6D4] transition-colors block">
                                {s.title}
                              </span>
                              <span className="text-[11px] text-slate-400 line-clamp-1">
                                {s.desc}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Design & Production */}
                    <div>
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.07]">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B5CF6]">
                          Design &amp; Production
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Creative Studio</span>
                      </div>
                      <div className="space-y-1">
                        {creativeServices.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#121A2E] transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#05070E] border border-white/[0.08] group-hover:border-[#8B5CF6]/50 flex items-center justify-center shrink-0 transition-colors">
                              {s.icon}
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-white group-hover:text-[#8B5CF6] transition-colors block">
                                {s.title}
                              </span>
                              <span className="text-[11px] text-slate-400 line-clamp-1">
                                {s.desc}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mega Menu Footer */}
                  <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                    <Link
                      href="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-[#06B6D4] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Explore All 11 Service Verticals</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/services#creative-studio"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-[#8B5CF6] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Creative Showreel</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Case Studies */}
            <Link href="/case-studies" className={navLinkClass(pathname === '/case-studies')}>
              {t.nav.caseStudies}
            </Link>

            {/* 3. Hire Talent */}
            <Link href="/hire-resource" className={navLinkClass(pathname === '/hire-resource')}>
              Hire Talent
            </Link>

            {/* 4. Partnerships */}
            <Link
              href="/partnerships"
              className={`inline-flex items-center gap-1.5 ${navLinkClass(pathname === '/partnerships')}`}
            >
              <span>Partnerships</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30 font-bold">
                MOA
              </span>
            </Link>

            {/* 5. About */}
            <Link href="/about" className={navLinkClass(pathname === '/about')}>
              About
            </Link>
          </nav>

          {/* Right Primary CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/project-requirements"
              onClick={() => trackClarityEvent('start_project_nav_clicked')}
              className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#06B6D4] hover:bg-[#22D3EE] shadow-cyan-glow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-[#0B101E] border border-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B101E]/98 border-b border-white/10 backdrop-blur-2xl px-5 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname === '/' ? 'text-[#06B6D4] bg-[#06B6D4]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {t.nav.home}
            </Link>

            <div className="py-2 space-y-3">
              <div>
                <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#06B6D4]">
                  Engineering &amp; AI
                </span>
                <div className="mt-1 space-y-0.5 pl-2 border-l border-[#06B6D4]/25">
                  {engineeringServices.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-[#06B6D4]"
                    >
                      {s.icon}
                      <span>{s.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B5CF6]">
                  Design &amp; Production
                </span>
                <div className="mt-1 space-y-0.5 pl-2 border-l border-[#8B5CF6]/25">
                  {creativeServices.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-[#8B5CF6]"
                    >
                      {s.icon}
                      <span>{s.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/case-studies"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname === '/case-studies' ? 'text-[#06B6D4] bg-[#06B6D4]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {t.nav.caseStudies}
            </Link>
            <Link
              href="/hire-resource"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname === '/hire-resource' ? 'text-[#06B6D4] bg-[#06B6D4]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Hire Talent
            </Link>
            <Link
              href="/partnerships"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname === '/partnerships' ? 'text-[#06B6D4] bg-[#06B6D4]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Partnerships (MOA)
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname === '/about' ? 'text-[#06B6D4] bg-[#06B6D4]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname === '/contact' ? 'text-[#06B6D4] bg-[#06B6D4]/15 font-semibold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {t.nav.contact}
            </Link>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2.5">
            <a
              href={`tel:${COMPANY_DEFAULTS.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium text-slate-200 bg-[#05070E] border border-white/10"
            >
              <Phone className="w-4 h-4 text-[#06B6D4]" />
              <span>{phoneDisplay}</span>
            </a>

            <Link
              href="/project-requirements"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#06B6D4] shadow-cyan-glow"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

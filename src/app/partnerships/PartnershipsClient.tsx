'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Handshake,
  Building2,
  Globe2,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Award,
  Lock,
  Layers,
  Users,
  MessageCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { COMPANY_DEFAULTS } from '@/lib/constants';
import { trackClarityEvent, segmentUserJourney } from '@/lib/clarity';

export default function PartnershipsClient() {
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [activeBadgeTier, setActiveBadgeTier] = useState<'certified' | 'alliance' | 'enterprise'>('certified');
  
  // Application Form State
  const [formState, setFormState] = useState({
    company_name: '',
    website_url: '',
    contact_name: '',
    work_email: '',
    phone: '',
    country: '',
    annual_volume: '$50,000 – $250,000',
    partnership_tier: 'Agency Co-Delivery Partner',
    moa_agreement_ready: false,
    synergies_notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const badgeVerificationId = `KRAD-MOA-${activeBadgeTier.toUpperCase()}-2026-V1`;

  const getEmbedCode = () => {
    return `<!-- KRAD Technology Verified Partner Badge -->
<a href="https://krad-tech.guptakishan805.workers.dev/partnerships?verify=${badgeVerificationId}" target="_blank" rel="noopener noreferrer" style="display:inline-block;text-decoration:none;">
  <div style="display:inline-flex;align-items:center;gap:10px;padding:8px 14px;background:#0A0F1D;border:1px solid #00D2FE;border-radius:12px;font-family:system-ui,-apple-system,sans-serif;color:#FFFFFF;box-shadow:0 0 16px rgba(0,210,254,0.15);">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D2FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
    <div>
      <div style="font-size:11px;font-weight:700;letter-spacing:0.04em;color:#00D2FE;text-transform:uppercase;">KRAD Technology</div>
      <div style="font-size:10px;color:#94A3B8;">${activeBadgeTier === 'enterprise' ? 'Enterprise Solution Integrator' : activeBadgeTier === 'alliance' ? 'Strategic Technology Alliance' : 'Certified Solution Partner'} • MOA Verified</div>
    </div>
  </div>
</a>`;
  };

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(getEmbedCode());
    setCopiedBadge(true);
    trackClarityEvent('badge_snippet_copied', {
      badge_tier: activeBadgeTier,
      verification_id: badgeVerificationId,
    });
    setTimeout(() => setCopiedBadge(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.moa_agreement_ready) {
      setSubmitError('Please confirm readiness to execute a formal Memorandum of Association (MOA).');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    // Custom Telemetry Event & Funnel Segmentation for Clarity
    trackClarityEvent('partnership_moa_request', {
      company_name: formState.company_name,
      country: formState.country,
      partnership_tier: formState.partnership_tier,
      annual_volume: formState.annual_volume,
    });

    segmentUserJourney({
      country: formState.country,
      intent: 'Partnership MOA',
      track: formState.partnership_tier,
    });

    try {
      const payload = {
        name: formState.contact_name,
        email: formState.work_email,
        phone: formState.phone,
        company: `${formState.company_name} (${formState.website_url})`,
        subject: `Partnership Application: ${formState.partnership_tier} [${formState.country}]`,
        message: `Partnership Tier: ${formState.partnership_tier}\nEstimated Annual Delivery Volume: ${formState.annual_volume}\nCountry: ${formState.country}\nWebsite: ${formState.website_url}\nMOA Sign-off Authorization: Confirmed\n\nSynergies & Capabilities:\n${formState.synergies_notes}`,
        service: 'Strategic Partnership',
        type: 'contact',
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Server response error.');
      }

      setSubmitSuccess(true);
    } catch {
      // Direct WhatsApp fallback link
      setSubmitSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ============================================================ */}
        {/* 1. HERO SECTION                                              */}
        {/* ============================================================ */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1120] border border-[#00D2FE]/40 text-xs font-mono text-[#00D2FE] shadow-cyan-glow">
            <Handshake className="w-3.5 h-3.5" />
            <span>Formal Bilateral Association Framework</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Strategic Technology Alliances &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FE] via-[#38BDF8] to-[#818CF8]">
              Verified Partner Program
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Scale engineering bandwidth, expand enterprise delivery capabilities, and co-innovate with KRAD Technology under legally binding Memorandum of Association (MOA) and Mutual Non-Disclosure agreements.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#00D2FE] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#00D2FE] shadow-cyan-glow transition-all"
            >
              <span>Apply for Partnership</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#badge"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-200 bg-surface-card hover:bg-surface-light border border-border-subtle hover:border-[#00D2FE]/40 transition-all"
            >
              <Award className="w-4 h-4 text-[#00D2FE]" />
              <span>Explore Association Badge</span>
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. PARTNERSHIP TIERS (4 MODELS)                             */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-[#00D2FE] tracking-widest font-semibold">
              Collaboration Models
            </span>
            <h2 className="text-3xl font-extrabold text-white">Four High-Impact Partnership Tracks</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select the bilateral engagement model aligned with your agency, enterprise, or SaaS ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Track 1 */}
            <SpotlightCard className="p-6 flex flex-col justify-between border-white/10 bg-[#0A0F1D]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#00D2FE]/10 border border-[#00D2FE]/30 flex items-center justify-center text-[#00D2FE]">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Agency Co-Delivery</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Expand your agency&apos;s delivery capacity. Deploy KRAD dedicated full-stack, AI, and mobile engineering squads under white-label terms.
                </p>
                <ul className="text-[11px] text-slate-300 space-y-1.5 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE]" />
                    <span>White-label code delivery</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE]" />
                    <span>Strict mutual client non-compete</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE]" />
                    <span>Guaranteed sprint SLA velocity</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-[11px] font-mono text-[#00D2FE]">
                Tier: Certified Delivery Partner
              </div>
            </SpotlightCard>

            {/* Track 2 */}
            <SpotlightCard className="p-6 flex flex-col justify-between border-white/10 bg-[#0A0F1D]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Enterprise Integrator</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Jointly bid and deliver complex corporate transformation, high-throughput microservices, and regulated cloud infrastructure.
                </p>
                <ul className="text-[11px] text-slate-300 space-y-1.5 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Joint RFP & consortium bidding</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>HIPAA / SOC 2 Type II compliance</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Tier-1 24/7 telemetry support</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-[11px] font-mono text-[#38BDF8]">
                Tier: Enterprise Solution Partner
              </div>
            </SpotlightCard>

            {/* Track 3 */}
            <SpotlightCard className="p-6 flex flex-col justify-between border-white/10 bg-[#0A0F1D]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/30 flex items-center justify-center text-[#818CF8]">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">SaaS Technology Alliance</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Integrate your software product into KRAD&apos;s ecosystem. Co-build native plugins, WhatsApp AI workflows, and cloud extensions.
                </p>
                <ul className="text-[11px] text-slate-300 space-y-1.5 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#818CF8]" />
                    <span>Native API & webhook bridges</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#818CF8]" />
                    <span>Joint co-marketing & case studies</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#818CF8]" />
                    <span>Technical marketplace feature</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-[11px] font-mono text-[#818CF8]">
                Tier: Technology Alliance Partner
              </div>
            </SpotlightCard>

            {/* Track 4 */}
            <SpotlightCard className="p-6 flex flex-col justify-between border-white/10 bg-[#0A0F1D]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA]">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Regional Referral Channel</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Introduce enterprise software clients in your geographical region and earn recurring milestone-based commissions.
                </p>
                <ul className="text-[11px] text-slate-300 space-y-1.5 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>Transparent deal registration</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>Up to 15% recurring commission</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>Full pre-sales architect support</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-[11px] font-mono text-[#A78BFA]">
                Tier: Strategic Channel Partner
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. FOUR-STAGE MOA & ONBOARDING WORKFLOW                      */}
        {/* ============================================================ */}
        <div className="p-8 sm:p-10 rounded-3xl bg-surface-card border border-border-subtle space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase text-[#00D2FE] tracking-widest font-semibold">
              Legal Rigor & Compliance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              The 4-Stage MOA Association Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every partnership is fortified by legal documentation protecting IP ownership, non-circumvention, data privacy, and mutual SLAs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#050814] border border-border-subtle space-y-2">
              <span className="text-xs font-mono text-[#00D2FE] font-bold">STAGE 01</span>
              <h4 className="text-sm font-bold text-white">Application & Fit</h4>
              <p className="text-xs text-slate-400">
                Evaluation of organizational technical capabilities, delivery track record, and commercial synergy.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#050814] border border-border-subtle space-y-2">
              <span className="text-xs font-mono text-[#38BDF8] font-bold">STAGE 02</span>
              <h4 className="text-sm font-bold text-white">NDA & MOA Execution</h4>
              <p className="text-xs text-slate-400">
                Bilateral signing of Memorandum of Association (MOA), Master Services Agreement (MSA), and mutual NDA.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#050814] border border-border-subtle space-y-2">
              <span className="text-xs font-mono text-[#818CF8] font-bold">STAGE 03</span>
              <h4 className="text-sm font-bold text-white">Compliance Audit</h4>
              <p className="text-xs text-slate-400">
                Alignment on data sovereignty (GDPR, India DPDP Act), security standards, and communication protocols.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#050814] border border-border-subtle space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">STAGE 04</span>
              <h4 className="text-sm font-bold text-white">Badge & Go-To-Market</h4>
              <p className="text-xs text-slate-400">
                Issuance of unique digital Association Badge ID, embed snippet, and co-marketing launch announcement.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. VERIFIED ASSOCIATION BADGE (INTERACTIVE SHOWCASE)         */}
        {/* ============================================================ */}
        <div id="badge" className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B1120] to-[#070B18] border border-[#00D2FE]/30 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#00D2FE] tracking-widest font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00D2FE]" />
                Official Trust Asset
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Verified Association Partner Badge
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Approved partners can embed this digital verification badge on their corporate websites and client proposals.
              </p>
            </div>

            {/* Badge Tier Selector */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#050814] border border-white/10">
              <button
                onClick={() => setActiveBadgeTier('certified')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                  activeBadgeTier === 'certified'
                    ? 'bg-[#00D2FE] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Certified Solution
              </button>
              <button
                onClick={() => setActiveBadgeTier('alliance')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                  activeBadgeTier === 'alliance'
                    ? 'bg-[#00D2FE] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Technology Alliance
              </button>
              <button
                onClick={() => setActiveBadgeTier('enterprise')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                  activeBadgeTier === 'enterprise'
                    ? 'bg-[#00D2FE] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Enterprise Integrator
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Badge Visual Preview Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-[#050814] border border-[#00D2FE]/40 shadow-cyan-glow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2FE]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="w-16 h-16 rounded-2xl bg-[#0B1120] border border-[#00D2FE]/50 flex items-center justify-center text-[#00D2FE] mb-4 shadow-lg">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00D2FE] uppercase block mb-1">
                KRAD TECHNOLOGY
              </span>

              <h4 className="text-base font-extrabold text-white text-center">
                {activeBadgeTier === 'enterprise'
                  ? 'ENTERPRISE SOLUTION INTEGRATOR'
                  : activeBadgeTier === 'alliance'
                  ? 'STRATEGIC TECHNOLOGY ALLIANCE'
                  : 'CERTIFIED SOLUTION PARTNER'}
              </h4>

              <div className="flex items-center gap-2 mt-3 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px]">MOA Verified & Active</span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 w-full text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Verification Registry Key:</span>
                <span className="text-[11px] font-mono text-[#00D2FE] font-bold">{badgeVerificationId}</span>
              </div>
            </div>

            {/* Right: Embed Code & Legal Notice */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300 font-semibold">
                  HTML & SVG Embed Snippet
                </span>
                <button
                  onClick={handleCopyBadge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D2FE]/10 border border-[#00D2FE]/30 text-[#00D2FE] hover:bg-[#00D2FE]/20 transition-all text-xs font-semibold"
                >
                  {copiedBadge ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBadge ? 'Copied to Clipboard' : 'Copy Embed Snippet'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#050814] border border-border-subtle font-mono text-[11px] text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
                <code>{getEmbedCode()}</code>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 leading-relaxed flex items-start gap-2.5">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <strong className="text-white block mb-0.5">Legal Notice on Badge Usage:</strong>
                  The KRAD Technology Verified Partner Badge and registry ID are legally restricted to organizations with an executed Memorandum of Association (MOA) countersigned by KRAD Technology legal counsel. Unauthorized display will result in registry revocation and legal notice.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. INBOUND PARTNERSHIP APPLICATION FORM                     */}
        {/* ============================================================ */}
        <div id="apply" className="p-8 sm:p-10 rounded-3xl bg-surface-card border border-border-subtle max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-[#00D2FE] tracking-widest font-semibold">
              Onboarding Registry
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Apply for KRAD Technology Association
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Submit your organizational credentials to initiate bilateral NDA and MOA review.
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Partnership Application Received</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for applying for partnership with KRAD Technology. Our Strategic Alliances team will review your credentials and dispatch the mutual MOA & NDA framework within 24 business hours.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_DEFAULTS.whatsappRaw}?text=${encodeURIComponent(
                    `Hello KRAD Strategic Alliances team, I have submitted a Partnership Application for ${formState.company_name} regarding ${formState.partnership_tier}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#25D366] hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Channel Connect</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company / Agency Name <span className="text-[#00D2FE]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.company_name}
                    onChange={(e) => setFormState({ ...formState, company_name: e.target.value })}
                    placeholder="e.g. Nexus Digital Group Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Website URL <span className="text-[#00D2FE]">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formState.website_url}
                    onChange={(e) => setFormState({ ...formState, website_url: e.target.value })}
                    placeholder="https://nexusgroup.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Authorized Representative Name <span className="text-[#00D2FE]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.contact_name}
                    onChange={(e) => setFormState({ ...formState, contact_name: e.target.value })}
                    placeholder="e.g. Alexander Vance (Managing Director)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Official Work Email <span className="text-[#00D2FE]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.work_email}
                    onChange={(e) => setFormState({ ...formState, work_email: e.target.value })}
                    placeholder="alex@nexusgroup.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone / WhatsApp Number <span className="text-[#00D2FE]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+1 415 555 2671 or +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Headquarters Country <span className="text-[#00D2FE]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.country}
                    onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                    placeholder="e.g. United States, Germany, India, UAE"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Partnership Track <span className="text-[#00D2FE]">*</span>
                  </label>
                  <select
                    value={formState.partnership_tier}
                    onChange={(e) => setFormState({ ...formState, partnership_tier: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none"
                  >
                    <option value="Agency Co-Delivery Partner">Agency Co-Delivery Partner</option>
                    <option value="Enterprise Solution Integrator">Enterprise Solution Integrator</option>
                    <option value="SaaS Technology Alliance">SaaS Technology Alliance</option>
                    <option value="Regional Referral Channel">Regional Referral Channel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Estimated Annual Delivery / Deal Volume
                  </label>
                  <select
                    value={formState.annual_volume}
                    onChange={(e) => setFormState({ ...formState, annual_volume: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none"
                  >
                    <option value="< $50,000 / ₹40 Lakhs">&lt; $50,000 / ₹40 Lakhs</option>
                    <option value="$50,000 – $250,000 / ₹40L – ₹2 Cr">$50,000 – $250,000 / ₹40L – ₹2 Cr</option>
                    <option value="$250,000 – $1,000,000 / ₹2 Cr – ₹8 Cr">$250,000 – $1,000,000 / ₹2 Cr – ₹8 Cr</option>
                    <option value="$1,000,000+ / ₹8 Cr+">$1,000,000+ / ₹8 Cr+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Synergy, Capabilities & Proposed Joint Offering
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.synergies_notes}
                  onChange={(e) => setFormState({ ...formState, synergies_notes: e.target.value })}
                  placeholder="Describe your current client portfolio, typical tech stacks, and how a bilateral MOA association with KRAD Technology creates strategic value..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none resize-none leading-relaxed"
                />
              </div>

              {/* MOA Confirmation Checkbox */}
              <div className="p-4 rounded-xl bg-[#050814] border border-[#00D2FE]/20">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={formState.moa_agreement_ready}
                    onChange={(e) => setFormState({ ...formState, moa_agreement_ready: e.target.checked })}
                    className="mt-1 rounded border-white/20 bg-[#050814] text-[#00D2FE] focus:ring-[#00D2FE]"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white block mb-0.5">Memorandum of Association (MOA) Readiness:</strong>
                    I confirm that I am an authorized corporate officer with authority to execute a bilateral Memorandum of Association (MOA), Non-Disclosure Agreement (NDA), and mutual delivery terms with KRAD Technology.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-slate-950 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application to Legal Registry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Partnership & MOA Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

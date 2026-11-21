'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Compass, 
  PenTool, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  RefreshCw, 
  CheckCircle2, 
  Layers, 
  FileCheck, 
  Cpu 
} from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

export default function ProcessTimeline() {
  const { t } = useLanguage();
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      num: '01',
      title: 'Discovery & System Architecture',
      tagline: 'Technical feasibility, data schema, and security threat modeling.',
      icon: <Compass className="w-5 h-5 text-[#00D2FE]" />,
      activities: [
        'Stakeholder requirement dissection & non-functional SLA definition',
        'Relational & vector database schema ERD modeling',
        'API endpoint contract design (OpenAPI / Swagger specs)',
        'Cloud infrastructure cost & throughput projection',
      ],
      deliverables: [
        'Software Requirements Specification (SRS)',
        'Database Entity Relationship Diagram (ERD)',
        'System Architecture Blueprint & Threat Model',
        'Fixed-Timeline Sprint Roadmap',
      ],
      technologies: ['OpenAPI 3.1', 'PostgreSQL ERD', 'Mermaid.js', 'Miro Architecture'],
      expectedOutput: 'Approved engineering architecture with zero structural ambiguity.',
    },
    {
      num: '02',
      title: 'UI/UX & Interactive Prototyping',
      tagline: 'Figma design system, component tokens, and tactile micro-interactions.',
      icon: <PenTool className="w-5 h-5 text-[#38BDF8]" />,
      activities: [
        'User journey mapping & high-fidelity wireframing',
        'Design tokenization (color, typography, elevation scales)',
        'Interactive clickable prototype for mobile & desktop',
        'WCAG 2.1 AA accessibility audit & color contrast testing',
      ],
      deliverables: [
        'Developer-ready Figma workspace with auto-layout',
        'Tailwind CSS design token configuration',
        'Interactive component state matrix (default, hover, active, error)',
        'Mobile touch ergonomic guidelines',
      ],
      technologies: ['Figma Variables', 'Tailwind Tokens', 'Storybook', 'WCAG 2.1'],
      expectedOutput: 'Validated design system ready for rapid frontend implementation.',
    },
    {
      num: '03',
      title: 'Sprint-Based Agile Engineering',
      tagline: 'Two-week development cycles, strict code review, and automated testing.',
      icon: <Code2 className="w-5 h-5 text-[#818CF8]" />,
      activities: [
        'Modular feature implementation in 2-week sprint cadences',
        'Trunk-based Git branching with strict pull request reviews',
        'Automated database migrations with rollbacks',
        'Weekly client demo builds deployed to staging environment',
      ],
      deliverables: [
        'Clean, strongly-typed production codebase',
        'Modular API endpoints with schema validation',
        'Automated test suites (unit & integration tests)',
        'Staging preview environments for feature sign-off',
      ],
      technologies: ['Next.js 15', 'TypeScript', 'Node.js / FastAPI', 'Prisma / Supabase'],
      expectedOutput: 'Deployable, demonstrable software increments delivered every 14 days.',
    },
    {
      num: '04',
      title: 'Rigorous QA & Security Hardening',
      tagline: 'Automated E2E tests, penetration checks, and OWASP Top 10 mitigation.',
      icon: <ShieldCheck className="w-5 h-5 text-[#A78BFA]" />,
      activities: [
        'End-to-end automated UI regression testing',
        'API rate limiting, CORS, and sanitization verification',
        'OWASP Top 10 vulnerability scanning & SQL injection audit',
        'High-concurrency load testing up to 50,000 simulated requests',
      ],
      deliverables: [
        'Comprehensive Test Coverage Report (>85%)',
        'Security Penetration & Vulnerability Audit Report',
        'Load & Stress Test Telemetry Metrics',
        'Static Code Analysis (SAST) compliance badge',
      ],
      technologies: ['Playwright', 'Vitest', 'OWASP ZAP', 'k6 Load Testing'],
      expectedOutput: 'Enterprise-certified secure software ready for mission-critical traffic.',
    },
    {
      num: '05',
      title: 'Cloud Deployment & DevOps Automation',
      tagline: 'Zero-downtime CI/CD release, global CDN routing, and containerization.',
      icon: <Rocket className="w-5 h-5 text-[#00D2FE]" />,
      activities: [
        'Automated GitHub Actions CI/CD deployment pipelines',
        'Docker containerization with multi-stage minimal images',
        'Edge CDN caching & SSL/TLS certificate automation',
        'Blue-green zero-downtime production deployment',
      ],
      deliverables: [
        'Production Cloudflare Edge / AWS infrastructure deployment',
        'Automated CI/CD pipeline configuration files',
        'Database backup & point-in-time recovery runbooks',
        'Environment variable security vault setup',
      ],
      technologies: ['Cloudflare Workers', 'AWS / Render', 'Docker', 'GitHub Actions'],
      expectedOutput: 'Live production release with 99.99% availability and global edge caching.',
    },
    {
      num: '06',
      title: 'SLA Support & Continuous Evolution',
      tagline: '24/7 telemetry monitoring, latency profiling, and agile scaling.',
      icon: <RefreshCw className="w-5 h-5 text-[#38BDF8]" />,
      activities: [
        '24/7 server health & error rate telemetry monitoring',
        'Proactive database index optimization & query profiling',
        'Security patch management & dependency updates',
        'Monthly feature iterations based on user analytics',
      ],
      deliverables: [
        'Real-time uptime and incident monitoring dashboard',
        'Guaranteed response time SLA support contract',
        'Monthly performance & security audit report',
        'Continuous feature scaling roadmap',
      ],
      technologies: ['Sentry', 'Grafana', 'Datadog', 'Supabase Monitoring'],
      expectedOutput: 'Continuous system stability, sub-second latency, and peace of mind.',
    },
  ];

  const current = stages[activeStage];

  return (
    <section className="py-24 bg-[#050814] relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Predictable Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.process.title}
          </h2>
          <p className="text-sm text-slate-400">
            {t.process.subtitle}
          </p>
        </div>

        {/* Connected Horizontal Timeline (Desktop) */}
        <div className="relative mb-12 hidden lg:block">
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-slate-800 z-0" />
          
          {/* Animated Glowing Progress Line */}
          <div 
            className="absolute top-1/2 left-6 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#00D2FE] via-[#38BDF8] to-[#818CF8] transition-all duration-500 z-0 shadow-[0_0_12px_#00D2FE]"
            style={{
              width: `${(activeStage / (stages.length - 1)) * 95}%`,
            }}
          />

          {/* Stepper Nodes */}
          <div className="relative z-10 flex items-center justify-between">
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              const isPast = activeStage > idx;

              return (
                <button
                  key={stage.num}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  {/* Circular Node */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-[#00D2FE] border-white text-slate-900 shadow-cyan-glow scale-110'
                      : isPast
                      ? 'bg-[#0B1120] border-[#00D2FE] text-[#00D2FE]'
                      : 'bg-[#0A0F1D] border-slate-700 text-slate-400 group-hover:border-slate-500'
                  }`}>
                    {stage.icon}
                  </div>

                  {/* Stage Number & Title */}
                  <span className={`text-[11px] font-mono mt-3 font-bold transition-colors ${
                    isActive ? 'text-[#00D2FE]' : 'text-slate-400'
                  }`}>
                    Stage {stage.num}
                  </span>
                  <span className="text-[11px] font-medium text-slate-300 max-w-[110px] text-center truncate mt-0.5">
                    {stage.title.split(' ')[0]} {stage.title.split(' ')[1] || ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Horizontal Pill Selector */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
          {stages.map((stage, idx) => (
            <button
              key={stage.num}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeStage === idx
                  ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
                  : 'bg-surface-card text-slate-300 border border-border-subtle'
              }`}
            >
              <span>{stage.num}</span>
              <span>{stage.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Deep Deliverables Drawer for the Active Stage */}
        <SpotlightCard 
          className="p-8 lg:p-10 border-[#00D2FE]/30 bg-[#090D1A]/95 shadow-2xl"
          spotlightColor="rgba(0, 210, 254, 0.15)"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-border-subtle/80">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#00D2FE]/10 border border-[#00D2FE]/40 flex items-center justify-center text-[#00D2FE] shrink-0">
                {current.icon}
              </div>
              <div>
                <span className="text-xs font-mono text-[#00D2FE] font-bold uppercase tracking-wider block">
                  Stage {current.num}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {current.tagline}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                SLA Milestones Tracked
              </span>
            </div>
          </div>

          {/* 3-Column Deliverables Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Column 1: Activities */}
            <div className="p-5 rounded-xl bg-[#060914] border border-border-subtle/80 space-y-3">
              <div className="flex items-center gap-2 text-slate-200 font-bold">
                <FileCheck className="w-4 h-4 text-[#00D2FE]" />
                <span className="uppercase tracking-wider text-[11px] font-mono">Stage Activities</span>
              </div>
              <ul className="space-y-2.5">
                {current.activities.map((act, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                    <span className="text-[#00D2FE] font-mono text-[10px] mt-0.5">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Deliverables */}
            <div className="p-5 rounded-xl bg-[#060914] border border-border-subtle/80 space-y-3">
              <div className="flex items-center gap-2 text-slate-200 font-bold">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="uppercase tracking-wider text-[11px] font-mono">Tangible Deliverables</span>
              </div>
              <ul className="space-y-2.5">
                {current.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Tooling & Output */}
            <div className="p-5 rounded-xl bg-[#060914] border border-border-subtle/80 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-200 font-bold mb-3">
                  <Cpu className="w-4 h-4 text-[#818CF8]" />
                  <span className="uppercase tracking-wider text-[11px] font-mono">Verified Tooling</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-slate-300 border border-border-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0A1020] border border-[#00D2FE]/20">
                <span className="text-[10px] font-mono uppercase text-[#00D2FE] font-bold block mb-1">
                  Expected Output
                </span>
                <span className="text-slate-200 text-xs">
                  {current.expectedOutput}
                </span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Code2,
  Users2,
  Lock,
  Workflow,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About KRAD Technology | Engineering Philosophy & Technical Standards',
  description:
    'Learn about KRAD Technology: our mission, engineering philosophy, security-first architecture, quality assurance processes, and international collaboration model.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section 1: Hero & Introduction */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            About KRAD Technology
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Dependable Digital Infrastructure
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            KRAD Technology is a modern technology company built on a single conviction: digital products should be architected with uncompromising technical rigor, aesthetic elegance, and long-term maintainability.
          </p>
        </div>

        {/* Section 2: Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-card border border-border-subtle shadow-xl space-y-4">
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To empower ambitious startups, growing small-and-medium businesses, and enterprise leaders with reliable software engineering, cutting-edge AI automation, and intuitive digital experiences that drive measurable business outcomes.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-surface-card border border-border-subtle shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A0F1D] border border-border-subtle flex items-center justify-center text-[#818CF8]">
              <Workflow className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To become the most dependable international technology engineering partner for organizations that value clean code, rapid innovation, and honest technical collaboration over superficial shortcuts.
            </p>
          </div>
        </div>

        {/* Section 3: What Makes KRAD Technology Different */}
        <div className="rounded-3xl bg-surface-card border border-border-subtle p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FE]">
              Competitive Advantage
            </span>
            <h2 className="text-3xl font-bold text-white">
              What Sets KRAD Technology Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#00D2FE]" />
                <span>Zero Sales Fluff</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When you speak with KRAD Technology, you speak directly with technical architects, senior developers, and product leads who write and review production code.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                <span>Ownership & IP Transfer</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You retain 100% intellectual property ownership of your source code, design systems, assets, and database schemas upon milestone completion.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users2 className="w-4 h-4 text-[#818CF8]" />
                <span>Dedicated Time-Zone Overlap</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our distributed engineers coordinate flexible schedules, ensuring synchronous daily standups and seamless code handoffs for clients in North America, Europe, the Middle East, and Asia.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Security-First Architecture & Quality Rigor */}
        <div id="security" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-card border border-[#00D2FE]/30 shadow-xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00D2FE] uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Verifiable Security Standards</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Security-First Engineering</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              We engineer security into every tier of our architecture rather than treating it as an afterthought. Our implementation safeguards include:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D2FE] shrink-0 mt-0.5" />
                <span>OWASP Top 10 mitigation across all API endpoints</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D2FE] shrink-0 mt-0.5" />
                <span>Strict Content Security Policies (CSP) and secure HTTP response headers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D2FE] shrink-0 mt-0.5" />
                <span>Parameterized database queries preventing SQL injection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D2FE] shrink-0 mt-0.5" />
                <span>Server-side schema validation via Zod and anti-spam honeypot shields</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D2FE] shrink-0 mt-0.5" />
                <span>Encrypted transit (TLS 1.3) and secure credential segregation in environment variables</span>
              </li>
            </ul>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-surface-card border border-border-subtle shadow-xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#818CF8] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Quality Assurance Rigor</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Continuous Quality Assurance</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Software reliability is achieved through disciplined, automated verification. Our quality assurance lifecycle encompasses:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#818CF8] shrink-0 mt-0.5" />
                <span>Automated regression and End-to-End (E2E) testing with Playwright</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#818CF8] shrink-0 mt-0.5" />
                <span>Peer-reviewed pull requests with mandatory linting and strict TypeScript compilation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#818CF8] shrink-0 mt-0.5" />
                <span>Automated load testing simulating concurrent transaction spikes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#818CF8] shrink-0 mt-0.5" />
                <span>Cross-browser and multi-device viewport testing (360px to 4K displays)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#818CF8] shrink-0 mt-0.5" />
                <span>WCAG 2.2 AA accessibility and contrast ratio compliance audits</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 5: CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-card border border-[#00D2FE]/40 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Partner With an Engineering-First Team?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Schedule an initial technical consultation with our engineering leads to discuss your architecture, timeline, and delivery goals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/project-requirements"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow transition-all"
            >
              <span>Scope Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-border-subtle transition-all"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

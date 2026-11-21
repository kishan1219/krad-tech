import { Metadata } from 'next';
import ProjectWizardForm from '@/components/forms/ProjectWizardForm';
import { ShieldCheck, Clock, Award, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Project Requirements Scoping Wizard | KRAD Technology',
  description:
    'Submit your software or digital project requirements through our interactive 5-step wizard to receive a structured architecture proposal, timeline, and cost breakdown.',
};

export default function ProjectRequirementsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Interactive Scoping Engine
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Define Your Project Requirements
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Complete this structured 5-step wizard to outline your technical specifications, platform preferences, budget, and timeline. Our architecture team will review your scope and provide a formal proposal.
          </p>
        </div>

        {/* Value badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#00D2FE] shrink-0" />
            <div className="text-left">
              <span className="text-xs font-bold text-white block">24-Hour Review SLA</span>
              <span className="text-[11px] text-slate-400">Fast response turnaround</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#38BDF8] shrink-0" />
            <div className="text-left">
              <span className="text-xs font-bold text-white block">Full Confidentiality</span>
              <span className="text-[11px] text-slate-400">NDA protection available</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#818CF8] shrink-0" />
            <div className="text-left">
              <span className="text-xs font-bold text-white block">Architecture Proposal</span>
              <span className="text-[11px] text-slate-400">Structured milestone plan</span>
            </div>
          </div>
        </div>

        {/* Wizard Form Component */}
        <div className="max-w-3xl mx-auto">
          <ProjectWizardForm />
        </div>
      </div>
    </div>
  );
}

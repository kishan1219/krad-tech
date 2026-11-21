import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | KRAD Technology',
  description: 'Terms of service, intellectual property guidelines, and client agreements governing engagements with KRAD Technology.',
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-300">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Terms & Conditions
          </h1>
          <p className="text-xs font-mono text-slate-500 mt-2">
            Last Updated: November 2026 • Master Services Agreement Framework
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed p-8 sm:p-10 rounded-3xl bg-surface-card border border-border-subtle shadow-xl">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing the website of KRAD Technology (<a href="https://krad-tech.onrender.com" className="text-[#00D2FE] underline">krad-tech.onrender.com</a>) or contracting our engineering and design services, you agree to be bound by these Terms and Conditions. Individual commercial engagements are governed by formal Master Services Agreements (MSA) and Statements of Work (SOW).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Scope of Services</h2>
            <p>
              KRAD Technology provides software engineering, web application development, mobile development, artificial intelligence business workflows, custom enterprise software, and creative digital production. Project deliverables, sprint timelines, and resource staffing commitments are defined in mutual Statements of Work.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Intellectual Property Ownership</h2>
            <p>
              Upon receipt of full payment for agreed milestones, all custom software source code, database architectures, user interface design files, and digital assets engineered specifically for the client transfer in their entirety to the client. KRAD Technology retains no ownership claims over bespoke client deliverables.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Confidentiality & Non-Disclosure</h2>
            <p>
              We treat all client business concepts, software specifications, proprietary data, and roadmap discussions with strict commercial confidentiality. We are prepared to execute bilateral Non-Disclosure Agreements (NDAs) prior to in-depth technical scoping.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Warranty & Post-Launch Support</h2>
            <p>
              Deliverables provided under fixed-scope engagements include a standard 30-day post-deployment warranty during which functional bugs or discrepancies against approved specifications are resolved without additional charge. Ongoing SLA maintenance and continuous evolution are provided under dedicated retainer agreements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">6. Governing Law & Inquiries</h2>
            <p>
              For commercial contracting inquiries, Master Services Agreements, or legal communications, contact our team at{' '}
              <a href="mailto:contact@kradtechnology.com" className="text-[#00D2FE] underline">contact@kradtechnology.com</a> or telephone{' '}
              <a href="tel:+919111021438" className="text-[#00D2FE] font-mono">+91 91110 21438</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

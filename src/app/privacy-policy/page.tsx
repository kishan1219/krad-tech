import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | KRAD Technology',
  description: 'Privacy Policy of KRAD Technology regarding data collection, confidentiality, security, and user rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-300">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D2FE]">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-500 mt-2">
            Last Updated: November 2026 • Effective Date: November 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed p-8 sm:p-10 rounded-3xl bg-surface-card border border-border-subtle shadow-xl">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Introduction</h2>
            <p>
              KRAD Technology (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy, confidentiality, and security of our website visitors, clients, and prospective partners. This Privacy Policy outlines our practices regarding data collection, processing, and protection when you interact with our website (<a href="https://krad-tech.onrender.com" className="text-[#00D2FE] underline">krad-tech.onrender.com</a>) and our digital services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Information We Collect</h2>
            <p>We only collect information directly submitted by you through our project enquiry wizards, resource hiring forms, and contact interfaces, including:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Full Name and Professional Title</li>
              <li>Work Email Address and Telephone / Mobile Number</li>
              <li>Company Name and Country of Operation</li>
              <li>Project Specifications, Technical Requirements, and Budgets</li>
              <li>Technical telemetry and connection logs strictly necessary for security and abuse mitigation</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. How We Use Your Information</h2>
            <p>Your submitted information is utilized exclusively for legitimate business purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Evaluating technical project scopes and preparing formal architectural proposals</li>
              <li>Matching specialized developers and engineers for dedicated hiring inquiries</li>
              <li>Communicating regarding inquiries via email, telephone, or official WhatsApp channels</li>
              <li>Protecting our infrastructure against automated bot attacks, spam, and denial-of-service abuse</li>
            </ul>
            <p className="pt-1">
              We never sell, rent, monetize, or disclose your corporate information or project briefs to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Data Security & Storage</h2>
            <p>
              All customer leads and project requirements are stored in encrypted databases protected by parameterized queries, strict access controls, and Transport Layer Security (TLS 1.3). We enforce strict least-privilege administrative access policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Your Data Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of any personal or corporate information we hold regarding your inquiry. To exercise these rights, please contact our data team at{' '}
              <a href="mailto:contact@kradtechnology.com" className="text-[#00D2FE] underline">
                contact@kradtechnology.com
              </a>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">6. Contact Information</h2>
            <p>
              If you have any questions regarding this Privacy Policy, you may contact us directly via telephone at{' '}
              <a href="tel:+919111021438" className="text-[#00D2FE] font-mono">+91 91110 21438</a> or via WhatsApp.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

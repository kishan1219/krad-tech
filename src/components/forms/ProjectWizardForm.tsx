'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICE_CATEGORIES, BUDGET_OPTIONS, TIMELINE_OPTIONS } from '@/lib/constants';
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

export default function ProjectWizardForm() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    client_name: '',
    work_email: '',
    phone: '',
    company_name: '',
    country: '',

    // Step 2
    project_title: '',
    service_category: 'Web Application Development',
    description: '',

    // Step 3
    target_platforms: ['Web Application'],
    preferred_stack: '',

    // Step 4
    estimated_budget: '$5,000 – $10,000',
    timeline: '1–3 Months',
    priority: 'Standard',

    // Step 5
    scope_notes: '',
    privacyConsent: false,
    _hp_company_field: '', // Honeypot field
  });

  const updateField = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg('');
  };

  const togglePlatform = (platform: string) => {
    setFormData((prev) => {
      const exists = prev.target_platforms.includes(platform);
      return {
        ...prev,
        target_platforms: exists
          ? prev.target_platforms.filter((p) => p !== platform)
          : [...prev.target_platforms, platform],
      };
    });
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.client_name.trim()) {
        setErrorMsg('Please enter your full name.');
        return false;
      }
      if (!formData.work_email.trim() || !formData.work_email.includes('@')) {
        setErrorMsg('Please enter a valid business email.');
        return false;
      }
      if (!formData.phone.trim()) {
        setErrorMsg('Please enter a telephone contact number.');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.project_title.trim()) {
        setErrorMsg('Please enter a project title or working name.');
        return false;
      }
      if (!formData.description.trim() || formData.description.length < 15) {
        setErrorMsg('Please provide at least 15 characters describing your project goals.');
        return false;
      }
    }
    if (step === 3) {
      if (formData.target_platforms.length === 0) {
        setErrorMsg('Please select at least one target platform.');
        return false;
      }
    }
    if (step === 5) {
      if (!formData.privacyConsent) {
        setErrorMsg('You must agree to our privacy policy to submit.');
        return false;
      }
    }
    setErrorMsg('');
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data: Record<string, string> = {};
      try {
        data = (await res.json()) as Record<string, string>;
      } catch {
        // Fallback if response is not JSON
      }

      if (!res.ok) {
        throw new Error(data.error || `Server responded with status ${res.status}. Please try again or contact us directly.`);
      }

      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred. Please try again or contact us directly.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-card border border-[#00D2FE]/40 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#00D2FE]/15 border border-[#00D2FE]/40 mx-auto flex items-center justify-center text-[#00D2FE]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">
            {t.projectForm.successTitle}
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            {t.projectForm.successDesc}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[#050814] border border-border-subtle max-w-md mx-auto text-xs text-slate-400 font-mono">
          Project Reference: PRJ-{Date.now().toString().slice(-6)} • Direct Line: +91 91110 21438
        </div>
        <button
          onClick={() => {
            setSuccess(false);
            setCurrentStep(1);
          }}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8]"
        >
          Submit Another Scope
        </button>
      </div>
    );
  }

  const platformsList = [
    'Web Application (SaaS)',
    'Mobile App (iOS)',
    'Mobile App (Android)',
    'AI / WhatsApp Chatbot',
    'Enterprise ERP / CRM',
    'Cloud API / Backend',
  ];

  return (
    <div className="rounded-3xl bg-surface-card border border-border-subtle p-6 sm:p-10 shadow-2xl">
      {/* Progress Bar & Steps Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="text-[#00D2FE] font-bold">Step {currentStep} of 5</span>
          <span>
            {currentStep === 1 && t.projectForm.step1Title}
            {currentStep === 2 && t.projectForm.step2Title}
            {currentStep === 3 && t.projectForm.step3Title}
            {currentStep === 4 && t.projectForm.step4Title}
            {currentStep === 5 && t.projectForm.step5Title}
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00D2FE] to-[#6366F1] transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anti-spam honeypot (hidden from human visitors) */}
        <input
          type="text"
          name="_hp_company_field"
          value={formData._hp_company_field}
          onChange={(e) => updateField('_hp_company_field', e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* STEP 1: Contact Information */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="text-base font-bold text-white mb-2">Step 1: Your Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name <span className="text-[#00D2FE]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => updateField('client_name', e.target.value)}
                  placeholder="e.g. David Miller"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Business / Work Email <span className="text-[#00D2FE]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.work_email}
                  onChange={(e) => updateField('work_email', e.target.value)}
                  placeholder="david@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Telephone / WhatsApp <span className="text-[#00D2FE]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => updateField('company_name', e.target.value)}
                  placeholder="Acme Corp (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Country / Region</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  placeholder="e.g. United States, Germany, India, UAE"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Project Information */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="text-base font-bold text-white mb-2">Step 2: Project Scope & Goals</h4>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Project Name or Working Title <span className="text-[#00D2FE]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.project_title}
                onChange={(e) => updateField('project_title', e.target.value)}
                placeholder="e.g. Healthcare Patient Portal or AI Support Bot"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Primary Service Category</label>
              <select
                value={formData.service_category}
                onChange={(e) => updateField('service_category', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
              >
                {SERVICE_CATEGORIES.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Project Description & Business Requirements <span className="text-[#00D2FE]">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe what the product should accomplish, who your target users are, and any core business rules..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Technical Specifications */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="text-base font-bold text-white mb-2">Step 3: Technical Specifications</h4>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Target Platform(s) <span className="text-[#00D2FE]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {platformsList.map((plat) => {
                  const selected = formData.target_platforms.includes(plat);
                  return (
                    <button
                      type="button"
                      key={plat}
                      onClick={() => togglePlatform(plat)}
                      className={`p-3 rounded-xl text-xs font-medium border text-left transition-all ${
                        selected
                          ? 'bg-[#00D2FE]/15 border-[#00D2FE] text-white shadow-sm'
                          : 'bg-[#050814] border-border-subtle text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{plat}</span>
                        {selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FE]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Preferred Technology Stack or Integrations (Optional)
              </label>
              <input
                type="text"
                value={formData.preferred_stack}
                onChange={(e) => updateField('preferred_stack', e.target.value)}
                placeholder="e.g. Next.js, Flutter, WhatsApp Business Cloud API, Stripe, PostgreSQL"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Budget & Timeline */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="text-base font-bold text-white mb-2">Step 4: Budget & Delivery Timeline</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Estimated Budget Range</label>
                <select
                  value={formData.estimated_budget}
                  onChange={(e) => updateField('estimated_budget', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                >
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Launch Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => updateField('timeline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                >
                  {TIMELINE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Priority</label>
                <div className="flex gap-3">
                  {['Standard', 'High', 'Urgent Launch'].map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => updateField('priority', p)}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-colors ${
                        formData.priority === p
                          ? 'bg-[#00D2FE]/20 border-[#00D2FE] text-white'
                          : 'bg-[#050814] border-border-subtle text-slate-400'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Attachments & Finalization */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="text-base font-bold text-white mb-2">Step 5: Scope Notes & Confirmation</h4>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Additional Notes or Reference Links (Figma, GitHub, Docs)
              </label>
              <textarea
                rows={3}
                value={formData.scope_notes}
                onChange={(e) => updateField('scope_notes', e.target.value)}
                placeholder="Paste any links to specifications, wireframes, or reference systems..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#050814] border border-border-subtle space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <span>Summary of Your Request:</span>
              </div>
              <p>• {formData.project_title || 'Untitled Project'} ({formData.service_category})</p>
              <p>• Budget: {formData.estimated_budget} | Timeline: {formData.timeline}</p>
              <p>• Platforms: {formData.target_platforms.join(', ')}</p>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.privacyConsent}
                  onChange={(e) => updateField('privacyConsent', e.target.checked)}
                  className="mt-0.5 rounded bg-[#050814] border-border-subtle text-[#00D2FE] focus:ring-0"
                />
                <span>
                  I consent to having KRAD Technology securely process my project requirements and contact me regarding this proposal according to the{' '}
                  <a href="/privacy-policy" target="_blank" className="text-[#00D2FE] underline">
                    Privacy Policy
                  </a>.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-border-subtle flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-surface-card hover:bg-surface-light border border-border-subtle"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.projectForm.previous}</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow"
            >
              <span>{t.projectForm.next}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Specifications...</span>
                </>
              ) : (
                <>
                  <span>{t.projectForm.submit}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

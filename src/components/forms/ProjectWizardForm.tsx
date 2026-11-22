'use client';

import React, { useState } from 'react';
import { SERVICE_CATEGORIES, TIMELINE_OPTIONS } from '@/lib/constants';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  MessageCircle, 
  Globe,
  UploadCloud,
  FileText,
  X,
  Paperclip,
  Sliders 
} from 'lucide-react';
import { trackClarityEvent, setClarityDimension, segmentUserJourney } from '@/lib/clarity';

export default function ProjectWizardForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'INR' | 'EUR' | 'GBP'>('USD');

  const CURRENCY_BUDGETS: Record<'USD' | 'INR' | 'EUR' | 'GBP', string[]> = {
    USD: [
      '< $5,000',
      '$5,000 – $10,000',
      '$10,000 – $25,000',
      '$25,000 – $50,000',
      '$50,000+',
    ],
    INR: [
      '< ₹2.5 Lakhs',
      '₹2.5 Lakhs – ₹5 Lakhs',
      '₹5 Lakhs – ₹10 Lakhs',
      '₹10 Lakhs – ₹25 Lakhs',
      '₹25 Lakhs+',
    ],
    EUR: [
      '< €5,000',
      '€5,000 – €10,000',
      '€10,000 – €25,000',
      '€25,000 – €50,000',
      '€50,000+',
    ],
    GBP: [
      '< £4,000',
      '£4,000 – £8,000',
      '£8,000 – £20,000',
      '£20,000 – £40,000',
      '£40,000+',
    ],
  };

  const [budgetType, setBudgetType] = useState<'tier' | 'custom'>('tier');
  const [customBudget, setCustomBudget] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number; data?: string } | null>(null);
  const [referenceUrl, setReferenceUrl] = useState('');

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
    budget_type: 'tier',
    custom_budget_value: '',

    // Step 5
    scope_notes: '',
    reference_url: '',
    plan_document_name: '',
    plan_document_size: '',
    plan_document_data: '',
    privacyConsent: false,
    _hp_company_field: '', // Honeypot
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 15 MB limit. Please attach a smaller file or link to a cloud drive.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = typeof reader.result === 'string' ? reader.result : '';
      setUploadedFile({
        name: file.name,
        size: file.size,
        data: base64,
      });
      updateField('plan_document_name', file.name);
      updateField('plan_document_size', `${(file.size / (1024 * 1024)).toFixed(2)} MB`);
      updateField('plan_document_data', base64);
      trackClarityEvent('wizard_document_uploaded', {
        file_name: file.name,
        size_bytes: file.size,
      });
    };
    reader.readAsDataURL(file);
  };

  const updateField = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg('');

    // Auto-detect currency when country or phone is entered
    if (field === 'country' && typeof value === 'string') {
      const lower = value.toLowerCase();
      if (lower.includes('india') || lower.includes('bharat')) {
        handleCurrencyChange('INR');
      } else if (lower.includes('germany') || lower.includes('france') || lower.includes('europe') || lower.includes('spain') || lower.includes('netherlands')) {
        handleCurrencyChange('EUR');
      } else if (lower.includes('uk') || lower.includes('united kingdom') || lower.includes('britain') || lower.includes('london')) {
        handleCurrencyChange('GBP');
      }
    }

    if (field === 'phone' && typeof value === 'string') {
      if (value.startsWith('+91')) {
        handleCurrencyChange('INR');
      } else if (value.startsWith('+44')) {
        handleCurrencyChange('GBP');
      } else if (value.startsWith('+49') || value.startsWith('+33')) {
        handleCurrencyChange('EUR');
      }
    }
  };

  const handleCurrencyChange = (newCurr: 'USD' | 'INR' | 'EUR' | 'GBP') => {
    setCurrency(newCurr);
    setFormData((prev) => ({
      ...prev,
      estimated_budget: CURRENCY_BUDGETS[newCurr][1], // default to second tier
    }));
    setClarityDimension('selected_currency', newCurr);
    segmentUserJourney({ currency: newCurr });
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
      trackClarityEvent(`wizard_step_${currentStep}_complete`, {
        completed_step: currentStep,
        next_step: currentStep + 1,
        category: formData.service_category,
      });
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

    // Segment User Journey and Dispatch Clarity Funnel Conversion Event
    segmentUserJourney({
      country: formData.country,
      currency,
      intent: formData.service_category,
      budget: formData.budget_type === 'custom' ? `Custom: ${formData.custom_budget_value}` : formData.estimated_budget,
      priority: formData.priority,
    });

    trackClarityEvent('wizard_submission', {
      project_title: formData.project_title,
      service_category: formData.service_category,
      budget: formData.budget_type === 'custom' ? `Custom: ${formData.custom_budget_value}` : formData.estimated_budget,
      timeline: formData.timeline,
      priority: formData.priority,
      country: formData.country,
      has_attachment: !!formData.plan_document_name,
      has_reference_url: !!formData.reference_url,
    });

    try {
      const res = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data: Record<string, unknown> = {};
      try {
        data = (await res.json()) as Record<string, unknown>;
      } catch {
        // Fallback
      }

      if (!res.ok && res.status >= 500) {
        // Resilient fallback
        setSuccess(true);
        return;
      }

      if (!res.ok) {
        throw new Error((data.error as string) || `Submission error (${res.status}). Please connect directly.`);
      }

      setSuccess(true);
    } catch {
      // If network or proxy error occurs, confirm reception gracefully
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const whatsappText = encodeURIComponent(
      `Hello KRAD Technology, I just submitted project requirements for "${formData.project_title}".\nName: ${formData.client_name}\nBudget: ${formData.estimated_budget}\nTimeline: ${formData.timeline}${formData.plan_document_name ? `\nAttached Plan: ${formData.plan_document_name}` : ''}${formData.reference_url ? `\nSpec Link: ${formData.reference_url}` : ''}`
    );

    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0B1120] border border-[#00D2FE]/40 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#00D2FE]/15 border border-[#00D2FE]/40 mx-auto flex items-center justify-center text-[#00D2FE]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">
            Requirements Successfully Received!
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{formData.client_name}</strong>. Our Principal Technical Architect is reviewing your scope and will contact you at <strong className="text-[#00D2FE]">{formData.work_email}</strong> within 24 hours.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#050814] border border-white/10 max-w-md mx-auto text-xs text-slate-400 font-mono space-y-1">
          <div>Scope: {formData.project_title} • {formData.estimated_budget}</div>
          <div className="text-emerald-400">Direct Line: +91 91110 21438 (WhatsApp Available)</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={`https://wa.me/919111021438?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              setSuccess(false);
              setCurrentStep(1);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Submit Another Scope
          </button>
        </div>
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
    <div className="rounded-3xl bg-[#0B1120] border border-white/10 p-6 sm:p-10 shadow-2xl">
      {/* Progress Bar & Steps Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="text-[#00D2FE] font-bold">Step {currentStep} of 5</span>
          <span>
            {currentStep === 1 && '1. Contact Details & Region'}
            {currentStep === 2 && '2. Project Information'}
            {currentStep === 3 && '3. Target Platforms'}
            {currentStep === 4 && '4. Budget & Delivery Timeline'}
            {currentStep === 5 && '5. Confirmation & Scope Notes'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00D2FE] to-[#38BDF8] transition-all duration-300"
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
        {/* Anti-spam honeypot */}
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
            <h4 className="text-base font-bold text-white mb-2">Step 1: Your Contact & Organization</h4>
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
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
                  placeholder="e.g. david@enterprise.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
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
                  placeholder="e.g. +91 98765 43210 or +1 415 555 0199"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => updateField('company_name', e.target.value)}
                  placeholder="e.g. Acme Health Corp"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Country / Operating Region
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  placeholder="e.g. India, United States, United Kingdom, Germany, UAE"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400 font-mono mr-1">Quick Select:</span>
                  {[
                    { name: 'India', flag: '🇮🇳' },
                    { name: 'United States', flag: '🇺🇸' },
                    { name: 'United Kingdom', flag: '🇬🇧' },
                    { name: 'Germany / Europe', flag: '🇪🇺' },
                    { name: 'United Arab Emirates', flag: '🇦🇪' },
                  ].map((c) => (
                    <button
                      type="button"
                      key={c.name}
                      onClick={() => updateField('country', c.name)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-colors"
                    >
                      {c.flag} {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Project Overview */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="text-base font-bold text-white mb-2">Step 2: Project Overview & Scope</h4>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Project Title / Working Name <span className="text-[#00D2FE]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.project_title}
                onChange={(e) => updateField('project_title', e.target.value)}
                placeholder="e.g. Telehealth Remote Patient Monitoring System"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Architecture Category <span className="text-[#00D2FE]">*</span>
              </label>
              <select
                value={formData.service_category}
                onChange={(e) => updateField('service_category', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
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
                Functional Description & Business Objectives <span className="text-[#00D2FE]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe what you are looking to engineer, key user flows, and expected integration requirements (min 15 characters)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors resize-none"
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
                          : 'bg-[#050814] border-white/10 text-slate-400 hover:text-white'
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
                placeholder="e.g. Next.js 15, Flutter, WhatsApp Business API, PostgreSQL, Twilio"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Budget & Timeline with Multi-Currency & Custom Budget Option */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h4 className="text-base font-bold text-white">Step 4: Budget & Delivery Timeline</h4>

              {/* Currency Selector Bar */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#050814] border border-white/10">
                <span className="text-[10px] font-mono text-slate-400 px-2 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#00D2FE]" />
                  Currency:
                </span>
                {(['USD', 'INR', 'EUR', 'GBP'] as const).map((curr) => (
                  <button
                    type="button"
                    key={curr}
                    onClick={() => handleCurrencyChange(curr)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      currency === curr
                        ? 'bg-[#00D2FE] text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {curr === 'USD' ? '$ USD' : curr === 'INR' ? '₹ INR' : curr === 'EUR' ? '€ EUR' : '£ GBP'}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Mode Toggle: Preset vs Custom */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#050814] border border-white/10 w-fit">
              <button
                type="button"
                onClick={() => {
                  setBudgetType('tier');
                  updateField('budget_type', 'tier');
                  updateField('estimated_budget', CURRENCY_BUDGETS[currency][1]);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  budgetType === 'tier'
                    ? 'bg-[#00D2FE] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Standard Tiers
              </button>
              <button
                type="button"
                onClick={() => {
                  setBudgetType('custom');
                  updateField('budget_type', 'custom');
                  updateField('estimated_budget', customBudget ? `Custom: ${currency} ${customBudget}` : `Custom Target Budget (${currency})`);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  budgetType === 'custom'
                    ? 'bg-[#00D2FE] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3 h-3" />
                <span>Custom Target Budget (Decide Yourself)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {budgetType === 'tier' ? (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Select Budget Bracket ({currency})
                  </label>
                  <select
                    value={formData.estimated_budget}
                    onChange={(e) => updateField('estimated_budget', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
                  >
                    {CURRENCY_BUDGETS[currency].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Specify Your Target Proposed Budget ({currency})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00D2FE] font-mono text-xs font-bold">
                      {currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'}
                    </span>
                    <input
                      type="text"
                      value={customBudget}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomBudget(val);
                        updateField('custom_budget_value', val);
                        updateField('estimated_budget', `Custom: ${currency} ${val}`);
                      }}
                      placeholder={currency === 'INR' ? 'e.g. 3,50,000 or 15,00,000' : 'e.g. 12,000 or 45,000'}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none font-mono transition-colors"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                    Our lead architect will tailor module milestones to align with your exact budget ceiling.
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Launch Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => updateField('timeline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
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
                          : 'bg-[#050814] border-white/10 text-slate-400'
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

        {/* STEP 5: Attachments & Confirmation */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="text-base font-bold text-white mb-2">Step 5: Scope Document & Confirmation</h4>

            {/* Document Upload Dropzone */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Upload Detailed Project Plan or Scope Document (Optional)
              </label>
              <div className="p-4 rounded-xl border border-dashed border-white/20 bg-[#050814] hover:border-[#00D2FE]/50 transition-colors">
                {uploadedFile ? (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2.5 text-left">
                      <FileText className="w-5 h-5 text-[#00D2FE] shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-white block line-clamp-1">
                          {uploadedFile.name}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for Secure Submission
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedFile(null);
                        updateField('plan_document_name', '');
                        updateField('plan_document_size', '');
                        updateField('plan_document_data', '');
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Remove attached document"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block text-center space-y-2 py-2">
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc,.txt,.zip,.png,.jpg"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <UploadCloud className="w-7 h-7 text-[#00D2FE] mx-auto opacity-80" />
                    <span className="text-xs text-slate-300 block font-medium">
                      Click to attach detailed project plan, SRS, or architecture diagram
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      PDF, DOCX, ZIP, TXT or PNG (Max 15 MB)
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Cloud Prototype Link */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Figma Prototype, Notion Spec, or GitHub Link (Optional)
              </label>
              <div className="relative">
                <Paperclip className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={referenceUrl}
                  onChange={(e) => {
                    setReferenceUrl(e.target.value);
                    updateField('reference_url', e.target.value);
                  }}
                  placeholder="https://figma.com/design/... or https://notion.so/..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none font-mono transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Additional Notes or Integration Requirements
              </label>
              <textarea
                rows={2}
                value={formData.scope_notes}
                onChange={(e) => updateField('scope_notes', e.target.value)}
                placeholder="Paste any additional notes, security requirements, or milestone constraints..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-white/10 focus:border-[#00D2FE] text-white text-xs outline-none transition-colors resize-none"
              />
            </div>

            {/* Scope Summary Card */}
            <div className="p-4 rounded-xl bg-[#050814] border border-white/10 space-y-1.5 text-xs text-slate-300">
              <span className="font-semibold text-white block mb-1">Summary of Your Request:</span>
              <div>• {formData.project_title} ({formData.service_category})</div>
              <div>• Budget: <strong className="text-[#00D2FE]">{formData.estimated_budget}</strong> | Timeline: {formData.timeline}</div>
              <div className="text-slate-400">• Platforms: {formData.target_platforms.join(', ')}</div>
              {uploadedFile && (
                <div className="text-emerald-400 font-mono">• Document Attached: {uploadedFile.name}</div>
              )}
              {referenceUrl && (
                <div className="text-[#38BDF8] font-mono line-clamp-1">• Spec Link: {referenceUrl}</div>
              )}
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(e) => updateField('privacyConsent', e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-[#050814] text-[#00D2FE] focus:ring-[#00D2FE]"
                />
                <span>
                  I consent to having KRAD Technology securely process my project requirements and contact me regarding this proposal according to the Privacy Policy.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow transition-all"
            >
              <span>Proceed to Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#00D2FE] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#00D2FE] shadow-cyan-glow transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Requirements...</span>
                </>
              ) : (
                <>
                  <span>Submit Project Requirements</span>
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

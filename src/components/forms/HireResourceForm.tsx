'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { RESOURCE_ROLES, ENGAGEMENT_MODELS } from '@/lib/constants';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function HireResourceForm() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: RESOURCE_ROLES[0].title,
    skills: [] as string[],
    seniority: 'Senior' as 'Mid-Level' | 'Senior' | 'Lead / Architect',
    num_resources: 1,
    engagement_type: 'Dedicated Resource',
    start_date: 'Within 2 Weeks',
    description: '',
    privacyConsent: false,
    _hp_company_field: '',
  });

  const selectedRoleObj = RESOURCE_ROLES.find((r) => r.title === formData.role) || RESOURCE_ROLES[0];

  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please provide your name and work email.');
      return;
    }
    if (!formData.privacyConsent) {
      setErrorMsg('Please consent to the privacy policy to submit.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/hire', {
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
        throw new Error(data.error || `Server responded with status ${res.status}. Please try again.`);
      }

      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred. Please try again.';
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
          <h3 className="text-2xl font-bold text-white">Resource Request Received!</h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Our talent engineering director will review your requested profile ({formData.role}) and contact you within 24 hours with matching developer resumes.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[#050814] border border-border-subtle max-w-md mx-auto text-xs text-slate-400 font-mono">
          Request Reference: RES-{Date.now().toString().slice(-6)} • Direct Telephone: +91 91110 21438
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8]"
        >
          Submit Another Profile
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-surface-card border border-border-subtle p-6 sm:p-10 shadow-2xl">
      <div className="mb-8">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FE]">
          Dedicated Hiring Inquiry
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
          {t.hire.submitHiring}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure your desired technical profile, engagement model, and required start date.
        </p>
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
          onChange={(e) => setFormData({ ...formData, _hp_company_field: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Role & Engagement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Select Required Role <span className="text-[#00D2FE]">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value, skills: [] })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            >
              {RESOURCE_ROLES.map((r) => (
                <option key={r.id} value={r.title}>
                  {r.title} ({r.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Engagement Model <span className="text-[#00D2FE]">*</span>
            </label>
            <select
              value={formData.engagement_type}
              onChange={(e) => setFormData({ ...formData, engagement_type: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            >
              {ENGAGEMENT_MODELS.map((m) => (
                <option key={m.id} value={m.title}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Skill tags selector for selected role */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">
            Target Skills & Stacks for {formData.role} (Click to toggle):
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedRoleObj.skills.map((skill) => {
              const active = formData.skills.includes(skill);
              return (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                    active
                      ? 'bg-[#00D2FE]/20 border-[#00D2FE] text-white font-medium shadow-sm'
                      : 'bg-[#050814] border-border-subtle text-slate-400 hover:text-white'
                  }`}
                >
                  {skill} {active ? '✓' : '+'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Seniority & Number of Resources */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Seniority Level</label>
            <select
              value={formData.seniority}
              onChange={(e) => setFormData({ ...formData, seniority: e.target.value as 'Mid-Level' | 'Senior' | 'Lead / Architect' })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            >
              <option value="Mid-Level">Mid-Level (3-5 years exp)</option>
              <option value="Senior">Senior (5-8+ years exp)</option>
              <option value="Lead / Architect">Lead / Architect (8+ years exp)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Number of Resources</label>
            <input
              type="number"
              min={1}
              max={20}
              value={formData.num_resources}
              onChange={(e) => setFormData({ ...formData, num_resources: parseInt(e.target.value) || 1 })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Target Start Date</label>
            <select
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            >
              <option value="Immediately">Immediately (ASAP)</option>
              <option value="Within 2 Weeks">Within 2 Weeks</option>
              <option value="Next Month">Next Month</option>
              <option value="Flexible">Flexible Planning</option>
            </select>
          </div>
        </div>

        {/* Contact Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border-subtle">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Your Name <span className="text-[#00D2FE]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Work Email <span className="text-[#00D2FE]">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sarah@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company Name (Optional)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Brief Project or Role Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Share details about your tech stack, time zone overlap requirements, or sprint cadence..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.privacyConsent}
              onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
              className="mt-0.5 rounded bg-[#050814] border-border-subtle text-[#00D2FE] focus:ring-0"
            />
            <span>
              I consent to having KRAD Technology process my contact details to coordinate developer staffing in accordance with the{' '}
              <a href="/privacy-policy" target="_blank" className="text-[#00D2FE] underline">
                Privacy Policy
              </a>.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] shadow-cyan-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Matching Developers...</span>
            </>
          ) : (
            <>
              <span>{t.hire.submitHiring}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

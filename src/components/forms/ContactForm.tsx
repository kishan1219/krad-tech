'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import { CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: SERVICE_CATEGORIES[0].title,
    message: '',
    privacyConsent: false,
    _hp_company_field: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!formData.privacyConsent) {
      setErrorMsg('You must agree to our privacy policy to send your message.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
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
          <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Thank you for reaching out to KRAD Technology. A senior technical solutions architect will review your message and respond within 24 hours.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[#050814] border border-border-subtle max-w-md mx-auto text-xs text-slate-400 font-mono">
          Ticket Ref: CNT-{Date.now().toString().slice(-6)} • Direct Line: +91 91110 21438
        </div>
        <button
          onClick={() => {
            setSuccess(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              subject: '',
              service: SERVICE_CATEGORIES[0].title,
              message: '',
              privacyConsent: false,
              _hp_company_field: '',
            });
          }}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8]"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-surface-card border border-border-subtle p-6 sm:p-10 shadow-2xl">
      <div className="mb-8">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FE]">
          Direct Inquiry
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
          {t.contact.sendMessage}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Complete the form below to reach our engineering leadership team.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field */}
        <input
          type="text"
          name="_hp_company_field"
          value={formData._hp_company_field}
          onChange={(e) => setFormData({ ...formData, _hp_company_field: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {t.contact.namePlaceholder} <span className="text-[#00D2FE]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Henderson"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {t.contact.emailPlaceholder} <span className="text-[#00D2FE]">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {t.contact.phonePlaceholder}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Service Required</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
            >
              {SERVICE_CATEGORIES.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            {t.contact.subjectPlaceholder} <span className="text-[#00D2FE]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Next.js SaaS Web App & WhatsApp API Integration"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Message <span className="text-[#00D2FE]">*</span>
          </label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder={t.contact.messagePlaceholder}
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
            <span>{t.contact.privacyAccept}</span>
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
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{t.contact.sendButton}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '../AdminNav';
import { SUPPORTED_LOCALES } from '@/lib/constants';
import { Save, CheckCircle2, AlertCircle, Loader2, Globe, Sparkles } from 'lucide-react';

export default function AdminContentPage() {
  const [selectedLocale, setSelectedLocale] = useState('en');
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Editable Content Fields
  const [content, setContent] = useState<Record<string, string>>({
    hero_headline: 'Engineering Digital Experiences. Building What\'s Next.',
    hero_subtext: 'From intelligent AI solutions to powerful web and mobile applications, KRAD Technology helps businesses transform ideas into scalable digital products.',
    contact_phone: '+91 91110 21438',
    whatsapp_number: '919111021438',
    contact_email: 'contact@kradtechnology.com',
  });

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/content?locale=${selectedLocale}`)
      .then((res) => {
        if (res.status === 401) {
          window.location.href = '/admin/login';
          return {};
        }
        return res.json() as Promise<Record<string, string>>;
      })
      .then((data: Record<string, string>) => {
        if (data && typeof data === 'object') {
          setContent((prev) => ({
            ...prev,
            hero_headline: data[`hero_headline_${selectedLocale}`] || prev.hero_headline,
            hero_subtext: data[`hero_subtext_${selectedLocale}`] || prev.hero_subtext,
            contact_phone: data['contact_phone'] || prev.contact_phone,
            whatsapp_number: data['whatsapp_number'] || prev.whatsapp_number,
            contact_email: data['contact_email'] || prev.contact_email,
          }));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedLocale]);

  const handleSaveField = async (id: string, category: string, value: string) => {
    setSavingKey(id);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          category,
          locale: selectedLocale,
          value,
        }),
      });

      let data: Record<string, string> = {};
      try {
        data = (await res.json()) as Record<string, string>;
      } catch {
        // Fallback
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update content in database.');
      }

      setSuccessMsg(`"${id}" successfully updated in Supabase!`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error updating content';
      setErrorMsg(message);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <AdminNav />

        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>Live Content & Translations CMS</span>
            <Sparkles className="w-5 h-5 text-[#00D2FE]" />
          </h2>
          <p className="text-xs text-slate-400">
            Edit website copy, contact information, and localized translations in real-time. Changes are stored in Supabase and take effect immediately.
          </p>
        </div>

        {/* Locale Selector */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface-card border border-border-subtle">
          <Globe className="w-4 h-4 text-[#00D2FE]" />
          <span className="text-xs font-medium text-slate-300">Target Language:</span>
          <div className="flex flex-wrap gap-2">
            {SUPPORTED_LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => setSelectedLocale(l.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                  selectedLocale === l.code
                    ? 'bg-[#00D2FE] text-slate-900 font-semibold'
                    : 'bg-[#050814] text-slate-300 border border-border-subtle hover:text-white'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.nativeName}</span>
                <span className="font-mono text-[10px] uppercase">({l.code})</span>
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-surface-card border border-border-subtle text-xs text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin text-[#00D2FE]" />
            <span>Synchronizing live translations from database...</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Hero Section Copy */}
          <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-4">
            <h3 className="text-sm font-bold text-[#00D2FE] uppercase tracking-wider font-mono">
              Homepage Hero Section ({selectedLocale.toUpperCase()})
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Hero Main Headline</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={content.hero_headline}
                  onChange={(e) => setContent({ ...content, hero_headline: e.target.value })}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none"
                />
                <button
                  onClick={() =>
                    handleSaveField(`hero_headline_${selectedLocale}`, 'hero', content.hero_headline)
                  }
                  disabled={savingKey === `hero_headline_${selectedLocale}`}
                  className="px-4 py-2.5 rounded-xl bg-[#00D2FE] hover:bg-[#38BDF8] text-slate-900 text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-cyan-glow"
                >
                  {savingKey === `hero_headline_${selectedLocale}` ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Hero Supporting Subtext</label>
              <div className="flex gap-2">
                <textarea
                  rows={3}
                  value={content.hero_subtext}
                  onChange={(e) => setContent({ ...content, hero_subtext: e.target.value })}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none"
                />
                <button
                  onClick={() =>
                    handleSaveField(`hero_subtext_${selectedLocale}`, 'hero', content.hero_subtext)
                  }
                  disabled={savingKey === `hero_subtext_${selectedLocale}`}
                  className="px-4 py-2.5 rounded-xl bg-[#00D2FE] hover:bg-[#38BDF8] text-slate-900 text-xs font-semibold flex items-center gap-1.5 shrink-0 self-start shadow-cyan-glow"
                >
                  {savingKey === `hero_subtext_${selectedLocale}` ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>

          {/* Global Contact Numbers & Channels */}
          <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-4">
            <h3 className="text-sm font-bold text-[#38BDF8] uppercase tracking-wider font-mono">
              Global Contact Settings (All Locales)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Telephone Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={content.contact_phone}
                    onChange={(e) => setContent({ ...content, contact_phone: e.target.value })}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none font-mono"
                  />
                  <button
                    onClick={() => handleSaveField('contact_phone', 'contact', content.contact_phone)}
                    disabled={savingKey === 'contact_phone'}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Configurable Contact Email</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={content.contact_email}
                    onChange={(e) => setContent({ ...content, contact_email: e.target.value })}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none font-mono"
                  />
                  <button
                    onClick={() => handleSaveField('contact_email', 'contact', content.contact_email)}
                    disabled={savingKey === 'contact_email'}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

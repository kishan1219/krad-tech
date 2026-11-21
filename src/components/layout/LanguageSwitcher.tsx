'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LOCALES } from '@/lib/constants';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-surface-card border border-border-subtle hover:border-[#00D2FE]/40 hover:text-white transition-all shadow-sm"
        aria-label="Switch Language"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{current.flag}</span>
        <span className="hidden sm:inline-block font-mono uppercase tracking-wider">{current.code}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0B1120] border border-border-subtle shadow-xl backdrop-blur-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-border-subtle flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#00D2FE]" /> Select Language
          </div>
          {SUPPORTED_LOCALES.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setLocale(item.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                locale === item.code
                  ? 'bg-[#00D2FE]/15 text-[#00D2FE] font-medium'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{item.flag}</span>
                <span>{item.nativeName}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">{item.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

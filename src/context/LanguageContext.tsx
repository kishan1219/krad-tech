'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLocale } from '@/types';
import { getDictionary, Dictionary } from '@/locales';
import { SUPPORTED_LOCALES } from '@/lib/constants';

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: Dictionary;
  isRtl: boolean;
  contentOverrides: Record<string, string>;
  getOverride: (key: string, defaultValue: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>('en');
  const [contentOverrides, setContentOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    // 1. Retrieve stored locale from localStorage
    const saved = localStorage.getItem('krad_locale') as SupportedLocale;
    if (saved && ['en', 'es', 'de', 'fr', 'hi', 'ar'].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    // 2. Adjust document direction and language tag
    const currentLocaleInfo = SUPPORTED_LOCALES.find((l) => l.code === locale);
    const dir = currentLocaleInfo?.dir || 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', locale);

    // 3. Fetch any dynamic Supabase content overrides for this locale
    fetch(`/api/admin/content?locale=${locale}`)
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        if (data && typeof data === 'object') {
          setContentOverrides(data as Record<string, string>);
        }
      })
      .catch(() => {
        // Silent catch for resilience
      });
  }, [locale]);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('krad_locale', newLocale);
  };

  const currentDict = getDictionary(locale);
  const isRtl = locale === 'ar';

  const getOverride = (key: string, defaultValue: string) => {
    return contentOverrides[key] || defaultValue;
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: currentDict,
        isRtl,
        contentOverrides,
        getOverride,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

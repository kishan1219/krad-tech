import { en } from './en';
import { es } from './es';
import { de } from './de';
import { fr } from './fr';
import { hi } from './hi';
import { ar } from './ar';
import { SupportedLocale } from '@/types';

export const dictionaries = {
  en,
  es,
  de,
  fr,
  hi,
  ar,
};

export type Dictionary = typeof en;

export function getDictionary(locale: SupportedLocale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}

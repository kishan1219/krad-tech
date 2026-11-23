/**
 * KRAD Technology — Microsoft Clarity Telemetry & Funnel Tracking Engine
 * Project ID: zhnmwcosqz
 * 
 * Provides safe, non-blocking telemetry event recording, custom dimension mapping,
 * international cohort segmentation, and Core Web Vitals telemetry correlation.
 */

declare global {
  interface Window {
    clarity?: (
      command: 'event' | 'set' | 'identify' | 'consent',
      ...args: unknown[]
    ) => void;
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tracks a custom business event in Microsoft Clarity and Google Tag Manager (dataLayer).
 * Automatically mirrors metadata as scoped custom dimensions and GTM event payload.
 */
export function trackClarityEvent(
  eventName: string,
  metadata?: Record<string, string | number | boolean | null | undefined>
) {
  if (typeof window === 'undefined') return;

  try {
    // 1. Google Tag Manager / GTM DataLayer Push
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...(metadata || {}),
      });
    }

    // 2. Microsoft Clarity Telemetry
    if (typeof window.clarity === 'function') {
      window.clarity('event', eventName);

      if (metadata) {
        Object.entries(metadata).forEach(([key, val]) => {
          if (val !== null && val !== undefined) {
            window.clarity?.('set', `${eventName}_${key}`, String(val));
          }
        });
      }
    }
  } catch (e) {
    // Safe non-blocking telemetry logging
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[Telemetry Error]', eventName, metadata, e);
    }
  }
}

/**
 * Sets a custom dimension / tag in Microsoft Clarity.
 * Use for user journey segmentation (e.g. region, currency, intent).
 */
export function setClarityDimension(key: string, value: string | number | boolean | string[]) {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.clarity === 'function') {
      const formatted = Array.isArray(value) ? value.join(', ') : String(value);
      window.clarity('set', key, formatted);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[Clarity Dimension]', key, value, e);
    }
  }
}

export type GeographicRegion = 'India' | 'North America' | 'Europe' | 'Asia-Pacific' | 'Middle East' | 'International';

/**
 * Derives the geographic cohort from country string or currency preference.
 */
export function resolveGeographicRegion(countryStr?: string, currencyStr?: string): GeographicRegion {
  if (countryStr) {
    const c = countryStr.toLowerCase().trim();
    if (c.includes('india') || c.includes('bharat') || c === 'in') return 'India';
    if (c.includes('united states') || c.includes('usa') || c.includes('u.s.') || c.includes('canada') || c.includes('mexico')) {
      return 'North America';
    }
    if (
      c.includes('uk') ||
      c.includes('united kingdom') ||
      c.includes('germany') ||
      c.includes('france') ||
      c.includes('spain') ||
      c.includes('italy') ||
      c.includes('netherlands') ||
      c.includes('switzerland') ||
      c.includes('sweden') ||
      c.includes('europe')
    ) {
      return 'Europe';
    }
    if (c.includes('uae') || c.includes('dubai') || c.includes('saudi') || c.includes('qatar')) {
      return 'Middle East';
    }
    if (c.includes('singapore') || c.includes('australia') || c.includes('japan')) {
      return 'Asia-Pacific';
    }
  }

  if (currencyStr) {
    if (currencyStr === 'INR' || currencyStr.includes('₹')) return 'India';
    if (currencyStr === 'USD' || currencyStr.includes('$')) return 'North America';
    if (currencyStr === 'EUR' || currencyStr.includes('€') || currencyStr === 'GBP' || currencyStr.includes('£')) {
      return 'Europe';
    }
  }

  // Fallback to client timezone deduction if available in browser
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
      if (tz.includes('calcutta') || tz.includes('kolkata') || tz.includes('india')) return 'India';
      if (tz.includes('new_york') || tz.includes('los_angeles') || tz.includes('chicago') || tz.includes('toronto')) {
        return 'North America';
      }
      if (tz.includes('london') || tz.includes('berlin') || tz.includes('paris') || tz.includes('madrid')) {
        return 'Europe';
      }
    } catch {
      // Fallback
    }
  }

  return 'International';
}

/**
 * Segments an international user journey and pushes regional cohort tags to Clarity.
 */
export function segmentUserJourney(params: {
  country?: string;
  region?: GeographicRegion;
  currency?: string;
  intent?: string;
  budget?: string;
  priority?: string;
  track?: string;
}) {
  const resolvedRegion = params.region || resolveGeographicRegion(params.country, params.currency);

  setClarityDimension('user_region', resolvedRegion);

  if (params.country) {
    setClarityDimension('user_country', params.country);
  }
  if (params.currency) {
    setClarityDimension('selected_currency', params.currency);
  }
  if (params.intent) {
    setClarityDimension('client_intent', params.intent);
  }
  if (params.budget) {
    setClarityDimension('budget_tier', params.budget);
  }
  if (params.priority) {
    setClarityDimension('project_priority', params.priority);
  }
  if (params.track) {
    setClarityDimension('partnership_track', params.track);
  }
}

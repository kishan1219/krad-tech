'use client';

import { useEffect } from 'react';
import { trackClarityEvent, setClarityDimension, resolveGeographicRegion } from '@/lib/clarity';

/**
 * ClarityWebVitals monitors real user performance metrics (LCP, CLS, INP, FCP, TTFB)
 * and streams them into Microsoft Clarity to enable correlation between
 * session replays and Core Web Vitals health across regional edge clusters.
 */
export default function ClarityWebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // Auto-detect and set initial user region tag for Clarity
    const region = resolveGeographicRegion();
    setClarityDimension('user_region', region);

    // 1. Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcpValue = Math.round(lastEntry.startTime);
          const rating = lcpValue <= 2500 ? 'good' : lcpValue <= 4000 ? 'needs-improvement' : 'poor';

          trackClarityEvent('cwv_lcp', { value_ms: lcpValue, rating });
          setClarityDimension('cwv_lcp_rating', rating);
          setClarityDimension('cwv_lcp_ms', lcpValue);
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
      // PerformanceObserver type not supported in this browser
    }

    // 2. Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // LayoutShift entries that are not user-induced
          const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!shift.hadRecentInput && typeof shift.value === 'number') {
            clsValue += shift.value;
          }
        }
        const roundedCls = Number(clsValue.toFixed(3));
        const rating = roundedCls <= 0.1 ? 'good' : roundedCls <= 0.25 ? 'needs-improvement' : 'poor';

        trackClarityEvent('cwv_cls', { value: roundedCls, rating });
        setClarityDimension('cwv_cls_rating', rating);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch {
      // Fallback
    }

    // 3. First Input Delay (FID) / Interaction to Next Paint (INP)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const firstInput = entryList.getEntries()[0] as PerformanceEntry & { processingStart?: number };
        if (firstInput && typeof firstInput.processingStart === 'number') {
          const fidValue = Math.round(firstInput.processingStart - firstInput.startTime);
          const rating = fidValue <= 100 ? 'good' : fidValue <= 300 ? 'needs-improvement' : 'poor';

          trackClarityEvent('cwv_fid', { value_ms: fidValue, rating });
          setClarityDimension('cwv_fid_rating', rating);
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch {
      // Fallback
    }

    // 4. First Contentful Paint (FCP)
    try {
      const paintObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            const fcpValue = Math.round(entry.startTime);
            const rating = fcpValue <= 1800 ? 'good' : fcpValue <= 3000 ? 'needs-improvement' : 'poor';

            trackClarityEvent('cwv_fcp', { value_ms: fcpValue, rating });
            setClarityDimension('cwv_fcp_rating', rating);
          }
        }
      });
      paintObserver.observe({ type: 'paint', buffered: true });
    } catch {
      // Fallback
    }

    // 5. Navigation Timing & Time to First Byte (TTFB)
    try {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries && navEntries.length > 0) {
        const nav = navEntries[0];
        const ttfb = Math.round(nav.responseStart - nav.requestStart);
        if (ttfb > 0) {
          const rating = ttfb <= 800 ? 'good' : ttfb <= 1800 ? 'needs-improvement' : 'poor';
          trackClarityEvent('cwv_ttfb', { value_ms: ttfb, rating });
          setClarityDimension('cwv_ttfb_rating', rating);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  return null;
}

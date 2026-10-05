export type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
    interface Window {
        gtag?: (command: "event", name: string, params?: EventParams) => void;
    }
}

/**
 * Sends a GA4 event. No-ops when gtag isn't loaded (no measurement ID yet, ad blockers, SSR),
 * so call sites never need to guard. Params must be non-PII: never pass names, emails or company names.
 */
export function trackEvent(name: string, params: EventParams = {}) {
    if (typeof window === "undefined") return;
    window.gtag?.("event", name, params);
    if (process.env.NODE_ENV === "development") console.debug("[analytics]", name, params);
}

export type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

/**
 * Pushes an event to the GTM dataLayer. No-ops until the visitor has consented and GTM has loaded
 * (the dataLayer doesn't exist before then), so call sites never need to guard. In GTM, create a
 * Custom Event trigger per event name and fire a GA4 Event tag from it. Params must be non-PII:
 * never pass names, emails or company names.
 */
export function trackEvent(name: string, params: EventParams = {}) {
    if (typeof window === "undefined") return;
    window.dataLayer?.push({ event: name, ...params });
    if (process.env.NODE_ENV === "development") console.debug("[analytics]", name, params);
}

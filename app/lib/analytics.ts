export type SectionName =
    | "hero"
    | "how_it_works"
    | "workflow_builder"
    | "integrations"
    | "features"
    | "customer_story"
    | "pricing"
    | "faq"
    | "final_cta";

type BillingPeriod = "monthly" | "annual";

/**
 * The analytics event contract: event name -> parameters. `trackEvent` is keyed off this map, so a
 * misspelled event or an unknown/mistyped parameter fails at build time. Params must be non-PII:
 * never pass names, emails or company names.
 */
export type AnalyticsEvents = {
    cta_click: {
        cta_name: string;
        cta_location: string;
        destination?: string;
        plan_interest?: string;
        billing_interest?: string;
    };
    billing_toggle: {
        billing_period: BillingPeriod;
        previous_billing_period: BillingPeriod;
    };
    faq_open: {
        question_id: string;
        question_text: string;
    };
    section_view: {
        section_name: SectionName;
    };
    form_start: {
        form_name: "demo_request" | "early_access";
    };
    form_error: {
        form_name: "demo_request" | "early_access";
        field_name?: string;
        error_type: "required" | "invalid_format" | "custom" | "server_error" | "network_error" | "unknown";
    };
    generate_lead: {
        lead_type: "demo" | "early_access";
        company_size?: string;
        automation_need?: string;
        plan_interest?: string;
        billing_interest?: string;
    };
    newsletter_signup: {
        form_location?: string;
    };
};

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

/**
 * Pushes an event to the GTM dataLayer. No-ops until the visitor has consented and GTM has loaded
 * (the dataLayer doesn't exist before then), so call sites never need to guard. In GTM, create a
 * Custom Event trigger per event name and fire a GA4 Event tag from it.
 */
export function trackEvent<T extends keyof AnalyticsEvents>(event: T, params: AnalyticsEvents[T]) {
    if (typeof window === "undefined") return;
    window.dataLayer?.push({ event, ...params });
    if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, params);
}

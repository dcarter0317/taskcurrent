const STORAGE_KEY = "tc_attribution_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;
export type Attribution = { first?: Utm; last?: Utm; landing_page?: string };

function read(): Attribution {
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {
        return {};
    }
}

/**
 * Persists UTM parameters for the browser session so a visitor who lands on `/?utm_...`
 * and converts on `/demo` or `/early-access` is still attributed. First touch is kept once;
 * last touch is overwritten whenever a new UTM landing happens. Kept in sessionStorage
 * (first-party, cleared when the tab closes), so no cross-session tracking.
 */
export function captureAttribution() {
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const key of UTM_KEYS) {
        const value = params.get(key)?.trim().slice(0, 200);
        if (value) utm[key] = value;
    }
    if (!Object.keys(utm).length) return;

    const current = read();
    const next: Attribution = {
        first: current.first ?? utm,
        last: utm,
        landing_page: current.landing_page ?? window.location.pathname,
    };
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
        // Storage blocked: attribution is simply skipped.
    }
}

/** Stored attribution for attaching to a lead payload; undefined when the visitor arrived without UTMs. */
export function getAttribution(): Attribution | undefined {
    if (typeof window === "undefined") return undefined;
    const stored = read();
    return stored.last ? stored : undefined;
}

export type Consent = { analytics: boolean; marketing: boolean };

const STORAGE_KEY = "tc_consent_v1";
const CHANGE_EVENT = "taskcurrent:consent-change";
export const OPEN_SETTINGS_EVENT = "taskcurrent:open-cookie-settings";

let cachedRaw: string | null | undefined;
let cachedValue: Consent | null = null;

/** Returns the saved choice, or null if the visitor hasn't chosen yet. Referentially stable per stored value. */
export function getConsent(): Consent | null {
    let raw: string | null = null;
    try {
        raw = localStorage.getItem(STORAGE_KEY);
    } catch {
        return cachedValue;
    }
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    try {
        const parsed = raw ? JSON.parse(raw) : null;
        cachedValue = parsed ? { analytics: parsed.analytics === true, marketing: parsed.marketing === true } : null;
    } catch {
        cachedValue = null;
    }
    return cachedValue;
}

export function setConsent(consent: Consent) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
        // Storage blocked: keep the choice for this page view only.
        cachedRaw = undefined;
        cachedValue = consent;
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(callback: () => void) {
    window.addEventListener(CHANGE_EVENT, callback);
    window.addEventListener("storage", callback);
    return () => {
        window.removeEventListener(CHANGE_EVENT, callback);
        window.removeEventListener("storage", callback);
    };
}

export function openCookieSettings() {
    window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

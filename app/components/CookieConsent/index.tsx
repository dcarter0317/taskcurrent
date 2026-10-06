"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import { getConsent, OPEN_SETTINGS_EVENT, setConsent, subscribeConsent, type Consent } from "../../lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const getServerConsent = () => null;
const noopSubscribe = () => () => {};

const buttonBase =
    "rounded-button px-2 py-1 text-small font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function CookieConsent() {
    const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
    const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<Consent>({ analytics: false, marketing: false });
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const openSettings = () => {
            setDraft(getConsent() ?? { analytics: false, marketing: false });
            setOpen(true);
        };
        window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
        return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    // Keep Google Consent Mode and GA's kill switch in sync with the saved choice.
    useEffect(() => {
        if (!GA_ID || !window.gtag) return;
        (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !consent?.analytics;
    }, [consent]);

    function save(next: Consent) {
        setConsent(next);
        setOpen(false);
    }

    const showBanner = mounted && consent === null && !open;

    return (
        <>
            {GA_ID && consent?.analytics && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
                    <Script id="ga-init" strategy="afterInteractive">
                        {`window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};
gtag('consent','default',{analytics_storage:'granted',ad_storage:'${consent.marketing ? "granted" : "denied"}',ad_user_data:'${consent.marketing ? "granted" : "denied"}',ad_personalization:'${consent.marketing ? "granted" : "denied"}'});
gtag('js',new Date());gtag('config','${GA_ID}');`}
                    </Script>
                </>
            )}

            {showBanner && (
                <div
                    role="region"
                    aria-label="Cookie notice"
                    className="fixed inset-x-2 bottom-2 z-50 mx-auto flex max-w-content flex-col gap-2 rounded-button border border-dark-border bg-footer p-3 text-subtle shadow-lg tablet:flex-row tablet:items-center tablet:justify-between"
                >
                    <p className="text-small">
                        We use essential cookies to run TaskCurrent. With your permission we also use analytics and marketing cookies to improve the product and measure our campaigns.
                    </p>
                    <div className="flex shrink-0 flex-wrap gap-1">
                        <button type="button" onClick={() => save({ analytics: false, marketing: false })} className={`${buttonBase} border border-dark-border text-surface hover:bg-dark-surface-2`}>
                            Reject all
                        </button>
                        <button type="button" onClick={() => { setDraft({ analytics: false, marketing: false }); setOpen(true); }} className={`${buttonBase} border border-dark-border text-surface hover:bg-dark-surface-2`}>
                            Customize
                        </button>
                        <button type="button" onClick={() => save({ analytics: true, marketing: true })} className={`${buttonBase} bg-brand text-white hover:bg-brand-hover`}>
                            Accept all
                        </button>
                    </div>
                </div>
            )}

            <dialog
                ref={dialogRef}
                aria-labelledby="cookie-settings-title"
                onClose={() => setOpen(false)}
                onClick={(e) => { if (e.target === dialogRef.current) setOpen(false); }}
                className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-button bg-footer p-3 text-subtle backdrop:bg-black/60"
            >
                <h2 id="cookie-settings-title" className="text-body-lg font-semibold text-surface">Cookie settings</h2>
                <p className="mt-1 text-small">Choose which cookies TaskCurrent may use. You can change this at any time.</p>

                <div className="mt-2 flex flex-col gap-2">
                    <ToggleRow title="Essential" description="Required for the site to work, such as security and remembering this choice." checked disabled />
                    <ToggleRow title="Analytics" description="Helps us understand how the site is used so we can improve it." checked={draft.analytics} onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))} />
                    <ToggleRow title="Marketing" description="Used to measure campaigns and show relevant TaskCurrent ads elsewhere." checked={draft.marketing} onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))} />
                </div>

                <div className="mt-3 flex flex-wrap justify-end gap-1">
                    <button type="button" onClick={() => save({ analytics: false, marketing: false })} className={`${buttonBase} border border-dark-border text-surface hover:bg-dark-surface-2`}>Reject all</button>
                    <button type="button" onClick={() => save({ analytics: true, marketing: true })} className={`${buttonBase} border border-dark-border text-surface hover:bg-dark-surface-2`}>Accept all</button>
                    <button type="button" onClick={() => save(draft)} className={`${buttonBase} bg-brand text-white hover:bg-brand-hover`}>Save preferences</button>
                </div>
            </dialog>
        </>
    );
}

function ToggleRow({ title, description, checked, disabled, onChange }: {
    title: string;
    description: string;
    checked: boolean;
    disabled?: boolean;
    onChange?: (value: boolean) => void;
}) {
    const id = `cookie-${title.toLowerCase()}`;
    return (
        <div className="flex items-start justify-between gap-2 rounded-button border border-dark-border bg-dark-surface p-2">
            <div>
                <label htmlFor={id} className="block font-semibold text-surface">{title}</label>
                <p id={`${id}-desc`} className="text-small">{description}</p>
            </div>
            <input
                id={id}
                type="checkbox"
                role="switch"
                checked={checked}
                disabled={disabled}
                aria-describedby={`${id}-desc`}
                onChange={(e) => onChange?.(e.target.checked)}
                className="mt-0.5 size-3 shrink-0 accent-brand"
            />
        </div>
    );
}

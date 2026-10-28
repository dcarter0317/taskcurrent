"use client";

import { trackEvent, type AnalyticsEvents } from "../../lib/analytics";

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    ctaName: string;
    ctaLocation: string;
    /** Extra non-PII parameters, e.g. plan_interest. */
    eventParams?: Omit<AnalyticsEvents["cta_click"], "cta_name" | "cta_location">;
}

/** An anchor that reports a GA4 `cta_click` before navigating. */
export default function TrackedLink({ ctaName, ctaLocation, eventParams, onClick, ...props }: TrackedLinkProps) {
    return (
        <a
            {...props}
            onClick={(e) => {
                trackEvent("cta_click", {
                    cta_name: ctaName,
                    cta_location: ctaLocation,
                    destination: props.href,
                    ...eventParams,
                });
                onClick?.(e);
            }}
        />
    );
}

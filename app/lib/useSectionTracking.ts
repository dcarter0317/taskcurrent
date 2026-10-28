"use client";

import { useEffect, useRef } from "react";
import { trackEvent, type SectionName } from "./analytics";

export type { SectionName };

interface SectionTrackingOptions {
    /** Fraction of the section that must be visible. */
    threshold?: number;
    /** How long the threshold must hold before firing, in ms. */
    dwellMs?: number;
}

/**
 * Fires a single `section_view` event (with `section_name`) once the section has been at least
 * `threshold` visible for `dwellMs` continuously. Scrolling away before the dwell elapses resets
 * the timer. Attach the returned ref to the section's root element. Only track meaningful
 * sections, not every div.
 */
export function useSectionTracking<T extends HTMLElement = HTMLDivElement>(
    section: SectionName,
    { threshold = 0.5, dwellMs = 1000 }: SectionTrackingOptions = {},
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === "undefined") return;

        let timer: ReturnType<typeof setTimeout> | undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    timer ??= setTimeout(() => {
                        observer.disconnect();
                        trackEvent("section_view", { section_name: section });
                    }, dwellMs);
                } else if (timer) {
                    clearTimeout(timer);
                    timer = undefined;
                }
            },
            { threshold },
        );
        observer.observe(el);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [section, threshold, dwellMs]);

    return ref;
}

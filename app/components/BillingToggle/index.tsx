"use client";

import { useLayoutEffect, useRef, useState } from "react";

export type BillingPeriod = "monthly" | "annual";

const options: { value: BillingPeriod; label: string }[] = [
    { value: "monthly", label: "Monthly" },
    { value: "annual", label: "Annual" },
];

export default function BillingToggle({
    defaultValue = "monthly",
    onChange,
}: {
    defaultValue?: BillingPeriod;
    onChange?: (value: BillingPeriod) => void;
}) {
    const [period, setPeriod] = useState<BillingPeriod>(defaultValue);

    const buttonRefs = useRef<Record<BillingPeriod, HTMLButtonElement | null>>({
        monthly: null,
        annual: null,
    });
    const [thumb, setThumb] = useState<{ left: number; width: number } | null>(null);

    // Size and place the thumb to match the active button.
    useLayoutEffect(() => {
        const measure = () => {
            const el = buttonRefs.current[period];
            if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth });
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [period]);

    const select = (value: BillingPeriod) => {
        setPeriod(value);
        onChange?.(value);
    };

    return (
        <div
            role="radiogroup"
            aria-label="Billing period"
            className="relative mx-auto flex w-fit items-center rounded-full border border-subtle bg-surface-alt p-1"
        >
            <span
                aria-hidden="true"
                style={thumb ? { left: thumb.left, width: thumb.width } : { opacity: 0 }}
                className="absolute inset-y-1 rounded-full bg-surface shadow-sm transition-[left,width] duration-300 ease-out motion-reduce:transition-none"
            />
            {options.map((option) => (
                <button
                    key={option.value}
                    ref={(el) => {
                        buttonRefs.current[option.value] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={period === option.value}
                    onClick={() => select(option.value)}
                    className={`relative z-10 flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium transition-colors duration-300 ${
                        period === option.value ? "text-ink" : "text-muted"
                    }`}
                >
                    {option.label}
                    {option.value === "annual" && (
                        <span className="rounded-full bg-success-bg px-1.5 py-0.5 text-[0.7rem] font-semibold text-success-text">
                            Save 20%
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}

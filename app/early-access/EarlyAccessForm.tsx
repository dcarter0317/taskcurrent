"use client";

import { useEffect, useRef, useState } from "react";
import Form from "../components/Form";
import { trackEvent } from "../lib/analytics";
import { submitLead } from "../lib/submitLead";
import { automationNeedOptions, companySizeOptions } from "../lib/leadOptions";

interface EarlyAccessFormProps {
    plan?: string;
    billing?: string;
}

export default function EarlyAccessForm({ plan, billing }: EarlyAccessFormProps) {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string>();
    const successRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (submitted) successRef.current?.focus();
    }, [submitted]);

    if (submitted) {
        return (
            <div role="status">
                <h1 ref={successRef} tabIndex={-1} className="text-h3 text-ink focus:outline-none">
                    You&apos;re on the list.
                </h1>
                <p className="mt-1 text-small text-muted">
                    Thanks for your interest in TaskCurrent. We&apos;ll let you know when early access becomes available.
                </p>
            </div>
        );
    }

    const planName = plan && plan[0].toUpperCase() + plan.slice(1);

    return (
        <>
            <h1 className="text-h3 text-ink">Get early access to TaskCurrent</h1>
            <p className="mt-1 text-small text-muted">
                Join the early-access list and we&apos;ll let you know when TaskCurrent is ready to try.
            </p>
            {planName && (
                <div className="mt-2 rounded-button bg-brand-soft p-2 text-small">
                    <p className="font-semibold text-ink">You&apos;re interested in the {planName} plan</p>
                    <p className="text-muted">We&apos;ll keep that preference with your early-access request.</p>
                </div>
            )}
            <div className="mt-3">
                <Form
                    fields={[
                        { name: "fullName", label: "Full name", placeholder: "Sarah Mitchell", autoComplete: "name", required: true },
                        { name: "email", label: "Work email", type: "email", placeholder: "you@company.com", autoComplete: "email", required: true },
                        { name: "company", label: "Company (optional)", placeholder: "BrightPath Plumbing", autoComplete: "organization" },
                        {
                            name: "size",
                            label: "Company size (optional)",
                            type: "select",
                            placeholder: "Select company size",
                            half: true,
                            options: companySizeOptions,
                        },
                        {
                            name: "automate",
                            label: "What would you automate first?",
                            type: "select",
                            placeholder: "Select an option",
                            required: true,
                            half: true,
                            options: automationNeedOptions,
                        },
                    ]}
                    formError={error}
                    actions={[{ label: "Join Early Access", type: "submit" }]}
                    actionsAlign="stretch"
                    onStart={() => trackEvent("form_start", { form_name: "early_access" })}
                    onSubmit={async (values) => {
                        setError(undefined);
                        const result = await submitLead("early_access", { ...values, plan, billing });
                        if (!result.ok) {
                            setError(result.error);
                            return;
                        }
                        trackEvent("generate_lead", {
                            lead_type: "early_access",
                            company_size: String(values.size),
                            automation_need: String(values.automate),
                            plan_interest: plan,
                            billing_interest: billing,
                        });
                        setSubmitted(true);
                    }}
                />
            </div>
            <p className="mt-3 text-small text-muted">
                No commitment. We&apos;ll only contact you about TaskCurrent availability.
            </p>
        </>
    );
}

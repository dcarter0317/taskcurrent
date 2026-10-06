"use client";

import { useEffect, useRef, useState } from "react";
import Form from "../components/Form";
import { trackEvent } from "../lib/analytics";
import { submitLead } from "../lib/submitLead";
import { automationNeedOptions, companySizeOptions } from "../lib/leadOptions";

export default function DemoForm() {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string>();
    const successRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (submitted) successRef.current?.focus();
    }, [submitted]);

    if (submitted) {
        return (
            <div role="status">
                <h2 ref={successRef} tabIndex={-1} className="text-[1.5rem] font-semibold leading-8 text-ink focus:outline-none">
                    Demo request received.
                </h2>
                <p className="mt-1 text-small text-muted">
                    Thanks for reaching out. We&apos;ll be in touch shortly to schedule your personalized TaskCurrent walkthrough.
                </p>
            </div>
        );
    }

    return (
        <>
        <h2 className="mb-3 text-[1.5rem] font-semibold leading-8 text-ink">Request your personalized demo</h2>
         <Form
            fields={[
                { name: "firstName", label: "First name", placeholder: "Sarah", autoComplete: "given-name", required: true, half: true },
                { name: "lastName", label: "Last name", placeholder: "Mitchell", autoComplete: "family-name", required: true, half: true },
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
                    label: "What would you most like to automate?",
                    type: "select",
                    placeholder: "Select an option",
                    required: true,
                    half: true,
                    options: automationNeedOptions,
                },
                { name: "tools", label: "Current tools", placeholder: "e.g. HubSpot, Gmail, Calendly" },
                {
                    name: "context",
                    label: "Additional context (optional)",
                    type: "textarea",
                    placeholder: "Anything else we should know about your workflow?",
                    maxLength: 500,
                },
            ]}
            formError={error}
            actions={[{ label: "Request My Demo", type: "submit" }]}
            actionsAlign="stretch"
            onStart={() => trackEvent("form_start", { form_name: "demo_request" })}
            onSubmit={async (values) => {
                setError(undefined);
                const result = await submitLead("demo", values);
                if (!result.ok) {
                    setError(result.error);
                    return;
                }
                trackEvent("generate_lead", {
                    lead_type: "demo",
                    company_size: String(values.size),
                    automation_need: String(values.automate),
                });
                setSubmitted(true);
            }}
        />
        <p className="mt-2 text-label font-normal normal-case tracking-normal text-subtle">
            No spam. We&apos;ll only use this to schedule your walkthrough.
        </p>
        </>
    );
}

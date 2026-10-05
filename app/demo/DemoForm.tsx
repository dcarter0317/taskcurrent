"use client";

import Form from "../components/Form";
import { trackEvent } from "../lib/analytics";
import { automationNeedOptions, companySizeOptions } from "../lib/leadOptions";

export default function DemoForm() {
    return (
         <Form
            fields={[
                { name: "firstName", label: "First name", placeholder: "Sarah", autoComplete: "given-name", required: true, half: true },
                { name: "lastName", label: "Last name", placeholder: "Mitchell", autoComplete: "family-name", required: true, half: true },
                { name: "email", label: "Work email", type: "email", placeholder: "you@company.com", autoComplete: "email", required: true },
                { name: "company", label: "Company", placeholder: "BrightPath Plumbing", autoComplete: "organization", required: true },
                {
                    name: "size",
                    label: "Company size",
                    type: "select",
                    placeholder: "Select company size",
                    required: true,
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
            actions={[{ label: "Request My Demo", type: "submit" }]}
            actionsAlign="stretch"
            onStart={() => trackEvent("form_start", { form_name: "demo_request" })}
            onSubmit={async (values) => {
                // TODO: replace with the real demo-request call
                console.log("demo", values);
                trackEvent("generate_lead", {
                    lead_type: "demo",
                    company_size: String(values.size),
                    automation_need: String(values.automate),
                });
            }}
        />
    );
}

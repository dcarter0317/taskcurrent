"use client";

import Form from "../components/Form";

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
                    options: [
                        { label: "1–5 employees", value: "1-5" },
                        { label: "6–20 employees", value: "6-20" },
                        { label: "21–50 employees", value: "21-50" },
                        { label: "51–200 employees", value: "51-200" },
                        { label: "200+ employees", value: "200+" },
                    ],
                },
                {
                    name: "automate",
                    label: "What would you most like to automate?",
                    type: "select",
                    placeholder: "Select an option",
                    required: true,
                    half: true,
                    options: [
                        { label: "Lead follow-up", value: "lead-follow-up" },
                        { label: "Scheduling & bookings", value: "scheduling" },
                        { label: "Administrative work", value: "admin" },
                        { label: "Reporting", value: "reporting" },
                        { label: "Something else", value: "other" },
                    ],
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
            onSubmit={async (values) => {
                // TODO: replace with the real demo-request call
                console.log("demo", values);
            }}
        />
    );
}

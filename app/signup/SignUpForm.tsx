"use client";

import Form from "../components/Form";

export default function SignUpForm() {
    return (
        <Form
            fields={[
                { name: "firstName", label: "First name", autoComplete: "given-name", required: true, half: true },
                { name: "lastName", label: "Last name", autoComplete: "family-name", required: true, half: true },
                { name: "email", label: "Work email", type: "email", placeholder: "you@company.com", autoComplete: "email", required: true },
                {
                    name: "password",
                    label: "Password",
                    type: "password",
                    autoComplete: "new-password",
                    helperText: "At least 8 characters.",
                    required: true,
                    validate: (v) => (String(v).length < 8 ? "Password must be at least 8 characters." : undefined),
                },
                { name: "tips", label: "Send me product tips and updates", type: "checkbox" },
            ]}
            actions={[{ label: "Start Free Trial", type: "submit" }]}
            actionsAlign="stretch"
            onSubmit={async (values) => {
                // TODO: replace with the real signup call
                console.log("signup", values);
            }}
        />
    );
}

"use client";

import Form from "../components/Form";

export default function LoginForm() {
    return (
        <Form
            fields={[
                { name: "email", label: "Work email", type: "email", placeholder: "you@company.com", autoComplete: "email", required: true },
                { name: "password", label: "Password", type: "password", autoComplete: "current-password", required: true },
                { name: "remember", label: "Keep me logged in", type: "checkbox" },
            ]}
            actions={[{ label: "Log in", type: "submit" }]}
            actionsAlign="stretch"
            onSubmit={async (values) => {
                // TODO: replace with the real auth call
                console.log("login", values);
            }}
        />
    );
}

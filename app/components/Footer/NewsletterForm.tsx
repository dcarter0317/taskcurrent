"use client";

import { useState } from "react";
import { trackEvent } from "../../lib/analytics";
import { submitLead } from "../../lib/submitLead";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    if (!email || status === "submitting") return;

    setStatus("submitting");
    const result = await submitLead("newsletter", { email });
    if (result.ok) {
      trackEvent("newsletter_signup");
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="text-surface font-semibold">
        Thanks for subscribing. Look out for TaskCurrent tips in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 tablet:flex-row tablet:items-end">
      <div className="flex flex-col gap-1">
        <label className="text-sm block" htmlFor="userEmail">Email address</label>
        <input
          id="userEmail"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="rounded-button bg-dark-surface-2 border border-dark-border px-2 py-1 text-white transition-colors hover:bg-brand-hover"
        />
        {status === "error" && (
          <p role="alert" className="text-small text-danger">Something went wrong. Please try again.</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-button bg-brand px-2 py-1 text-small font-semibold text-white transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-60"
      >
        {status === "submitting" ? "Subscribing…" : "Subscribe"}
      </button>
    </form>
  );
}

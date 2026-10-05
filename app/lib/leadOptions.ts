/** Shared by the demo and early-access forms. Values double as GA4 parameter values, so keep them stable. */
export const companySizeOptions = [
    { label: "1–5 employees", value: "1-5" },
    { label: "6–20 employees", value: "6-20" },
    { label: "21–50 employees", value: "21-50" },
    { label: "51–200 employees", value: "51-200" },
    { label: "200+ employees", value: "200+" },
];

export const automationNeedOptions = [
    { label: "Lead follow-up", value: "lead_followup" },
    { label: "Scheduling & bookings", value: "scheduling" },
    { label: "Administrative work", value: "admin" },
    { label: "Reporting", value: "reporting" },
    { label: "Something else", value: "other" },
];

export const planSlugs = ["starter", "growth", "pro"] as const;
export type PlanSlug = (typeof planSlugs)[number];
export const billingPeriods = ["monthly", "annual"] as const;

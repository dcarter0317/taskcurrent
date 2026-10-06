export type LeadKind = "demo" | "early_access" | "newsletter";

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Single place every lead form posts through, so each one gets the same success/error outcome.
 * Never throws: callers track analytics and show the success page only when `ok` is true.
 */
export async function submitLead(kind: LeadKind, payload: Record<string, unknown>): Promise<SubmitResult> {
    try {
        // TODO: replace with the real backend call, e.g.
        // const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, ...payload }) });
        // if (!res.ok) return { ok: false, error: "..." };
        console.log(kind, payload);
        return { ok: true };
    } catch {
        return { ok: false, error: "Something went wrong. Please try again." };
    }
}

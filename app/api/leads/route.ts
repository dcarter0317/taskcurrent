const WEBHOOK_URLS: Record<string, string | undefined> = {
    demo: process.env.N8N_WEBHOOK_DEMO,
    early_access: process.env.N8N_WEBHOOK_EARLY_ACCESS,
    newsletter: process.env.N8N_WEBHOOK_NEWSLETTER,
};

/** Forwards a lead to the n8n webhook for its form. URLs stay server-side. */
export async function POST(request: Request) {
    let body: { kind?: string };
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const url = body.kind ? WEBHOOK_URLS[body.kind] : undefined;
    if (!url) return Response.json({ error: "Unknown or unconfigured form" }, { status: 400 });

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!res.ok) return Response.json({ error: "Webhook failed" }, { status: 502 });
        return Response.json({ ok: true });
    } catch {
        return Response.json({ error: "Webhook unreachable" }, { status: 502 });
    }
}

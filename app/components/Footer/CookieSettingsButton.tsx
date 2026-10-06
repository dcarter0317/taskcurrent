"use client";

import { openCookieSettings } from "../../lib/consent";

export default function CookieSettingsButton() {
    return (
        <button type="button" onClick={openCookieSettings} className="hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            Cookie settings
        </button>
    );
}

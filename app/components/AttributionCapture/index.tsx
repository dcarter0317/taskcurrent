"use client";

import { useEffect } from "react";
import { captureAttribution } from "../../lib/attribution";

/** Renders nothing; records UTM parameters on the landing page load. */
export default function AttributionCapture() {
    useEffect(() => {
        captureAttribution();
    }, []);
    return null;
}

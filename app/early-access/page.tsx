import type { Metadata } from "next";
import LogoLink from "../components/LogoLink";
import NavBar from "../components/NavBar";
import { billingPeriods, planSlugs } from "../lib/leadOptions";
import EarlyAccessForm from "./EarlyAccessForm";

export const metadata: Metadata = {
    title: "Get early access | TaskCurrent",
};

function pick<T extends string>(value: string | string[] | undefined, allowed: readonly T[]): T | undefined {
    return allowed.find((a) => a === value);
}

export default async function EarlyAccess({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const plan = pick(params.plan, planSlugs);
    const billing = pick(params.billing, billingPeriods);

    return (
        <div>
            <div className="my-2">
                <NavBar />
            </div>
            <main className="flex flex-1 items-center justify-center px-[20px] py-6">
                <div className="flex w-full max-w-[520px] flex-col items-center">
                    <LogoLink />
                    <div className="w-full rounded-card border border-border bg-surface p-4 shadow-card">
                        <EarlyAccessForm plan={plan} billing={billing} />
                    </div>
                </div>
            </main>
        </div>
    );
}

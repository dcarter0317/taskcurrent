import LogoLink from "../components/LogoLink";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
    return (
        <main className="flex flex-1 items-center justify-center px-[20px] py-6">
            <div className="flex w-full max-w-[520px] flex-col items-center">
            <LogoLink />
            <div className="w-full rounded-card border border-border bg-surface p-4 shadow-card">
                <h1 className="text-h3 text-ink">Start your free trial</h1>
                <p className="mt-1 mb-3 text-small text-muted">
                    Connect your tools and automate your first workflow in minutes.
                </p>
                <SignUpForm />
                <p className="mt-3 text-small text-muted">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-brand-hover hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
            </div>
        </main>
    );
}

import LogoLink from "../components/LogoLink";
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <main className="flex flex-1 items-center justify-center px-[20px] py-6">
            <div className="flex w-full max-w-[420px] flex-col items-center">
            <LogoLink />
            <div className="w-full rounded-card border border-border bg-surface p-4 shadow-card">
                <h1 className="text-h3 text-ink">Log in</h1>
                <p className="mt-1 mb-3 text-small text-muted">
                    Welcome back. Enter your details to continue.
                </p>
                <LoginForm />
                <p className="mt-3 text-small text-muted">
                    New to TaskCurrent?{" "}
                    <Link href="/early-access" className="font-semibold text-brand-hover hover:underline">
                        Get early access
                    </Link>
                </p>
            </div>
            <Link href="/" className="mt-3 text-small font-semibold text-muted hover:text-ink hover:underline">
                ← Back to TaskCurrent
            </Link>
            </div>
        </main>
    );
}

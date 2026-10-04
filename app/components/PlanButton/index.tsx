import Link from "next/link";

const variants = {
    primary: "bg-brand text-white hover:bg-brand-hover",
    secondary: "bg-brand-soft text-ink border border-subtle shadow-card hover:bg-surface-alt",
};

interface PlanButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: keyof typeof variants;
}

export default function PlanButton({
    href,
    children,
    variant = "primary",
}: PlanButtonProps) {
    return (
        <Link
            href={href}
            className={`block w-full text-center rounded-button px-2 py-1 text-small font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${variants[variant]}`}
        >
            {children}
        </Link>
    );
}

import Image from "next/image";

const variants = {
    primary:
        "bg-brand text-white shadow-[0_1px_1px_rgb(16_24_40/0.08)] enabled:hover:bg-brand-hover",
    secondary:
        "bg-surface text-ink border border-border-strong enabled:hover:bg-surface-alt",
    ghost: "text-brand-hover enabled:hover:bg-brand-soft",
};

const disabledVariants = {
    primary: "bg-border text-subtle shadow-none",
    secondary: "bg-surface-alt border-border text-subtle",
    ghost: "text-subtle",
};

const sizes = {
    medium: "h-[40px] px-2 text-small",
    large: "h-[48px] px-3 text-body",
};

const spinners = {
    primary: "/imgs/form_spinner_white.svg",
    secondary: "/imgs/form_spinner_dark.svg",
    ghost: "/imgs/form_spinner_brand.svg",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    loading?: boolean;
}

export default function Button({
    variant = "primary",
    size = "large",
    loading = false,
    disabled,
    type = "button",
    className = "",
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            className={`inline-flex items-center justify-center gap-1 rounded-button font-semibold leading-5 transition-colors duration-(--duration-hover) focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgb(82_103_255/0.28)] disabled:cursor-not-allowed ${loading ? "opacity-90" : ""} ${sizes[size]} ${variants[variant]} ${disabled ? disabledVariants[variant] : ""} ${className}`}
            {...props}
        >
            {loading && (
                <Image
                    src={spinners[variant]}
                    alt=""
                    width={16}
                    height={16}
                    className="animate-spin motion-reduce:animate-none"
                />
            )}
            {children}
        </button>
    );
}

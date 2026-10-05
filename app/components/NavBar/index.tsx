import Image from "next/image";
import Link from "next/link";

interface NavigationLink {
  label: string;
  href: string;
  hasMenu?: boolean;
}

const navigationLinks: NavigationLink[] = [
  { label: "Product", href: "#product", hasMenu: false },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" }
];

export default function NavBar() {
  return (
    <nav id="top" aria-label="Main navigation">
      <div className="w-full px-2.5 tablet:px-4 laptop:px-10 desktop:px-15">
        <div className="relative mx-auto w-full max-w-content">
          <div className="flex items-center justify-between py-1">
            <Link href="/" aria-label="TaskCurrent home">
              <Image
                src="/imgs/Logo.svg"
                alt="TaskCurrent"
                width={144}
                height={28}
                priority
              />
            </Link>

            <div className="hidden items-center gap-3 tablet:flex laptop:gap-4">
              {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-0.5 text-small font-medium text-ink transition-colors hover:text-brand"
              >
                {link.label}
                {link.hasMenu && (
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 4.5 6 7.5 9 4.5" />
                  </svg>
                )}
              </a>
              ))}
            </div>
            <div className="hidden items-center gap-2 tablet:flex">
              <a
                href="#login"
                className="hidden laptop:block px-2 py-1 text-small text-dark transition-colors hover:underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Log in
              </a>
              <a
                href="#book-demo"
                className="hidden laptop:block rounded-button bg-brand-soft border border-subtle px-2 py-1 text-small font-semibold text-ink shadow-card hover:bg-brand-hover"
              >
                Book a Demo
              </a>
              <a
                href="#start-free-trial"
                className="rounded-button bg-brand px-2 py-1 text-small font-semibold text-white transition-colors hover:bg-brand-hover"
              >
                Start Free Trial
              </a>
            </div>

            <details className="group tablet:hidden">
              <summary
                aria-label="Toggle navigation menu"
                className="grid size-6 list-none cursor-pointer place-content-center gap-0.5 rounded-button text-ink transition-colors active:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span
                  aria-hidden="true"
                  className="h-0.25 w-4 rounded-full bg-current transition-transform duration-180 group-open:translate-y-0.75 group-open:rotate-45"
                />
                <span
                  aria-hidden="true"
                  className="h-0.25 w-4 rounded-full bg-current transition-opacity duration-180 group-open:opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="h-0.25 w-4 rounded-full bg-current transition-transform duration-180 group-open:-translate-y-0.75 group-open:-rotate-45"
                />
              </summary>

              <div className="absolute inset-x-0 top-full z-20 mt-2 grid w-full gap-1 rounded-card border border-border bg-surface p-2 shadow-card">
                {navigationLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-button px-3 py-2 text-body font-medium text-ink transition-colors active:bg-surface-alt"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
}
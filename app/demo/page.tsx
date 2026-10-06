import NavBar from "../components/NavBar";
import DemoForm from "./DemoForm";

const bullets = [
    "Automate lead follow-up",
    "Reduce administrative work",
    "Connect your current tools",
    "Track measurable results",
];

const steps = [
    { tag: "Trigger", title: "New website lead", color: "text-violet", icon: "bolt" },
    { tag: "Action", title: "Automated follow-up sent", color: "text-cyan", icon: "mail" },
    { tag: "Complete", title: "Appointment booked", color: "text-mint", icon: "check" },
] as const;

const assurances = [
    { label: "30-minute personalized walkthrough", icon: "clock" },
    { label: "No sales pressure", icon: "shield" },
    { label: "Built around your workflow", icon: "branch" },
] as const;

const iconPaths: Record<string, React.ReactNode> = {
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </>
    ),
    check: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="m8 12 3 3 5-6" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </>
    ),
    shield: <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />,
    branch: (
        <>
            <circle cx="6" cy="5" r="2" />
            <circle cx="6" cy="19" r="2" />
            <circle cx="18" cy="9" r="2" />
            <path d="M6 7v10M18 11c0 4-12 2-12 6" />
        </>
    ),
};

function Icon({ name, className = "size-[16px]" }: { name: string; className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
        >
            {iconPaths[name]}
        </svg>
    );
}

export default function Demo() {
    return (
        <div>
            <div className="my-2">
                <NavBar />
           </div>
            <main className="flex flex-1 items-center justify-center p-2">
            <div className="grid w-full grid-cols-1 gap-4 tablet:w-auto tablet:grid-cols-[400px_680px] tablet:items-start tablet:gap-6 laptop:gap-10">
                <aside className="flex flex-col rounded-section-panel bg-dark-canvas p-4 text-white">
                    <p className="text-label uppercase text-cyan">Request a demo</p>
                    <h1 className="mt-2 text-h3 font-bold tracking-tight tablet:text-[2.25rem] tablet:leading-[2.5rem]">
                        See what TaskCurrent could automate for your business.
                    </h1>
                    <p className="mt-2 text-small text-subtle">
                        Tell us where your team spends time on repetitive work. We&apos;ll show you how
                        TaskCurrent can simplify it.
                    </p>
    
                    <ul className="mt-3 flex flex-col gap-1">
                        {bullets.map((b) => (
                            <li key={b} className="flex items-center gap-1 text-small text-subtle">
                                <Icon name="check" className="size-[14px] text-mint" />
                                {b}
                            </li>
                        ))}
                    </ul>
    
                    <div className="mt-4 rounded-card bg-dark-surface-2 p-3" aria-hidden="true">
                        <div className="flex flex-col items-stretch">
                            {steps.map((s, i) => (
                                <div key={s.tag} className="flex flex-col items-stretch">
                                    {i > 0 && <span className="mx-auto h-2 w-px bg-brand" />}
                                    <div className="flex items-center gap-[10px] rounded-button border border-dark-border bg-dark-surface px-[12px] py-[10px]">
                                        <span className={`flex size-[32px] shrink-0 items-center justify-center rounded-[8px] bg-white/5 ${s.color}`}>
                                            <Icon name={s.icon} />
                                        </span>
                                        <span className="flex-1">
                                            <span className={`block text-[10px] font-bold uppercase leading-4 tracking-wider ${s.color}`}>
                                                {s.tag}
                                            </span>
                                            <span className="block text-small font-semibold leading-5">{s.title}</span>
                                        </span>
                                        {s.tag !== "Complete" && <Icon name="check" className="size-2 text-mint" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
    
                    <div className="mt-auto grid grid-cols-1 gap-2 border-t border-dark-border pt-3 tablet:grid-cols-3 tablet:mt-4">
                        {assurances.map((a) => (
                            <p key={a.label} className="flex items-center gap-1 text-label font-normal normal-case tracking-normal text-subtle tablet:flex-col tablet:items-start">
                                <Icon name={a.icon} className="size-[16px] text-cyan" />
                                {a.label}
                            </p>
                        ))}
                    </div>
                </aside>
    
                <section className="w-full px-1 py-2 tablet:pt-4">
                    <DemoForm />
                </section>
            </div>
            </main>
        </div>
       
    );
}

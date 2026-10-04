interface ProblemCard {
    title: string;
    subtitle: string;
    description: string;
}

const problemCards: ProblemCard[] = [
    { title: "01", subtitle: "Lead follow-up", description: "TaskCurrent automates the repetitive work that your team shouldn’t be doing." },
    { title: "02", subtitle: "Scheduling", description: "Back-and-forth emails to book, confirm, and reschedule every appointment." },
    { title: "03", subtitle: "Customer onboarding", description: "Welcome emails, forms, and reminders sent by hand for every new customer." },
    { title: "04", subtitle: "Team handoffs", description: "Details get lost as work moves between sales, operations, and service." },
];

export default function ProblemSection() {
    return(
      <div className="w-full max-w-content mx-auto flex flex-col py-2">
        <div className="w-full max-w-content mx-auto flex flex-col py-2 tablet:pb-0 tablet:pt-0">
           <div className="px-2 tablet:px-0 tablet:mb-6 tablet:max-w-80">
              <p className="uppercase font-semibold text-violet">The Problem</p>
              <h2 className="text-[2.6rem] leading-6 tracking-tight font-bold py-2">Your team wasn’t hired to chase repetitive tasks.</h2>
              <p className="text-muted">TaskCurrent handles the routine work so your team can focus on customers.</p>
           </div>
        </div>
        <div className="w-full max-w-content mx-auto flex flex-col gap-4 py-2 px-2 tablet:px-0 tablet:pb-0 tablet:pt-0 tablet:grid tablet:grid-cols-2 tablet:gap-4">
           {problemCards.map((card) => (
              <div className="border border-subtle rounded-lg bg-surface py-2 px-4" key={card.title}>
                 <span className="text-8xl font-bold text-brand opacity-12 tracking-tighter">{card.title}</span>
                 <h3 className="font-semibold text-[1.3rem]">{card.subtitle}</h3>
                 <p className="text-muted py-2 text-[1rem]">{card.description}</p>
              </div>
           ))}
        </div>
      </div>

    )
}
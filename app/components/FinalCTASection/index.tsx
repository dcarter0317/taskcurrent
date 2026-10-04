import Image from "next/image";

export default function FinalCTASection() {
    return (
     <div className="relative tablet:flex tablet:h-90 tablet:items-center">
       {/* Full-bleed background: dark panel on the left, photo fading in from the right */}
       <div className="block absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 -z-10 overflow-hidden bg-dark-canvas">
         <div className="absolute inset-0" />
       </div>

       <div className="w-full max-w-content mx-auto py-8 px-2 tablet:px-4 laptop:px-0">
        <div className="text-muted tablet:text-subtle">
           <p className="uppercase font-bold text-center text-cyan text-sm">Get Started</p>
           <h1 className="text-5xl tablet:text-6xl text-center text-surface font-bold px-3 tablet:px-0 py-2 mt-2">Put your busywork on autopilot.</h1>
           <p className="py-2 tablet:px-40 text-center">Build your first workflow in minutes and spend more time on the work that grows your business.</p>
           <div className="flex flex-col justify-center items-center py-2 gap-2 tablet:flex-row">
              <a
                href="#start-free-trial"
                className="w-full tablet:w-auto text-center rounded-button bg-brand px-2 py-1 text-small font-semibold text-white transition-colors hover:bg-brand-hover tablet:bg-surface tablet:text-ink tablet:hover:bg-surface-alt"
              >
                Start Free Trial
              </a>
                <a
                href="#book-demo"
                className="w-full tablet:w-auto text-center rounded-button bg-brand-soft px-2 py-1 text-small font-semibold text-ink shadow-card border border-subtle hover:bg-brand-hover tablet:bg-dark-surface tablet:text-surface tablet:border-dark-border tablet:hover:bg-dark-surface-2"
              >
                Book a Demo<span aria-hidden="true" className="hidden tablet:inline-block tablet:pl-0.5">→</span>
              </a>
            </div>
        </div>
        <ul className="flex justify-center gap-4 pb-2 tablet:pb-0 tablet:mt-1 text-subtle tablet:text-small">
           <li className="flex items-center gap-1">
              <Image src="/imgs/check.svg" alt="" width={16} height={16} />
              No credit card required
           </li>
           <li className="flex items-center gap-1">
              <Image src="/imgs/check.svg" alt="" width={16} height={16} />
              Setup in minutes
           </li>
           <li className="hidden tablet:flex items-center gap-1">
              <Image src="/imgs/check.svg" alt="" width={16} height={16} />
              Cancel anytime
           </li>
        </ul>
      </div>
     </div>
    )
}

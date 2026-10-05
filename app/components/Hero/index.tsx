import Image from "next/image";

export default function Hero() {
    return (
     <div className="relative tablet:flex tablet:h-90 tablet:items-center">
       {/* Full-bleed background: dark panel on the left, photo fading in from the right */}
       <div className="hidden tablet:block absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 -z-10 overflow-hidden bg-dark-canvas">
         <div className="absolute inset-y-0 right-0 w-[56%]">
           <Image
            src="/imgs/hero_desktop.webp"
            alt="Hero background"
            fill
            priority // Loads the image immediately since it's above the fold
            sizes="56vw"
            className="object-cover object-right"
          />
         </div>
         <div className="absolute inset-0 bg-linear-to-r from-dark-canvas from-44% via-dark-canvas/70 via-52% to-transparent to-64%" />
       </div>
       <div className="w-full max-w-content mx-auto px-2 tablet:px-4 laptop:px-0">
        <div className="text-muted tablet:max-w-80 tablet:text-subtle">
           <p className="uppercase font-bold text-center text-muted text-sm tablet:flex tablet:items-center tablet:gap-1 tablet:text-left tablet:text-subtle tablet:before:h-px tablet:before:w-3 tablet:before:bg-cyan tablet:before:content-['']">New AI Workflow Builder</p>
           <h1 className="text-5xl tablet:text-6xl text-center tablet:text-surface tablet:text-left font-bold px-3 tablet:px-0 py-2 text-ink mt-2">Automate the <span className="underline decoration-violet tablet:decoration-cyan tablet:decoration-2 tablet:underline-offset-8">busywork.</span><br />Grow your business.</h1>
           <p className="py-2 tablet:max-w-51.5">Connect your leads, appointments, customers, and everyday tools so repetitive work happens automatically.</p>
           <div className="flex flex-col items-center py-2 gap-2 tablet:flex-row">
              <a
                href="#start-free-trial"
                className="w-full tablet:w-auto text-center rounded-button bg-brand px-2 py-1 text-small font-semibold text-white transition-colors hover:bg-brand-hover tablet:bg-surface tablet:text-ink tablet:hover:bg-surface-alt"
              >
                Start Free Trial
              </a>
                <a
                href="/demo"
                className="w-full tablet:w-auto text-center rounded-button bg-brand-soft px-2 py-1 text-small font-semibold text-ink shadow-card border border-subtle hover:bg-brand-hover tablet:bg-dark-surface tablet:text-surface tablet:border-dark-border tablet:hover:bg-dark-surface-2"
              >
                Book a Demo<span aria-hidden="true" className="hidden tablet:inline-block tablet:pl-0.5">→</span>
              </a>
            </div>
        </div>
        <ul className="flex justify-center tablet:justify-start gap-4 mb-2 tablet:mt-1 tablet:text-subtle tablet:text-small">
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
        <div className="tablet:hidden">
             <Image
                className="w-full max-w-content mx-auto"
                src="/imgs/hero_mobile.webp"
                alt="TaskCurrent"
                width={350}
                height={320}
                priority
              />
        </div>
      </div>
     </div>
    )
}

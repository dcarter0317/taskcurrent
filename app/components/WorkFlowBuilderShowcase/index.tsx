import Image from "next/image";
import Link from "next/link";

export default function WorkFlowBuilderShowcase(){
    return(
            <div className="relative isolate w-full mx-auto py-6 tablet:py-15">
              <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-dark-canvas " />
              <div className="w-full max-w-content mx-auto flex flex-col py-2 pb-0 pt-0 text-center">
                <div className="px-2 tablet:px-0 tablet:mb-6 tablet:max-w-4xl tablet:mx-auto">
                  <p className="uppercase text-sm font-semibold text-cyan">Visual Workflow Builder</p>
                  <h2 className="text-5xl font-bold text-surface py-2">Powerful automation without complicated setup.</h2>
                  <p className="text-muted">Build workflows with triggers, conditions, delays, and actions—all in one visual canvas.</p>
                </div>
                <div className="px-2 tablet:mb-6 tablet:hidden">
                    <Image
                    src="/imgs/lead_routing_infographic.svg"
                    alt="WorkFlow Builder Showcase"
                    width={650}
                    height={336}
                    priority />
                </div>
                <div className="px-2 hidden tablet:block tablet:mb-6">
                    <Image
                    src="/imgs/lead_routing_infographic_lg.svg"
                    alt="WorkFlow Builder Showcase"
                    width={1120}
                    height={610}
                    priority />
                </div>
              </div>
              <div className="w-full max-w-content mx-auto my-10 px-2 gap-4 tablet:flex">
                <div>
                   <div>
                     <Image
                      src="/imgs/logic_icon.svg"
                      alt="WorkFlow Builder Showcase"
                      width={40}
                      height={40}
                      priority />
                   </div>
                   <h4 className="text-surface text-[1.5rem] font-semibold my-2">Logic without code</h4>
                   <p className="text-subtle tablet:text-[0.95rem]">Branch on any field, add delays, and set conditions in plain language.</p>
                </div>  
                <div>
                   <div>
                     <Image
                      src="/imgs/connect_icon.svg"
                      alt="WorkFlow Builder Showcase"
                      width={40}
                      height={40}
                      priority />
                   </div>
                   <h4 className="text-surface text-[1.5rem] font-semibold my-2">Connect your stack</h4>
                   <p className="text-subtle tablet:text-[0.95rem]">Trigger and act across your CRM, inbox, calendar, and payments.</p>
                </div>  
                <div>
                   <div>
                     <Image
                      src="/imgs/check_icon.svg"
                      alt="WorkFlow Builder Showcase"
                      width={40}
                      height={40}
                      priority />
                   </div>
                   <h4 className="text-surface text-[1.5rem] font-semibold my-2">See every execution</h4>
                   <p className="text-subtle tablet:text-[0.95rem]">Inspect each run step by step, with timing and status for every action.</p>
                </div>  
              </div>
              <div className="w-full max-w-content mx-auto flex flex-col py-2 text-center tablet:pb-0 tablet:pt-0">
                <Link href="#book-demo" className="text-cyan font-semibold flex items-center justify-center gap-0.5">
                 Explore Workflow Builder
                 <Image
                    src="/imgs/arrow_right_cyan.svg"
                    alt="WorkFlow Builder Showcase"
                    width={16}
                    height={16}
                    priority />
                 </Link>
              </div>
            </div>
    )
}
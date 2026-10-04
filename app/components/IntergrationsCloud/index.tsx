import Image from "next/image";
import Link from "next/link";

const integrationBlocks = [
    {"icon": "G", title: "Gmail"},
    {"icon": "C", title: "Calendar"},
    {"icon": "H", title: "HubSpot"},
    {"icon": "S", title: "SalesForce"},
    {"icon": "S", title: "Slack"},
    {"icon": "M", title: "MailChimp"},
    {"icon": "S", title: "Stripe"},
    {"icon": "Z", title: "Zapier"}
]

export default function IntergrationsCloud(){
    return(
            <div className="relative isolate w-full mx-auto py-6 tablet:py-15" id="integrations">
              <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-surface " />
              <div className="w-full max-w-content mx-auto flex flex-col py-2 pb-0 pt-0 tablet:text-center">
                <div className="px-2 tablet:px-0 tablet:mb-6 tablet:max-w-4xl tablet:mx-auto">
                  <p className="uppercase text-sm font-semibold text-violet">Integrations</p>
                  <h2 className="text-4xl font-bold py-2">Works with the tools you already use.</h2>
                  <p className="text-muted mb-5">Connect your CRM, inbox, calendar, payments, and communication tools to build workflows that span your entire business.</p>
                </div>
                <div className="px-2 grid grid-cols-2 gap-2 justify-center tablet:mb-6 tablet:hidden">
                 {integrationBlocks.map((block) => (
                    <div key={block.title} className="flex items-center gap-2 border border-subtle rounded-2xl py-2 pl-2 pr-5">
                      <p className="text-[1.2rem] bg-surface-alt border py-1.25 px-2 rounded-[11px] border-subtle">{block.icon}</p>
                      <p>{block.title}</p>
                    </div>
                 ))}   
                </div>
                <div className="px-2 hidden tablet:block tablet:mb-6">
                    <Image
                    src="/imgs/integration_network_lg.svg"
                    alt="WorkFlow Builder Showcase"
                    width={1200}
                    height={520}
                    priority />
                </div>
              </div>
              <div className="w-full max-w-content mx-auto my-10 px-2 gap-4">
                 <p className="text-muted tablet:text-center">Integrations shown are illustrative concepts and do not imply partnership or endorsement.</p>
              </div>
              <div className="w-full max-w-content mx-auto flex flex-col py-2 px-2 tablet:justify-center tablet:pb-0 tablet:pt-0">
                <Link href="#book-demo" className="text-violet font-semibold flex tablet:items-center tablet:justify-center gap-0.5">
                 View all integrations
                 <Image
                    src="/imgs/arrow_right.svg"
                    alt="WorkFlow Builder Showcase"
                    width={16}
                    height={16}
                    priority />
                 </Link>
              </div>
            </div>
    )
}
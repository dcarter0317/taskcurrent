import Image from "next/image";
import Link from "next/link";

export default function ProductStoryCapture(){
    return(
        <div className="w-full max-w-content mx-auto tablet:py-6">
          <div className="w-full max-w-content mx-auto flex flex-col py-2 tablet:flex-row tablet:pb-0 tablet:pt-0">
            <div className="px-2 tablet:mb-6">
              <p className="uppercase text-sm font-semibold text-violet">01 · Capture</p>
              <h2 className="text-[2.6rem] leading-6 tracking-tight font-bold py-2">Every lead starts the right workflow.</h2>
              <p className="text-muted">Capture inquiries from your website, forms, campaigns, and CRM. TaskCurrent turns each lead into structured data and routes it into the right workflow automatically.</p>
              <ul className="my-2">
                <li className="flex gap-0.5">
                    <Image src="/imgs/check.svg" alt="" width={16} height={16} />
                    Capture source and campaign details
                </li>
                <li className="flex gap-0.5 my-2">
                    <Image src="/imgs/check.svg" alt="" width={16} height={16} />
                    Qualify leads with custom rules
                </li>
                <li className="flex gap-0.5">
                    <Image src="/imgs/check.svg" alt="" width={16} height={16} />
                    Route leads by service, value, or location
               </li>
              </ul>
              <Link href="#book-demo" className="text-violet font-semibold flex items-center gap-0.5">
             See Lead Automation
             <Image
                src="/imgs/arrow_right.svg"
                alt="Product Story Automate"
                width={16}
                height={16}
                className="h-auto w-auto" priority />
             </Link>
            </div>
            <div className="px-2 tablet:mb-6 tablet:hidden">
                <Image
                src="/imgs/lead_details.svg"
                alt="Product Story Capture"
                width={650}
                height={336}
                priority />
            </div>
            <div className="px-2 hidden tablet:block tablet:mb-6 tablet:basis-250">
                <Image
                src="/imgs/lead_details_lg.svg"
                alt="Product Story Capture"
                width={1024}
                height={786}
                priority />
            </div>
          </div>
        </div>
    )
}
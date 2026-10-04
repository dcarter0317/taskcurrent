import Image from "next/image";
import Link from "next/link";
import Accordion from '../Accordion'

export default function FAQSection(){
    return(
        <div className="w-full max-w-content mx-auto tablet:py-15">
          <div className="w-full max-w-content mx-auto flex flex-col gap-3 py-2 tablet:flex-row tablet:pb-0 tablet:pt-0">
            <div className="px-2 tablet:mb-6">
              <p className="uppercase text-sm font-semibold text-violet">FAQ</p>
              <h2 className="text-[2.6rem] leading-6 tracking-tight font-bold py-2">Questions before you automate?</h2>
              <p className="text-muted pr-4">Everything you need to know about getting started. Still curious? Book a demo and we’ll walk you through it.</p>
            </div>
            <div className="w-full px-2 tablet:px-0 tablet:max-w-[66%]">
                <Accordion />
            </div>
          </div>
        </div>
    )
}
"use client";

import { useState } from "react";
import Image from "next/image"
import Link from "next/link"

const accordionItems = [
    {"question":"What is TaskCurrent?", "answer":"TaskCurrent is a workflow automation platform for small and growing businesses. It helps connect the tools you already use and handles repetitive work like lead follow-up, appointment reminders, customer onboarding, and internal handoffs."},
    {"question":"Do I need technical experience?", "answer":"No. TaskCurrent is designed to be set up visually, so you can build workflows without writing code. You choose what starts a workflow, add any conditions, and decide what should happen next. More advanced teams can still use integrations and custom logic when they need it."},
    {"question":"Which apps can TaskCurrent connect to?", "answer":"TaskCurrent is designed to work with the tools businesses commonly use for email, CRM, calendars, payments, and team communication. That includes platforms such as Gmail, Google Calendar, HubSpot, Salesforce, Slack, Mailchimp, Stripe, and Zapier. The exact integration list would continue to grow over time."},
    {"question":"Can TaskCurrent automate customer emails?", "answer":"Yes. You can use TaskCurrent to send emails as part of a workflow, such as a lead confirmation, appointment reminder, onboarding message, follow-up, or re-engagement email. Messages can also use customer and workflow data so they feel relevant to the person receiving them."},
    {"question":"Is there a free trial?", "answer":"Yes. TaskCurrent includes a free trial so you can build a few workflows, connect your tools, and see how it fits your process before choosing a paid plan. No credit card is required to get started."},
    {"question":"Can I change plans later?", "answer":"Yes. You can move to a different plan as your needs change. If you start with a smaller plan and later need more workflow runs, integrations, or reporting features, you can upgrade without rebuilding your setup."},
    {"question":"How is customer data protected?", "answer":"TaskCurrent is designed to use secure connections and standard safeguards for data stored or passed between connected services. Access to customer information should be limited to the people and systems that need it, and connected accounts should use secure authentication rather than shared passwords."},
    {"question":"Can I cancel anytime?", "answer":"Yes. There’s no long-term commitment. You can cancel your subscription whenever you need to, and your plan would remain active through the end of the current billing period."},
]

export default function Accordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
       <div>
         {accordionItems.map((item, index) => {
           const isOpen = openIndex === index;
           return (
             <div key={item.question} className="border-b border-subtle py-3">
               <button
                 type="button"
                 aria-expanded={isOpen}
                 aria-controls={`accordion-panel-${index}`}
                 id={`accordion-button-${index}`}
                 onClick={() => setOpenIndex(isOpen ? null : index)}
                 className="flex w-full items-center justify-between text-left transition-transform duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none"
               >
                 <span className={`text-lg transition-colors duration-200 motion-reduce:transition-none ${isOpen ? "font-bold text-cyan" : "font-normal"}`}>{item.question}</span>
                 <span aria-hidden="true" className="icon relative size-5 shrink-0">
                   <Image
                     src="/imgs/plus_icon.svg"
                     alt=""
                     width={20}
                     height={20}
                     className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
                   />
                   <Image
                     src="/imgs/minus_icon.svg"
                     alt=""
                     width={20}
                     height={20}
                     className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
                   />
                 </span>
               </button>
               <div
                 id={`accordion-panel-${index}`}
                 role="region"
                 aria-labelledby={`accordion-button-${index}`}
                 className={`content grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
               >
                 <div className="overflow-hidden">
                   <div
                     className={`text-subtle transition-[opacity,transform] ease-out motion-reduce:transition-none ${isOpen ? "translate-y-0 opacity-100 duration-300 delay-75" : "-translate-y-1 opacity-0 duration-150"}`}
                   >
                     {item.answer}
                   </div>
                 </div>
               </div>
             </div>
           );
         })}
       </div>
    )
}

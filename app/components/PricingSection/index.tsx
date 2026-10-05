"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BillingToggle, { type BillingPeriod } from "../BillingToggle";

interface PriceCardHeader {
    title: string;
    description: string;
    price: number;
    pillElem: string;
    priceCycle: string;
    btnText: string;
}

interface PriceFeatureList {
    items: string[];
}

const priceCardHeaders: PriceCardHeader[] = [
    {"title": "Starter", "description": "For owners automating their first workflows.", "price": 29, "pillElem": "", "priceCycle": "month", "btnText": "Start Free Trial"},
    {"title": "Growth", "description": "For growing teams automating across the business.", "price": 79, "pillElem": "Most Popular", "priceCycle": "month", "btnText": "Start Free Trial"},
    {"title": "Pro", "description": "For operations teams running automation at scale.", "price": 149, "pillElem": "", "priceCycle": "month", "btnText": "Start Free Trial"}   
]

const priceFeatures: PriceFeatureList[] = [
  {"items": ["1,000 automation runs", "3 active workflows", "Email automation", "Basic analytics", "Community support"]},
  {"items": ["10,000 automation runs", "Unlimited workflows", "CRM integrations", "Advanced analytics", "AI message assistant", "Priority support"]},
  {"items": ["50,000 automation runs", "Advanced integrations", "Team permissions", "Custom reporting", "Priority automation", "Premium support"]}
]

export default function PricingSection(){
    const [period, setPeriod] = useState<BillingPeriod>("monthly");
    const annualDiscount = 0.2;
    return(
            <div className="relative isolate w-full mx-auto py-6 tablet:py-15" id="pricing">
              <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-surface " />
              <div className="w-full max-w-content mx-auto flex flex-col py-2 pb-0 pt-0">
                <div className="flex flex-col place-items-center px-2 tablet:px-0 tablet:mb-6 tablet:max-w-4xl tablet:mx-auto">
                  <p className="uppercase text-sm font-semibold text-violet">Pricing</p>
                  <h2 className="text-4xl font-bold py-2">Simple plans that grow with your business.</h2>
                  <p className="text-muted">Start small and add more automation as your team grows.</p>
                </div>
                <div className="px-2 mb-6">
                  <BillingToggle onChange={setPeriod} />
                </div>
                <div className="px-2 grid gap-2 tablet:grid-cols-3 tablet:mb-6">
                 {priceCardHeaders.map((header, index) => (
                    <div key={header.title} className="flex flex-col gap-2 border border-surface-alt rounded-2xl py-2 pl-2 pr-5">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg">{header.title}</p>
                        {header.pillElem !== "" && (
                  
                        <p className="flex gap-1 text-xs font-semibold uppercase rounded-2xl px-1 py-0.5 text-brand-hover bg-brand-soft">  
                         <Image src="/imgs/brand_dot.svg" alt="arrow right" width={6} height={6} className="h-auto w-auto" priority />
                           {header.pillElem}
                        </p> 
                        )}
                      </div>  
                        <p>{header.description}</p>
                        <p><span className="font-bold text-5xl">${period === "annual" ? Math.round(header.price * (1 - annualDiscount)) : header.price}</span><span className="text-sm text-muted">&nbsp;/month{period === "annual" ? ", billed annually" : ""}</span></p>
                        <a href="/signup" className="w-full tablet:w-auto text-center rounded-button bg-brand px-2 py-1 text-small font-semibold text-white transition-colors hover:bg-brand-hover border border-border-strong tablet:bg-surface tablet:text-ink tablet:hover:bg-surface-alt"
                        >
                          {header.btnText}
                        </a>
                        <hr className="border-t border-border" />
                        <p className="uppercase text-xs font-semibold text-subtle">What&apos;s included</p>
                        <ul>
                          {(priceFeatures[index]?.items ?? []).map((item) => (
                            <li className="flex gap-1 text-sm" key={item}><Image src="/imgs/check.svg" alt="check icon" width={16} height={16} className="h-auto w-auto" />{item}</li>
                          ))}
                        </ul>
                    </div>
                 ))}   
                </div>
              </div>
              <div className="w-full max-w-content mx-auto flex flex-col py-2 px-2 tablet:justify-center tablet:pb-0 tablet:pt-0">
                <Link href="#book-demo" className="text-violet font-semibold flex tablet:items-center tablet:justify-center gap-0.5">
                 Compare every feature
                 <Image
                    src="/imgs/arrow_right.svg"
                    alt="arrow right"
                    width={16}
                    height={16}
                    className="h-auto w-auto" priority />
                 </Link>
              </div>
            </div>
    )
}
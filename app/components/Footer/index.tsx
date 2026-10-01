import Image from 'next/image'
import Link from 'next/link'
export default function Footer() {
  return (
    <>
      <footer className="w-full bg-ink text-subtle"> 
       <div className="w-full max-w-content mx-auto grid grid-col-1 px-2 gap-3 tablet:grid-cols-2 py-3 tablet:py-4 desktop:py-8">
         <div>
            <Link href="/" aria-label="TaskCurrent home">
              <Image
                src="/imgs/logo_light.svg"
                alt="TaskCurrent"
                width={144}
                height={28}
                priority
              />
            </Link>
            <p className="py-4">Automation for growing businesses that have better things to do.</p>
            <p className="text-surface font-semibold py-1">Work smarter. Get TaskCurrent tips.</p>
            <form className="flex flex-col gap-2 tablet:flex-row tablet:items-end">
              <div className="flex flex-col gap-1">
                <label className="text-sm block" htmlFor="userEmail">Email address</label>
                <input
                  id="userEmail"
                  type="email"
                  placeholder="you@company.com"
                  className="rounded-button bg-dark-surface-2 border border-dark-border px-2 py-1 text-white transition-colors hover:bg-brand-hover"
                />
              </div>
              <button
                type="submit"
                className="rounded-button bg-brand px-2 py-1 text-small font-semibold text-white transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Subscribe
              </button>
            </form>
         </div>
         <div className="grid grid-cols-2 tablet:flex gap-4 tablet:flex-row tablet:justify-between tablet:gap-5">
            <ul className="flex flex-col gap-2">
                <li className="font-semibold text-surface">Product</li>
                <li>Features</li>
                <li>Workflow Builder</li>
                <li>Integrations</li>
                <li>Analytics</li>
                <li>Pricing</li>
            </ul>
            <ul className="flex flex-col gap-2">
                <li className="font-semibold text-surface">Solutions</li>
                <li>Lead Management</li>
                <li>Scheduling</li>
                <li>Customer Onboarding</li>
                <li>Sales Follow-Up</li>
                <li>Customer Service</li>
            </ul>
            <ul className="flex flex-col gap-2">
                <li className="font-semibold text-surface">Resources</li>
                <li>Guides</li>
                <li>Documentation</li>
                <li>API</li>
                <li>Help Center</li>
                <li>Status</li>
            </ul>
            <ul className="flex flex-col gap-2">
                <li className="font-semibold text-surface">Company</li>
                <li>About</li>
                <li>Contact</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
            </ul>
         </div>
       </div>
       <div className="w-full max-w-content mx-auto flex flex-col justify-between border-t border-dark-border py-3 px-2">
        <p>&copy;&nbsp;2026 TaskCurrent. All rights reserved.</p>  
        <ul className="flex gap-4">
           <li>Privacy</li>
           <li>Terms</li>
           <li>Cookie settings</li>
        </ul>      
       </div>
      </footer>
    </> 
 )
}
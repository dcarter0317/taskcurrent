import Image from 'next/image'
import Link from 'next/link'
import NewsletterForm from './NewsletterForm'
import CookieSettingsButton from './CookieSettingsButton'
export default function Footer() {
  return (
    <>
      <footer className="w-full bg-footer text-subtle"> 
       <div className="w-full max-w-content mx-auto grid grid-cols-1 px-2 gap-3 laptop:grid-cols-2 py-3 tablet:py-4 desktop:py-8">
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
            <NewsletterForm />
         </div>
         <div className="grid grid-cols-2 gap-4 tablet:grid-cols-4 laptop:flex laptop:flex-row laptop:justify-between laptop:gap-5">
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
           <li><CookieSettingsButton /></li>
        </ul>      
       </div>
      </footer>
    </> 
 )
}
import Image from 'next/image'

const integrationBlocks = [
    {"icon": "H", title: "HubSpot"},
    {"icon": "S", title: "SalesForce"},
    {"icon": "M", title: "MailChimp"}
]



export default function FeatureBentoGrid(){
    return(
        <div className="w-full max-w-content mx-auto tablet:py-15">
          
          <div className="w-full max-w-content mx-auto flex flex-col py-2 text-center tablet:pb-0 tablet:pt-0">
            <div className="px-2 tablet:px-35 tablet:mb-6">
              <p className="uppercase text-sm font-semibold text-violet">BuiLt For Real Work</p>
              <h2 className="text-4xl font-bold py-2">Everything you need to automate the work around your work.</h2>
              <p className="text-muted">Build, monitor, and improve workflows from one simple workspace.</p>
            </div>
          </div>
          
          <div>
             <div className="grid grid-cols-1 gap-2 tablet:grid-cols-3">

                 <div className="bg-surface tablet:col-span-2 px-4 py-2 rounded-2xl border border-surface-alt">
                    <h4 className="font-semibold text-lg mb-1 mt-2">Visual Workflow Builder</h4>
                    <p className="text-muted text-sm">Drag triggers, conditions, delays, and actions onto one canvas. No code required.</p>
                    <Image
                      className="py-2"
                      src="/imgs/visual_workflow_builder_infographic_lg.svg"
                      alt="visual_workflow_builder_infographic"
                      width={726}
                      height={288}
                      priority />
                 </div>

                 <div className="bg-surface px-4 py-2 rounded-2xl border border-surface-alt">
                    <h4 className="font-semibold text-lg mb-1 mt-2">AI Message Assistant</h4>
                    <p className="text-muted text-sm">Draft personal follow-ups in your team’s voice, then review before sending.</p>
                    <div className="flex flex-col place-items-center">
                      <Image
                        className="py-2" 
                        src="/imgs/ai_draft_email_lg.svg"
                        alt="AI Draft Email Infographic"
                        width={278}
                        height={120}
                        priority /> 
                       <div className="mb-2">
                          <p className="text-xs py-0.5 px-1.5 rounded-2xl border border-surface-alt inline-block text-muted">Shorter</p>
                          <p className="text-xs py-0.5 px-1.5 mx-1 rounded-2xl border border-surface-alt inline-block text-muted">Friendlier</p>
                          <p className="text-xs py-0.5 px-1.5 rounded-2xl border border-surface-alt inline-block text-muted">Add booking link</p>
                       </div> 
                    </div>
                      <p className="text-muted text-xs">Every draft is reviewed before it sends.</p>
                 </div>

                <div className="bg-surface px-4 py-2 rounded-2xl border border-surface-alt">
                    <h4 className="font-semibold text-lg mb-1 mt-2">Analytics</h4>
                    <p className="text-muted text-sm">See conversion, response time, and workflow performance at a glance.</p>
                     <Image
                        className="py-6" 
                        src="/imgs/lead_conversion_trend_lg.svg"
                        alt="Analyticer Infographic"
                        width={318}
                        height={214}
                        priority /> 
                 </div>

                 <div className="bg-surface px-4 py-2 rounded-2xl border border-surface-alt">
                    <h4 className="font-semibold text-lg mb-1 mt-2">Smart Reminders</h4>
                    <p className="text-muted text-sm">Nudge customers and teammates at exactly the right moment.</p>
                    <div className="bg-surface-alt rounded-2xl px-1.25 pt-3 pb-6 mt-1">
                       <div className="flex items-center gap-2 bg-surface py-1 px-1 mb-1 rounded-xl border border-border">
                            <Image
                              className="py-2" 
                              src="/imgs/bell_icon.svg"
                              alt="AI Draft Email Infographic"
                              width={28}
                              height={28}
                              priority />
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm tablet:xs">Follow up with Sarah Mitchell</p>
                                 <span className="text-muted text-xs">Tomorrow&nbsp;·&nbsp;9:00 AM</span>
                              </div>
                              <div className="w-11 shrink-0"><div className="rounded-2xl px-1.5 border border-surface-alt inline-flex items-center text-muted">
                                <Image
                                   src="/imgs/pending_dot.svg"
                                   alt="Pending Dot"
                                   width={6}
                                   height={6}
                                   priority />
                                <span className="text-xs pl-1">Pending</span>
                              </div></div>
                       </div>
                       <div className="flex items-center gap-2 bg-surface py-1 px-1 mb-1 rounded-xl border border-border">
                            <Image
                              className="py-2" 
                              src="/imgs/bell_icon.svg"
                              alt="AI Draft Email Infographic"
                              width={28}
                              height={28}
                              priority />
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm tablet:xs">Confirm appointment<br />&nbsp;·&nbsp;Oak &amp; Stone</p>
                                 <span className="text-muted text-xs">Thu&nbsp;·&nbsp;2:30 PM</span>
                              </div>
                              <div className="w-11 shrink-0"><div className="rounded-2xl px-1.5 border border-surface-alt inline-flex items-center text-muted">
                                <Image
                                   src="/imgs/pending_dot.svg"
                                   alt="Pending Dot"
                                   width={6}
                                   height={6}
                                   priority />
                                <span className="text-xs pl-1">Pending</span>
                              </div></div>
                       </div>
                        <div className="flex items-center gap-2 bg-surface py-1 px-1 mb-1 rounded-xl border border-border">
                            <Image
                              className="py-2" 
                              src="/imgs/bell_icon.svg"
                              alt="AI Draft Email Infographic"
                              width={28}
                              height={28}
                              priority />
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm">Invoice reminder · PeakPoint</p>
                                 <span className="text-muted text-xs">Sent yesterday</span>
                              </div>
                              <div className="w-11 shrink-0"><div className="rounded-2xl px-1.5 border border-surface-alt inline-flex items-center text-muted">
                                <Image
                                   src="/imgs/complete_dot.svg"
                                   alt="Completed Dot"
                                   width={6}
                                   height={6}
                                   priority />
                                <span className="text-xs pl-1 text-mint">Completed</span>
                              </div></div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-surface px-4 py-2 rounded-2xl border border-surface">
                    <h4 className="font-semibold text-lg mb-1 mt-2">CRM Integrations</h4>
                    <p className="text-muted text-sm">Keep contacts, deals, and activity in sync automatically.</p>

                  <div className="bg-surface-alt py-2 px-1 mt-2 rounded-2xl border border-surface-alt">
                     <div className="mt-3 grid grid-cols-1 gap-1 px-2 mb-2">
                        {integrationBlocks.map((block) => (
                           <div key={block.title} className="flex items-center gap-2 bg-surface border border-surface-alt rounded-2xl py-2 pl-2 pr-5">
                              <p className="text-sm bg-surface-alt border py-1.25 px-2 rounded-[11px] border-surface-alt">{block.icon}</p>
                              <p className="text-sm font-medium">{block.title}</p>
                           </div>
                        ))}   
                      </div>
                      <div className="flex gap-0.5 px-2">
                        <Image src="/imgs/check_circle.svg" alt="" width={14} height={14} priority />
                        <span className="text-success-text text-xs font-medium">Two-way sync every 5 minutes</span>
                      </div>
                  </div>

                 </div>
             </div>
          </div>

        </div>
    )
}
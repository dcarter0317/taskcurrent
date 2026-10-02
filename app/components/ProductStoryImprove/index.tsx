import Image from "next/image";
import Link from "next/link";

export default function ProductStoryImprove() {
  return (
    <div className="w-full max-w-content mx-auto tablet:py-6">
      <div className="w-full max-w-content mx-auto flex flex-col py-2 tablet:flex-row items-center tablet:pb-0 tablet:pt-0">
        <div className="px-2 tablet:mb-6">
          <p className="uppercase text-sm font-semibold text-violet">03 · Improve</p>
          <h2 className="text-[2.6rem] leading-6 tracking-tight font-bold py-2">Analyze performance and optimize your workflows.</h2>
          <p className="text-muted">Get insights into how your workflows are performing, identify bottlenecks, and make data-driven decisions to improve efficiency.</p>
          <ul className="my-2">
            <li className="flex gap-0.5">
                <Image src="/imgs/check.svg" alt="" width={16} height={16} />
                Monitor workflow performance
            </li>
            <li className="flex gap-0.5 my-2">
                <Image src="/imgs/check.svg" alt="" width={16} height={16} />
                Identify bottlenecks and inefficiencies
            </li>
            <li className="flex gap-0.5">
                <Image src="/imgs/check.svg" alt="" width={16} height={16} />
                Make data-driven improvements
           </li>
          </ul>
         <Link href="#book-demo" className="text-violet flex items-center gap-0.5">
         Explore Analytics Dashboard
         <Image
            src="/imgs/arrow_right.svg"
            alt="Product Story Improve"
            width={16}
            height={16}
            priority />
         </Link>
        </div>
        <div className="px-2 tablet:mb-6 tablet:hidden">
            <Image
            src="/imgs/new_lead_nurture.svg"
            alt="Product Story Improve"
            width={650}
            height={336}
            priority />
        </div>
        <div className="px-2 hidden tablet:block tablet:mb-6 tablet:basis-250">
            <Image
            src="/imgs/new_lead_nurture_lg.svg"
            alt="Product Story Improve"
            width={1024}
            height={786}
            priority />
        </div>
      </div>
    </div>
  );
}   
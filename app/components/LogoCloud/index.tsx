import Image from "next/image";

export default function LogoCloud() {
    return(
       <div className="w-full max-w-content py-4">
        <p className="text-center pb-4 tablet:pb-2">Trusted by teams that have better things to do.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 tablet:gap-17">
            <Image src="/imgs/brightpath_logo.svg" alt="brightpath logo" width={130} height={40} />
            <Image src="/imgs/oakstone_logo.svg" alt="oak stone logo" width={130} height={40} />
            <Image src="/imgs/northstar_logo.svg" alt="northstar logo" width={130} height={40} />
            <Image src="/imgs/peakpoint_logo.svg" alt="peakpoint logo" width={130} height={40} />
            <Image src="/imgs/riverbend_logo.svg" alt="riverbend logo" width={130} height={40} />
        </div>
       </div>
    )
}
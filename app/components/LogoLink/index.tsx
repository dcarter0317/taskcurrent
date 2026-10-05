import Image from "next/image";
import Link from "next/link";

export default function LogoLink() {
    return (
        <Link href="/" aria-label="TaskCurrent home" className="mb-3 inline-block rounded-button focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgb(82_103_255/0.28)]">
            <Image src="/imgs/logo.svg" alt="TaskCurrent" width={144} height={28} priority />
        </Link>
    );
}

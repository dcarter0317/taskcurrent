import Hero from '../Hero'
import LogoCloud from '../LogoCloud';

export default function Main() {
  return (
    <main className="w-full max-w-content mx-auto flex flex-col py-2 tablet:pb-0 tablet:pt-0">
        <Hero />
        <LogoCloud />
    </main>
  )
}
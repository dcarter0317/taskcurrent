import Hero from '../Hero'
import LogoCloud from '../LogoCloud';
import ProblemSection from '../ProblemSection';
import ProductStoryAutomate from '../ProductStoryAutomate';
import ProductStoryCapture from '../ProductStoryCapture';
import ProductStoryIntro from '../ProductStoryIntro';
import ProductStoryImprove from '../ProductStoryImprove';
import WorkFlowBuilderShowcase from '../WorkFlowBuilderShowcase';
import IntergrationsCloud from '../IntergrationsCloud'
import FeatureBentoGrid from '../FeatureBentoGrid'
import FAQSection from '../FAQSection'

export default function Main() {
  return (
    <main className="w-full max-w-content mx-auto flex flex-col py-2 tablet:pb-0 tablet:pt-0">
        <Hero />
        <LogoCloud />
        <ProblemSection />
        <ProductStoryIntro />
        <ProductStoryCapture />
        <ProductStoryAutomate />
        <ProductStoryImprove />
        <WorkFlowBuilderShowcase />
        <IntergrationsCloud />
        <FeatureBentoGrid />
        <FAQSection />
    </main>
  )
}
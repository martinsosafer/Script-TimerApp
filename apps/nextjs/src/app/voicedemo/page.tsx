import FAQAccordion from "../(site)/components/herosection/FaqAccordion";
import GoSection from "../(site)/components/herosection/GoSections/GoSections";
import MarqueeLogos from "../(site)/components/herosection/MarqueeLogos";
import ServiceSection from "../(site)/components/herosection/ServicesSection/servicessection";
import Testimonials from "../(site)/components/herosection/Testimonials/Testimonials";
import VideoBlock from "../(site)/components/herosection/VideoBlock";
import AwardsBlock from "./AwardsBlock";
import ClassesBlock from "./ClassesBlock";
import DemoHero from "./DemoHero/demohero";
import DirectorBlock from "./DirectorBlock";
import LearnMoreBlock from "./LearnMoreBlock";
import MockUpBlock from "./WidgetMockBlock";

export default function VoiceDemo() {
  return (
    <div className="h-full w-full">
      <DemoHero />
      <MockUpBlock />
      <MarqueeLogos />
      <Testimonials />
      <DirectorBlock />
      <AwardsBlock />
      <ClassesBlock />
      <LearnMoreBlock />
      <FAQAccordion />
      <VideoBlock />
      <ServiceSection />
    </div>
  );
}

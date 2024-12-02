import MarqueeLogos from "../(site)/components/herosection/MarqueeLogos";
import Testimonials from "../(site)/components/herosection/Testimonials/Testimonials";
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
    </div>
  );
}

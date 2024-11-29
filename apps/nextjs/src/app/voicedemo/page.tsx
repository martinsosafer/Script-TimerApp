import MarqueeLogos from "../(site)/components/herosection/MarqueeLogos";
import Testimonials from "../(site)/components/herosection/Testimonials/Testimonials";
import DemoHero from "./DemoHero/demohero";
import DirectorBlock from "./DirectorBlock";
import MockUpBlock from "./WidgetMockBlock";

export default function VoiceDemo() {
  return (
    <div className="h-full w-full">
      <DemoHero />
      <MockUpBlock />
      <MarqueeLogos />
      <Testimonials />
      <DirectorBlock />
    </div>
  );
}

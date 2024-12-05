"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { api } from "~/utils/api";
import Button from "../../(site)/components/button";
import AwardsBlock from "../sections/awards-block";
import ClassesBlock from "../sections/classes-block";
import DirectorBlock from "../sections/director-block";
import FAQAccordion from "../sections/faq-accordion";
import RegularHero from "../sections/hero";
import LearnMoreBlock from "../sections/learn-more-block";
import MarqueeLogos from "../sections/marquee-logos";
import Testimonials from "../sections/Testimonials";
import VideoBlock from "../sections/video-block";

export default function Landing() {
  const pathname = usePathname();
  const router = useRouter();
  const segment = pathname.split("/").pop()!;

  const {
    data: landing,
    isLoading,
    isError,
  } = api.landings.getLanding.useQuery({ segment });

  return (
    <main className="w-full">
      <nav className="bg-cp-primary flex h-[138px] w-full items-center justify-between p-10">
        <div className="relative h-[57px] w-[253px]">
          <Image src="/cp-logo.png" alt="Co-Producer logo" fill />
        </div>
        <Button
          label="Try it free"
          type="accent"
          onClick={() => router.push("/")}
        />
      </nav>
      <div>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching data</div>}
        {!isLoading && !landing && <div>No landing page found</div>}
      </div>
      {landing && (
        <RegularHero
          title={landing.title}
          description={landing.description}
          video_url={landing.video_url}
        />
      )}
      <MarqueeLogos />
      <Testimonials />
      <DirectorBlock />
      <AwardsBlock />
      <ClassesBlock />
      <LearnMoreBlock />
      <FAQAccordion />
      <VideoBlock />
    </main>
  );
}

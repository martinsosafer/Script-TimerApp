"use client";

import "~/styles/globals.css";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { api } from "~/utils/api";
import Button from "../(site)/components/button";
import AwardsBlock from "./sections/awards-block";
import ClassesBlock from "./sections/classes-block";
import DirectorBlock from "./sections/director-block";
import FAQAccordion from "./sections/faq-accordion";
import LpFooter from "./sections/footer";
import FreeDemoHero from "./sections/free-demo-hero";
import LearnMoreBlock from "./sections/learn-more-block";
import MarqueeLogos from "./sections/marquee-logos";
import Plans from "./sections/plans-block";
import ServiceSection from "./sections/services-section";
import VideoBlock from "./sections/video-block";

export default function Landing() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isLoading: isSessionLoading } =
    api.auth.getSession.useQuery();

  return (
    <main className="bg-cp-background flex w-full flex-col items-center justify-center">
      <nav className="bg-cp-primary flex w-full items-center justify-between px-6 py-3 lg:h-[138px] lg:p-10">
        <div className="relative hidden h-[57px] w-[253px] lg:flex">
          <Image src="/cp-logo.png" alt="Co-Producer logo" fill />
        </div>
        <div className="relative h-[48px] w-[48px] lg:hidden">
          <Image src="/logo-footer.png" alt="Co-Producer logo" fill />
        </div>
        <Button
          label="Open full studio"
          type="accent"
          onClick={() => router.push("/texttovoice")}
        />
      </nav>
      {((session && session.user.subscription?.status === "FREE") ||
        (session && session.user.subscription?.status === "FREE_TRIAL")) && (
        <Plans session={session} />
      )}

      <FreeDemoHero session={session} path={pathname} />

      <MarqueeLogos />
      <DirectorBlock session={session} path={pathname} />
      <AwardsBlock />
      <ClassesBlock />
      <LearnMoreBlock session={session} path={pathname} />
      <FAQAccordion />
      <VideoBlock />
      <ServiceSection />
      <LpFooter session={session} path={pathname} />
    </main>
  );
}

"use client";

import "~/styles/globals.css";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import ToolsWidget from "~/app/(site)/components/tools-widget";
import { api } from "~/utils/api";
import Button from "../../(site)/components/button";
import AwardsBlock from "../sections/awards-block";
import ClassesBlock from "../sections/classes-block";
import DirectorBlock from "../sections/director-block";
import EmailLoginSection from "../sections/email-login-section";
import FAQAccordion from "../sections/faq-accordion";
import LpFooter from "../sections/footer";
import FreeDemoHero from "../sections/free-demo-hero";
import RegularHero from "../sections/hero";
import LearnMoreBlock from "../sections/learn-more-block";
import MarqueeLogos from "../sections/marquee-logos";
import ServiceSection from "../sections/services-section";
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

  const { data: session, isLoading: isSessionLoading } =
    api.auth.getSession.useQuery();

  console.log("Landing page data", segment);

  return (
    <main className="w-full">
      <nav className="bg-cp-primary flex w-full items-center justify-between px-6 py-3 lg:h-[138px] lg:p-10">
        <div className="relative hidden h-[57px] w-[253px] lg:flex">
          <Image src="/cp-logo.png" alt="Co-Producer logo" fill />
        </div>
        <div className="relative h-[48px] w-[48px] lg:hidden">
          <Image src="/logo-footer.png" alt="Co-Producer logo" fill />
        </div>
        <Button
          label="Try it free"
          type="accent"
          onClick={() => router.push(session ? "/" : `${pathname}/#loginForm`)}
        />
      </nav>
      {segment !== "freeDemo" && (
        <div className="bg-cp-background flex items-center justify-center">
          {isError && <div>Error fetching data</div>}
          {!isLoading && !landing && <div>No landing page found</div>}
        </div>
      )}
      {(segment === "freeDemo" || landing?.lp_type === "saasy") && (
        <FreeDemoHero
          title={landing?.title}
          description={landing?.description}
          sub_description={landing?.sub_description}
          video_url={landing?.video_url}
          session={session}
          path={pathname}
        />
      )}
      {landing && landing.lp_type !== "saasy" && (
        <RegularHero
          title={landing.title}
          description={landing.description}
          sub_description={landing.sub_description}
          video_url={landing.video_url}
          session={session}
          path={pathname}
        />
      )}
      {landing?.lp_type === "tools" && <ToolsWidget />}
      {!session && !isSessionLoading && (
        <EmailLoginSection type={landing?.lp_type} />
      )}
      <MarqueeLogos />
      <DirectorBlock />
      <AwardsBlock />
      <ClassesBlock />
      <LearnMoreBlock />
      <FAQAccordion />
      <VideoBlock />
      <ServiceSection />
      <LpFooter session={session} path={pathname} />
    </main>
  );
}

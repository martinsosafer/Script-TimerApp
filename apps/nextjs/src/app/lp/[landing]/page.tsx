"use client";

import "~/styles/globals.css";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { api } from "~/utils/api";
import Button from "../../(site)/components/button";
import AwardsBlock from "../sections/awards-block";
import ClassesBlock from "../sections/classes-block";
import DirectorBlock from "../sections/director-block";
import EmailLoginSection from "../sections/email-login-section";
import FAQAccordion from "../sections/faq-accordion";
import RegularHero from "../sections/hero";
import LearnMoreBlock from "../sections/learn-more-block";
import MarqueeLogos from "../sections/marquee-logos";
import ServiceSection from "../sections/services-section";
import Testimonials from "../sections/Testimonials";
import VideoBlock from "../sections/video-block";
import LpFooter from "./footer";

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
          session={session}
          path={pathname}
        />
      )}
      {!session && !isSessionLoading && <EmailLoginSection />}
      <MarqueeLogos />
      {/* <Testimonials /> */}
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

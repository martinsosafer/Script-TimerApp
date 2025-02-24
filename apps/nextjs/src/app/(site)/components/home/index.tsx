"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { Session } from "@voiceai/auth";

import EmailLoginSection from "~/app/lp/sections/email-login-section";
import CounterData from "../herosection/CounterData/CounterData";
import FAQAccordion from "../herosection/FaqAccordion";
import GoSections from "../herosection/GoSections/GoSections";
import HeroSection from "../herosection/HeroBlock/herosection";
import MarqueeLogos from "../herosection/MarqueeLogos";
import ServiceSection from "../herosection/ServicesSection/servicessection";
import Testimonials from "../herosection/Testimonials/Testimonials";
import VideoBlock from "../herosection/VideoBlock";
import NoSessionModal from "../modals/no-session-modal";
import TrialExpirationModal from "../modals/trial-expiration-modal";

export default function Home({
  user,
  userMail,
  trialExpiration,
  session,
}: {
  user: string;
  userMail: string;
  trialExpiration: boolean;
  session: Session | null | undefined;
}) {
  const [openTrialModal, setOpenTrialModal] = useState(trialExpiration);
  const [openModal, setOpenModal] = useState(false);
  const origin = useSearchParams().get("origin");
  const appSumoCode = useSearchParams().get("appSumoCode");
  const router = useRouter();

  useEffect(() => {
    async function updateSumoUser() {
      if (appSumoCode) {
        await fetch("/api/auth/appSumoRegister", {
          method: "POST",
          body: JSON.stringify({ appSumoCode, userId: user, userMail }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
    if (appSumoCode) {
      updateSumoUser();
      router.push("/");
    }
  }, []);

  if (
    (session &&
      session.user.subscription?.status === "FREE_TRIAL" &&
      origin === "login") ||
    (session &&
      session.user.subscription?.status === "FREE" &&
      origin === "login")
  ) {
    router.push("/plans-lp");
  }

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setOpenModal(true);
      }, 15000); // 15 seconds

      // Clean up the timer if component unmounts or modal is closed
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <>
      <HeroSection />
      <MarqueeLogos />
      {!session && <EmailLoginSection />}
      <ServiceSection />
      <CounterData />
      <GoSections />
      <Testimonials />
      <VideoBlock />
      <FAQAccordion />
      <NoSessionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        page="home"
      />
      <TrialExpirationModal
        openModal={openTrialModal}
        setOpenModal={setOpenTrialModal}
        session={session}
      />
    </>
  );
}

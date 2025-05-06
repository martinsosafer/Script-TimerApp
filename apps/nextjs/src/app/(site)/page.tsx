import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { monthlyCreditsReset } from "../actions/monthlyCreditsReset";
import Home from "./components/home";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "Welcome to Script Timer",
};

export default async function LandingPage() {
  const session = await auth();
  const userId = session?.user.id ?? "";
  const userMail = session?.user.email ?? "";

  await monthlyCreditsReset(userId);
  
  const trialExpiration =
    session?.user.subscription?.trialExpiration &&
    session?.user.subscription?.status === "FREE_TRIAL"
      ? session.user.subscription.trialExpiration
      : null;

  const currentTime = new Date().getTime();
  const trialExpirationTime = new Date(trialExpiration ?? 0).getTime();

  const daysToExpire = trialExpiration
    ? Math.floor((trialExpirationTime - currentTime) / (1000 * 60 * 60 * 24))
    : null;

  const trialNextToExpire = daysToExpire ? daysToExpire <= 2 : false;

  return (
    <Home
      user={userId}
      userMail={userMail}
      trialExpiration={trialNextToExpire}
      session={session}
    />
  );
}

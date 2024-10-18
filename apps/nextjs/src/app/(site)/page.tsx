import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { monthlyCreditsReset } from "../actions/monthlyCreditsReset";
import Home from "./components/home";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "Welcome to Script Timer",
};

export default async function LandingPage() {
  const userData = await auth();
  const userId = userData?.user.id ?? "";
  console.log("USER", userData);
  await monthlyCreditsReset(userId);
  const trialExpiration =
    userData?.user.subscription?.trialExpiration &&
    userData?.user.subscription?.status === "FREE_TRIAL"
      ? userData.user.subscription.trialExpiration
      : null;

  const currentTime = new Date().getTime();
  const trialExpirationTime = new Date(trialExpiration ?? 0).getTime();

  const daysToExpire = trialExpiration
    ? Math.floor((trialExpirationTime - currentTime) / (1000 * 60 * 60 * 24))
    : null;

  const trialNextToExpire = daysToExpire ? daysToExpire <= 2 : false;

  return <Home user={userId} trialExpiration={trialNextToExpire} />;
}

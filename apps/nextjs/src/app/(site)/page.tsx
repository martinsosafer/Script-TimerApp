import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import Home from "./components/home";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "Welcome to Script Timer",
};

export default async function LandingPage() {
  const userData = await auth();
  const userId = userData?.user.id ?? "";
  const trialExpiration = userData?.user.subscription?.trialExpiration ?? null;

  const currentTime = new Date().getTime();
  const trialExpirationTime = new Date(trialExpiration ?? 0).getTime();

  const daysToExpire = trialExpiration
    ? Math.floor((trialExpirationTime - currentTime) / (1000 * 60 * 60 * 24))
    : null;

  const trialNextToExpire = daysToExpire ? daysToExpire <= 2 : false;

  return <Home user={userId} trialExpiration={trialNextToExpire} />;
}

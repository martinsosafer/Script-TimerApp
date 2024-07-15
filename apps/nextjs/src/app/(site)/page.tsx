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

  return <Home user={userId} />;
}

import type { Metadata } from "next";

import { auth, signIn, signOut } from "@voiceai/auth";

import "~/styles/globals.css";

import Head from "next/head";
import { headers } from "next/headers";

import { Toaster } from "@voiceai/ui/@/components/ui/toaster";

import getSpecials from "../actions/monthlySpecialActions";
import { IdentifyAnalytics } from "../analytics";
import { TRPCReactProvider } from "../providers";
import MonthlySpecialProvider from "../providers/monthly-special-provider";
import Footer from "./components/Footer/Footer";
import Newnavbar from "./components/navbar";
import TutorialWidget from "./components/tutorial-widget";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ScriptTimerLandingPage",
  description: "Using AI for Voice",
  openGraph: {
    title: "LandingPage",
    description: "Using AI for Voice",
    url: "https://voiceai-tesserakt.vercel.app/",
    siteName: "VoiceAI",
  },
  twitter: {
    card: "summary_large_image",
    site: "@gerryg",
    creator: "@gerryg",
  },
};

export default async function Layout(props: { children: React.ReactNode }) {
  async function signOutServer() {
    "use server";
    await signOut();
  }

  async function signInServer() {
    "use server";
    await signIn();
  }
  const session = await auth();
  const monthlySpecials = await getSpecials();

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-background">
      <Head>
        <meta name="referrer" content="origin" />
      </Head>
      <TRPCReactProvider headers={headers()}>
        <Newnavbar
          signOut={signOutServer}
          signIn={signInServer}
          session={session}
        />
        <TutorialWidget />
        <MonthlySpecialProvider
          monthlySpecials={monthlySpecials}
          session={session}
        >
          <div>{props.children}</div>
        </MonthlySpecialProvider>
        <Toaster />
        <Footer />
      </TRPCReactProvider>
    </div>
  );
}

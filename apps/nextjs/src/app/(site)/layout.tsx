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

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
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

  console.log("monthly active", monthlySpecials);

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-background">
      <TRPCReactProvider headers={headers()}>
        <Head>
          <meta name="referrer" content="origin" />
        </Head>
        <Newnavbar
          signOut={signOutServer}
          signIn={signInServer}
          session={session}
        />
        <MonthlySpecialProvider monthlySpecials={monthlySpecials}>
          <div>{props.children}</div>
        </MonthlySpecialProvider>

        <Toaster />
        <Footer />
        <IdentifyAnalytics />
      </TRPCReactProvider>
    </div>
  );
}

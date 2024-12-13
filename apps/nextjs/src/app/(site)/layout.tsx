import type { Metadata } from "next";

import { auth, signIn, signOut } from "@voiceai/auth";

import "~/styles/globals.css";

import Head from "next/head";

import { Toaster } from "@voiceai/ui/@/components/ui/toaster";

import getSpecials from "../actions/monthlySpecialActions";
import { IdentifyAnalytics } from "../analytics";
import MonthlySpecialProvider from "../providers/monthly-special-provider";
import Footer from "./components/Footer/Footer";
import Newnavbar from "./components/navbar";
import TutorialWidget from "./components/tutorial-widget";
import { TRPCReactProvider } from "../providers/trpc-provider";

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
        <IdentifyAnalytics />
      </TRPCReactProvider>
    </div>
  );
}
{/* import type { Metadata } from "next";

import { auth, signIn, signOut } from "@voiceai/auth";

import "~/styles/globals.css";

import Head from "next/head";

import { Toaster } from "@voiceai/ui/@/components/ui/toaster";

import getSpecials from "../actions/monthlySpecialActions";
import { IdentifyAnalytics } from "../analytics";
import MonthlySpecialProvider from "../providers/monthly-special-provider";
import Footer from "./components/Footer/Footer";
import Newnavbar from "./components/navbar";
import TutorialWidget from "./components/tutorial-widget";

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

  return (
<<<<<<< HEAD
    <div className="flex h-full w-full flex-col justify-between bg-background">
      <Head>
        <meta name="referrer" content="origin" />
      </Head>
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
      <IdentifyAnalytics />
=======
    <div className="flex min-h-screen w-full flex-col justify-between bg-background">
      <TRPCReactProvider headers={headers()}>
        <Newnavbar
          signOut={signOutServer}
          signIn={signInServer}
          session={session}
        />
        <MonthlySpecialProvider
          monthlySpecials={monthlySpecials}
          session={session}
        >
          <div>{props.children}</div>
        </MonthlySpecialProvider>

        <Toaster />
        <Footer />
        <IdentifyAnalytics />
      </TRPCReactProvider>
>>>>>>> 450af6fe1d0e0c4d577f8e2b8d8d8613821bfa35
    </div>
  );
} */}

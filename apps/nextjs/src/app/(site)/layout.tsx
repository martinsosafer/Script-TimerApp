import type { Metadata } from "next";

import { signOut } from "@voiceai/auth";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { Toaster } from "@voiceai/ui/@/components/ui/toaster";

import { IdentifyAnalytics } from "../analytics";
import { getSession } from "../api/subscription/subscription";
import { TRPCReactProvider } from "../providers";
import Footer from "./components/Footer/Footer";
import Newnavbar from "./components/newnavbar";

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VoiceAI",
  description: "Using AI for Voice",
  openGraph: {
    title: "VoiceAi",
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
    return null;
  }
  const session = await getSession();
  const subData = session?.subscription;

  return (
    <>
      <div className="flex min-h-screen w-full flex-col justify-between bg-background">
        <TRPCReactProvider headers={headers()}>
          <Newnavbar signOut={signOutServer} subData={subData} />
          {/* <Menu signOut={signOutServer} /> */}
          <div>
            {/* <Sidebar playlists={playlists} className="hidden lg:block" /> */}
            <div>{props.children}</div>
          </div>
          <Toaster />
          <Footer />
          <IdentifyAnalytics />
        </TRPCReactProvider>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { signOut } from "@voiceai/auth";

import { Menu } from "../components/menu";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { Toaster } from "@voiceai/ui/@/components/ui/toaster";

import { TRPCReactProvider } from "../../providers";
import { Sidebar } from "../components/sidebar";
import { playlists } from "../data/playlists";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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

export default function Layout(props: { children: React.ReactNode }) {
  async function signOutServer() {
    "use server"; // mark function as a server action (fixes the error)
    await signOut();
    return null;
  }

  return (
    <div className="h-screen bg-background">
      <TRPCReactProvider headers={headers()}>
        <Menu />
        {/* <div className="border-t"> */}
        {/* <div className="bg-background"> */}
        <div className="grid lg:grid-cols-5">
          <Sidebar playlists={playlists} className="hidden lg:block" />
          <div className="col-span-4">{props.children}</div>
          {/* </div> */}
          {/* </div> */}
        </div>
        <Toaster />
      </TRPCReactProvider>
    </div>
  );
}

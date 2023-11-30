import type { Metadata } from "next";
import { Inter } from "next/font/google";

import TopNavigation from "../_components/top-navigation";

import "~/styles/globals.css";

import { headers } from "next/headers";

import Player from "../_components/global-player";
import Sidebar from "../_components/layout-console";
import { TRPCReactProvider } from "../providers";

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
  return (
    <div className="flex h-full flex-col bg-zinc-100">
      <TopNavigation />
      <TRPCReactProvider headers={headers()}>
        <div className="h-full flex-col overflow-y-scroll md:overflow-hidden">
          <Sidebar>{props.children}</Sidebar>
          <Player />
        </div>
      </TRPCReactProvider>
    </div>
  );
}

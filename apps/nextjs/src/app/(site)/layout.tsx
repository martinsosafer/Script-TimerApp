import type { Metadata } from "next";

import { auth, signOut } from "@voiceai/auth";

import { Menu } from "./components/menu";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { Toaster } from "@voiceai/ui/@/components/ui/toaster";

import { IdentifyAnalytics } from "../analytics";
import { TRPCReactProvider } from "../providers";
import Modal from "./components/modal";
import Newnavbar from "./components/newnavbar";
import { Sidebar } from "./components/sidebar";
import { playlists } from "./data/playlists";

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
    "use server";
    await signOut();
    return null;
  }

  return (
    <>
      <div className="h-screen overflow-hidden bg-background">
        <TRPCReactProvider headers={headers()}>
          <Newnavbar signOut={signOutServer} />
          {/* <Menu signOut={signOutServer} /> */}
          <div className="grid ">
            {/* <Sidebar playlists={playlists} className="hidden lg:block" /> */}
            <div className="col-span-4 h-screen  overflow-auto">
              {props.children}
            </div>
          </div>
          <Toaster />
          <IdentifyAnalytics />
        </TRPCReactProvider>
      </div>
    </>
  );
}

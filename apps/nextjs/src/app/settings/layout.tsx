import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Separator } from "@voiceai/ui/@/components/ui/separator";

import TopNavigation from "../_components/top-navigation";
import { SidebarNav } from "./_components/sidebar-nav";

import "~/styles/globals.css";

import { headers } from "next/headers";

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

const sidebarNavItems = [
  {
    title: "Billing",
    href: "/settings/billing",
  },
];

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col ">
      <TopNavigation />
      <TRPCReactProvider headers={headers()}>
        <div className="hidden space-y-6 p-10 pb-16 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{props.children}</div>
          </div>
        </div>
      </TRPCReactProvider>
    </div>
  );
}

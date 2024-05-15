import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { TRPCReactProvider } from "../providers";

const fontRoboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
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
    <html lang="en" className="h-full">
      <body
        className={["font-roboto", "h-full", fontRoboto.variable].join(" ")}
      >
        <TRPCReactProvider headers={headers()}>
          {props.children}
          {/* {props.children} */}
        </TRPCReactProvider>
      </body>
    </html>
  );
}

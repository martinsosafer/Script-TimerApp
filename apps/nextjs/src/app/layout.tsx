import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { PageAnalytics } from "./analytics";

const poppins = Poppins({
  subsets: ["latin"],
  style: "normal",
  variable: "--poppins",
  weight: ["400", "700"], // Include weights for Poppins (normal and bold)
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--roboto",
  weight: ["400", "700"], // Include weights for Roboto (normal and bold)
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
        className={[
          "font-poppins",
          "font-roboto",
          "theme-blue",
          "h-screen bg-background",
          poppins.variable,
          roboto.variable,
        ].join(" ")}
      >
        {props.children}
      </body>
      <GoogleAnalytics gaId="G-HFV2PVVNXR" />
    
      <PageAnalytics />
    </html>
  );
}

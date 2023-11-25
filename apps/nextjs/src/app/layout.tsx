import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    <html lang="en" className="h-full">
      <body
        className={[
          "font-sans",
          "h-screen bg-transparent",
          fontSans.variable,
        ].join(" ")}
      >
        {props.children}
      </body>
    </html>
  );
}

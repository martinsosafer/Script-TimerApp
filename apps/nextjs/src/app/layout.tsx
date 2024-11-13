import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";

import { PageAnalytics } from "./analytics";
import GoogleAnalytics from "./GoogleAnalytics";

import "~/styles/globals.css";

import Squid from "./SquidAnalitycs";

const poppins = Poppins({
  subsets: ["latin"],
  style: "normal",
  variable: "--poppins",
  weight: ["400", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--roboto",
  weight: ["400", "700"],
});

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ScriptTimer",
  description: "Using AI for Voice",
  openGraph: {
    title: "ScriptTimer",
    description: "Using AI for Voice",
    url: "https://voiceai-tesserakt.vercel.app/",
    siteName: "ScriptTimer",
  },
  twitter: {
    card: "summary_large_image",
    site: "@gerryg",
    creator: "@gerryg",
  },
  // Add the referrer meta tag here
  other: {
    referrer: "origin",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${poppins.variable} ${roboto.variable}`}>
      <head>
        <meta name="referrer" content="origin" />
      </head>
      <body
        className={[
          "font-poppins",
          "font-roboto",
          "theme-blue",
          "h-screen bg-background",
        ].join(" ")}
      >
<<<<<<< HEAD
        <GoogleAnalytics />
        {children}
        <HotJar />
        <PageAnalytics />
=======
        {props.children}
        <Squid />
>>>>>>> 6cfcc09fb3e1630a9180181ff4eb2aa978c23723
      </body>
    </html>
  );
}

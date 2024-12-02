import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";

import { PageAnalytics } from "./analytics";
import { ContextWrapper } from "./context/state";
import GoogleAnalytics from "./GoogleAnalytics";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { TRPCReactProvider } from "./providers";
import Squid from "./SquidAnalitycs";

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
};

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en" className="h-full">
      <GoogleAnalytics />
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
        <TRPCReactProvider headers={headers()}>
          <ContextWrapper>{children}</ContextWrapper>
        </TRPCReactProvider>
        <Squid />
      </body>

      <PageAnalytics />
    </html>
  );
}

"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { ThemeProvider } from "next-themes";
import { IntercomProvider } from "react-use-intercom";
import superjson from "superjson";

import { TooltipProvider } from "@voiceai/ui";

import { env } from "~/env.mjs";
import { api } from "~/utils/api";
import { SidebarProvider } from "./hooks/useSideBar";
import { PlayerProvider } from "./providers/player-context";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (env.VERCEL_URL) return env.VERCEL_URL; // SSR should use vercel url

  return `http://localhost:${env.PORT}`; // dev SSR should use localhost
};

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  headers?: Headers;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Map(props.headers);
            headers.set("x-trpc-source", "nextjs-react");
            return Object.fromEntries(headers);
          },
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration transformer={superjson}>
          <IntercomProvider
            appId={"ulamwjwr"}
            autoBoot
            apiBase="https://api-iam.intercom.io"
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              {...props}
            >
              <SidebarProvider>
                <TooltipProvider>
                  <PlayerProvider>{props.children}</PlayerProvider>
                </TooltipProvider>
              </SidebarProvider>
            </ThemeProvider>
          </IntercomProvider>
        </ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </api.Provider>
  );
}

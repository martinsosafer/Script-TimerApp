"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { analytics } from "~/lib/analytics";
import { api } from "~/utils/api";

export function PageAnalytics() {
  // const { data: session } = api.auth.getSession.useQuery();
  // console.log("session", session);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    analytics.page();
  }, [pathname, searchParams]);

  return null;
}

// Can only be used on pages with logged in users
export function IdentifyAnalytics() {
  const { data: session } = api.auth.getSession.useQuery();

  if (session?.user?.id) {
    analytics.identify(session?.user?.id, {
      email: session?.user?.email,
      name: session?.user?.name,
    });
  }

  return null;
}

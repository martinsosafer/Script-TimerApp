"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import mixpanel from "mixpanel-browser";

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

  useEffect(() => {
    if (session?.user?.id && mixpanel.get_distinct_id()) {
      // Identify the user
      mixpanel.identify(session.user.id);

      // Set people properties
      mixpanel.people.set({
        $email: session.user.email,
        $name: session.user.name,
        $created: new Date().toISOString(), // Add registration date
      });

      // Optional: Set super properties for all future events
      mixpanel.register({
        "User ID": session.user.id,
        Email: session.user.email,
      });
    }
  }, [session]);

  return null;
}
export const trackEventMixpanel = (
  eventName: string,
  properties?: Record<string, any>,
) => {
  if (mixpanel && typeof mixpanel.track === "function") {
    mixpanel.track(eventName, properties);
  } else {
    console.warn("Mixpanel not initialized");
  }
};

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { initMixpanel } from "~/lib/mixpanel";

export default function MixpanelInitializer() {
  const pathname = usePathname();

  // Initialize Mixpanel
  useEffect(() => {
    initMixpanel();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (typeof window.mixpanel !== "undefined") {
      window.mixpanel.track("Page View", { path: pathname });
    }
  }, [pathname]);

  return null;
}

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import type {
  Page,
  MonthlySpecial as Specials,
} from "~/app/(site)/(admin)/admin-specials/types";
import MonthlySpecial from "~/app/(site)/components/monthySpecial";

interface MonthlySpecialProviderProps {
  monthlySpecials?: Specials[];
  children: React.ReactNode;
}

const paths: Record<string, Page> = {
  "/texttovoice": "VOICE",
  "/chat": "CHAT",
  "/image-generator": "IMAGES",
  "/plagiarism-detector": "PLAGIARISM",
  "/masterclasses": "UNIVERSITY",
  "/plans": "PLANS",
};

export default function MonthlySpecialProvider({
  children,
  monthlySpecials,
}: MonthlySpecialProviderProps) {
  const path = usePathname();
  const displayPage = paths[path]!;

  console.log(monthlySpecials);

  const pageSpecial = monthlySpecials?.find((special) => {
    return (
      special.pages_display.includes(displayPage) ??
      special.pages_display.includes("ALL")
    );
  });

  const [closeSpecial, setCloseSpecial] = useState(false);

  const today = new Date().toISOString().split("T")[0]!;

  console.log("today", today);
  console.log("start date", pageSpecial?.start_date);
  console.log("end date", pageSpecial?.end_date);
  const isVisible =
    pageSpecial &&
    pageSpecial?.start_date <= today &&
    today <= pageSpecial?.end_date;

  return (
    <div>
      {isVisible && pageSpecial && !closeSpecial && (
        <MonthlySpecial
          name={pageSpecial?.name ?? ""}
          description={pageSpecial?.description ?? ""}
          promo_code={pageSpecial?.promo_code ?? ""}
          link={pageSpecial?.link ?? ""}
          onClose={() => setCloseSpecial(true)}
        />
      )}
      {children}
    </div>
  );
}

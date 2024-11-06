"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import type { MonthlySpecial as Specials } from "~/app/(site)/(admin)/admin-specials/types";
import MonthlySpecial from "~/app/(site)/components/monthySpecial";

interface MonthlySpecialProviderProps {
  monthlySpecial?: Specials;
  children: React.ReactNode;
}

const paths: Record<string, string> = {
  VOICE: "/texttovoice",
  CHAT: "/chat",
  IMAGES: "/image-generator",
  PLAGIARISM: "/plagiarism-detector",
  UNIVERSITY: "/masterclasses",
  PLANS: "/new-plans",
};

export default function MonthlySpecialProvider({
  children,
  monthlySpecial,
}: MonthlySpecialProviderProps) {
  const path = usePathname();

  const [closeSpecial, setCloseSpecial] = useState(false);
  const isVisible =
    monthlySpecial?.pages_display === "ALL" ||
    (monthlySpecial && path === paths[monthlySpecial.pages_display]);

  return (
    <div>
      {isVisible && monthlySpecial && !closeSpecial && (
        <MonthlySpecial
          name={monthlySpecial?.name ?? ""}
          description={monthlySpecial?.description ?? ""}
          promo_code={monthlySpecial?.promo_code ?? ""}
          link={monthlySpecial?.link ?? ""}
          onClose={() => setCloseSpecial(true)}
        />
      )}
      {children}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import Tabs from "../../components/tabs";

export default function AdminNavigator() {
  const pathname = usePathname();
  const router = useRouter();

  const routes: Record<string, string> = {
    Users: "/admin",
    Prompts: "/admin-prompts",
    "Prompt Categories": "/admin-prompt-categories",
    "Specials and announcements": "/admin-specials",
    "Voice Clone": "/adminclone",
    Voices: "/adminvoices",
    "Landing Pages": "/admin-landings",
    "Voice Generation": "/admin-voicegeneration",
  };

  const adminPages = [
    {
      label: "Users",
      active: pathname === "/admin",
      action: () => router.push("/admin"),
    },
    {
      label: "Prompts",
      active: pathname === "/admin-prompts",
      action: () => router.push("/admin-prompts"),
    },
    {
      label: "Prompt Categories",
      active: pathname === "/admin-prompt-categories",
      action: () => router.push("/admin-prompt-categories"),
    },
    {
      label: "Specials and announcements",
      active: pathname === "/admin-specials",
      action: () => router.push("/admin-specials"),
    },
    {
      label: "Voice Clone",
      active: pathname === "/adminclone",
      action: () => router.push("/adminclone"),
    },
    {
      label: "Voices",
      active: pathname === "/adminvoices",
      action: () => router.push("/adminvoices"),
    },
    {
      label: "Landing Pages",
      active: pathname === "/admin-landings",
      action: () => router.push("/admin-landings"),
    },
    {
      label: "Voice Generation",
      active: pathname === "/admin-voicegeneration",
      action: () => router.push("/admin-voicegeneration"),
    },
  ];

  return (
    <>
      <div className="my-10 hidden items-center justify-center gap-4 lg:flex">
        <Tabs options={adminPages} />
      </div>
      <div>
        {adminPages.map((page) => {
          return (
            <Link
              key={page.label}
              className={`my-1 flex flex-col items-center lg:hidden ${
                page.active ? "font-bold text-primary" : "text-gray-500"
              }`}
              href={routes[page.label]!}
            >
              {page.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}

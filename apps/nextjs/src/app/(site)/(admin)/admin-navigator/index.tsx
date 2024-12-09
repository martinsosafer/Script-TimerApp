"use client";

import { usePathname, useRouter } from "next/navigation";

import Tabs from "../../components/tabs";

export default function AdminNavigator() {
  const pathname = usePathname();
  const router = useRouter();

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
  ];

  return (
    <div className="my-10 flex items-center justify-center gap-4">
      <Tabs options={adminPages} />
    </div>
  );
}

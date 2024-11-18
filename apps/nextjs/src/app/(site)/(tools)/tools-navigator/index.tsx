"use client";

import { usePathname, useRouter } from "next/navigation";

import Tabs from "../../components/tabs";

export default function ToolsNavigator() {
  const pathname = usePathname();
  const router = useRouter();

  const tools = [
    {
      label: "Word Counter",
      active: pathname === "/word-counter",
      action: () => router.push("/word-counter"),
    },
    {
      label: "Words to Time",
      active: pathname === "/words-to-time",
      action: () => router.push("/words-to-time"),
    },
    {
      label: "Auto Capitalize",
      active: pathname === "/auto-capitalize",
      action: () => router.push("/auto-capitalize"),
    },
    {
      label: "Words Sorter",
      active: pathname === "/words-sorter",
      action: () => router.push("/words-sorter"),
    },
    {
      label: "Hemingway",
      active: pathname === "/grade-level",
      action: () => router.push("/grade-level"),
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      <Tabs options={tools} />
    </div>
  );
}

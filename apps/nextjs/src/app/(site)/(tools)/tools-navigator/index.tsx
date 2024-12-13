"use client";

import { usePathname, useRouter } from "next/navigation";

import Tabs from "../../components/tabs";

export default function ToolsNavigator() {
  const pathname = usePathname();
  const router = useRouter();

  const tools = [
    {
      label: "Script Timer",
      active: pathname === "/script-timer",
      action: () => router.push("/script-timer"),
    },
    {
      label: "Word Counter",
      active: pathname === "/word-counter",
      action: () => router.push("/word-counter"),
    },
    {
      label: "Auto Capitalize/Case",
      active: pathname === "/autocapitalize",
      action: () => router.push("/autocapitalize"),
    },
    {
      label: "Word Sorter",
      active: pathname === "/word-sorter",
      action: () => router.push("/word-sorter"),
    },
    {
      label: "Hemingway App Scorer",
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

"use client";

import { usePathname, useRouter } from "next/navigation";

import { roboto } from "~/app/fonts";
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
    <>
      <div className="hidden items-center justify-center gap-4 lg:flex">
        <Tabs options={tools} />
      </div>
      <select
        className={`${roboto.className}text-[16px] border-cp-primary text-cp-primary w-full rounded-[4px] border bg-white px-4 py-6 font-bold lg:hidden`}
      >
        {tools.map((tool) => (
          <option
            key={tool.label}
            value={tool.label}
            selected={tool.active}
            onClick={tool.action}
          >
            {tool.label}
          </option>
        ))}
      </select>
    </>
  );
}

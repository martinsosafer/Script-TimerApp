"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  { label: "Words Counter", href: "/words-counter" },
  { label: "Words to Time", href: "/words-to-time" },
  { label: "Auto Capitalize", href: "/auto-capitalize" },
];

export default function ToolsNavigator() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-center gap-4">
      {tools.map((tool) => {
        return (
          <Link
            href={tool.href}
            key={tool.href}
            className={`rounded-full px-4 py-2 font-semibold ${pathname.includes(tool.href) ? "bg-tertiary text-white" : "text-tertiary hover:bg-tertiary/10"}`}
          >
            {tool.label}
          </Link>
        );
      })}
    </div>
  );
}

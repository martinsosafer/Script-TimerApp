import * as React from "react";
import Link from "next/link";

// import { SidebarList } from "@/components/sidebar-list";
import { buttonVariants } from "@voiceai/ui/@/components/ui/button";
import { IconPlus } from "@voiceai/ui/@/components/ui/icons";
import { cn } from "@voiceai/ui/@/lib/utils";

import { SidebarList } from "./sidebarlist";

interface ChatHistoryProps {
  userId?: string;
}

export function ChatHistory({ userId }: ChatHistoryProps) {
  return (
    <div className="flex h-screen flex-col">
      <div className="my-4 mt-12 px-2">
        <h2 className="mb-4 text-xl font-bold text-primary-foreground dark:text-secondary-foreground">
          Chat History
        </h2>
        <Link
          href="/chat"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-10 w-full justify-start bg-primary px-4 text-primary-foreground shadow-none transition-colors hover:bg-zinc-200/40 hover:text-accent dark:bg-zinc-900 dark:text-secondary-foreground dark:hover:bg-zinc-300/10",
          )}
        >
          <IconPlus className="-translate-x-2 stroke-2" />
          New Chat
        </Link>
      </div>
      <React.Suspense
        fallback={
          <div className="flex flex-1 flex-col space-y-4 overflow-auto px-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-full shrink-0 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        {/* @ts-ignore */}
        <SidebarList userId={userId} />
      </React.Suspense>
    </div>
  );
}

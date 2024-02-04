"use client";

import * as React from "react";

import { cn } from "@voiceai/ui/@/lib/utils";

import { useSidebar } from "~/app/hooks/useSideBar";

export type LeftbarProps = React.ComponentProps<"div">;

export function Leftbar({ className, children }: LeftbarProps) {
  const { isSidebarOpen, isLoading } = useSidebar();

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
      className={cn(className, "h-full flex-col dark:bg-zinc-950")}
    >
      {children}
    </div>
  );
}

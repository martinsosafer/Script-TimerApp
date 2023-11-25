// "use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { auth } from "@voiceai/auth";

import { VoiceList } from "../_components/voices/list";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = async ({ children }: SidebarProps) => {
  const session = await auth();

  return (
    <main className="sidebar-container flex">
      <div className="ml-4 flex w-1/2 flex-col justify-between rounded-md bg-white p-4">
        {session && (
          <Suspense
            fallback={<div className="flex w-full flex-col gap-4">LOADING</div>}
          >
            <VoiceList />
          </Suspense>
        )}
      </div>
      <div className="container">{children}</div>
    </main>
  );
};

export default Sidebar;

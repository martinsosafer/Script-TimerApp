// "use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { auth } from "@voiceai/auth";

import { VoiceList } from "../_components/voices/list";
import { VoiceSettings } from "../_components/voices/voices-mobile";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = async ({ children }: SidebarProps) => {
  const session = await auth();
  return (
    <main className="sidebar-container flex">
      <div className="ml-4 hidden w-1/2 flex-col justify-between rounded-md bg-white p-4 md:flex">
        {session && (
          <Suspense
            fallback={<div className="flex w-full flex-col gap-4">LOADING</div>}
          >
            <VoiceList />
          </Suspense>
        )}
      </div>
      <div className="container">
        <VoiceSettings className="flex md:hidden" />
        {children}
      </div>
    </main>
  );
};

export default Sidebar;

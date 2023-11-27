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
    <main className="mt-4 flex h-full overflow-y-scroll sm:mb-2">
      <div className="ml-4 hidden h-5/6 w-1/2 flex-col justify-between rounded-md bg-white p-4 sm:flex">
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

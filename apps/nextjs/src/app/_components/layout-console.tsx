// "use client";

// import { HiHome } from "react-icons/hi";
// import { BiSearch } from "react-icons/bi";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { auth } from "@voiceai/auth";

import { VoiceList } from "../_components/voices/list";

// import { Song } from "@/types";
// import usePlayer from "@/hooks/usePlayer";

// import SidebarItem from "./SidebarItem";
// import Box from "./Box";
// import Library from "./Library";
// import { useMemo } from "react";

interface SidebarProps {
  children: React.ReactNode;
  //   songs: Song[];
}

const Sidebar = async ({ children }: SidebarProps) => {
  const session = await auth();

  //   const pathname = usePathname();
  //   const player = usePlayer();

  //   const routes = useMemo(
  //     () => [
  //       {
  //         icon: HiHome,
  //         label: "Home",
  //         active: pathname !== "/search",
  //         href: "/",
  //       },
  //       {
  //         icon: BiSearch,
  //         label: "Search",
  //         href: "/search",
  //         active: pathname === "/search",
  //       },
  //     ],
  //     [pathname]
  //   );

  return (
    <div
      className={twMerge(
        `
        border-gray 
        flex
         h-full
         bg-gray-200
        `,
      )}
    >
      <div
        className="
          h-full 
          w-1/3
          flex-col 
          gap-y-2 
          bg-white 
          p-4
          md:flex
        "
      >
        <div className="h-5/6 overflow-y-auto">
          {session && (
            <>
              <Suspense
                fallback={
                  <div className="flex w-full flex-col gap-4">LOADING</div>
                }
              >
                <VoiceList />
              </Suspense>
            </>
          )}
        </div>
      </div>
      <div className="h-full flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Sidebar;

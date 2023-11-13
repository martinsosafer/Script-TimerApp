"use client";

// import { HiHome } from "react-icons/hi";
// import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

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

const Sidebar = ({ children }: SidebarProps) => {
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
        flex 
        h-full
        `,
      )}
    >
      <div
        className="
          hidden 
          h-full 
          w-[300px] 
          flex-col 
          gap-y-2 
          bg-black 
          p-2 
          md:flex
        "
      >
        <div className="h-full overflow-y-auto">test</div>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;

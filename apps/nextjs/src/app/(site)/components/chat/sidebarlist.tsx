import { cache } from "react";

import { IconPlus, IconTrash } from "@voiceai/ui/@/components/ui/icons";
import { cn } from "@voiceai/ui/@/lib/utils";

import { clearChats, getChats } from "~/app/actions/chatactions";
import { ClearHistory } from "./clearhistory";
import { SidebarItems } from "./sidebaritems";

// import { clearChats, getChats } from "@/app/actions";

// import { ClearHistory } from "@/components/clear-history";
// import { SidebarItems } from "@/components/sidebar-items";
// import { ThemeToggle } from "@/components/theme-toggle";

interface SidebarListProps {
  userId?: string;
  children?: React.ReactNode;
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId);
});

export async function SidebarList({ userId }: SidebarListProps) {
  const chats = await loadChats(userId);
  return (
    <div className="flex flex-1 flex-col ">
      <div className="flex-1 overflow-auto">
        {chats?.length ? (
          <div className="mb space-y-2 px-2">
            <SidebarItems chats={chats} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        )}
      </div>
      <div className=" mb-[100px] ml-2  flex items-center justify-between">
        {/* <ThemeToggle /> */}
        <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} />
      </div>
    </div>
  );
}

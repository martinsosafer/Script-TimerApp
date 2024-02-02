import { cache } from "react";

import { IconPlus, IconTrash } from "@voiceai/ui/@/components/ui/icons";
import { cn } from "@voiceai/ui/@/lib/utils";

import { clearChats, getChats } from "~/app/actions/chatactions";
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

export function SidebarList({ userId }: SidebarListProps) {
  const chats= await getChats(userId)
  return (
    <div className="flex flex-1 flex-col ">
      <div className="flex-1 overflow-auto">
        {chats?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems  userId={userId} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        )}
      </div>
      <div className=" felx items-end justify-between p-4">
        {/* <ThemeToggle /> */}
        <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} />
        
      </div>
    </div>
  );
}

import { cache } from "react";
import Link from "next/link";

import { buttonVariants } from "@voiceai/ui/@/components/ui/button";
import { IconPlus, IconTrash } from "@voiceai/ui/@/components/ui/icons";
import { cn } from "@voiceai/ui/@/lib/utils";

import { SidebarItems } from "./sidebaritems";

// import { clearChats, getChats } from "@/app/actions";

// import { ClearHistory } from "@/components/clear-history";
// import { SidebarItems } from "@/components/sidebar-items";
// import { ThemeToggle } from "@/components/theme-toggle";

interface Message {
  id: number;
  text: string;
}

interface SidebarListProps {
  userId?: string;
  children?: React.ReactNode;
  messages: Message[];
}

// const loadChats = cache(async (userId?: string) => {
//   return await getChats(userId);
// });

export function SidebarList({ messages, userId }: SidebarListProps) {
  return (
    <div className="flex flex-1 flex-col ">
      <div className="flex-1 overflow-auto">
        {messages?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems messages={messages} userId={userId} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        )}
      </div>
      <div className=" felx items-end justify-between p-4">
        {/* <ThemeToggle /> */}
        {/* <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} /> */}
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            " w-50 ml-26 h-10 justify-end bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10",
          )}
        >
          <IconTrash className="-translate-x-2 stroke-2" />
          Clear History
        </div>
      </div>
    </div>
  );
}

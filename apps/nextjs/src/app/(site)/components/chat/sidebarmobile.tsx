"use client";

import Link from "next/link";

import { Button } from "@voiceai/ui";
import { buttonVariants } from "@voiceai/ui/@/components/ui/button";
import { IconPlus, IconSidebar } from "@voiceai/ui/@/components/ui/icons";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@voiceai/ui/@/components/ui/sheet";
import { cn } from "@voiceai/ui/@/lib/utils";

import { Leftbar } from "./leftbar";

interface SidebarMobileProps {
  children: React.ReactNode;
}

export function SidebarMobile({ children }: SidebarMobileProps) {
  return (
    <div className="flex justify-between">
      <Sheet>
        <SheetTrigger asChild className=" ml-8 gap-1">
          <Button
            variant="outline"
            className="size-9 -ml-2 flex p-0 dark:hover:bg-white lg:hidden"
          >
            <h3 className=" dark:text-primary">Chat history</h3>
            <IconSidebar className="size-6 " />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
        >
          <Leftbar className="flex bg-gradient-to-b from-blue-700 via-blue-800">
            {children}
          </Leftbar>
        </SheetContent>
      </Sheet>
      <div className="mr-4 md:hidden lg:hidden">
        <Link
          href="/chat"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mr-6 h-8  w-full justify-center bg-primary text-primary-foreground  shadow-none transition-colors hover:bg-primary-foreground hover:text-primary dark:bg-zinc-900 dark:text-secondary-foreground dark:hover:bg-white dark:hover:text-primary-foreground",
          )}
        >
          <IconPlus className="-translate-x-2 stroke-2 " />
          New Chat
        </Link>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@voiceai/ui";
import { IconSidebar } from "@voiceai/ui/@/components/ui/icons";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@voiceai/ui/@/components/ui/sheet";

import { Leftbar } from "./leftbar";

interface SidebarMobileProps {
  children: React.ReactNode;
}

export function SidebarMobile({ children }: SidebarMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild className=" ml-8 gap-1">
        <Button variant="outline" className="size-9 -ml-2 flex p-0 lg:hidden">
          <h3 className="light:text-secondary dark:text-primary">
            Chat history
          </h3>
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
  );
}

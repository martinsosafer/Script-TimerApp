import * as React from "react";

import { Button } from "@voiceai/ui/@/components/ui/button";
import { Icons } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@voiceai/ui/@/components/ui/sheet";

import { Library } from "../library/library";

interface ToggleAudioProps {}
// export function ToggleAudio({ audio, ref }: ToggleAudioProps) {
export const ToggleLibrary = React.forwardRef(({}: ToggleAudioProps, ref) => {
  return (
    <div className="grid gap-2">
      <Sheet>
        <SheetTrigger asChild ref={ref as React.Ref<HTMLButtonElement>}>
          <Button type="button" size="sm" className="px-3">
            <Icons.SoundLibrary className="mr-2 h-4 w-4 " />
            Library
            <span className="sr-only">Library</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Voice Library</SheetTitle>
            <SheetDescription>
              Listen to your voice. You can also download it, just hit play!
            </SheetDescription>
          </SheetHeader>
          <Library />
        </SheetContent>
      </Sheet>
    </div>
  );
});
ToggleLibrary.displayName = "ToggleLibrary";

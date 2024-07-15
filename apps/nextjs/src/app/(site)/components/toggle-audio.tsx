import * as React from "react";

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@voiceai/ui/@/components/ui/sheet";
import { MagicWandIcon, SpeakerLoudIcon } from "@voiceai/ui/@/icons/icons";

interface ToggleAudioProps {
  audio: string;
  isSubscriptionActive?: boolean;
}

export const ToggleAudio = React.forwardRef(
  ({ audio, isSubscriptionActive }: ToggleAudioProps, ref) => {
    return (
      <div className="grid gap-2">
        <Sheet>
          <SheetTrigger asChild ref={ref as React.Ref<HTMLButtonElement>}>
            <Button
              type="button"
              size="sm"
              className="rounded-xl bg-primary px-3 font-bold hover:text-tertiary"
            >
              <MagicWandIcon />
              <SpeakerLoudIcon />
              <span className="sr-only">Player</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Voice Player</SheetTitle>
              <SheetDescription>
                Listen to your voice. You can also download it, just hit play!
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                {audio ? (
                  <audio
                    controls
                    src={audio}
                    controlsList={isSubscriptionActive ? "" : "nodownload"}
                    className="col-span-2 col-start-2 mx-auto w-full"
                  />
                ) : (
                  <h3 className="col-span-2 col-start-2 mx-auto w-full">
                    No audio generated, make a voice by creating one in the
                    Script Voice console
                  </h3>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  },
);
ToggleAudio.displayName = "ToggleAudio";

"use client";

import { forwardRef, Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@voiceai/ui/@/components/ui/dialog";

import { VoiceList } from "./list";

export const VoiceSettingsModal = forwardRef<
  React.ElementRef<"button">,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...rest }, ref) => {
  const profileModalRef = useRef<HTMLButtonElement>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger {...rest} ref={ref} />
        <DialogContent className="max-w-6xl overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Choose Voice</DialogTitle>
          </DialogHeader>
          <Suspense
            fallback={<div className="flex w-full flex-col gap-4">LOADING</div>}
          >
            <VoiceList />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
});
VoiceSettingsModal.displayName = "VoiceSettingsModal";

export const VoiceSettings = ({ ...rest }) => {
  const profileModalRef = useRef<HTMLButtonElement>(null);

  return (
    <div {...rest}>
      <VoiceSettingsModal ref={profileModalRef} />
      <Button
        className="my-4 w-full"
        onClick={() => profileModalRef.current?.click()}
      >
        Voice Settings{" "}
      </Button>
    </div>
  );
};

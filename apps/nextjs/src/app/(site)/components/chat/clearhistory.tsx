"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@voiceai/ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@voiceai/ui/@/components/ui/alert-dialog";
import { IconSpinner, IconTrash } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import type { ServerActionResult } from "~/lib/types";

interface ClearHistoryProps {
  isEnabled: boolean;
  clearChats: () => ServerActionResult<void>;
}

export function ClearHistory({
  isEnabled = false,
  clearChats,
}: ClearHistoryProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-5 text-primary-foreground hover:bg-red-600 dark:border-foreground dark:text-foreground"
          disabled={!isEnabled || isPending}
        >
          {isPending && <IconSpinner className="mr-2" />}
          <IconTrash />
          Clear history
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className=" text-red-600">ALL YOUR CHAT HISTORY</span> and
            <span className="text-red-600"> REMOVE ALL YOUR DATA </span>from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              startTransition(() => {
                clearChats().then((result) => {
                  if (result && "error" in result) {
                    toast({
                      title: "Something went wrong",
                      description: "Please try again later",
                    });
                  }

                  setOpen(false);
                  router.push("/chat");
                  router.refresh();
                });
              });
            }}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

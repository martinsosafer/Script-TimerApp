"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Router } from "next/router";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@voiceai/ui/@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@voiceai/ui/@/components/ui/dialog";
import { Icons, IconTrash } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import type { PopoverProps } from "@voiceai/ui/@/components/ui/popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@voiceai/ui/@/components/ui/popover";
import { toast } from "@voiceai/ui/@/components/ui/toast";
import { cn } from "@voiceai/ui/@/lib/utils";

import { api } from "~/utils/api";

interface ScriptSelectorProps extends PopoverProps {
  script: string;
  onSaveScript: (script: string) => void;
}
const DeleteButton = ({ scriptId }) => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const { data: scriptDetails } = api.script.get.useQuery(
    { id: scriptId },
    { enabled: Boolean(scriptId) },
  );
  const { mutateAsync: deleteScript } = api.script.delete.useMutation({
    onSuccess() {
      toast({
        title: "Script deleted",
        description: "Your script has been deleted",
      });

      router.push("/texttospeech");
      router.refresh();
    },
    onError(error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
      });
    },
  });
  React.useEffect(() => {
    if (scriptDetails) {
      setName(scriptDetails.name);
    }
  }, [scriptDetails]);
  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className="text-red-600"
        onClick={() => setOpenDelete(true)}
      >
        <IconTrash className="mr-2 h-4 w-4" />
      </Button>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete script</DialogTitle>
            <DialogDescription>
              'This will delete your script'
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" id="name">
                Name
              </Label>
              <Input
                id="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={name.length === 0}
              onClick={() => {
                deleteScript({ id: scriptId });
              }}
              className="gap-1 bg-red-600"
            >
              <IconTrash />
              {loading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>Delete</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export function ScriptSelector({ ...props }: ScriptSelectorProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const { scriptId } = useParams();

  const { data: scriptDetails } = api.script.get.useQuery(
    { id: scriptId?.[0] ?? "" },
    { enabled: Boolean(scriptId?.[0]) },
  );

  const { data: scripts = [] } = api.script.list.useQuery();

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a saved script..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {scriptDetails?.id ? scriptDetails.name : "Use a saved script..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search scripts..." />
          <CommandEmpty>No scripts found.</CommandEmpty>

          <CommandGroup heading="Your scripts">
            {scripts.map((script) => (
              <CommandItem key={script.id}>
                <Button
                  variant="invisible"
                  key={script.id}
                  onClick={() => {
                    router.push(`/texttospeech/${script.id}`, {
                      scroll: false,
                    });

                    setOpen(false);
                  }}
                >
                  {script.name}
                </Button>

                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    scriptDetails?.id === script.id
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                <DeleteButton scriptId={script.id} />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

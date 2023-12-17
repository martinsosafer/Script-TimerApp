"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@voiceai/ui/@/components/ui/command";
import type { PopoverProps } from "@voiceai/ui/@/components/ui/popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@voiceai/ui/@/components/ui/popover";
import { cn } from "@voiceai/ui/@/lib/utils";

import { api } from "~/utils/api";

type ScriptSelectorProps = PopoverProps;

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
          {scriptDetails?.id ? scriptDetails.name : "Load a saved script..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search scripts..." />
          <CommandEmpty>No scripts found.</CommandEmpty>
          <CommandGroup className="pt-0">
            <CommandItem onSelect={() => router.push("/dashboardv2")}>
              Create New
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Examples">
            {scripts.map((script) => (
              <CommandItem
                key={script.id}
                onSelect={() => {
                  router.push(`/dashboardv2/${script.id}`, { scroll: false });
                  setOpen(false);
                }}
              >
                {script.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    scriptDetails?.id === script.id
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup className="pt-0">
            <CommandItem onSelect={() => router.push("/examples")}>
              More examples
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

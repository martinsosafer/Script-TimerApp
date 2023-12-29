"use client";

import * as React from "react";

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@voiceai/ui/@/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { Label } from "@voiceai/ui/@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@voiceai/ui/@/components/ui/popover";
import type { PopoverProps } from "@voiceai/ui/@/components/ui/popover";
import { useMutationObserver } from "@voiceai/ui/@/hooks/use-mutation-observer";
import { CaretSortIcon, CheckIcon } from "@voiceai/ui/@/icons/icons";
import { cn } from "@voiceai/ui/@/lib/utils";

import type { Prompt, PromptType } from "../data/prompts";

interface PromptSelectorProps extends PopoverProps {
  types: readonly PromptType[];
  prompts: Prompt[];
  onPromptSelect: React.Dispatch<React.SetStateAction<null>>;
}

export function ChatPromptSelector({
  prompts,
  types,
  onPromptSelect,
  ...props
}: PromptSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedPrompt, setSelectedPrompt] = React.useState<Prompt | null>(
    null,
  );
  const [peekedPrompt, setPeekedPrompt] = React.useState<Prompt | null>(null);

  return (
    <div className="grid w-full gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">What do you want to make today?</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The model which will generate the completion. Some models are suitable
          for natural language tasks, others specialize in code. Learn more.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a prompt"
            className="w-full justify-between"
          >
            {selectedPrompt ? selectedPrompt.name : "Select a prompt..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <HoverCard>
            {/* <HoverCardContent
              side="left"
              align="start"
              forceMount
              className="min-h-[280px]"
            >
              {peekedPrompt && (
                <>
                  <div className="grid gap-2">
                    <h4 className="font-medium leading-none">
                      {peekedPrompt.name}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {peekedPrompt.description}
                    </div>
                    {peekedPrompt.strengths ? (
                      <div className="mt-4 grid gap-2">
                        <h5 className="text-sm font-medium leading-none">
                          Strengths
                        </h5>
                        <ul className="text-sm text-muted-foreground">
                          {peekedPrompt.strengths}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </HoverCardContent> */}
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Prompts..." />
                <CommandEmpty>No Prompts found.</CommandEmpty>
                <HoverCardTrigger />
                {types.map((type) => (
                  <>
                    <CommandGroup key={type} heading={type}>
                      {prompts
                        .filter((prompt) => prompt.type === type)
                        .map((prompt) => (
                          <ModelItem
                            key={prompt.id}
                            prompt={prompt}
                            isSelected={selectedPrompt?.id === prompt.id}
                            onPeek={(prompt) => setPeekedPrompt(prompt)}
                            onSelect={() => {
                              // @ts-expect-error dunno why cant type this
                              onPromptSelect(prompt);
                              setSelectedPrompt(prompt);
                              setOpen(false);
                            }}
                          />
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface PromptItemProps {
  prompt: Prompt;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (prompt: Prompt) => void;
}

function ModelItem({ prompt, isSelected, onSelect, onPeek }: PromptItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "aria-selected") {
          onPeek(prompt);
        }
      }
    }
  });

  return (
    <CommandItem
      key={prompt.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {prompt.name}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0",
        )}
      />
    </CommandItem>
  );
}

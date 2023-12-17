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

import { api } from "~/utils/api";
import type { Model, ModelType } from "../data/models";

export const genders = ["male", "female"] as const;

interface ModelSelectorProps extends PopoverProps {
  types: readonly ModelType[];
  models: Model[];
  onModelSelect: React.Dispatch<React.SetStateAction<null>>;
}

export function ModelSelector({
  models,
  types,
  onModelSelect,
  ...props
}: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const { data: voices = [] } = api.voice.list.useQuery({ name: "" });

  const [selectedModel, setSelectedModel] = React.useState<Model>(voices[0]);
  const [peekedModel, setPeekedModel] = React.useState<Model>(voices[0]);

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Model</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The voices which will generate the script. Voices differ in everything
          from age, style, accent, gender, and more.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {selectedModel ? selectedModel.name : "Select a model..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <HoverCardContent
              side="left"
              align="start"
              forceMount
              className="min-h-[280px]"
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">
                  {peekedModel?.name}
                </h4>
                <div className="text-sm text-muted-foreground">
                  description here
                </div>
                {peekedModel?.strengths ? (
                  <div className="mt-4 grid gap-2">
                    <h5 className="text-sm font-medium leading-none">
                      Strengths
                    </h5>
                    <ul className="text-sm text-muted-foreground">
                      strengths here
                    </ul>
                  </div>
                ) : null}
              </div>
            </HoverCardContent>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Models..." />
                <CommandEmpty>No Models found.</CommandEmpty>
                <HoverCardTrigger />
                {genders.map((type) => (
                  <CommandGroup
                    key={type}
                    heading={type}
                    className="capitalize"
                  >
                    {voices
                      .filter(
                        (voice) => voice?.metadata?.labels?.gender === type,
                      )
                      .map((voice) => (
                        <ModelItem
                          key={voice.id}
                          model={voice}
                          isSelected={selectedModel?.id === voice.id}
                          onPeek={(model) => setPeekedModel(voice)}
                          onSelect={() => {
                            setSelectedModel(voice);
                            onModelSelect(voice);
                            setOpen(false);
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface ModelItemProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: Model) => void;
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "aria-selected") {
          onPeek(model);
        }
      }
    }
  });

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.name}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0",
        )}
      />
    </CommandItem>
  );
}

"use client";

import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@voiceai/ui/@/components/ui/accordion";
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

export function ChatPromptAccordion({
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
    <Accordion type="multiple" className="w-full">
      {/* <AccordionItem value="item-1">
        <AccordionTrigger>
          GRAB ATTENTION WITH HEADLINES & OPENINGS
        </AccordionTrigger>
        <AccordionContent>
          GENERATE FOUR ATTENTION GRABBING HEADLINES
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem> */}
      <AccordionItem value="item-3">
        <AccordionTrigger>IMPROVE YOUR SPEECH</AccordionTrigger>
        <AccordionContent>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-5">
              <AccordionTrigger>ESSENTIAL SPEECH IMPROVEMENTS</AccordionTrigger>
              <AccordionContent>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      Suggest great endings & call em' to action
                    </AccordionTrigger>
                    <AccordionContent>
                      I'd be happy to help you write a great ending and call to
                      action for your speech. Please send over the script you'd
                      like me to work on.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger>
                      Make my speech less boring
                    </AccordionTrigger>
                    <AccordionContent>
                      I'd be happy to help make your speech more exciting.
                      Please send over the script you'd like me to work on.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

"use client";

import * as React from "react";
import type { SliderProps } from "@radix-ui/react-slider";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { Slider } from "@voiceai/ui/@/components/ui/slider";

interface SimilaritySelectorProps {
  value: SliderProps["value"];
  onValueChange?: SliderProps["onValueChange"];
}

export function SimilaritySelector({
  value,
  onValueChange,
}: SimilaritySelectorProps) {
  return (
    <div className="grid gap-2 ">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="similarity">Similarity Boost</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="similarity"
              max={1}
              defaultValue={value}
              step={0.1}
              onValueChange={onValueChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Similarity"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The similarity slider dictates how closely the AI should adhere to the
          original voice when attempting to replicate it. If the original audio
          is of poor quality and the similarity slider is set too high, the AI
          may reproduce artifacts or background noise when trying to mimic the
          voice if those were present in the original recording.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

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

interface StyleSelectorProps {
  value: SliderProps["value"];
  onValueChange?: SliderProps["onValueChange"];
  disabled?: boolean;
}

export function StyleSelector({
  value,
  onValueChange,
  disabled = false,
}: StyleSelectorProps) {
  return (
    <div
      className={`grid gap-2 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="style"
                className={disabled ? "text-muted-foreground" : ""}
              >
                Style
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="style"
              min={0}
              max={1.0}
              defaultValue={[0]}
              step={0.1}
              value={value}
              onValueChange={onValueChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Style"
              disabled={disabled}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Determines the style exaggeration of the voice. This setting attempts
          to amplify the style of the original speaker. It does consume
          additional computational resources and might increase latency if set
          to anything other than 0.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

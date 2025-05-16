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

interface SpeedSelectorProps {
  value: SliderProps["value"];
  onValueChange?: SliderProps["onValueChange"];
  disabled?: boolean;
}

export function SpeedSelector({
  value,
  onValueChange,
  disabled = false,
}: SpeedSelectorProps) {
  return (
    <div
      className={`grid gap-2 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="speed"
                className={disabled ? "text-muted-foreground" : ""}
              >
                Speed
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="speed"
              min={0.7}
              max={1.2}
              defaultValue={[1.0]}
              step={0.1}
              value={value}
              onValueChange={onValueChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Speed"
              disabled={disabled}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controls the speed of the generated speech. Values range from 0.7 to
          1.2, with 1.0 being the default speed. Lower values create slower,
          more deliberate speech while higher values produce faster-paced
          speech. Extreme values can impact the quality of the generated speech.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

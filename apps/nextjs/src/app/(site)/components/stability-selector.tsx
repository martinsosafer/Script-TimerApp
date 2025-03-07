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

interface StabilitySelectorProps {
  value: SliderProps["value"];
  onValueChange?: SliderProps["onValueChange"];
  disabled?: boolean; // Add disabled prop
}

export function StabilitySelector({
  value,
  onValueChange,
  disabled = false, // Default to false
}: StabilitySelectorProps) {
  return (
    <div
      className={`mt-1 grid gap-2 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="top-p"
                className={disabled ? "text-muted-foreground" : ""}
              >
                Stability
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="top-p"
              max={1}
              defaultValue={value}
              step={0.1}
              onValueChange={onValueChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Top P"
              disabled={disabled} // Disable the slider
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The stability slider determines how stable the voice is and the
          randomness between each generation. Lowering this slider introduces a
          broader emotional range for the voice. As mentioned before, this is
          also influenced heavily by the original voice. Setting the slider too
          low may result in odd performances that are overly random and cause
          the character to speak too quickly. On the other hand, setting it too
          high can lead to a monotonous voice with limited emotion.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

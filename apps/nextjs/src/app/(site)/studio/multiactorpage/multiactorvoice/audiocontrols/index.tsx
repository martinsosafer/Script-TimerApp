// components/AudioControls.tsx
"use client";

import { Button } from "@voiceai/ui";
import {
  IconClock as Clock,
  IconVolumeX as Mute,
  IconVolume2 as Volume,
} from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Slider } from "@voiceai/ui/@/components/ui/slider";

interface AudioControlsProps {
  volume: number;
  muted: boolean;
  delay: number;
  onVolumeChange: (value: number) => void;
  onToggleMute: () => void;
  onDelayChange: (value: number) => void;
}

export function AudioControls({
  volume,
  muted,
  delay,
  onVolumeChange,
  onToggleMute,
  onDelayChange,
}: AudioControlsProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">Delay:</span>
          <Input
            type="number"
            step="100"
            value={delay}
            onChange={(e) => onDelayChange(Number(e.target.value))} // Remove the || 0 to allow negatives
            className="h-7 w-20 text-xs"
          />
          <span className="text-xs text-muted-foreground">ms</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggleMute}
        >
          {muted ? (
            <Mute className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Volume className="h-4 w-4" />
          )}
        </Button>
        <Slider
          value={[volume]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={(value) => onVolumeChange(value[0])}
          className="w-24"
          disabled={muted}
        />
      </div>
    </div>
  );
}

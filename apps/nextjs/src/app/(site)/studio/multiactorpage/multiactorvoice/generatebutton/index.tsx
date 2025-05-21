// components/GenerateButton.tsx
"use client";

import { Button } from "@voiceai/ui";
import {
  IconSpinner as Loader2,
  IconMic as Mic,
  IconStop as Pause,
  IconPlay as Play,
} from "@voiceai/ui/@/components/ui/icons";

interface GenerateButtonProps {
  isGenerating: boolean;
  isPlaying: boolean;
  hasAudio: boolean;
  needsRegeneration?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function GenerateButton({
  isGenerating,
  isPlaying,
  hasAudio,
  needsRegeneration = false,
  disabled = false,
  onClick,
}: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isGenerating}
      className="h-10"
      variant="outline"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : isPlaying ? (
        <>
          <Pause className="mr-2 h-4 w-4" />
          Pause
        </>
      ) : hasAudio && !needsRegeneration ? (
        <>
          <Play className="mr-2 h-4 w-4" />
          Play
        </>
      ) : (
        <>
          <Mic className="mr-2 h-4 w-4" />
          Generate
        </>
      )}
    </Button>
  );
}

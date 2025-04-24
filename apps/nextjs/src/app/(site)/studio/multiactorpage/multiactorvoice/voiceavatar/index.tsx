// components/VoiceAvatar.tsx
"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import { IconPlus as Plus } from "@voiceai/ui/@/components/ui/icons";

interface VoiceAvatarProps {
  voice: Voice | null;
  isActive: boolean;
  onClick: () => void;
}

export function VoiceAvatar({ voice, isActive, onClick }: VoiceAvatarProps) {
  return (
    <div className="relative">
      <Avatar
        className="h-14 w-14 flex-shrink-0 cursor-pointer border"
        onClick={onClick}
      >
        <AvatarImage
          src={voice?.picture || "/placeholder.svg"}
          alt={voice?.name || "Select voice"}
        />
        <AvatarFallback className="text-lg">
          {voice?.name?.substring(0, 2) || "?"}
        </AvatarFallback>
      </Avatar>
      {!voice && (
        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Plus className="h-3 w-3 text-white" />
        </div>
      )}
    </div>
  );
}

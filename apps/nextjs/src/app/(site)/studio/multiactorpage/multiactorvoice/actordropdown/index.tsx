// components/VoiceDropdown.tsx
"use client";

import { useEffect, useState } from "react";

import { Button } from "@voiceai/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import { IconSearch as Search } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { ScrollArea } from "@voiceai/ui/@/components/ui/scroll-area";
import { Separator } from "@voiceai/ui/@/components/ui/separator";

import type { Voice } from "~/constants/types/voice";

interface VoiceDropdownProps {
  isOpen: boolean;
  voices: Voice[];
  recentlyUsed: Voice[];
  searchQuery: string;
  onSelect: (voice: Voice) => void;
  onSearch: (query: string) => void;
  onToggleFavorite: (voice: Voice) => void;
}

export function VoiceDropdown({
  isOpen,
  voices,
  recentlyUsed,
  searchQuery,
  onSelect,
  onSearch,
  onToggleFavorite,
}: VoiceDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-16 z-50 w-64 rounded-md border bg-card shadow-lg">
      <div className="p-2">
        <div className="relative mb-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search voices..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {recentlyUsed.length > 0 && (
          <>
            <div className="mb-1 px-2 text-xs font-medium text-muted-foreground">
              Recently Used
            </div>
            <div className="mb-2 grid gap-1">
              {recentlyUsed.map((voice) => (
                <button
                  key={`recent-${voice.id}`}
                  className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-muted"
                  onClick={() => onSelect(voice)}
                >
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage
                      src={voice.picture || "/placeholder.svg"}
                      alt={voice.name}
                    />
                    <AvatarFallback>
                      {voice.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p>{voice.name}</p>
                  </div>
                </button>
              ))}
            </div>
            <Separator className="my-2" />
          </>
        )}

        <ScrollArea className="h-[250px]">
          <div className="grid gap-1">
            {voices.map((voice) => (
              <button
                key={voice.id}
                className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-muted"
                onClick={() => onSelect(voice)}
              >
                <Avatar className="h-10 w-10 border">
                  <AvatarImage
                    src={voice.picture || "/placeholder.svg"}
                    alt={voice.name}
                  />
                  <AvatarFallback>{voice.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{voice.name}</p>
                  <p className="text-sm lowercase text-muted-foreground">
                    {voice.gender} • {voice.type}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(voice);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={voice.favorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-yellow-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </Button>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

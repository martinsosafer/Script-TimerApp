"use client";

import { useEffect, useState } from "react";

import { Button } from "@voiceai/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import {
  IconHeart,
  IconHeartFill,
  IconSearch as Search,
} from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { ScrollArea } from "@voiceai/ui/@/components/ui/scroll-area";
import { Separator } from "@voiceai/ui/@/components/ui/separator";
import { toast } from "@voiceai/ui/@/components/ui/toast";
import { api } from "~/utils/api";

import type { Voice } from "~/constants/types/voice";

interface VoiceDropdownProps {
  isOpen: boolean;
  favoriteVoices: Voice[];
  voices: Voice[];
  recentlyUsed: Voice[];
  searchQuery: string;
  onSelect: (voice: Voice) => void;
  onSearch: (query: string) => void;
  onToggleFavorite: (voice: Voice) => void;
  onClose: () => void;
}

export function VoiceDropdown({
  isOpen,
  voices,
  recentlyUsed,
  searchQuery,
  onSelect,
  onSearch,
  onToggleFavorite,
  onClose,
  favoriteVoices,
}: VoiceDropdownProps) {
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [optimisticFavorites, setOptimisticFavorites] =
    useState<Voice[]>(favoriteVoices);

  const { mutateAsync: favoriteVoice } = api.voice.favoriteVoice.useMutation();
  const utils = api.useContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Sync with parent when favoriteVoices changes
    setOptimisticFavorites(favoriteVoices);
  }, [favoriteVoices]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".voice-dropdown-container")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSelect = (voice: Voice) => {
    onSelect(voice);
    onClose();
  };

  const handleFavorite = async (voice: Voice) => {
    // Optimistically update the UI immediately
    const isCurrentlyFavorite = optimisticFavorites.some(
      (fav) => fav.id === voice.id,
    );
    const updatedVoice = { ...voice, favorite: !isCurrentlyFavorite };

    let newFavorites;
    if (isCurrentlyFavorite) {
      newFavorites = optimisticFavorites.filter((fav) => fav.id !== voice.id);
    } else {
      newFavorites = [...optimisticFavorites, updatedVoice];
    }

    setOptimisticFavorites(newFavorites);
    onToggleFavorite(updatedVoice);

    try {
      // Make the API call in the background
      const response = await favoriteVoice({ voice });

      if (!response.success) {
        // Revert if the API call fails
        setOptimisticFavorites(favoriteVoices);
        onToggleFavorite(voice);

        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      } else {
        // Ensure our data is fresh after the mutation
        await utils.voice.invalidate();
      }
    } catch (error) {
      console.error("Error toggling favorite voice:", error);
      // Revert on error
      setOptimisticFavorites(favoriteVoices);
      onToggleFavorite(voice);

      toast({
        title: "Something went wrong",
        description: "Please try again later",
      });
    }
  };

  // Filter voices based on gender and favorites
  const filteredVoices = voices.filter((voice) => {
    // Apply gender filter if set
    if (genderFilter && voice.gender !== genderFilter) {
      return false;
    }
    // Apply favorites filter if enabled
    if (
      showOnlyFavorites &&
      !optimisticFavorites.some((fav) => fav.id === voice.id)
    ) {
      return false;
    }
    return true;
  });

  if (!isMounted) {
    return null;
  }

  return isOpen ? (
    <div className="voice-dropdown-container absolute left-0 top-full z-50 mt-2 w-64 rounded-md border bg-card shadow-lg">
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

        {/* Filter Buttons */}
        <div className="mb-2 flex gap-2">
          {/* Favorites Filter */}
          <Button
            variant={showOnlyFavorites ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            title="Favorites"
          >
            {showOnlyFavorites ? (
              <IconHeartFill className="h-4 w-4 text-white" />
            ) : (
              <IconHeart className="h-4 w-4 text-primary" />
            )}
          </Button>
          <Button
            variant={genderFilter === null ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setGenderFilter(null)}
            title="All"
          >
            <span className="text-xs">All</span>
          </Button>
          <Button
            variant={genderFilter === "FEMALE" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setGenderFilter("FEMALE")}
            title="Female"
          >
            <span className="text-xs">♀</span>
          </Button>
          <Button
            variant={genderFilter === "MALE" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setGenderFilter("MALE")}
            title="Male"
          >
            <span className="text-xs">♂</span>
          </Button>
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
            {filteredVoices.map((voice) => (
              <button
                key={voice.id}
                className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-muted"
                onClick={() => handleSelect(voice)}
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
                    {voice.gender}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(voice);
                  }}
                >
                  {optimisticFavorites.some((fav) => fav.id === voice.id) ? (
                    <IconHeartFill className="h-4 w-4 text-primary" />
                  ) : (
                    <IconHeart className="h-4 w-4 text-primary" />
                  )}
                </Button>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  ) : null;
}

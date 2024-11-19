import React from "react";

import { Button } from "@voiceai/ui";
import {
  IconHeart,
  IconHeartFill,
  IconStop,
} from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

import { api } from "~/utils/api";

interface Voice {
  id: string;
  name: string;
  picture: string;
  metadata: {
    labels: {
      gender: string;
    };
    preview_url?: string;
  };
  favorite?: boolean | null;
}

interface VoiceCardsProps {
  voices: Voice[];
  onModelSelect: (voice: Voice) => void;
  onFavoriteChange: () => void;
  favoriteVoices: Voice[];
  currentPage: number;
  subData: { status: string };
  isGenderFiltered: boolean;
}

const VoiceCards: React.FC<VoiceCardsProps> = ({
  voices,
  onModelSelect,
  onFavoriteChange,
  favoriteVoices,
  currentPage,
  subData,
  isGenderFiltered,
}) => {
  const [audioMap, setAudioMap] = React.useState<Map<string, HTMLAudioElement>>(
    new Map(),
  );
  const [isPlaying, setIsPlaying] = React.useState<Record<string, boolean>>({});
  const [selectedVoiceId, setSelectedVoiceId] = React.useState<string | null>(
    null,
  );

  const { mutateAsync: favoriteVoice } = api.voice.favoriteVoice.useMutation({
    onSuccess(data) {
      if (data.success) {
        toast({
          title: "Voice favorited",
          description: "The voice has been added to your favorites",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      }
    },
    onError() {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
      });
    },
  });

  React.useEffect(() => {
    if (voices && voices.length > 0 && selectedVoiceId === null) {
      const defaultVoice = voices[0];
      onModelSelect(defaultVoice);
      setSelectedVoiceId(defaultVoice.id);
    }
  }, [voices, selectedVoiceId, onModelSelect]);

  const stopAllAudio = () => {
    audioMap.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setIsPlaying({});
  };

  const playAudio = (audioSrc: string, voiceId: string) => {
    const existingAudio = audioMap.get(voiceId);
    if (existingAudio) {
      existingAudio.play();
    } else {
      const newAudio = new Audio(audioSrc);
      setAudioMap((prev) => new Map(prev).set(voiceId, newAudio));
      newAudio.play();

      // Now safely add the event listener inside the block where newAudio is defined
      newAudio.addEventListener("ended", () => {
        setIsPlaying((prevState) => ({ ...prevState, [voiceId]: false }));
      });
    }
    setIsPlaying((prevState) => ({ ...prevState, [voiceId]: true }));
  };

  const stopAudio = (voiceId: string) => {
    const existingAudio = audioMap.get(voiceId);
    if (existingAudio) {
      existingAudio.pause();
      existingAudio.currentTime = 0;
      setIsPlaying((prevState) => ({ ...prevState, [voiceId]: false }));
    }
  };

  const isFavorite = (voiceId: string) =>
    favoriteVoices.some((favoriteVoice) => favoriteVoice.id === voiceId);

  const handleFavorite = async (voice: Voice) => {
    try {
      const response = await favoriteVoice({ voice });
      if (response.success) {
        voice.favorite = !voice.favorite;
        onFavoriteChange();
      }
    } catch (error) {
      console.error("Error adding favorite voice:", error);
    }
  };

  const handleVoiceCardClick = (voice: Voice) => {
    setSelectedVoiceId(voice.id);
    onModelSelect(voice);
    stopAllAudio(); // Stop all audio when selecting a new card
  };

  const handlePlayButtonClick = (voice: Voice) => {
    handleVoiceCardClick(voice);
    if (isPlaying[voice.id]) {
      stopAudio(voice.id);
    } else {
      stopAllAudio(); // Stop all audio before starting a new one
      playAudio(voice.metadata.preview_url || "", voice.id);
    }
  };

  function getIsFreeOrNoSession(status: string | undefined) {
    if (!status) return true;
    return status === "FREE";
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {voices?.map((voice, index) => {
        const isFreePlan = getIsFreeOrNoSession(subData?.status);
        const isOnFirstPage = currentPage === 1;
        const isBeyondFirstPage = currentPage > 1;
        const shouldDisableCard =
          (isFreePlan && isBeyondFirstPage) ||
          (isFreePlan &&
            isOnFirstPage &&
            ((isGenderFiltered && index >= 4) ||
              (!isGenderFiltered && index >= 8)));

        return (
          <div
            key={voice.id}
            className={`relative mb-2 rounded-lg bg-white shadow-sm dark:bg-slate-500 dark:text-secondary-foreground ${
              voice.id === selectedVoiceId
                ? "border-2 border-primary bg-blue-300 dark:border-white"
                : ""
            } ${shouldDisableCard ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            onClick={() => !shouldDisableCard && handleVoiceCardClick(voice)}
          >
            <button
              className="absolute left-0 top-0 rounded-full p-1"
              onClick={(e) => {
                e.stopPropagation();
                if (!shouldDisableCard) handleFavorite(voice);
              }}
              disabled={shouldDisableCard}
            >
              {isFavorite(voice.id) ? (
                <IconHeartFill className="h-5 w-5 text-primary" />
              ) : (
                <IconHeart className="h-5 w-5 text-primary" />
              )}
            </button>
            <div className="flex items-center p-4">
              <div className="mr-2 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                <img
                  src={voice.picture}
                  alt={voice.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-sm font-semibold dark:text-secondary-foreground">
                  {voice.name}
                </h2>
                <p className="text-xs text-gray-500 dark:text-slate-100">
                  {voice.metadata.labels.gender ?? "Unknown"}
                </p>
              </div>
              <Button
                className="ml-auto rounded-full"
                size="xs"
                type="button"
                disabled={shouldDisableCard}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!shouldDisableCard) handlePlayButtonClick(voice);
                }}
              >
                {selectedVoiceId === voice.id && isPlaying[voice.id] ? (
                  <IconStop className="h-3 w-3 text-tertiary" />
                ) : (
                  <PlayIcon className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VoiceCards;

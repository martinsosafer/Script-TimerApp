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
  };
  favorite?: boolean | null;
}
interface VoiceCardsProps {
  voices: Voice[];
  onModelSelect: (voice: Voice) => void;
  onFavoriteChange: () => void;
  favoriteVoices: Voice[];
  currentPage: number; // Add currentPage prop
  subData: { status: string }; // Add subData prop
}

const VoiceCards: React.FC<VoiceCardsProps> = ({
  voices,
  onModelSelect,
  onFavoriteChange,
  favoriteVoices,
  currentPage,
  subData,
}) => {
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<Record<string, boolean>>({});
  const [selectedVoiceId, setSelectedVoiceId] = React.useState<string | null>(
    null,
  );
  const isDisabled = currentPage >= 2 && subData.status === "FREE";
  const { mutateAsync: favoriteVoice, error } =
    api.voice.favoriteVoice.useMutation({
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
      onError(error) {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      },
    });

  React.useEffect(() => {
    setAudio(new Audio()); // only call client

    // Select default voice when the component mounts
    if (voices && voices.length > 0 && selectedVoiceId === null) {
      const defaultVoice = voices[0];
      if (defaultVoice) {
        onModelSelect(defaultVoice);
        setSelectedVoiceId(defaultVoice.id);
      }
    }
  }, [voices, selectedVoiceId, onModelSelect]);

  const playAudio = (audioSrc: string, voiceId: string) => {
    if (!audio) return;
    audio.src = audioSrc;
    audio.play();
    setIsPlaying((prevState) => ({ ...prevState, [voiceId]: true }));
    audio.addEventListener("ended", () => {
      setIsPlaying((prevState) => ({ ...prevState, [voiceId]: false }));
    });
  };

  const stopAudio = (voiceId: string) => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying((prevState) => ({ ...prevState, [voiceId]: false }));
  };
  const stopAllAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying({});
    }
  };
  const isFavorite = (voiceId: string) =>
    favoriteVoices.some((favoriteVoice) => favoriteVoice.id === voiceId);

  const handleFavorite = async (voice: Voice) => {
    try {
      const response = await favoriteVoice({ voice });
      if (response.success) {
        voice.favorite = !voice.favorite;
        onFavoriteChange(); // Refresh subscription data in the parent component
      }
    } catch (error) {
      console.error("Error adding favorite voice:", error);
    }
  };

  const handleVoiceCardClick = (voice: Voice) => {
    stopAllAudio();
    if (selectedVoiceId === voice.id) {
      if (isPlaying[voice.id]) {
        stopAudio(voice.id);
      } else {
        playAudio((voice?.metadata?.preview_url as string) ?? "", voice.id);
      }
    } else {
      onModelSelect(voice);
      setSelectedVoiceId(voice.id);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {voices?.map((voice) => (
        <div
          key={voice.id}
          className={`relative mb-2 cursor-pointer rounded-lg bg-white shadow-sm dark:bg-slate-500 dark:text-secondary-foreground ${
            voice.id === selectedVoiceId
              ? "border-2 border-primary bg-blue-300 dark:border-white"
              : ""
          } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`} // Apply styles based on isDisabled
          onClick={() => !isDisabled && handleVoiceCardClick(voice)} // Prevent click if disabled
        >
          <button
            className="absolute left-0 top-0 rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              if (!isDisabled) handleFavorite(voice); // Prevent favorite if disabled
            }}
            disabled={isDisabled} // Disable button if disabled
          >
            {isFavorite(voice.id) ? (
              <IconHeartFill className="h-5 w-5 text-primary" />
            ) : (
              <IconHeart className="h-5 w-5 text-primary" />
            )}
          </button>
          <div className="flex items-center p-4">
            <div className="mr-2 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
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
            <Button className="ml-auto rounded-full" size="xs" type="button">
              {selectedVoiceId === voice.id && isPlaying[voice.id] ? (
                <IconStop className="h-3 w-3 text-tertiary" />
              ) : (
                <PlayIcon className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoiceCards;

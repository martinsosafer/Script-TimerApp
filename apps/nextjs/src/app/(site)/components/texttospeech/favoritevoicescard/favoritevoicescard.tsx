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

interface FavoriteVoice {
  name: string;
  picture: string;
  metadata: {
    labels: {
      gender: string;
    };
    preview_url?: string;
  };
}

interface FavoriteVoiceCardsProps {
  favoriteVoices: FavoriteVoice[];
  onModelSelect: (voice: FavoriteVoice) => void;
}

const FavoriteVoiceCards: React.FC<FavoriteVoiceCardsProps> = ({
  favoriteVoices,
  onModelSelect,
}) => {
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<Record<string, boolean>>({});
  const [selectedVoiceId, setSelectedVoiceId] = React.useState<string | null>(
    null,
  );
  const { mutateAsync: favoriteVoice, error } =
    api.voice.favoriteVoice.useMutation({
      onSuccess(data) {
        if (data.success) {
          toast({
            title: "Voice favorited",
            description: "The voice has been removed from your favorite list",
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
    if (
      favoriteVoices &&
      favoriteVoices.length > 0 &&
      selectedVoiceId === null
    ) {
      const defaultVoice = favoriteVoices[0];
      if (defaultVoice) {
        onModelSelect(defaultVoice);
        setSelectedVoiceId(defaultVoice.name); // Use name as unique identifier for favorites
      }
    }
  }, [favoriteVoices, selectedVoiceId, onModelSelect]);

  const playAudio = (audioSrc: string, voiceName: string) => {
    if (!audio) return;
    audio.src = audioSrc;
    audio.play();
    setIsPlaying((prevState) => ({ ...prevState, [voiceName]: true }));
    audio.addEventListener("ended", () => {
      setIsPlaying((prevState) => ({ ...prevState, [voiceName]: false }));
    });
  };

  const stopAudio = (voiceName: string) => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying((prevState) => ({ ...prevState, [voiceName]: false }));
  };

  const handleFavorite = async (voice: Voice) => {
    try {
      const response = await favoriteVoice({ voice });
      // Update the favorite status in the voice object based on the response
      if (response.success) {
        voice.favorite = !voice.favorite; // Toggle the favorite status
      }
      onFavoriteChange(voice);
    } catch (error) {
      console.error("Error adding favorite voice:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {favoriteVoices?.map((voice) => (
        <div
          key={voice.name}
          className={`relative mb-2 cursor-pointer rounded-lg bg-white shadow-sm dark:bg-slate-500 dark:text-secondary-foreground ${
            voice.name === selectedVoiceId
              ? "border-2 border-primary bg-blue-300 dark:border-white"
              : ""
          }`}
          onClick={() => {
            onModelSelect(voice);
            setSelectedVoiceId(voice.name);
          }}
        >
          {/* Full heart icon positioned at the top left */}
          <button
            className="absolute left-0 top-0 rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              handleFavorite(voice);
            }}
          >
            {" "}
            <IconHeartFill className="h-5 w-5 text-primary" />
          </button>

          <div className="flex items-center p-4">
            {/* Profile Image */}
            <div className="mr-2 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
              <img
                src={voice.picture}
                alt={voice.name}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Name and Gender */}
            <div className="flex-grow">
              <h2 className="text-sm font-semibold dark:text-secondary-foreground">
                {voice.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-100">
                {voice.metadata.labels.gender ?? "Unknown"}
              </p>
            </div>
            {/* Button */}
            <Button
              className="ml-auto rounded-full"
              size="xs"
              type="button"
              onClick={() => {
                if (isPlaying[voice.name]) {
                  stopAudio(voice.name);
                } else {
                  playAudio(
                    (voice?.metadata?.preview_url as string) ?? "",
                    voice.name,
                  );
                }
              }}
            >
              {isPlaying[voice.name] ? (
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

export default FavoriteVoiceCards;

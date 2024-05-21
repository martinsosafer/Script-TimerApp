import React from "react";

import { Button } from "@voiceai/ui";
import { IconFileHeart, IconStop } from "@voiceai/ui/@/components/ui/icons";
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
}

interface VoiceCardsProps {
  voices: Voice[];
  onModelSelect: (voice: Voice) => void;
}

const VoiceCards: React.FC<VoiceCardsProps> = ({ voices, onModelSelect }) => {
  console.log("Voices", voices);
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
  const handleFavorite = async (voice: Voice) => {
    try {
      await favoriteVoice({ voice });
    } catch (error) {
      console.error("Error adding favorite voice:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Check if voices array is defined before mapping */}
      {voices?.map((voice) => (
        <div
          key={voice.id}
          className={`mb-2 cursor-pointer rounded-lg bg-white shadow-sm dark:bg-slate-500 dark:text-secondary-foreground ${
            voice.id === selectedVoiceId
              ? "border-2 border-primary bg-blue-300 dark:border-white"
              : ""
          }`}
          onClick={() => {
            onModelSelect(voice);
            setSelectedVoiceId(voice.id);
          }}
        >
          <div className="flex items-center p-2">
            {/* Profile Image */}
            <div className="mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
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
              <p className="text-xs text-gray-500  dark:text-slate-100">
                {voice.metadata.labels.gender ?? "Unknown"}
              </p>
            </div>
            {/* Button */}
            <Button
              className="ml-auto rounded-full"
              size="xs"
              type="button"
              onClick={() => {
                if (isPlaying[voice.id]) {
                  stopAudio(voice.id);
                } else {
                  playAudio(
                    (voice?.metadata?.preview_url as string) ?? "",
                    voice.id,
                  );
                }
              }}
            >
              {isPlaying[voice.id] ? (
                <IconStop className="h-3 w-3 text-tertiary" />
              ) : (
                <PlayIcon className="h-3 w-3" />
              )}
            </Button>
            <button
              className="ml-2 rounded-full p-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleFavorite(voice);
              }}
            >
              <IconFileHeart className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoiceCards;

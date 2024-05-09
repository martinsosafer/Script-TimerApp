import React from "react";

import { Button } from "@voiceai/ui";
import { IconStop } from "@voiceai/ui/@/components/ui/icons";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

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
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<Record<string, boolean>>({});

  const [selectedVoiceId, setSelectedVoiceId] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    setAudio(new Audio()); // only call client
  }, []);

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
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoiceCards;

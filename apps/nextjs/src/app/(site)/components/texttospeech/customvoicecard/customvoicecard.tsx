import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@voiceai/ui";
import IconUserRound, { IconStop } from "@voiceai/ui/@/components/ui/icons";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

import { api } from "~/utils/api";

interface CustomVoice {
  id: string;
  name: string;
  picture?: string;
  metadata?: {
    labels?: {
      gender?: string;
    };
  };
}

interface CustomVoiceCardsProps {
  onModelSelect: (voice: Voice) => void;
}

const CustomVoiceCards: React.FC<CustomVoiceCardsProps> = ({
  onModelSelect,
}) => {
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<Record<string, boolean>>({});
  const [selectedVoiceId, setSelectedVoiceId] = React.useState<string | null>(
    null,
  );
  const { data: customvoices = [] } =
    api.voiceCustom.listAllCustomVoices.useQuery("");
  const router = useRouter();

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
    <div>
      {customvoices.length === 0 ? (
        <div className="flex items-center justify-center p-4">
          <div className="max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <div className="flex flex-col items-center text-center">
              <IconUserRound className="mb-4 h-16 w-16 text-primary" />
              <h2 className="mb-2 text-lg font-semibold">
                Looks like you have not created a custom voice yet!
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                Please go to the voice cloning section to create one.
              </p>
              <Link
                href="/voicecloning"
                target="_blank"
                className="rounded-md bg-primary px-4 py-2 text-white"
              >
                Go to Voice Cloning
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {customvoices.map((voice) => {
            const gender = voice.metadata?.labels?.gender || "OTHER";
            return (
              <div
                key={voice.id}
                className={`relative mb-2 cursor-pointer rounded-lg bg-white shadow-sm dark:bg-slate-500 dark:text-secondary-foreground ${
                  voice.id === selectedVoiceId
                    ? "border-2 border-primary bg-blue-300 dark:border-white"
                    : ""
                }`}
                onClick={() => handleVoiceCardClick(voice)}
              >
                <div className="flex items-center p-4">
                  <div className="mr-2 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                    <IconUserRound className="text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-sm font-semibold dark:text-secondary-foreground">
                      {voice.name}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-slate-100">
                      {gender === "OTHER" ? "Cloned Voice" : gender}
                    </p>
                  </div>
                  <Button
                    className="ml-auto rounded-full"
                    size="xs"
                    type="button"
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
      )}
    </div>
  );
};

export default CustomVoiceCards;

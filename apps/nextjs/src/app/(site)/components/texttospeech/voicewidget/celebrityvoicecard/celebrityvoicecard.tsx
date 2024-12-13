"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@voiceai/ui";
import { IconStop } from "@voiceai/ui/@/components/ui/icons";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

interface CelebrityVoice {
  id: string;
  name: string;
  picture?: string;
  metadata?: {
    labels?: {
      gender?: string;
    };
    preview_url?: string; // Add preview_url to metadata
  };
}

interface CelebrityVoiceCardsProps {
  celebrityVoices: CelebrityVoice[];
  isQueryLoading: boolean;
}

const CelebrityVoiceCards: React.FC<CelebrityVoiceCardsProps> = ({
  celebrityVoices,
  isQueryLoading,
}) => {
  const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isQueryLoading) {
      setIsLoading(false);
    }
  }, [isQueryLoading]);

  useEffect(() => {
    if (currentAudioUrl) {
      const newAudio = new Audio(currentAudioUrl);
      setAudio(newAudio);

      return () => {
        if (audio) {
          audio.pause();
        }
      };
    }
  }, [currentAudioUrl]);

  const handlePlayPause = (voiceId: string, audioUrl: string | undefined) => {
    if (selectedVoiceId !== voiceId) {
      return; // Prevent playing audio for an unselected card
    }

    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
      }

      audio.onended = () => {
        setIsPlaying(false);
      };
    } else if (audioUrl) {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);

      newAudio.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const handleVoiceCardClick = (voice: CelebrityVoice) => {
    if (selectedVoiceId === voice.id) {
      return;
    } else {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }

      setSelectedVoiceId(voice.id);
      setCurrentAudioUrl(voice.metadata?.preview_url || "");
      setIsPlaying(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
        </div>
      ) : celebrityVoices.length === 0 ? (
        <div className="flex items-center justify-center p-6">
          <div className="max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <div className="flex flex-col items-center text-center">
              <h2 className="mb-2 text-lg font-semibold">
                No celebrity voices found!
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                Please check back later for more celebrity voices.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {celebrityVoices.map((voice) => {
            const gender = voice.metadata?.labels?.gender || "OTHER";
            return (
              <div
                key={voice.id}
                className={`relative mb-2 cursor-pointer rounded-lg bg-white shadow-sm ${
                  voice.id === selectedVoiceId
                    ? "border-2 border-primary bg-blue-300"
                    : ""
                }`}
                onClick={() => handleVoiceCardClick(voice)}
              >
                <div className="flex items-center p-3">
                  <div className="mr-2 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                    <img
                      src={voice.picture || "/default-avatar.png"}
                      alt={voice.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-sm font-semibold">{voice.name}</h2>
                    <p className="text-xs text-gray-500">
                      {gender === "OTHER" ? "Celebrity" : gender}
                    </p>
                  </div>
                  <Button
                    size="xs"
                    type="button"
                    className="rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause(voice.id, voice.metadata?.preview_url);
                    }}
                  >
                    {selectedVoiceId === voice.id && isPlaying ? (
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

export default CelebrityVoiceCards;

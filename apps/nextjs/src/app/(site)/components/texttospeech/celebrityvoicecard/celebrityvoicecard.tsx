"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { IconStop } from "@voiceai/ui/@/icons/icons"; // Remove PlayIcon import

import { api } from "~/utils/api"; // Make sure this imports your listCelebrity procedure

interface CelebrityVoice {
  id: string;
  name: string;
  picture?: string;
  metadata?: {
    labels?: {
      gender?: string;
    };
  };
}

interface CelebrityVoiceCardsProps {
  onModelSelect: (voice: CelebrityVoice) => void;
  celebrityVoices: CelebrityVoice[];
  isQueryLoading: boolean;
}

const CelebrityVoiceCards: React.FC<CelebrityVoiceCardsProps> = ({
  onModelSelect,
  celebrityVoices,
  isQueryLoading,
}) => {
  const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isQueryLoading) {
      setIsLoading(false);
    }
  }, [isQueryLoading]);

  const handleVoiceCardClick = (voice: CelebrityVoice) => {
    if (selectedVoiceId === voice.id) {
      setSelectedVoiceId(null); // Toggle selection
    } else {
      onModelSelect(voice);
      setSelectedVoiceId(voice.id);
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
              <IconStop className="mb-4 h-16 w-16 text-primary" />
              <h2 className="mb-2 text-lg font-semibold">
                No celebrity voices found!
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                Please check back later for more celebrity voices.
              </p>
              <Link
                href="/voicecloning"
                className="rounded-md bg-primary px-4 py-2 text-white"
              >
                Go to Voice Cloning
              </Link>
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
                  {" "}
                  {/* Adjusted padding */}
                  <div className="mr-2 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                    {" "}
                    {/* Adjusted size */}
                    <img
                      src={voice.picture || "/default-avatar.png"}
                      alt={voice.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-sm font-semibold">{voice.name}</h2>
                    <p className="text-xs text-gray-500">
                      {gender === "OTHER" ? "Celebrity Voice" : gender}
                    </p>
                  </div>
                  {/* Button removed */}
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

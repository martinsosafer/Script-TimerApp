import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@voiceai/ui";
import IconUserRound, {
  IconPlusSquareDiff,
} from "@voiceai/ui/@/components/ui/icons";

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
  onModelSelect: (voice: CustomVoice) => void;
}

const CustomVoiceCards: React.FC<CustomVoiceCardsProps> = ({
  onModelSelect,
}) => {
  const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: customvoices = [], isLoading: isQueryLoading } =
    api.voiceCustom.listAllCustomVoices.useQuery("");

  useEffect(() => {
    if (!isQueryLoading) {
      setIsLoading(false);
    }
  }, [isQueryLoading]);

  const handleVoiceCardClick = (voice: CustomVoice) => {
    if (selectedVoiceId === voice.id) {
      onModelSelect(voice);
      setSelectedVoiceId(null);
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
      ) : customvoices.length === 0 ? (
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
          {/* New Custom Voice Card */}
          <div className="relative mb-2 cursor-pointer rounded-lg border-2 border-primary bg-white shadow-sm dark:bg-slate-500 dark:text-secondary-foreground">
            <Link href="/voicecloning" target="_blank">
              <div className="flex items-center p-4">
                <div className="mr-2 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                  <IconPlusSquareDiff className="text-primary" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-sm font-semibold dark:text-secondary-foreground">
                    Add a Voice
                  </h2>
                </div>
              </div>
            </Link>
          </div>
          {/* Existing Custom Voice Cards */}
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

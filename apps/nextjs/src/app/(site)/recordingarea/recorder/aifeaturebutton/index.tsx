"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@voiceai/ui/@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@voiceai/ui/@/components/ui/tooltip";

import Button from "~/app/(site)/components/button";

interface AIFeatureButtonsProps {
  onGenerateSummary: () => void;
  onGenerateBulletPoints: () => void;
  onSortWords: () => void;
  onMainTheme: () => void;
  onUsefulCutdowns: () => void;
  onGenerateSoundBites: () => void;
  isLoading: boolean;
  audioUrl: string | null;
  videoUrl: string | null;
}

type AIFeature = {
  label: string;
  action: () => void;
  description: string;
};

export function AIFeatureButtons({
  onGenerateSummary,
  onGenerateBulletPoints,
  onSortWords,
  onMainTheme,
  onUsefulCutdowns,
  onGenerateSoundBites,
  isLoading,
  audioUrl,
  videoUrl,
}: AIFeatureButtonsProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | undefined>(
    undefined,
  );

  const features: { [key: string]: AIFeature } = {
    summary: {
      label: "Generate Summary",
      action: onGenerateSummary,
      description: "Create a concise summary of the content",
    },
    bulletPoints: {
      label: "Generate Bullet Points",
      action: onGenerateBulletPoints,
      description: "Extract key points in bullet form",
    },
    sortWords: {
      label: "Word Sorter",
      action: onSortWords,
      description: "Sort and analyze word usage",
    },
    mainTheme: {
      label: "Main Theme",
      action: onMainTheme,
      description: "Identify the primary theme of the content",
    },
    cutDowns: {
      label: "Cut Downs",
      action: onUsefulCutdowns,
      description: "Generate shorter versions of the content",
    },
    soundBites: {
      label: "Sound Bites",
      action: onGenerateSoundBites,
      description: "Extract memorable quotes or phrases",
    },
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <TooltipProvider>
          <Select onValueChange={setSelectedFeature}>
            <SelectTrigger className="w-[280px] bg-gray-100 font-semibold text-black">
              <SelectValue placeholder="Get feedback" />
            </SelectTrigger>
            <SelectContent className="z-40">
              <SelectGroup>
                <SelectLabel className="bg-gray-200">AI Features</SelectLabel>
                {Object.entries(features).map(([key, feature]) => (
                  <div key={key} className="relative">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-full">
                          <SelectItem
                            value={key}
                            className="cursor-pointer bg-gray-100"
                          >
                            {feature.label}
                          </SelectItem>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        sideOffset={5}
                        className="z-50 w-[300px] bg-gray-200 font-medium text-black"
                      >
                        <p className="text-sm">{feature.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </TooltipProvider>
      </div>
      <Button
        label="Submit"
        type="primary"
        onClick={() => selectedFeature && features[selectedFeature].action()}
        disabled={isLoading || !selectedFeature}
        className="h-7"
      />
    </div>
  );
}

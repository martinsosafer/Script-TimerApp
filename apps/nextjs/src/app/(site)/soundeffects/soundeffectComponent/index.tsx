"use client";

import { useEffect, useState } from "react";

import { Button } from "@voiceai/ui";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { IconCheck, IconInfo } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { Slider } from "@voiceai/ui/@/components/ui/slider";

import { poppins } from "~/app/fonts";
import { getUserCredits } from "../actions";
import type { SessionProps } from "../types";
import { getTotalCredits } from "../utils";

export function SoundEffectsGenerator({ subData }: SessionProps) {
  const [text, setText] = useState("");
  const [duration, setDuration] = useState(1.1);
  const [promptInfluence, setPromptInfluence] = useState(0.5);
  const [audioUrl, setAudioUrl] = useState("");
  const [isManualDuration, setIsManualDuration] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [credits, setCredits] = useState<number | undefined>(0);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);

  const totalCredits = getTotalCredits(subData?.status);

  // Update user credits
  const creditsUpdate = async () => {
    const updatedCredits = await getUserCredits(subData?.userId!);
    setCredits(updatedCredits?.credits);
    setIsLoadingCredits(false);
  };

  useEffect(() => {
    if (subData?.userId) {
      setIsLoadingCredits(true);
      creditsUpdate().catch((error) => {
        setIsLoadingCredits(false);
        console.error(error);
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsLoadingCredits(true);
    try {
      const requestBody: {
        text: string;
        duration_seconds?: number;
        prompt_influence: number;
      } = {
        text,
        prompt_influence: promptInfluence,
      };
      // Only include duration_seconds if isManualDuration is true
      if (isManualDuration) {
        requestBody.duration_seconds = duration;
      }

      const response = await fetch("/api/soundEffects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to generate sound effect");
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      await creditsUpdate();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate sound effect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-7 pt-5">
      <h3 className={`font-bold text-[#636D80] ${poppins.className}`}>
        {"Enter your prompt, and we'll create a sound for you"}
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="pb-3">
          <Label
            htmlFor="text"
            className="color-[#212121] text-sm font-semibold"
          >
            Sound Description
          </Label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your sound effect"
            required
            className="h-[48px] text-base"
            autoComplete="off"
          />
        </div>

        {/* Sliders */}
        <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row">
          {/* Duration */}
          <div className="flex w-full flex-col gap-3 lg:w-[50%] ">
            <div
              className={`flex flex-col gap-2 ${!isManualDuration ? "bg-gray-200" : null} rounded-md p-3`}
            >
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="duration"
                  className={`${!isManualDuration ? "text-gray-400" : null}`}
                >
                  Duration (seconds)
                </Label>
                <span
                  className={`text-sm ${!isManualDuration ? "text-gray-400" : null}`}
                >
                  {duration}s
                </span>
              </div>
              <Slider
                id="duration"
                min={1}
                max={30}
                step={1}
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                disabled={!isManualDuration}
              />
            </div>
            {/* Manual Duration Checkbox */}
            <div className="flex items-center gap-2 pl-1">
              <input
                type="checkbox"
                id="isManualDuration"
                checked={isManualDuration}
                onChange={(e) => setIsManualDuration(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="isManualDuration">Set duration manually</Label>
            </div>
          </div>

          {/* Prompt Influence */}
          <div className="flex lg:w-[50%] w-full flex-col gap-2 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Label htmlFor="promptInfluence">Prompt Influence</Label>
                <HoverCard openDelay={200}>
                  <HoverCardTrigger>
                    <IconInfo className="h-4 w-4 cursor-help text-gray-500" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="top">
                    <p>High: More literal interpretation of the prompt</p>
                    <p>
                      Low: More creative interpretation with added variations
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <span className="text-sm">{promptInfluence.toFixed(1)}</span>
            </div>
            <Slider
              id="promptInfluence"
              min={0}
              max={1}
              step={0.1}
              value={[promptInfluence]}
              onValueChange={(value) => setPromptInfluence(value[0])}
            />
          </div>
        </div>

        {/* Credits Info */}
        {subData?.userId ? (
          <div className="bg-cp-background w-full rounded-lg p-2 text-center text-sm">
            <p>
              <strong>1 second=40 credits</strong> - Credits remaining: 
              <strong>{isLoadingCredits ? "..." : credits}</strong>
            </p>
            <p>
              Your current plan (<strong>{subData?.status}</strong>) includes 
              <strong>{totalCredits}</strong> credits
            </p>
          </div>
        ) : null}

        <Button
          type="submit"
          className="w-full"
          variant="accent"
          size="lg"
          disabled={text.length === 0 || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
              <span className="ml-2">Generating...</span>
            </div>
          ) : (
            "Generate Sound Effect"
          )}
        </Button>
      </form>

      {audioUrl && (
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold">
            Generated Sound Effect:
          </h3>
          <audio controls src={audioUrl} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

// Add modal for non logged users
// Move audio player to box with robot (outside box)

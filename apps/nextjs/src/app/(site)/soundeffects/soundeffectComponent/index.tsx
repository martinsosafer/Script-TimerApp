"use client";

import { useState } from "react";

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

export function SoundEffectsGenerator() {
  const [text, setText] = useState("");
  const [duration, setDuration] = useState(1.1);
  const [promptInfluence, setPromptInfluence] = useState(0.5);
  const [audioUrl, setAudioUrl] = useState("");
  const [manualDuration, setManualDuration] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const requestBody: {
        text: string;
        duration_seconds?: number;
        prompt_influence: number;
      } = {
        text,
        prompt_influence: promptInfluence,
      };

      // Only include duration_seconds if manualDuration is true
      if (manualDuration) {
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
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate sound effect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mb-20 mt-10 max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h2
        className={`mb-6 text-center text-2xl font-bold ${poppins.className}`}
      >
        Sound Effects Generator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="text">Text Description</Label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your sound effect"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="manualDuration"
            checked={manualDuration}
            onChange={(e) => setManualDuration(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <Label htmlFor="manualDuration">Set duration manually</Label>
        </div>
        {manualDuration && (
          <div>
            <Label htmlFor="duration">Duration (seconds)</Label>
            <Slider
              id="duration"
              min={1}
              max={30}
              step={1}
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
            />
            <span className="text-sm text-gray-500">{duration}s</span>
          </div>
        )}
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="promptInfluence">Prompt Influence</Label>
            <HoverCard openDelay={200}>
              <HoverCardTrigger>
                <IconInfo className="h-4 w-4 cursor-help text-gray-500" />
              </HoverCardTrigger>
              <HoverCardContent className="w-[320px] text-sm" side="top">
                <p>High: More literal interpretation of the prompt</p>
                <p>Low: More creative interpretation with added variations</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <Slider
            id="promptInfluence"
            min={0}
            max={1}
            step={0.1}
            value={[promptInfluence]}
            onValueChange={(value) => setPromptInfluence(value[0])}
          />
          <span className="text-sm text-gray-500">
            {promptInfluence.toFixed(1)}
          </span>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
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

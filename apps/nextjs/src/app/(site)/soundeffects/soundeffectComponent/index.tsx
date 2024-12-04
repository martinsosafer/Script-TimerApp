"use client";

import { useState } from "react";

import { Button } from "@voiceai/ui";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { Slider } from "@voiceai/ui/@/components/ui/slider";

export function SoundEffectsGenerator() {
  const [text, setText] = useState("");
  const [duration, setDuration] = useState(1.1);
  const [promptInfluence, setPromptInfluence] = useState(0.3);
  const [audioUrl, setAudioUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/soundEffects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          duration_seconds: duration,
          prompt_influence: promptInfluence,
        }),
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
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h2 className="mb-6 text-center text-2xl font-bold">
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
        <div>
          <Label htmlFor="duration">Duration (seconds)</Label>
          <Slider
            id="duration"
            min={0.5}
            max={22}
            step={0.1}
            value={[duration]}
            onValueChange={(value) => setDuration(value[0])}
          />
          <span className="text-sm text-gray-500">{duration.toFixed(1)}s</span>
        </div>
        <div>
          <Label htmlFor="promptInfluence">Prompt Influence</Label>
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
        <Button type="submit" className="w-full">
          Generate Sound Effect
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

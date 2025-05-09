import { useState } from "react";

import type { ActorSection } from "~/constants/types/voice";

interface UseAudioGenerationProps {
  stability: number;
  similarity: number;
  speed: number;
  setActors: React.Dispatch<React.SetStateAction<ActorSection[]>>;
  actors: ActorSection[];
}

export function useAudioGeneration({
  speed,
  stability,
  similarity,
  setActors,
  actors,
}: UseAudioGenerationProps) {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateAudioForActor = async (
    actor: ActorSection,
    onWaveformReady?: (id: string, blob: Blob) => void,
  ) => {
    if (!actor.voice || !actor.text.trim()) return;

    setActors(
      actors.map((a) => (a.id === actor.id ? { ...a, isGenerating: true } : a)),
    );

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: actor.text,
          voice_id: actor.voice.external_id,
          voice_actor: actor.voice.type,
          stability: actor.stability[0],
          similarity: actor.similarity[0],
          speed: actor.speed[0],
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch audio");
      if (!response.body) throw new Error("Response body is null");

      const reader = response.body.getReader();
      const audioChunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        audioChunks.push(value);
      }

      const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
      const objectUrl = URL.createObjectURL(audioBlob);

      setActors(
        actors.map((a) =>
          a.id === actor.id
            ? {
                ...a,
                audioUrl: objectUrl,
                audioBlob: audioBlob,
                autoPlay: true,
                isGenerating: false,
              }
            : a,
        ),
      );

      // Call the waveform drawing function if provided
      if (onWaveformReady) {
        setTimeout(() => {
          onWaveformReady(actor.id, audioBlob);
        }, 500);
      }

      return objectUrl;
    } catch (error) {
      console.error("Error generating audio:", error);
      setActors(
        actors.map((a) =>
          a.id === actor.id ? { ...a, isGenerating: false } : a,
        ),
      );
      return null;
    }
  };

  const generateAllAudio = async (
    onWaveformReady?: (id: string, blob: Blob) => void,
  ) => {
    setIsGenerating(true);
    const actorsWithoutAudio = actors.filter(
      (actor) => actor.voice && actor.text.trim() && !actor.audioUrl,
    );

    for (const actor of actorsWithoutAudio) {
      await generateAudioForActor(actor, onWaveformReady);
    }
    setIsGenerating(false);
  };

  return {
    isGenerating,
    generateAudioForActor,
    generateAllAudio,
  };
}

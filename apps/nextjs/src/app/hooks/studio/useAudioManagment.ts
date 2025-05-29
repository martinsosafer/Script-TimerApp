// hooks/useAudioManagement.ts
import { useState } from "react";

import type { ActorSection, Voice } from "~/constants/types/voice";

export function useAudioManagement(initialActors: ActorSection[]) {
  const [actors, setActors] = useState<ActorSection[]>(initialActors);
  const [recentlyUsedVoices, setRecentlyUsedVoices] = useState<Voice[]>([]);

  const addNewActor = () => {
    setActors([
      ...actors,
      {
        id: crypto.randomUUID(),
        voice: null,
        text: "",
        lastGeneratedText: "",
        audioUrl: null,
        audioBlob: null,
        isPlaying: false,
        autoPlay: false,
        isGenerating: false,
        volume: 1,
        muted: false,
        delay: 0,
        stability: [0.5],
        similarity: [0.5],
        speed: [1.0],
        style: [0.0],
      },
    ]);
  };

  const removeActor = (id: string) => {
    if (actors.length > 1) {
      const actor = actors.find((a) => a.id === id);
      if (actor?.audioUrl) {
        URL.revokeObjectURL(actor.audioUrl);
      }

      setActors(actors.filter((actor) => actor.id !== id));
    }
  };

  const updateActorVoice = (actorId: string, voice: Voice) => {
    setActors(
      actors.map((actor) =>
        actor.id === actorId ? { ...actor, voice } : actor,
      ),
    );

    if (!recentlyUsedVoices.some((v) => v.id === voice.id)) {
      setRecentlyUsedVoices((prev) => [voice, ...prev].slice(0, 5));
    }
  };

  const updateActorText = (actorId: string, text: string) => {
    setActors(
      actors.map((actor) =>
        actor.id === actorId ? { ...actor, text } : actor,
      ),
    );
  };

  const updateActorDelay = (actorId: string, delay: number) => {
    setActors(
      actors.map((actor) =>
        actor.id === actorId ? { ...actor, delay } : actor,
      ),
    );
  };

  const updateActorVolume = (actorId: string, volume: number) => {
    setActors(
      actors.map((actor) => {
        if (actor.id === actorId) {
          return { ...actor, volume };
        }
        return actor;
      }),
    );
  };

  const toggleActorMute = (actorId: string) => {
    setActors((prevActors) =>
      prevActors.map((actor) => {
        if (actor.id === actorId) {
          if (actor.muted) {
            return {
              ...actor,
              muted: false,
              volume: actor.previousVolume ?? 1,
              previousVolume: undefined,
            };
          } else {
            return {
              ...actor,
              muted: true,
              previousVolume: actor.volume,
              volume: 0,
            };
          }
        }
        return actor;
      }),
    );
  };

  const handleAudioEnded = (actorId: string) => {
    setActors(
      actors.map((actor) =>
        actor.id === actorId ? { ...actor, isPlaying: false } : actor,
      ),
    );
  };

  const duplicateActor = (actorId: string) => {
    const actorToDuplicate = actors.find((a) => a.id === actorId);
    if (!actorToDuplicate) return;

    const newActor: ActorSection = {
      ...actorToDuplicate,
      id: crypto.randomUUID(),
      audioUrl: null,
      audioBlob: null,
      isPlaying: false,
      isGenerating: false,
    };

    setActors([...actors, newActor]);
  };

  const reorderActors = (actorId: string, direction: "up" | "down") => {
    const actorIndex = actors.findIndex((a) => a.id === actorId);
    if (
      (direction === "up" && actorIndex === 0) ||
      (direction === "down" && actorIndex === actors.length - 1)
    ) {
      return;
    }

    const newActors = [...actors];
    const targetIndex = direction === "up" ? actorIndex - 1 : actorIndex + 1;

    [newActors[actorIndex], newActors[targetIndex]] = [
      newActors[targetIndex],
      newActors[actorIndex],
    ];

    setActors(newActors);
  };

  return {
    actors,
    recentlyUsedVoices,
    setActors,
    addNewActor,
    removeActor,
    updateActorVoice,
    updateActorText,
    updateActorDelay,
    updateActorVolume,
    toggleActorMute,
    handleAudioEnded,
    duplicateActor,
    reorderActors,
  };
}

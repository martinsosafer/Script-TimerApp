import { useEffect, useRef } from "react";

import type { ActorSection } from "~/constants/types/voice";

interface UseAudioPlaybackProps {
  actors: ActorSection[];
  setActors: React.Dispatch<React.SetStateAction<ActorSection[]>>;
  masterVolume: number;
}

export function useAudioPlayback({
  actors,
  setActors,
  masterVolume,
}: UseAudioPlaybackProps) {
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const mergedAudioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayAudio = (actorId: string) => {
    const audioElement = audioRefs.current[actorId];
    if (!audioElement) return;

    setActors(
      actors.map((actor) => {
        if (actor.id === actorId) {
          if (actor.isPlaying) {
            audioElement.pause();
            return { ...actor, isPlaying: false };
          } else {
            audioElement.play();
            return { ...actor, isPlaying: true };
          }
        }
        return actor;
      }),
    );
  };
  const generateAndPlayAudio = async (
    actor: ActorSection,
    generateAudioFunction: (actor: ActorSection) => Promise<string | null>,
  ) => {
    if (!actor.voice || !actor.text.trim()) return;

    if (actor.audioUrl) {
      togglePlayAudio(actor.id);
      return;
    }

    try {
      const audioUrl = await generateAudioFunction(actor);
      if (!audioUrl) return;

      const audio = new Audio(audioUrl);
      audio.volume = actor.volume * masterVolume;
      audio.muted = actor.muted;

      // Set up 'ended' listener
      audio.onended = () => handleAudioEnded(actor.id);

      // Store reference
      audioRefs.current[actor.id] = audio;

      // Update actor state with audioUrl and isPlaying
      setActors((prev) =>
        prev.map((a) =>
          a.id === actor.id ? { ...a, audioUrl, isPlaying: true } : a,
        ),
      );

      // Play audio
      audio.play();
    } catch (error) {
      console.error("Error generating audio:", error);
    }
  };
  const playAllAudio = () => {
    const actorsWithAudio = actors.filter((actor) => actor.audioUrl);
    const sortedActors = [...actorsWithAudio].sort((a, b) => a.delay - b.delay);

    sortedActors.forEach((actor) => {
      const audio = audioRefs.current[actor.id];
      if (!audio) return;

      audio.volume = actor.volume * masterVolume;
      audio.muted = actor.muted;

      setTimeout(() => {
        audio.currentTime = 0;
        audio.play();

        setActors((prev) =>
          prev.map((a) => (a.id === actor.id ? { ...a, isPlaying: true } : a)),
        );
      }, actor.delay);
    });
  };

  const stopAllAudio = () => {
    actors.forEach((actor) => {
      const audio = audioRefs.current[actor.id];
      if (audio && actor.isPlaying) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setActors(actors.map((actor) => ({ ...actor, isPlaying: false })));
  };

  const handleAudioEnded = (actorId: string) => {
    setActors(
      actors.map((actor) =>
        actor.id === actorId ? { ...actor, isPlaying: false } : actor,
      ),
    );
  };

  // Update volume when masterVolume changes
  useEffect(() => {
    actors.forEach((actor) => {
      const audio = audioRefs.current[actor.id];
      if (audio) {
        audio.volume = actor.volume * masterVolume;
      }
    });
  }, [masterVolume, actors]);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      actors.forEach((actor) => {
        if (actor.audioUrl) URL.revokeObjectURL(actor.audioUrl);
      });
    };
  }, []);

  return {
    audioRefs,
    mergedAudioRef,
    togglePlayAudio,
    generateAndPlayAudio,
    playAllAudio,
    stopAllAudio,
    handleAudioEnded,
  };
}

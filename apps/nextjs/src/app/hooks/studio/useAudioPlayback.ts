"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

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
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});
  const [audioDurations, setAudioDurations] = useState<Record<string, number>>(
    {},
  );

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  // Track audio durations when audio elements are loaded
  useEffect(() => {
    const handleDurationChange = (actorId: string, duration: number) => {
      setAudioDurations((prev) => ({
        ...prev,
        [actorId]: duration,
      }));
    };

    // Set up duration change listeners for all audio elements
    actors.forEach((actor) => {
      const audio = audioRefs.current[actor.id];
      if (audio) {
        const durationChangeHandler = () => {
          handleDurationChange(actor.id, audio.duration);
        };

        // Only add listener if we don't already have the duration
        if (!audioDurations[actor.id] && audio.duration) {
          handleDurationChange(actor.id, audio.duration);
        } else if (!audioDurations[actor.id]) {
          audio.addEventListener("durationchange", durationChangeHandler);
        }

        return () => {
          audio.removeEventListener("durationchange", durationChangeHandler);
        };
      }
    });
  }, [actors, audioDurations]);

  const togglePlayAudio = async (actorId: string) => {
    const actor = actors.find((a) => a.id === actorId);
    if (!actor) return;

    if (actor.isPlaying) {
      // Stop playback immediately
      const audioElement = audioRefs.current[actorId];
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      // Clear any pending delayed playback
      if (timeoutRefs.current[actorId]) {
        clearTimeout(timeoutRefs.current[actorId]);
        delete timeoutRefs.current[actorId];
      }
      setActors(
        actors.map((a) => (a.id === actorId ? { ...a, isPlaying: false } : a)),
      );
    } else {
      await playAudioWithDelay(actorId);
    }
  };

  const playAudioWithDelay = async (actorId: string) => {
    const actor = actors.find((a) => a.id === actorId);
    if (!actor?.audioUrl) return;

    // Set isPlaying state immediately
    setActors(
      actors.map((a) => (a.id === actorId ? { ...a, isPlaying: true } : a)),
    );

    const audioElement = audioRefs.current[actorId];
    if (!audioElement) return;

    audioElement.volume = actor.muted ? 0 : actor.volume * masterVolume;

    // Clear any existing timeout for this actor
    if (timeoutRefs.current[actorId]) {
      clearTimeout(timeoutRefs.current[actorId]);
      delete timeoutRefs.current[actorId];
    }

    // Reset audio to beginning
    audioElement.currentTime = 0;

    if (actor.delay < 0) {
      // For negative delay, we start immediately but skip ahead in the audio
      const skipAheadTime = Math.abs(actor.delay) / 1000; // Convert ms to seconds
      audioElement.currentTime = skipAheadTime;
      audioElement.play().catch((error) => {
        console.error("Playback failed:", error);
        setActors(
          actors.map((a) =>
            a.id === actorId ? { ...a, isPlaying: false } : a,
          ),
        );
      });
    } else {
      // For positive delay, we wait before playing
      timeoutRefs.current[actorId] = setTimeout(() => {
        audioElement.play().catch((error) => {
          console.error("Playback failed:", error);
          setActors(
            actors.map((a) =>
              a.id === actorId ? { ...a, isPlaying: false } : a,
            ),
          );
        });
      }, actor.delay);
    }
  };

  const generateAndPlayAudio = async (
    actor: ActorSection,
    generateAudioFunction: (actor: ActorSection) => Promise<string | null>,
  ) => {
    if (!actor.voice || !actor.text.trim()) return;

    try {
      const audioUrl = await generateAudioFunction(actor);
      if (!audioUrl) return;

      const audio = new Audio(audioUrl);
      audio.volume = actor.volume * masterVolume;
      audio.muted = actor.muted;

      // Set up 'ended' listener
      audio.onended = () => handleAudioEnded(actor.id);

      // Set up 'loadedmetadata' listener to get duration
      audio.onloadedmetadata = () => {
        setAudioDurations((prev) => ({
          ...prev,
          [actor.id]: audio.duration,
        }));
      };

      // Store reference
      audioRefs.current[actor.id] = audio;

      // Update actor state with audioUrl
      setActors((prev) =>
        prev.map((a) => (a.id === actor.id ? { ...a, audioUrl } : a)),
      );

      // Play with delay
      await playAudioWithDelay(actor.id);
    } catch (error) {
      console.error("Error generating audio:", error);
    }
  };

  const playAllAudio = async () => {
    // First stop any currently playing audio
    stopAllAudio();

    // Calculate start times for each actor based on the previous actor's end time and delay
    const startTimes: Record<string, number> = {};
    let currentTime = 0;

    // Get actors with audio
    const actorsWithAudio = actors.filter((actor) => actor.audioUrl);

    for (let i = 0; i < actorsWithAudio.length; i++) {
      const actor = actorsWithAudio[i];

      if (i === 0) {
        // First actor always starts at 0
        startTimes[actor.id] = 0;
        currentTime = (audioDurations[actor.id] || 0) * 1000; // Convert to ms
      } else {
        const prevActor = actorsWithAudio[i - 1];
        const prevDuration = (audioDurations[prevActor.id] || 0) * 1000; // ms
        const prevStartTime = startTimes[prevActor.id] || 0;
        const prevEndTime = prevStartTime + prevDuration;

        // Apply the delay (can be negative for overlap)
        const startTime = prevEndTime + actor.delay;

        // Ensure we don't have a negative start time
        startTimes[actor.id] = Math.max(0, startTime);

        // Update current time
        currentTime =
          startTimes[actor.id] + (audioDurations[actor.id] || 0) * 1000;
      }
    }

    // Play each audio with its calculated start time
    actorsWithAudio.forEach((actor) => {
      const audioElement = audioRefs.current[actor.id];
      if (!audioElement) return;

      // Set volume
      audioElement.volume = actor.muted ? 0 : actor.volume * masterVolume;

      // Reset audio position
      audioElement.currentTime = 0;

      // Get the start time for this actor
      const delay = startTimes[actor.id] || 0;

      // Set the actor to playing state
      setActors((prev) =>
        prev.map((a) => (a.id === actor.id ? { ...a, isPlaying: true } : a)),
      );

      // Schedule playback
      timeoutRefs.current[actor.id] = setTimeout(() => {
        audioElement.play().catch((error) => {
          console.error("Playback failed:", error);
          setActors((prev) =>
            prev.map((a) =>
              a.id === actor.id ? { ...a, isPlaying: false } : a,
            ),
          );
        });
      }, delay);
    });
  };

  const stopAllAudio = () => {
    actors.forEach((actor) => {
      const audio = audioRefs.current[actor.id];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      // Clear any pending timeouts
      if (timeoutRefs.current[actor.id]) {
        clearTimeout(timeoutRefs.current[actor.id]);
        delete timeoutRefs.current[actor.id];
      }
    });

    setActors(actors.map((actor) => ({ ...actor, isPlaying: false })));
  };

  const handleAudioEnded = (actorId: string) => {
    // Clear the timeout if audio ended naturally
    if (timeoutRefs.current[actorId]) {
      clearTimeout(timeoutRefs.current[actorId]);
      delete timeoutRefs.current[actorId];
    }
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

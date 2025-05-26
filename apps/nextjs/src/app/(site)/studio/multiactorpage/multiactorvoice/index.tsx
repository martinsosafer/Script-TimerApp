"use client";

import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@voiceai/ui";
import Textarea from "@voiceai/ui/@/components/textarea-autosize";
import {
  IconSpinner as Loader2,
  IconMic as Mic,
  IconPlus as Plus,
  IconSave as Save,
  IconSettings as Settings,
  IconVolume2 as Volume,
} from "@voiceai/ui/@/components/ui/icons";
import { Slider } from "@voiceai/ui/@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@voiceai/ui/@/components/ui/tooltip";

import { SimilaritySelector } from "~/app/(site)/components/similarity-selector";
import { SpeedSelector } from "~/app/(site)/components/speed-selector";
import { StabilitySelector } from "~/app/(site)/components/stability-selector";
import { SpeedButton } from "~/app/(site)/components/texttospeech/Tab2/buttonmenu.tsx/speedbutton";
import { useAudioGeneration } from "~/app/hooks/studio/useAudioGeneration";
import { useAudioManagement } from "~/app/hooks/studio/useAudioManagment";
import { useAudioMerge } from "~/app/hooks/studio/useAudioMerge";
import { useAudioPlayback } from "~/app/hooks/studio/useAudioPlayback";
import { useUIState } from "~/app/hooks/studio/useUIState";
import { useVoiceFilter } from "~/app/hooks/studio/useVoiceFilter";
import { useWaveformVisualization } from "~/app/hooks/studio/useWaveformVisualization";
import type { Voice } from "~/constants/types/voice";
import { VoiceDropdown } from "./actordropdown/index";
import { ActorControls } from "./actorscontrols/index";
import { AudioControls } from "./audiocontrols/index";
import { GenerateButton } from "./generatebutton/index";
import { SettingsPanel } from "./settingspanel/index";
import { VoiceAvatar } from "./voiceavatar/index";
import { useSubscription } from "~/app/hooks/texttovoice/useSubscription";
import { StyleSelector } from "~/app/(site)/components/style-selector";

interface MultiActorVoiceProps {
  allVoices?: Voice[];
  userPlan?: string;
  subData?: string;
}

interface ActorSection {
  id: string;
  voice: Voice | null;
  text: string;
  audioUrl: string | null;
  audioBlob: Blob | null;
  isPlaying: boolean;
  autoPlay: boolean;
  isGenerating: boolean;
  volume: number;
  muted: boolean;
  delay: number;
  stability: number[];
  similarity: number[];
  speed: number[];
  style: number[];
  lastGeneratedText?: string;
  lastGeneratedVoiceId?: string;
}

// Function to get consistent color for a voice
const getVoiceColor = (
  voice: Voice | null,
  index: number,
  allActors: ActorSection[],
) => {
  if (!voice) return "border-gray-200"; // Default color for no voice

  // Check if this voice has appeared in positions 0 or 1 before
  // If so, use that color consistently
  for (let i = 0; i < allActors.length; i++) {
    const actor = allActors[i];
    if (actor.voice && actor.voice.id === voice.id) {
      // If this voice was previously in position 0, always use blue
      if (i === 0) return "border-blue-500";
      // If this voice was previously in position 1, always use orange
      if (i === 1) return "border-orange-500";
      break; // Only check the first occurrence
    }
  }

  // If this is a new voice in position 0 or 1, assign the fixed colors
  if (index === 0) return "border-blue-500";
  if (index === 1) return "border-orange-500";

  // For other positions with voices that haven't been in positions 0 or 1,
  // create a consistent mapping based on voice ID
  const voiceId = voice.id;

  // Use the voice ID to consistently map to the same color
  // Skip the first two colors (blue and orange) that are reserved for the first two positions
  const availableColors = borderColors.slice(2);
  const colorIndex =
    voiceId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    availableColors.length;

  return availableColors[colorIndex];
};

// Define border colors array for actor cards
const borderColors = [
  "border-blue-500",
  "border-orange-500",
  "border-purple-500",
  "border-green-500",
  "border-pink-500",
  "border-yellow-500",
  "border-red-500",
  "border-indigo-500",
  "border-teal-500",
];

// Define character limits based on subscription plans
const CHAR_LIMITS: Record<string, number> = {
  FREE: 500,
  FREE_TRIAL: 1600,
  STUDENT: 2000,
  CREATOR: 5000,
  BUSINESS: 10000,
  STUDENTCLMO: 2000,
  CREATORCLMO: 5000,
  BUSINESSCLMO: 10000,
  STUDENTCLYR: 2000,
  CREATORCLYR: 5000,
  BUSINESSCLYR: 10000,
};

export default function MultiActorVoice({
  allVoices = [],
  subData,
}: MultiActorVoiceProps) {
  const {
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
    duplicateActor,
    reorderActors,
  } = useAudioManagement([
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
      style: [0],
    },
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
      style: [0],
    },
  ]);
  const { favoriteVoices } = useSubscription();
  const {
    activeActorId,
    setActiveActorId,
    showAdvancedSettings,
    setShowAdvancedSettings,
    masterVolume,
    setMasterVolume,
    mergeType,
    setMergeType,
    overlapDuration,
    setOverlapDuration,
    dropdownRefs,
  } = useUIState();

  const {
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    favoriteVoicesOnly,
    setFavoriteVoicesOnly,
    genderOptions,
    typeOptions,
    filteredVoices,
    toggleFavorite,
  } = useVoiceFilter(allVoices);

  const {
    waveformCanvasRefs,
    mergedWaveformCanvasRef,
    drawWaveform,
    drawMergedWaveform,
  } = useWaveformVisualization();

  const {
    audioRefs,
    mergedAudioRef,
    togglePlayAudio,
    generateAndPlayAudio,
    playAllAudio,
    stopAllAudio,
    handleAudioEnded,
  } = useAudioPlayback({
    actors,
    setActors,
    masterVolume,
  });

  const { isGenerating, generateAudioForActor, generateAllAudio } =
    useAudioGeneration({
      setActors,
      actors,
    });

  const {
    isMergingAudio,
    mergedAudioUrl,
    mergeAudioFiles,
    cleanupMergedAudio,
  } = useAudioMerge({
    actors,
    masterVolume,
    subData,
  });

  const [isMergedAudioPlaying, setIsMergedAudioPlaying] = useState(false);
  const [autoPlayMerged, setAutoPlayMerged] = useState(false);
  const [buttonAnimating, setButtonAnimating] = useState(false);
  const [mergedAudioAnimating, setMergedAudioAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCharLimitModal, setShowCharLimitModal] = useState<string | null>(
    null,
  );
  // Add a ref to track if we're currently processing the master button action
  const isProcessingRef = useRef(false);
  // Add a ref to store generated audio blobs
  const generatedAudioBlobsRef = useRef(new Map());
  // Add a counter to track completed audio generations
  const [completedGenerations, setCompletedGenerations] = useState(0);
  // Add a ref to track total expected generations
  const totalGenerationsRef = useRef(0);
  // NEW: Add state to track batch processing
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  // Define button styles for speed and download buttons
  const buttonBaseStyle = {
    backgroundColor: "#1E88E5",
    border: "none",
    borderRadius: "8px",
    color: "white",
    padding: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
    width: "40px",
    height: "40px",
    marginLeft: "8px",
  };

  const buttonHoverStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#1976D2",
  };

  const disabledButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#90CAF9",
    cursor: "not-allowed",
    opacity: 0.6,
  };

  const handleGenerateAndPlayAudio = async (actor: ActorSection) => {
    if (actor.isPlaying) {
      togglePlayAudio(actor.id);
      return;
    }

    // Set generating state
    setActors((prev) =>
      prev.map((a) => (a.id === actor.id ? { ...a, isGenerating: true } : a)),
    );

    try {
      // Always generate if no audio exists
      if (!actor.audioUrl) {
        await generateAndPlayAudio(actor, async (a) => {
          const blob = await generateAudioForActor(a, (id, blob) => {
            if (blob) {
              drawWaveform(id, blob);
              setActors((prev) =>
                prev.map((actor) =>
                  actor.id === id
                    ? {
                        ...actor,
                        lastGeneratedText: actor.text,
                        lastGeneratedVoiceId: actor.voice?.id,
                        isGenerating: false,
                      }
                    : actor,
                ),
              );
            }
          });
          return blob;
        });
        return;
      }

      // Only check for changes if audio exists
      const needsNewAudio =
        actor.lastGeneratedText !== actor.text ||
        actor.lastGeneratedVoiceId !== actor.voice?.id;

      if (needsNewAudio) {
        await generateAndPlayAudio(actor, async (a) => {
          const blob = await generateAudioForActor(a, (id, blob) => {
            if (blob) {
              drawWaveform(id, blob);
              setActors((prev) =>
                prev.map((actor) =>
                  actor.id === id
                    ? {
                        ...actor,
                        lastGeneratedText: actor.text,
                        lastGeneratedVoiceId: actor.voice?.id,
                        isGenerating: false,
                      }
                    : actor,
                ),
              );
            }
          });
          return blob;
        });
      } else {
        togglePlayAudio(actor.id);
      }
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      // Ensure generating state is reset
      setActors((prev) =>
        prev.map((a) =>
          a.id === actor.id ? { ...a, isGenerating: false } : a,
        ),
      );
    }
  };

  // Update the needsRegeneration function
  const needsRegeneration = (actor: ActorSection) => {
    const needs =
      actor.lastGeneratedText !== actor.text ||
      actor.lastGeneratedVoiceId !== actor.voice?.id;
    console.log(`Actor ${actor.id} needs regeneration: ${needs}`, {
      lastGeneratedText: actor.lastGeneratedText,
      currentText: actor.text,
      lastGeneratedVoiceId: actor.lastGeneratedVoiceId,
      currentVoiceId: actor.voice?.id,
    });
    return needs;
  };

  useEffect(() => {
    const mergedAudio = mergedAudioRef.current;
    if (mergedAudio) {
      const handlePlay = () => setIsMergedAudioPlaying(true);
      const handlePause = () => setIsMergedAudioPlaying(false);
      const handleEnded = () => setIsMergedAudioPlaying(false);

      mergedAudio.addEventListener("play", handlePlay);
      mergedAudio.addEventListener("pause", handlePause);
      mergedAudio.addEventListener("ended", handleEnded);

      return () => {
        mergedAudio.removeEventListener("play", handlePlay);
        mergedAudio.removeEventListener("pause", handlePause);
        mergedAudio.removeEventListener("ended", handleEnded);
      };
    }
  }, [mergedAudioRef.current]);

  useEffect(() => {
    if (autoPlayMerged && mergedAudioRef.current) {
      mergedAudioRef.current.play();
      setAutoPlayMerged(false);
    }
  }, [mergedAudioUrl, autoPlayMerged]);

  // Effect to handle merging audio when all generations are complete
  useEffect(() => {
    const mergeAudio = async () => {
      // Only proceed if all generations are complete and we have blobs to merge
      if (
        completedGenerations > 0 &&
        completedGenerations === totalGenerationsRef.current &&
        generatedAudioBlobsRef.current.size > 0
      ) {
        try {
          console.log(
            `All ${completedGenerations} generations complete. Starting merge...`,
          );

          // Create a new map with only non-muted actors
          const audioMapForMerging = new Map();

          // Get all actors with voice and text
          const validActors = actors.filter(
            (actor) => actor.voice && actor.text.trim() && !actor.muted,
          );

          // Add each actor's audio to the map in the correct order
          for (const actor of validActors) {
            const audioData = generatedAudioBlobsRef.current.get(actor.id);
            if (audioData) {
              console.log(`Adding actor ${actor.id} to merge map`);
              audioMapForMerging.set(actor.id, audioData);
            }
          }

          if (audioMapForMerging.size > 0) {
            console.log(`Merging ${audioMapForMerging.size} audio files...`);

            // Directly merge the audio files and ensure waveform is drawn
            const mergeResult = await mergeAudioFiles(
              mergeType,
              overlapDuration,
              audioMapForMerging,
              // Force drawing the waveform even if it's the first click
              (blob) => {
                console.log("Drawing merged waveform immediately");
                drawMergedWaveform(blob);
              },
            );

            // Make sure no individual actor audio will play automatically
            setActors((prev) =>
              prev.map((actor) => ({
                ...actor,
                autoPlay: false,
                isPlaying: false,
              })),
            );

            // Stop any currently playing audio
            stopAllAudio();

            setAutoPlayMerged(true);
            // Add animation to button and merged audio when audio is merged
            setButtonAnimating(true);
            setMergedAudioAnimating(true);
            setTimeout(() => {
              setButtonAnimating(false);
              setMergedAudioAnimating(false);
            }, 1500);
          } else {
            console.warn("No audio to merge after filtering");
          }
        } catch (error) {
          console.error("Error merging audio:", error);
        } finally {
          // Reset the counter after merging
          setCompletedGenerations(0);
          // Reset batch processing flag
          setIsBatchProcessing(false);
        }
      }
    };

    mergeAudio();
  }, [
    completedGenerations,
    actors,
    mergeType,
    overlapDuration,
    mergeAudioFiles,
    drawMergedWaveform,
    stopAllAudio,
  ]);

  const isAnyAudioPlaying =
    actors.some((a) => a.isPlaying) || isMergedAudioPlaying;

  // FIXED: Completely rewritten handleMasterButtonClick function with better race condition handling
  const handleMasterButtonClick = async () => {
    // If already processing, return to prevent multiple executions
    if (isProcessingRef.current || isBatchProcessing) return;

    // If audio is playing, stop it but don't change button text
    if (isAnyAudioPlaying) {
      stopAllAudio();
      if (mergedAudioRef.current) {
        mergedAudioRef.current.pause();
        mergedAudioRef.current.currentTime = 0;
        setIsMergedAudioPlaying(false);
      }
      return;
    }

    // Set processing flags IMMEDIATELY
    isProcessingRef.current = true;
    setIsBatchProcessing(true);

    // Clear previous generated blobs and reset counters
    generatedAudioBlobsRef.current.clear();
    setCompletedGenerations(0);

    // IMMEDIATELY clear all autoPlay flags and stop any audio
    setActors((prev) =>
      prev.map((a) => ({
        ...a,
        autoPlay: false,
        isPlaying: false,
      })),
    );

    // Clear audio element states immediately
    Object.values(audioRefs.current).forEach((audioElement) => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    });

    // Clear any existing merged waveform canvas
    if (mergedWaveformCanvasRef.current) {
      const ctx = mergedWaveformCanvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(
          0,
          0,
          mergedWaveformCanvasRef.current.width,
          mergedWaveformCanvasRef.current.height,
        );
      }
    }

    try {
      // Get actors with voice and text
      const actorsToGenerate = actors.filter(
        (actor) => actor.voice && actor.text.trim(),
      );

      if (actorsToGenerate.length === 0) {
        isProcessingRef.current = false;
        setIsBatchProcessing(false);
        return;
      }

      // Set the total expected generations
      totalGenerationsRef.current = actorsToGenerate.length;

      console.log(`Starting generation for ${actorsToGenerate.length} actors`);

      // Set generating state for all actors that need generation
      setActors((prev) =>
        prev.map((a) =>
          actorsToGenerate.some((actor) => actor.id === a.id)
            ? { ...a, isGenerating: true, autoPlay: false, isPlaying: false }
            : a,
        ),
      );

      // Track successfully generated actors
      const successfullyGeneratedActors = [];

      // Generate audio for all actors
      for (let i = 0; i < actorsToGenerate.length; i++) {
        const actor = actorsToGenerate[i];
        try {
          console.log(
            `Generating audio for actor ${actor.id} (${i + 1}/${actorsToGenerate.length})`,
          );

          // Generate audio for this actor
          await generateAudioForActor(actor, (id, generatedBlob) => {
            if (generatedBlob) {
              console.log(`Generated blob for actor ${id}`);
              drawWaveform(id, generatedBlob);

              // Store the blob in our ref
              generatedAudioBlobsRef.current.set(id, {
                blob: generatedBlob,
                delay: actor.delay,
                muted: actor.muted,
                volume: actor.volume,
              });

              // Track this actor as successfully generated
              successfullyGeneratedActors.push({
                id,
                blob: generatedBlob,
                text: actor.text,
                voiceId: actor.voice?.id,
              });

              // Update actor state but ensure autoPlay is false
              setActors((prevActors) =>
                prevActors.map((a) =>
                  a.id === id
                    ? {
                        ...a,
                        audioBlob: generatedBlob,
                        audioUrl: URL.createObjectURL(generatedBlob),
                        lastGeneratedText: a.text,
                        lastGeneratedVoiceId: a.voice?.id,
                        isGenerating: false,
                        autoPlay: false,
                        isPlaying: false,
                      }
                    : a,
                ),
              );

              // Increment the completed generations counter
              setCompletedGenerations((prev) => prev + 1);
            }
          });
        } catch (error) {
          console.error(`Error generating audio for actor ${actor.id}:`, error);
          setActors((prev) =>
            prev.map((a) =>
              a.id === actor.id ? { ...a, isGenerating: false } : a,
            ),
          );
        }
      }

      // Reset generating states after all generation attempts
      setActors((prev) =>
        prev.map((a) => (a.isGenerating ? { ...a, isGenerating: false } : a)),
      );

      console.log(
        `Generation complete. Generated ${generatedAudioBlobsRef.current.size} audio blobs`,
      );

      // Ensure all actors are properly updated with their generated audio
      if (successfullyGeneratedActors.length > 0) {
        console.log(
          `Updating ${successfullyGeneratedActors.length} actors with their generated audio`,
        );

        // Force a final update to ensure all actors have their audio properly set
        setActors((prevActors) => {
          return prevActors.map((actor) => {
            const generatedActor = successfullyGeneratedActors.find(
              (ga) => ga.id === actor.id,
            );

            if (generatedActor) {
              console.log(`Updating actor ${actor.id} with generated audio`);
              return {
                ...actor,
                audioBlob: generatedActor.blob,
                audioUrl: URL.createObjectURL(generatedActor.blob),
                lastGeneratedText: generatedActor.text,
                lastGeneratedVoiceId: generatedActor.voiceId,
                isGenerating: false,
                autoPlay: false,
                isPlaying: false,
              };
            }
            return actor;
          });
        });
      }

      // The merging will be triggered by the useEffect when completedGenerations equals totalGenerationsRef.current
    } catch (error) {
      console.error("Error in audio generation:", error);
      setCompletedGenerations(0);
      setIsBatchProcessing(false);
    } finally {
      // Reset processing flag
      isProcessingRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      actors.forEach((actor) => {
        if (actor.audioUrl) URL.revokeObjectURL(actor.audioUrl);
      });
      cleanupMergedAudio();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeActorId && !event.target.closest(".actor-voice-container")) {
        setActiveActorId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeActorId]);

  // Function to get character limit based on subscription status
  const getCharLimit = () => {
    if (!subData?.status) return CHAR_LIMITS.FREE;
    return CHAR_LIMITS[subData.status] || CHAR_LIMITS.FREE;
  };

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                >
                  <Settings className="lg:mr-2 mr-0 h-4 w-4" />
                  Advanced Settings
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure advanced audio settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-2">
            <span className="text-sm">Master Volume</span>
            <Volume className="h-4 w-4 text-muted-foreground" />
            <Slider
              className="w-24"
              value={[masterVolume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(value) => setMasterVolume(value[0])}
            />
          </div>
        </div>
      </div>

      <SettingsPanel
        isOpen={showAdvancedSettings}
        mergeType={mergeType}
        overlapDuration={overlapDuration}
        filterType={filterType}
        filterValue={filterValue}
        favoriteVoicesOnly={favoriteVoicesOnly}
        genderOptions={genderOptions}
        typeOptions={typeOptions}
        onMergeTypeChange={setMergeType}
        onOverlapDurationChange={setOverlapDuration}
        onFilterTypeChange={setFilterType}
        onFilterValueChange={setFilterValue}
        onFavoriteVoicesOnlyChange={setFavoriteVoicesOnly}
      />

      <div className="grid gap-6">
        {actors.map((actor, index) => (
          <div
            key={actor.id}
            className={`rounded-lg border-4 ${getVoiceColor(actor.voice, index, actors)} bg-card shadow-sm`}
          >
            <div className="flex items-center justify-between border-b p-2 lg:p-3">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 lg:h-6 lg:w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {index + 1}
                </span>
                <h3 className="text-sm lg:text-base font-medium">
                  {actor.voice?.name || "Select a voice"}
                </h3>
              </div>

              <ActorControls
                actorId={actor.id}
                index={index}
                totalActors={actors.length}
                onReorder={reorderActors}
                onDuplicate={duplicateActor}
                onRemove={removeActor}
              />
            </div>

            <div className="flex flex-col lg:flex-row">
              <div className="actor-voice-container relative flex flex-col lg:flex-row items-start gap-2 lg:gap-4 p-2 lg:p-4 lg:w-1/3">
                <div className="relative">
                  <VoiceAvatar
                    voice={actor.voice}
                    isActive={activeActorId === actor.id}
                    onClick={() =>
                      setActiveActorId(
                        activeActorId === actor.id ? null : actor.id,
                      )
                    }
                  />

                  {activeActorId === actor.id && (
                    <VoiceDropdown
                      favoriteVoices={favoriteVoices}
                      isOpen={activeActorId === actor.id}
                      voices={filteredVoices}
                      recentlyUsed={recentlyUsedVoices}
                      searchQuery={searchQuery}
                      onSelect={(voice) => {
                        updateActorVoice(actor.id, voice);
                        setActors((prev) =>
                          prev.map((a) =>
                            a.id === actor.id
                              ? { ...a, audioUrl: null, audioBlob: null }
                              : a,
                          ),
                        );
                      }}
                      onSearch={setSearchQuery}
                      onToggleFavorite={toggleFavorite}
                      onClose={() => setActiveActorId(null)}
                    />
                  )}
                </div>

                <AudioControls
                  volume={actor.volume}
                  muted={actor.muted}
                  delay={actor.delay}
                  onVolumeChange={(value) => updateActorVolume(actor.id, value)}
                  onToggleMute={() => toggleActorMute(actor.id)}
                  onDelayChange={(value) => updateActorDelay(actor.id, value)}
                />
              </div>

              <div className="flex flex-1 flex-col p-2 lg:p-4">
                <div className="relative w-full">
                  <Textarea
                    placeholder="Enter the text for this actor..."
                    className="min-h-[100px] lg:min-h-[80px] w-full flex-1 resize-none rounded-md border-2 border-muted text-sm lg:text-base focus:border-primary focus:ring-1 focus:ring-primary"
                    value={actor.text}
                    onChange={(e) => {
                      const newText = e.target.value;
                      const charLimit = getCharLimit();

                      if (newText.length > charLimit) {
                        setShowCharLimitModal(actor.id);
                      } else {
                        updateActorText(actor.id, newText);
                        setActors((prev) =>
                          prev.map((a) =>
                            a.id === actor.id
                              ? { ...a, audioUrl: null, audioBlob: null }
                              : a,
                          ),
                        );
                      }
                    }}
                  />
                  <div className="mt-1 text-right text-xs lg:text-sm">
                    <span
                      className={
                        actor.text.length > getCharLimit() * 0.9
                          ? "text-red-500 font-medium"
                          : "text-gray-600"
                      }
                    >
                      {actor.text.length} / {getCharLimit()}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  {actor.voice?.type === "GOOGLE" && (
                    <div className="text-cp-primary text-xs lg:text-[12px] font-bold mb-2">
                      Modulation is not available for this voice
                    </div>
                  )}
                  <div className="grid grid-cols-2 lg:flex lg:flex-row gap-2 lg:gap-4">
                    <div className="col-span-2 lg:flex-1">
                      <StabilitySelector
                        value={actor.stability}
                        onValueChange={(value) => {
                          setActors((prev) =>
                            prev.map((a) =>
                              a.id === actor.id
                                ? { ...a, stability: value }
                                : a,
                            ),
                          );
                        }}
                        disabled={actor.voice?.type === "GOOGLE"}
                        showDisabledText={false}
                      />
                    </div>
                    <div className="col-span-2 lg:flex-1">
                      <SimilaritySelector
                        value={actor.similarity}
                        onValueChange={(value) => {
                          setActors((prev) =>
                            prev.map((a) =>
                              a.id === actor.id
                                ? { ...a, similarity: value }
                                : a,
                            ),
                          );
                        }}
                        disabled={actor.voice?.type === "GOOGLE"}
                      />
                    </div>
                    <div className="col-span-1 lg:flex-1">
                      <SpeedSelector
                        value={actor.speed}
                        onValueChange={(value) => {
                          setActors((prev) =>
                            prev.map((a) =>
                              a.id === actor.id ? { ...a, speed: value } : a,
                            ),
                          );
                        }}
                        disabled={actor.voice?.type === "GOOGLE"}
                      />
                    </div>
                    <div className="col-span-1 lg:flex-1">
                      <StyleSelector
                        value={actor.style}
                        onValueChange={(value) => {
                          setActors((prev) =>
                            prev.map((a) =>
                              a.id === actor.id ? { ...a, style: value } : a,
                            ),
                          );
                        }}
                        disabled={actor.voice?.type === "GOOGLE"}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center lg:justify-end">
                    <GenerateButton
                      isGenerating={actor.isGenerating}
                      isPlaying={actor.isPlaying}
                      hasAudio={!!actor.audioUrl}
                      needsRegeneration={needsRegeneration(actor)}
                      disabled={!actor.voice || !actor.text.trim()}
                      onClick={() => handleGenerateAndPlayAudio(actor)}
                    />
                  </div>
                </div>
              </div>

              {actor.audioUrl && (
                <audio
                  ref={(el) => (audioRefs.current[actor.id] = el)}
                  src={actor.audioUrl}
                  className="hidden"
                  onEnded={() => handleAudioEnded(actor.id)}
                  onLoadedData={() => {
                    const audioElement = audioRefs.current[actor.id];
                    // FIXED: Enhanced conditions to prevent autoplay during batch processing
                    if (
                      audioElement &&
                      actor.autoPlay &&
                      !isProcessingRef.current &&
                      !isBatchProcessing &&
                      completedGenerations === 0 // Ensure we're not in the middle of batch generation
                    ) {
                      audioElement.play();
                      setActors((prevActors) =>
                        prevActors.map((a) =>
                          a.id === actor.id
                            ? { ...a, autoPlay: false, isPlaying: true }
                            : a,
                        ),
                      );
                    }
                  }}
                />
              )}
            </div>
          </div>
        ))}

        <motion.div
          className="w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="default"
            className="text-md flex w-full items-center justify-center gap-2 bg-blue-400 py-8 shadow-md hover:bg-blue-600"
            onClick={addNewActor}
          >
            <Plus className="h-6 w-6" />
            Add Another Actor
          </Button>
        </motion.div>

        {mergedAudioUrl && (
          <motion.div
            className="mb-6 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-full"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.canvas
                ref={mergedWaveformCanvasRef}
                className="mb-3 h-24 w-full rounded bg-muted/30"
                width={600}
                height={100}
                animate={
                  mergedAudioAnimating
                    ? {
                        boxShadow: [
                          "0px 0px 0px rgba(0,0,0,0)",
                          "0px 0px 15px rgba(59, 130, 246, 0.3)",
                          "0px 0px 0px rgba(0,0,0,0)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Audio Player with Styled Container */}
              <div
                style={{
                  position: "relative",
                  marginTop: "14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  maxWidth: "1000px",
                  width: "100%",
                  height: "60px",
                  backgroundColor: "#BDF3F0",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  zIndex: 0,
                  opacity: 1,
                  transition: "opacity 0.5s ease-in-out",
                  border: "none",
                }}
              >
                <audio
                  ref={mergedAudioRef}
                  controls
                  src={mergedAudioUrl}
                  style={{
                    flex: 1,
                    height: "40px",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <SpeedButton
                    audioRef={mergedAudioRef}
                    buttonStyle={buttonBaseStyle}
                    buttonHoverStyle={buttonHoverStyle}
                    disabledButtonStyle={disabledButtonStyle}
                  />
                  <button
                    onClick={() => {
                      if (mergedAudioUrl) {
                        const anchor = document.createElement("a");
                        anchor.href = mergedAudioUrl;
                        anchor.download = "combined-voices.wav";
                        anchor.click();
                        setShowConfetti(true);
                      }
                    }}
                    style={buttonBaseStyle}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor =
                        buttonHoverStyle.backgroundColor;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor =
                        buttonBaseStyle.backgroundColor;
                    }}
                  >
                    <Save className="h-5 w-5" style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="mb-4 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={
              buttonAnimating
                ? {
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full max-w-xs"
          >
            <Button
              variant="default"
              className="w-full py-6 text-lg"
              onClick={handleMasterButtonClick}
              disabled={
                isGenerating ||
                isMergingAudio ||
                isProcessingRef.current ||
                isBatchProcessing
              }
            >
              {isGenerating ||
              isMergingAudio ||
              isProcessingRef.current ||
              isBatchProcessing ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Mic className="mr-2 h-5 w-5" />
              )}
              Generate & Play All
            </Button>
          </motion.div>
        </div>
      </div>
      {/* Character Limit Modal */}
      {showCharLimitModal && subData?.status === "BUSINESS" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-medium">
              Character Limit Reached
            </h3>
            <p className="mb-4">
              You've reached the 10,000 character limit for the BUSINESS plan.
            </p>
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowCharLimitModal(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {showCharLimitModal && subData?.status !== "BUSINESS" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-medium">
              Character Limit Reached
            </h3>
            <p className="mb-4">
              You've reached the character limit of {getCharLimit()} for your{" "}
              {subData?.status || "FREE"} plan. Please upgrade your plan to
              increase your character limit or reduce your text.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCharLimitModal(null)}
              >
                Close
              </Button>
              <Button
                variant="default"
                onClick={() => setShowCharLimitModal(null)}
              >
                <Link href="/plans" target="_blank">
                  Upgrade Plan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

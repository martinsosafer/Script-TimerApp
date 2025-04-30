"use client";

import { useEffect, useState } from "react";

import { Button } from "@voiceai/ui";
import Textarea from "@voiceai/ui/@/components/textarea-autosize";
import {
  IconSpinner as Loader2,
  IconMic as Mic,
  IconStop as Pause,
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

interface MultiActorVoiceProps {
  allVoices?: Voice[];
  userPlan?: string;
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
  lastGeneratedText?: string;
  lastGeneratedVoiceId?: string;
}

export default function MultiActorVoice({
  allVoices = [],
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
    },
  ]);

  const {
    activeActorId,
    setActiveActorId,
    showAdvancedSettings,
    setShowAdvancedSettings,
    stability,
    setStability,
    similarity,
    setSimilarity,
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
      stability,
      similarity,
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
  });

  const [isMergedAudioPlaying, setIsMergedAudioPlaying] = useState(false);
  const [autoPlayMerged, setAutoPlayMerged] = useState(false);

  const handleGenerateAndPlayAudio = async (actor: ActorSection) => {
    if (actor.isPlaying) {
      togglePlayAudio(actor.id);
      return;
    }

    // Always generate if no audio exists
    if (!actor.audioUrl) {
      await generateAndPlayAudio(actor, async (a) => {
        return await generateAudioForActor(a, (id, blob) => {
          drawWaveform(id, blob);
          setActors((prev) =>
            prev.map((actor) =>
              actor.id === id
                ? {
                    ...actor,
                    lastGeneratedText: actor.text,
                    lastGeneratedVoiceId: actor.voice?.id,
                  }
                : actor,
            ),
          );
        });
      });
      return;
    }

    // Only check for changes if audio exists
    const needsNewAudio =
      actor.lastGeneratedText !== actor.text ||
      actor.lastGeneratedVoiceId !== actor.voice?.id;

    if (needsNewAudio) {
      await generateAndPlayAudio(actor, async (a) => {
        return await generateAudioForActor(a, (id, blob) => {
          drawWaveform(id, blob);
          setActors((prev) =>
            prev.map((actor) =>
              actor.id === id
                ? {
                    ...actor,
                    lastGeneratedText: actor.text,
                    lastGeneratedVoiceId: actor.voice?.id,
                  }
                : actor,
            ),
          );
        });
      });
    } else {
      togglePlayAudio(actor.id);
    }
  };

  // Update the needsRegeneration function
  const needsRegeneration = (actor: ActorSection) => {
    return (
      actor.lastGeneratedText !== actor.text ||
      actor.lastGeneratedVoiceId !== actor.voice?.id
    );
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

  const isAnyAudioPlaying =
    actors.some((a) => a.isPlaying) || isMergedAudioPlaying;

  const handleMasterButtonClick = async () => {
    if (isAnyAudioPlaying) {
      stopAllAudio();
      if (mergedAudioRef.current) {
        mergedAudioRef.current.pause();
        mergedAudioRef.current.currentTime = 0;
        setIsMergedAudioPlaying(false);
      }
      return;
    }

    try {
      // Generate audio for all actors that need it
      const generationPromises = actors
        .filter((actor) => actor.voice && actor.text.trim())
        .map(async (actor) => {
          // Always generate fresh audio when using master button
          const blob = await generateAudioForActor(
            actor,
            (id, generatedBlob) => {
              drawWaveform(id, generatedBlob);
              setActors((prevActors) =>
                prevActors.map((a) =>
                  a.id === actor.id
                    ? {
                        ...a,
                        audioBlob: generatedBlob,
                        audioUrl: URL.createObjectURL(generatedBlob),
                        lastGeneratedText: a.text,
                      }
                    : a,
                ),
              );
            },
          );
          return { id: actor.id, blob };
        });

      const generatedResults = await Promise.all(generationPromises);
      const latestBlobs = new Map(
        generatedResults.map((result) => [result.id, result.blob]),
      );

      // Create merged audio using the latest generated blobs
      const actorsWithAudio = actors.filter(
        (actor) =>
          actor.voice && actor.text.trim() && latestBlobs.has(actor.id),
      );

      if (actorsWithAudio.length >= 1) {
        await mergeAudioFiles(
          "sequential",
          overlapDuration,
          new Map(
            actors.map((actor) => [
              actor.id,
              {
                // Use the newly generated blob from latestBlobs
                blob: latestBlobs.get(actor.id) || actor.audioBlob!,
                delay: actor.delay,
                muted: actor.muted,
                volume: actor.volume,
              },
            ]),
          ),
          drawMergedWaveform,
        );
        setAutoPlayMerged(true);
      }
    } catch (error) {
      console.error("Error in audio generation/merging:", error);
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

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Multi-Actor Voice Generator</h1>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                >
                  <Settings className="mr-2 h-4 w-4" />
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
        stability={stability}
        similarity={similarity}
        mergeType={mergeType}
        overlapDuration={overlapDuration}
        filterType={filterType}
        filterValue={filterValue}
        favoriteVoicesOnly={favoriteVoicesOnly}
        genderOptions={genderOptions}
        typeOptions={typeOptions}
        onStabilityChange={setStability}
        onSimilarityChange={setSimilarity}
        onMergeTypeChange={setMergeType}
        onOverlapDurationChange={setOverlapDuration}
        onFilterTypeChange={setFilterType}
        onFilterValueChange={setFilterValue}
        onFavoriteVoicesOnlyChange={setFavoriteVoicesOnly}
      />

      <div className="grid gap-6">
        {actors.map((actor, index) => (
          <div key={actor.id} className="rounded-lg border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b p-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {index + 1}
                </span>
                <h3 className="font-medium">
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

            <div className="flex flex-col md:flex-row">
              <div className="actor-voice-container relative flex items-center gap-4 p-4 md:w-1/3">
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
                      isOpen={activeActorId === actor.id}
                      voices={filteredVoices}
                      recentlyUsed={recentlyUsedVoices}
                      searchQuery={searchQuery}
                      onSelect={(voice) => {
                        updateActorVoice(actor.id, voice);
                        // Clear existing audio when voice changes
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
                      onClose={() => setActiveActorId(null)} // Add this line
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

              <div className="flex flex-1 flex-col p-4">
                <Textarea
                  placeholder="Enter the text for this actor..."
                  className="min-h-[80px] flex-1 resize-none rounded-md border-2 border-muted text-base focus:border-primary focus:ring-1 focus:ring-primary"
                  value={actor.text}
                  onChange={(e) => {
                    updateActorText(actor.id, e.target.value);
                    // Clear existing audio when text changes
                    setActors((prev) =>
                      prev.map((a) =>
                        a.id === actor.id
                          ? { ...a, audioUrl: null, audioBlob: null }
                          : a,
                      ),
                    );
                  }}
                />

                {actor.audioUrl && (
                  <div className="mt-3">
                    <canvas
                      ref={(el) => (waveformCanvasRefs.current[actor.id] = el)}
                      className="h-12 w-full rounded bg-muted/30"
                      width={300}
                      height={50}
                    />
                  </div>
                )}

                <div className="mt-3 flex justify-end">
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

              {actor.audioUrl && (
                <audio
                  ref={(el) => (audioRefs.current[actor.id] = el)}
                  src={actor.audioUrl}
                  className="hidden"
                  onEnded={() => handleAudioEnded(actor.id)}
                  onLoadedData={() => {
                    const audioElement = audioRefs.current[actor.id];
                    if (audioElement && actor.autoPlay) {
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

        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 py-6"
          onClick={addNewActor}
        >
          <Plus className="h-5 w-5" />
          Add Another Actor
        </Button>
        <div className="mb-4 flex items-center justify-center">
          <Button
            variant="default"
            className="w-full max-w-xs py-6 text-lg"
            onClick={handleMasterButtonClick}
            disabled={isGenerating || isMergingAudio}
          >
            {isAnyAudioPlaying ? (
              <>
                <Pause className="mr-2 h-5 w-5" />
                Stop All Audio
              </>
            ) : (
              <>
                {isGenerating || isMergingAudio ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Mic className="mr-2 h-5 w-5" />
                )}
                Generate & Play All
              </>
            )}
          </Button>
        </div>
        {mergedAudioUrl && (
          <div className="mt-4 rounded-lg border bg-card p-4 shadow-sm">
            <div className="mt-4 w-full">
              <canvas
                ref={mergedWaveformCanvasRef}
                className="mb-3 h-24 w-full rounded bg-muted/30"
                width={600}
                height={100}
              />
              <audio
                ref={mergedAudioRef}
                controls
                src={mergedAudioUrl}
                className="w-full"
              />
              <div className="mt-2 flex justify-end">
                <Button variant="outline" size="lg" asChild>
                  <a href={mergedAudioUrl} download="combined-voices.wav">
                    <Save className="mr-2 h-5 w-5" />
                    Download Combined Audio
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

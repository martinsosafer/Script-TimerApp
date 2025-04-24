"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@voiceai/ui";
import Textarea from "@voiceai/ui/@/components/textarea-autosize";
import {
  IconSpinner as Loader2,
  IconMic as Mic,
  IconStop as Pause,
  IconPlay as Play,
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
import type { FilterType, MergeType, Voice } from "~/constants/types/voice";
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

export default function MultiActorVoice({
  allVoices = [],
}: MultiActorVoiceProps) {
  // Initialize audio management hook for actor state
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

  // Initialize UI state management
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

  // Initialize voice filtering
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

  // Initialize waveform visualization
  const {
    waveformCanvasRefs,
    mergedWaveformCanvasRef,
    drawWaveform,
    drawMergedWaveform,
  } = useWaveformVisualization();

  // Initialize audio playback
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

  // Initialize audio generation
  const { isGenerating, generateAudioForActor, generateAllAudio } =
    useAudioGeneration({
      stability,
      similarity,
      setActors,
      actors,
    });

  // Initialize audio merging
  const {
    isMergingAudio,
    mergedAudioUrl,
    mergeAudioFiles,
    cleanupMergedAudio,
  } = useAudioMerge({
    actors,
    masterVolume,
  });

  // Handle actor audio generation and playback
  const handleGenerateAndPlayAudio = async (actor: ActorSection) => {
    await generateAndPlayAudio(actor, async (a) => {
      const url = await generateAudioForActor(a, (id, blob) =>
        drawWaveform(id, blob),
      );
      return url;
    });
  };

  // Handle merging audio files
  const handleMergeAudio = async () => {
    const url = await mergeAudioFiles(mergeType, overlapDuration, (blob) =>
      drawMergedWaveform(blob),
    );
    return url;
  };

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      actors.forEach((actor) => {
        if (actor.audioUrl) URL.revokeObjectURL(actor.audioUrl);
      });
      cleanupMergedAudio();
    };
  }, []);

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
                  Settings
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure advanced audio settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-2">
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

      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={generateAllAudio}
            disabled={actors.every(
              (a) => !a.voice || !a.text.trim() || a.audioUrl,
            )}
          >
            <Play className="mr-2 h-4 w-4" />
            Generate All
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={playAllAudio}
            disabled={actors.every((a) => !a.audioUrl)}
          >
            <Play className="mr-2 h-4 w-4" />
            Play All
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={stopAllAudio}
            disabled={actors.every((a) => !a.isPlaying)}
          >
            <Pause className="mr-2 h-4 w-4" />
            Stop All
          </Button>
        </div>
      </div>

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
              <div className="flex items-center gap-4 p-4 md:w-1/3">
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
                    onSelect={(voice) => updateActorVoice(actor.id, voice)}
                    onSearch={setSearchQuery}
                    onToggleFavorite={toggleFavorite}
                  />
                )}

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
                  onChange={(e) => updateActorText(actor.id, e.target.value)}
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

        {actors.filter((actor) => actor.audioBlob).length >= 2 && (
          <div className="mt-4 rounded-lg border bg-card p-4 shadow-sm">
            <Button
              variant="default"
              className="w-full py-6 text-lg"
              onClick={mergeAudioFiles}
              disabled={isMergingAudio}
            >
              {isMergingAudio ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Merging Audio...
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" />
                  {mergeType === "sequential"
                    ? "COMBINE SEQUENTIALLY"
                    : "MIX AUDIO TOGETHER"}
                </>
              )}
            </Button>

            {mergedAudioUrl && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

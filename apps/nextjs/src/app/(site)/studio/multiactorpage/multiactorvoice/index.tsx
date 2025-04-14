"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@voiceai/ui";
import Textarea from "@voiceai/ui/@/components/textarea-autosize";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import {
  IconSpinner as Loader2,
  IconMic as Mic,
  IconStop as Pause,
  IconPlay as Play,
  IconPlus as Plus,
  IconSave as Save,
  IconSearch as Search,
  XIcon as X,
} from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { ScrollArea } from "@voiceai/ui/@/components/ui/scroll-area";
import { Separator } from "@voiceai/ui/@/components/ui/separator";

import useStreamingAudio from "~/app/hooks/texttovoice/useStreamingAudio";

interface Voice {
  id: string;
  name: string;
  external_id: string;
  type: string;
  gender: string;
  picture: string;
  description: string;
  favorite: boolean;
}

interface ActorSection {
  id: string;
  voice: Voice | null;
  text: string;
  audioUrl: string | null;
  audioBlob: Blob | null;
  isPlaying: boolean;
  autoPlay: boolean;
  isGenerating: boolean; // Added individual loading state
}

export default function MultiActorVoice({
  allVoices = [],
  userPlan = "FREE",
}: {
  allVoices: Voice[];
  userPlan: string;
}) {
  const [actors, setActors] = useState<ActorSection[]>([
    {
      id: crypto.randomUUID(),
      voice: null,
      text: "",
      audioUrl: null,
      audioBlob: null,
      isPlaying: false,
      autoPlay: false,
      isGenerating: false,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeActorId, setActiveActorId] = useState<string | null>(null);
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [isMergingAudio, setIsMergingAudio] = useState(false);
  const [mergedAudioUrl, setMergedAudioUrl] = useState<string | null>(null);

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const mergedAudioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { handleStreaming } = useStreamingAudio();

  const filteredVoices = searchQuery
    ? allVoices.filter(
        (voice) =>
          voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          voice.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          voice.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          voice.type.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allVoices;

  const addNewActor = () => {
    setActors([
      ...actors,
      {
        id: crypto.randomUUID(),
        voice: null,
        text: "",
        audioUrl: null,
        audioBlob: null,
        isPlaying: false,
        autoPlay: false,
        isGenerating: false,
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
      if (activeActorId === id) {
        setActiveActorId(null);
      }
    }
  };

  const updateActorVoice = (actorId: string, voice: Voice) => {
    setActors(
      actors.map((actor) =>
        actor.id === actorId ? { ...actor, voice } : actor,
      ),
    );
    setActiveActorId(null);
  };

  const updateActorText = (actorId: string, text: string) => {
    setActors(
      actors.map((actor) =>
        actor.id === actorId ? { ...actor, text } : actor,
      ),
    );
  };

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

  const handleAudioEnded = (actorId: string) => {
    setActors(
      actors.map((actor) =>
        actor.id === actorId ? { ...actor, isPlaying: false } : actor,
      ),
    );
  };

  const generateAndPlayAudio = async (actor: ActorSection) => {
    if (!actor.voice || !actor.text.trim()) return;

    if (actor.audioUrl) {
      togglePlayAudio(actor.id);
      return;
    }

    // Set loading state for this specific actor only
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
          stability,
          similarity,
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
    } catch (error) {
      console.error("Error generating audio:", error);
      // Reset loading state on error
      setActors(
        actors.map((a) =>
          a.id === actor.id ? { ...a, isGenerating: false } : a,
        ),
      );
    }
  };

  const mergeAudioFiles = async () => {
    const actorsWithAudio = actors.filter((actor) => actor.audioBlob);
    if (actorsWithAudio.length < 2) {
      console.error("Need at least two audio files to merge");
      return;
    }

    setIsMergingAudio(true);

    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const audioBuffers: AudioBuffer[] = [];

      for (const actor of actorsWithAudio) {
        if (!actor.audioBlob) continue;
        const arrayBuffer = await actor.audioBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffers.push(audioBuffer);
      }

      const totalLength = audioBuffers.reduce(
        (acc, buffer) => acc + buffer.duration,
        0,
      );
      const sampleRate = audioBuffers[0].sampleRate;
      const numberOfChannels = audioBuffers[0].numberOfChannels;

      const mergedBuffer = audioContext.createBuffer(
        numberOfChannels,
        totalLength * sampleRate,
        sampleRate,
      );

      let offset = 0;
      for (const buffer of audioBuffers) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const mergedChannelData = mergedBuffer.getChannelData(channel);
          const bufferChannelData = buffer.getChannelData(channel);
          for (let i = 0; i < bufferChannelData.length; i++) {
            mergedChannelData[i + offset] = bufferChannelData[i];
          }
        }
        offset += buffer.length;
      }

      const offlineContext = new OfflineAudioContext(
        numberOfChannels,
        mergedBuffer.length,
        sampleRate,
      );

      const source = offlineContext.createBufferSource();
      source.buffer = mergedBuffer;
      source.connect(offlineContext.destination);
      source.start(0);

      const renderedBuffer = await offlineContext.startRendering();
      const wavBlob = await bufferToWave(renderedBuffer, renderedBuffer.length);

      if (mergedAudioUrl) URL.revokeObjectURL(mergedAudioUrl);
      const url = URL.createObjectURL(wavBlob);
      setMergedAudioUrl(url);
    } catch (error) {
      console.error("Error merging audio:", error);
    } finally {
      setIsMergingAudio(false);
    }
  };

  const bufferToWave = (abuffer: AudioBuffer, len: number) => {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];
    let i;
    let sample;
    let offset = 0;
    let pos = 0;

    setUint32(0x46464952);
    setUint32(length - 8);
    setUint32(0x45564157);
    setUint32(0x20746d66);
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);
    setUint32(0x61746164);
    setUint32(length - pos - 4);

    for (i = 0; i < abuffer.numberOfChannels; i++) {
      channels.push(abuffer.getChannelData(i));
    }

    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    function setUint16(data: number) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data: number) {
      view.setUint32(pos, data, true);
      pos += 4;
    }

    return new Blob([buffer], { type: "audio/wav" });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeActorId) {
        const dropdown = dropdownRefs.current[activeActorId];
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setActiveActorId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeActorId]);

  useEffect(() => {
    return () => {
      actors.forEach((actor) => {
        if (actor.audioUrl) URL.revokeObjectURL(actor.audioUrl);
      });
      if (mergedAudioUrl) URL.revokeObjectURL(mergedAudioUrl);
    };
  }, []);

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <h1 className="mb-6 text-2xl font-bold">Multi-Actor Voice Generator</h1>

      <div className="grid gap-6">
        {actors.map((actor) => (
          <div key={actor.id} className="rounded-lg border bg-card shadow-sm">
            <div className="flex items-center gap-4 p-4">
              <div className="relative">
                <Avatar
                  className="h-14 w-14 flex-shrink-0 cursor-pointer border"
                  onClick={() =>
                    setActiveActorId(
                      activeActorId === actor.id ? null : actor.id,
                    )
                  }
                >
                  <AvatarImage
                    src={
                      actor.voice?.picture ||
                      "/placeholder.svg?height=56&width=56" ||
                      "/placeholder.svg"
                    }
                    alt={actor.voice?.name || "Select voice"}
                  />
                  <AvatarFallback className="text-lg">
                    {actor.voice?.name?.substring(0, 2) || "?"}
                  </AvatarFallback>
                </Avatar>
                {!actor.voice && (
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Plus className="h-3 w-3 text-white" />
                  </div>
                )}

                {activeActorId === actor.id && (
                  <div
                    ref={(el) => (dropdownRefs.current[actor.id] = el)}
                    className="absolute left-0 top-16 z-50 w-64 rounded-md border bg-card shadow-lg"
                  >
                    <div className="p-2">
                      <div className="relative mb-2">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search voices..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <ScrollArea className="h-[250px]">
                        <div className="grid gap-1">
                          {filteredVoices.map((voice) => (
                            <button
                              key={voice.id}
                              className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-muted"
                              onClick={() => updateActorVoice(actor.id, voice)}
                            >
                              <Avatar className="h-10 w-10 border">
                                <AvatarImage
                                  src={voice.picture || "/placeholder.svg"}
                                  alt={voice.name}
                                />
                                <AvatarFallback>
                                  {voice.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{voice.name}</p>
                                <p className="text-sm lowercase text-muted-foreground">
                                  {voice.gender}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                )}
              </div>

              <Separator orientation="vertical" className="h-14" />

              <Textarea
                placeholder="Enter the text for this actor..."
                className="min-h-[50px] flex-1 resize-none text-base"
                value={actor.text}
                onChange={(e) => updateActorText(actor.id, e.target.value)}
              />

              <Separator orientation="vertical" className="h-14" />

              <Button
                onClick={() => generateAndPlayAudio(actor)}
                disabled={
                  !actor.voice || !actor.text.trim() || actor.isGenerating
                }
                className="h-12 w-12 flex-shrink-0"
                size="icon"
                variant="outline"
              >
                {actor.isGenerating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : actor.isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

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

              {actors.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 flex-shrink-0"
                  onClick={() => removeActor(actor.id)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Remove actor</span>
                </Button>
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
                  COMBINE ALL AUDIOS
                </>
              )}
            </Button>

            {mergedAudioUrl && (
              <div className="mt-4 w-full">
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

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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@voiceai/ui/@/components/ui/card";
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
import { Slider } from "@voiceai/ui/@/components/ui/slider";

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
    },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeActorId, setActiveActorId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [isMergingAudio, setIsMergingAudio] = useState(false);
  const [mergedAudioUrl, setMergedAudioUrl] = useState<string | null>(null);

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const mergedAudioRef = useRef<HTMLAudioElement | null>(null);

  const { handleStreaming } = useStreamingAudio();

  const filteredVoices = searchQuery
    ? allVoices.filter(
        (voice) =>
          voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          voice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      },
    ]);
  };

  const removeActor = (id: string) => {
    if (actors.length > 1) {
      // Clean up audio URL if it exists
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

  const generateAudio = async (actor: ActorSection) => {
    if (!actor.voice || !actor.text.trim()) return;

    setIsGenerating(true);

    // Create a custom streaming audio handler for this specific actor
    const customStreamingHandler = {
      setAudioSource: (url: string, blob: Blob) => {
        setActors(
          actors.map((a) =>
            a.id === actor.id ? { ...a, audioUrl: url, audioBlob: blob } : a,
          ),
        );
      },
      setLoading: setIsGenerating,
    };

    try {
      // Modified version of handleStreaming that returns the audio blob
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

      if (!response.ok) {
        throw new Error("Failed to fetch audio");
      }

      const responseBody = response.body;
      if (!responseBody) {
        throw new Error("Response body is null");
      }

      const reader = responseBody.getReader();
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
            ? { ...a, audioUrl: objectUrl, audioBlob: audioBlob }
            : a,
        ),
      );
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const mergeAudioFiles = async () => {
    // Check if we have at least two audio files to merge
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

      // Load all audio blobs into audio buffers
      for (const actor of actorsWithAudio) {
        if (!actor.audioBlob) continue;

        const arrayBuffer = await actor.audioBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffers.push(audioBuffer);
      }

      // Calculate the total length of the merged audio
      const totalLength = audioBuffers.reduce(
        (acc, buffer) => acc + buffer.duration,
        0,
      );
      const sampleRate = audioBuffers[0].sampleRate;
      const numberOfChannels = audioBuffers[0].numberOfChannels;

      // Create a new buffer for the merged audio
      const mergedBuffer = audioContext.createBuffer(
        numberOfChannels,
        totalLength * sampleRate,
        sampleRate,
      );

      // Copy each buffer into the merged buffer
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

      // Convert the merged buffer to a blob
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

      // Convert the rendered buffer to a WAV file
      const wavBlob = await bufferToWave(renderedBuffer, renderedBuffer.length);

      // Create a URL for the merged audio
      if (mergedAudioUrl) {
        URL.revokeObjectURL(mergedAudioUrl);
      }
      const url = URL.createObjectURL(wavBlob);
      setMergedAudioUrl(url);
    } catch (error) {
      console.error("Error merging audio:", error);
    } finally {
      setIsMergingAudio(false);
    }
  };

  // Helper function to convert AudioBuffer to WAV Blob
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

    // write WAVE header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit
    setUint32(0x61746164); // "data" chunk
    setUint32(length - pos - 4); // chunk length

    // write interleaved data
    for (i = 0; i < abuffer.numberOfChannels; i++) {
      channels.push(abuffer.getChannelData(i));
    }

    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {
        // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true); // write 16-bit sample
        pos += 2;
      }
      offset++; // next source sample
    }

    // Helper function to set values
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

  // Clean up audio URLs when component unmounts
  useEffect(() => {
    return () => {
      actors.forEach((actor) => {
        if (actor.audioUrl) {
          URL.revokeObjectURL(actor.audioUrl);
        }
      });

      if (mergedAudioUrl) {
        URL.revokeObjectURL(mergedAudioUrl);
      }
    };
  }, []);

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <h1 className="mb-6 text-2xl font-bold">Multi-Actor Voice Generator</h1>

      <div className="grid gap-6">
        {actors.map((actor, index) => (
          <div key={actor.id} className="space-y-3">
            <Card className="relative overflow-visible">
              {actors.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8"
                  onClick={() => removeActor(actor.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove actor</span>
                </Button>
              )}

              <CardHeader>
                <CardTitle>Actor {index + 1}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Voice Selection */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {actor.voice ? (
                      <div className="flex w-full items-center gap-3 rounded-md border bg-card p-3 shadow-sm">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage
                            src={actor.voice.picture}
                            alt={actor.voice.name}
                          />
                          <AvatarFallback>
                            {actor.voice.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{actor.voice.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {actor.voice.type} • {actor.voice.gender}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => setActiveActorId(actor.id)}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="h-14 w-full justify-start"
                        onClick={() => setActiveActorId(actor.id)}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        Select a voice actor
                      </Button>
                    )}
                  </div>

                  {activeActorId === actor.id && (
                    <Card className="absolute z-10 mt-1 w-full max-w-md shadow-lg">
                      <CardHeader className="p-3">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search voices..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[300px]">
                          <div className="grid gap-1 p-2">
                            {filteredVoices.map((voice) => (
                              <button
                                key={voice.id}
                                className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-muted"
                                onClick={() =>
                                  updateActorVoice(actor.id, voice)
                                }
                              >
                                <Avatar className="h-10 w-10 border">
                                  <AvatarImage
                                    src={voice.picture}
                                    alt={voice.name}
                                  />
                                  <AvatarFallback>
                                    {voice.name.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{voice.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {voice.type} • {voice.gender}
                                  </p>
                                </div>
                                {voice.favorite && (
                                  <div className="ml-auto text-yellow-500">
                                    ★
                                  </div>
                                )}
                              </button>
                            ))}
                            {filteredVoices.length === 0 && (
                              <div className="p-4 text-center text-muted-foreground">
                                No voices found
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Text Input */}
                <div>
                  <Textarea
                    placeholder="Enter the text for this actor..."
                    className="min-h-[120px] w-full resize-y"
                    value={actor.text}
                    onChange={(e) => updateActorText(actor.id, e.target.value)}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {actor.text.length} characters
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => generateAudio(actor)}
                  disabled={!actor.voice || !actor.text.trim() || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Generate Voice
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Individual Audio Player */}
            {actor.audioUrl && (
              <Card className="bg-muted/40">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => togglePlayAudio(actor.id)}
                    >
                      {actor.isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>

                    <div className="flex-1">
                      <audio
                        ref={(el) => (audioRefs.current[actor.id] = el)}
                        src={actor.audioUrl}
                        className="hidden"
                        onEnded={() => handleAudioEnded(actor.id)}
                      />
                      <p className="mb-1 text-sm font-medium">
                        {actor.voice?.name || "Voice"} -{" "}
                        {actor.text.substring(0, 30)}...
                      </p>
                      <Slider
                        disabled
                        defaultValue={[0]}
                        max={100}
                        step={1}
                        className="h-1.5"
                      />
                    </div>

                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={actor.audioUrl}
                        download={`${actor.voice?.name || "voice"}-clip.mp3`}
                      >
                        <Save className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          className="flex items-center justify-center gap-2"
          onClick={addNewActor}
        >
          <Plus className="h-4 w-4" />
          Add Another Actor
        </Button>
      </div>

      {/* Merge Audio Button */}
      {actors.filter((actor) => actor.audioBlob).length >= 2 && (
        <div className="mt-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-lg font-medium">Combine All Audio Clips</h3>
                <p className="max-w-md text-center text-sm text-muted-foreground">
                  This will merge all generated audio clips into a single audio
                  file, playing each actor's voice in sequence.
                </p>

                <Button
                  variant="default"
                  size="lg"
                  className="mt-2"
                  onClick={mergeAudioFiles}
                  disabled={isMergingAudio}
                >
                  {isMergingAudio ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Merging Audio...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Combine All Audio
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
                      <Button variant="outline" size="sm" asChild>
                        <a href={mergedAudioUrl} download="combined-voices.wav">
                          <Save className="mr-2 h-4 w-4" />
                          Download Combined Audio
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

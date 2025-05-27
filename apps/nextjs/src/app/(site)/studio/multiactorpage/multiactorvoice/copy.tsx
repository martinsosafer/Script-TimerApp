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
  IconArrowUpDown as ArrowUpDown,
  IconClock as Clock,
  IconCopy as Copy,
  IconSpinner as Loader2,
  IconMic as Mic,
  IconVolumeX as Mute,
  IconStop as Pause,
  IconPlay as Play,
  IconPlus as Plus,
  IconSave as Save,
  IconSearch as Search,
  IconSettings as Settings,
  IconTrash as Trash,
  IconVolume2 as Volume,
} from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { ScrollArea } from "@voiceai/ui/@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@voiceai/ui/@/components/ui/select";
import { Separator } from "@voiceai/ui/@/components/ui/separator";
import { Slider } from "@voiceai/ui/@/components/ui/slider";
import { Switch } from "@voiceai/ui/@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@voiceai/ui/@/components/ui/tooltip";

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
  isGenerating: boolean;
  volume: number;
  muted: boolean;
  delay: number; // Delay in milliseconds before this audio plays
}

export default function MultiActorVoice({
  allVoices = [],
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
      volume: 1,
      muted: false,
      delay: 0,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeActorId, setActiveActorId] = useState<string | null>(null);
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [isMergingAudio, setIsMergingAudio] = useState(false);
  const [mergedAudioUrl, setMergedAudioUrl] = useState<string | null>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [mergeType, setMergeType] = useState<"sequential" | "overlap">(
    "sequential",
  );
  const [overlapDuration, setOverlapDuration] = useState(500); // 500ms default overlap
  const [masterVolume, setMasterVolume] = useState(1);
  const [filterType, setFilterType] = useState<"all" | "gender" | "type">(
    "all",
  );
  const [filterValue, setFilterValue] = useState("");
  const [favoriteVoicesOnly, setFavoriteVoicesOnly] = useState(false);
  const [recentlyUsedVoices, setRecentlyUsedVoices] = useState<Voice[]>([]);

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const mergedAudioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const waveformCanvasRefs = useRef<Record<string, HTMLCanvasElement | null>>(
    {},
  );
  const mergedWaveformCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const { handleStreaming } = useStreamingAudio();

  // Apply filters to voices
  const filteredVoices = allVoices.filter((voice) => {
    // Text search filter
    const matchesSearch = searchQuery
      ? voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voice.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voice.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voice.type.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Favorites filter
    const matchesFavorites = favoriteVoicesOnly ? voice.favorite : true;

    // Type/gender filter
    let matchesTypeGender = true;
    if (filterType === "gender" && filterValue) {
      matchesTypeGender =
        voice.gender.toLowerCase() === filterValue.toLowerCase();
    } else if (filterType === "type" && filterValue) {
      matchesTypeGender =
        voice.type.toLowerCase() === filterValue.toLowerCase();
    }

    return matchesSearch && matchesFavorites && matchesTypeGender;
  });

  // Get unique gender and type values for filters
  const genderOptions = [...new Set(allVoices.map((voice) => voice.gender))];
  const typeOptions = [...new Set(allVoices.map((voice) => voice.type))];

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
        volume: 1,
        muted: false,
        delay: 0,
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

    // Add to recently used voices if not already there
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
          // Update audio element volume if it exists
          if (audioRefs.current[actorId]) {
            audioRefs.current[actorId].volume = volume * masterVolume;
          }
          return { ...actor, volume };
        }
        return actor;
      }),
    );
  };

  const toggleActorMute = (actorId: string) => {
    setActors(
      actors.map((actor) => {
        if (actor.id === actorId) {
          const newMuted = !actor.muted;
          // Update audio element muted state if it exists
          if (audioRefs.current[actorId]) {
            audioRefs.current[actorId].muted = newMuted;
          }
          return { ...actor, muted: newMuted };
        }
        return actor;
      }),
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

      if (!response.ok)
        throw new Error(
          "Failed to generate audio,please check if you are logged in",
        );
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

      // Draw waveform after audio is loaded
      setTimeout(() => {
        drawWaveform(actor.id, audioBlob);
      }, 500);
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

  const drawWaveform = async (actorId: string, audioBlob: Blob) => {
    const canvas = waveformCanvasRefs.current[actorId];
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const width = canvas.width;
    const height = canvas.height;
    const channelData = audioBuffer.getChannelData(0);
    const step = Math.ceil(channelData.length / width);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#4f46e5";

    for (let i = 0; i < width; i++) {
      const start = Math.floor(i * step);
      const end = Math.floor((i + 1) * step);
      let min = channelData[start];
      let max = channelData[start];

      for (let j = start; j < end; j++) {
        if (channelData[j] < min) min = channelData[j];
        if (channelData[j] > max) max = channelData[j];
      }

      const barHeight = ((Math.abs(min) + Math.abs(max)) * height) / 2;
      ctx.fillRect(i, (height - barHeight) / 2, 1, barHeight);
    }
  };

  const drawMergedWaveform = async (audioBlob: Blob) => {
    const canvas = mergedWaveformCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const width = canvas.width;
    const height = canvas.height;
    const channelData = audioBuffer.getChannelData(0);
    const step = Math.ceil(channelData.length / width);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#22c55e"; // Green color for the merged audio waveform

    for (let i = 0; i < width; i++) {
      const start = Math.floor(i * step);
      const end = Math.floor((i + 1) * step);
      let min = channelData[start];
      let max = channelData[start];

      for (let j = start; j < end; j++) {
        if (channelData[j] < min) min = channelData[j];
        if (channelData[j] > max) max = channelData[j];
      }

      const barHeight = ((Math.abs(min) + Math.abs(max)) * height) / 2;
      ctx.fillRect(i, (height - barHeight) / 2, 1, barHeight);
    }
  };

  const generateAllAudio = async () => {
    const actorsWithoutAudio = actors.filter(
      (actor) => actor.voice && actor.text.trim() && !actor.audioUrl,
    );

    for (const actor of actorsWithoutAudio) {
      await generateAndPlayAudio(actor);
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

      // Sort actors by delay if using sequential mode
      const sortedActors = [...actorsWithAudio].sort(
        (a, b) => a.delay - b.delay,
      );

      if (mergeType === "sequential") {
        await mergeSequential(sortedActors, audioContext);
      } else {
        await mergeWithOverlap(sortedActors, audioContext);
      }
    } catch (error) {
      console.error("Error merging audio:", error);
    } finally {
      setIsMergingAudio(false);
    }
  };

  const mergeSequential = async (
    sortedActors: ActorSection[],
    audioContext: AudioContext,
  ) => {
    const audioBuffers: AudioBuffer[] = [];
    const volumes: number[] = [];

    for (const actor of sortedActors) {
      if (!actor.audioBlob) continue;
      const arrayBuffer = await actor.audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers.push(audioBuffer);
      volumes.push(actor.muted ? 0 : actor.volume);
    }

    // Calculate total length including delays
    let totalLength = 0;
    for (let i = 0; i < sortedActors.length; i++) {
      if (i === 0) {
        totalLength += audioBuffers[i].duration;
      } else {
        // Add delay between previous and current actor
        const delayInSeconds =
          (sortedActors[i].delay - sortedActors[i - 1].delay) / 1000;
        totalLength += Math.max(0, delayInSeconds) + audioBuffers[i].duration;
      }
    }

    const sampleRate = audioBuffers[0].sampleRate;
    const numberOfChannels = audioBuffers[0].numberOfChannels;

    const mergedBuffer = audioContext.createBuffer(
      numberOfChannels,
      totalLength * sampleRate,
      sampleRate,
    );

    let offset = 0;
    for (let i = 0; i < audioBuffers.length; i++) {
      const buffer = audioBuffers[i];
      const volume = volumes[i];

      // Add delay if not the first actor
      if (i > 0) {
        const delayInSeconds =
          (sortedActors[i].delay - sortedActors[i - 1].delay) / 1000;
        if (delayInSeconds > 0) {
          offset += delayInSeconds * sampleRate;
        }
      }

      for (let channel = 0; channel < numberOfChannels; channel++) {
        const mergedChannelData = mergedBuffer.getChannelData(channel);
        const bufferChannelData = buffer.getChannelData(channel);

        for (let j = 0; j < bufferChannelData.length; j++) {
          mergedChannelData[j + offset] =
            bufferChannelData[j] * volume * masterVolume;
        }
      }

      offset += buffer.length;
    }

    finalizeMergedAudio(mergedBuffer);
  };

  const mergeWithOverlap = async (
    sortedActors: ActorSection[],
    audioContext: AudioContext,
  ) => {
    const audioBuffers: AudioBuffer[] = [];
    const volumes: number[] = [];
    const delays: number[] = [];

    for (const actor of sortedActors) {
      if (!actor.audioBlob) continue;
      const arrayBuffer = await actor.audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers.push(audioBuffer);
      volumes.push(actor.muted ? 0 : actor.volume);
      delays.push(actor.delay);
    }

    // Find the latest end time
    let maxEndTime = 0;
    for (let i = 0; i < audioBuffers.length; i++) {
      const endTime = delays[i] / 1000 + audioBuffers[i].duration;
      if (endTime > maxEndTime) {
        maxEndTime = endTime;
      }
    }

    const sampleRate = audioBuffers[0].sampleRate;
    const numberOfChannels = audioBuffers[0].numberOfChannels;

    const mergedBuffer = audioContext.createBuffer(
      numberOfChannels,
      maxEndTime * sampleRate,
      sampleRate,
    );

    // Mix all audio buffers with their respective delays
    for (let i = 0; i < audioBuffers.length; i++) {
      const buffer = audioBuffers[i];
      const volume = volumes[i];
      const delayInSamples = Math.floor((delays[i] / 1000) * sampleRate);

      for (let channel = 0; channel < numberOfChannels; channel++) {
        const mergedChannelData = mergedBuffer.getChannelData(channel);
        const bufferChannelData = buffer.getChannelData(channel);

        for (let j = 0; j < bufferChannelData.length; j++) {
          // Add samples, don't just overwrite (for overlapping)
          mergedChannelData[j + delayInSamples] +=
            bufferChannelData[j] * volume * masterVolume;
        }
      }
    }

    // Normalize to prevent clipping
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const mergedChannelData = mergedBuffer.getChannelData(channel);
      let max = 0;

      // Find the maximum amplitude
      for (let i = 0; i < mergedChannelData.length; i++) {
        const abs = Math.abs(mergedChannelData[i]);
        if (abs > max) {
          max = abs;
        }
      }

      // Normalize if needed
      if (max > 1) {
        const gain = 0.9 / max; // Leave some headroom
        for (let i = 0; i < mergedChannelData.length; i++) {
          mergedChannelData[i] *= gain;
        }
      }
    }

    finalizeMergedAudio(mergedBuffer);
  };

  const finalizeMergedAudio = async (mergedBuffer: AudioBuffer) => {
    const offlineContext = new OfflineAudioContext(
      mergedBuffer.numberOfChannels,
      mergedBuffer.length,
      mergedBuffer.sampleRate,
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

    // Draw waveform for merged audio
    setTimeout(() => {
      drawMergedWaveform(wavBlob);
    }, 500);
  };

  const bufferToWave = (abuffer: AudioBuffer, len: number) => {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
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

    const channels = [];
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

    // Swap actors
    [newActors[actorIndex], newActors[targetIndex]] = [
      newActors[targetIndex],
      newActors[actorIndex],
    ];

    setActors(newActors);
  };

  const toggleFavorite = (voice: Voice) => {
    // This would typically update the voice in your database
    // For now, we'll just update it in the local state
    const updatedVoices = allVoices.map((v) =>
      v.id === voice.id ? { ...v, favorite: !v.favorite } : v,
    );

    // You would need to handle this update in your parent component
    console.log("Toggle favorite for voice:", voice.name);
  };

  const playAllAudio = () => {
    const actorsWithAudio = actors.filter((actor) => actor.audioUrl);

    // Sort by delay
    const sortedActors = [...actorsWithAudio].sort((a, b) => a.delay - b.delay);

    // Schedule playback for each actor based on their delay
    sortedActors.forEach((actor) => {
      const audio = audioRefs.current[actor.id];
      if (!audio) return;

      // Set volume and mute state
      audio.volume = actor.volume * masterVolume;
      audio.muted = actor.muted;

      // Schedule playback
      setTimeout(() => {
        audio.currentTime = 0;
        audio.play();

        // Update playing state
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
    // Update all audio elements when master volume changes
    actors.forEach((actor) => {
      const audio = audioRefs.current[actor.id];
      if (audio) {
        audio.volume = actor.volume * masterVolume;
      }
    });
  }, [masterVolume, actors]);

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

      {showAdvancedSettings && (
        <div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="mb-3 font-medium">Advanced Settings</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="stability">Voice Stability: {stability}</Label>
              <Slider
                id="stability"
                value={[stability]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(value) => setStability(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Higher values make the voice more stable and consistent
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="similarity">Voice Similarity: {similarity}</Label>
              <Slider
                id="similarity"
                value={[similarity]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(value) => setSimilarity(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Higher values make the voice more similar to the original
              </p>
            </div>

            <div className="space-y-2">
              <Label>Merge Type</Label>
              <Select
                value={mergeType}
                onValueChange={(value: "sequential" | "overlap") =>
                  setMergeType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select merge type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sequential">
                    Sequential (One after another)
                  </SelectItem>
                  <SelectItem value="overlap">
                    Overlap (Mix together)
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose how to combine multiple audio clips
              </p>
            </div>

            {mergeType === "overlap" && (
              <div className="space-y-2">
                <Label htmlFor="overlap">
                  Overlap Duration: {overlapDuration}ms
                </Label>
                <Slider
                  id="overlap"
                  value={[overlapDuration]}
                  min={0}
                  max={2000}
                  step={50}
                  onValueChange={(value) => setOverlapDuration(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  How much audio clips should overlap when merging
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <Label>Voice Filters</Label>
            <div className="flex flex-wrap gap-2">
              <Select
                value={filterType}
                onValueChange={(value: "all" | "gender" | "type") => {
                  setFilterType(value);
                  setFilterValue("");
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Voices</SelectItem>
                  <SelectItem value="gender">By Gender</SelectItem>
                  <SelectItem value="type">By Type</SelectItem>
                </SelectContent>
              </Select>

              {filterType === "gender" && (
                <Select value={filterValue} onValueChange={setFilterValue}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((gender) => (
                      <SelectItem key={gender} value={gender.toLowerCase()}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {filterType === "type" && (
                <Select value={filterValue} onValueChange={setFilterValue}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="favorites-only"
                  checked={favoriteVoicesOnly}
                  onCheckedChange={setFavoriteVoicesOnly}
                />
                <Label htmlFor="favorites-only">Favorites only</Label>
              </div>
            </div>
          </div>
        </div>
      )}

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

              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => reorderActors(actor.id, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUpDown className="h-4 w-4 rotate-90" />
                        <span className="sr-only">Move up</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Move up</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => reorderActors(actor.id, "down")}
                        disabled={index === actors.length - 1}
                      >
                        <ArrowUpDown className="h-4 w-4 -rotate-90" />
                        <span className="sr-only">Move down</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Move down</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => duplicateActor(actor.id)}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Duplicate</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Duplicate actor</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {actors.length > 1 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeActor(actor.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Remove actor</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove actor</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="flex items-center gap-4 p-4 md:w-1/3">
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

                        {recentlyUsedVoices.length > 0 && (
                          <>
                            <div className="mb-1 px-2 text-xs font-medium text-muted-foreground">
                              Recently Used
                            </div>
                            <div className="mb-2 grid gap-1">
                              {recentlyUsedVoices.map((voice) => (
                                <button
                                  key={`recent-${voice.id}`}
                                  className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-muted"
                                  onClick={() =>
                                    updateActorVoice(actor.id, voice)
                                  }
                                >
                                  <Avatar className="h-8 w-8 border">
                                    <AvatarImage
                                      src={voice.picture || "/placeholder.svg"}
                                      alt={voice.name}
                                    />
                                    <AvatarFallback>
                                      {voice.name.substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="text-sm">
                                    <p>{voice.name}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                            <Separator className="my-2" />
                          </>
                        )}

                        <ScrollArea className="h-[250px]">
                          <div className="grid gap-1">
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
                                    {voice.gender} • {voice.type}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-auto h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(voice);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={
                                      voice.favorite ? "currentColor" : "none"
                                    }
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-yellow-400"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </Button>
                              </button>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Delay:
                      </span>
                      <Input
                        type="number"
                        min="0"
                        step="100"
                        value={actor.delay}
                        onChange={(e) =>
                          updateActorDelay(
                            actor.id,
                            Number.parseInt(e.target.value) || 0,
                          )
                        }
                        className="h-7 w-20 text-xs"
                      />
                      <span className="text-xs text-muted-foreground">ms</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleActorMute(actor.id)}
                    >
                      {actor.muted ? (
                        <Mute className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Volume className="h-4 w-4" />
                      )}
                    </Button>
                    <Slider
                      value={[actor.volume]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={(value) =>
                        updateActorVolume(actor.id, value[0])
                      }
                      className="w-24"
                      disabled={actor.muted}
                    />
                  </div>
                </div>
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
                  <Button
                    onClick={() => generateAndPlayAudio(actor)}
                    disabled={
                      !actor.voice || !actor.text.trim() || actor.isGenerating
                    }
                    className="h-10"
                    variant="outline"
                  >
                    {actor.isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : actor.isPlaying ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </>
                    ) : actor.audioUrl ? (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Play
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
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

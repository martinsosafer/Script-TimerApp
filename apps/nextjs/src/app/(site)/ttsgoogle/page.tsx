"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@voiceai/ui";
import Textarea from "@voiceai/ui/@/components/textarea-autosize";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@voiceai/ui/@/components/ui/card";
import { IconAudioWaveform, IconStop } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@voiceai/ui/@/components/ui/select";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

interface Voice {
  name: string;
  languageCodes: string[];
  ssmlGender: string;
}

export default function TextToSpeech() {
  const [text, setText] = useState(
    "Hello, welcome to my text to speech application with streaming support!",
  );
  const [voices, setVoices] = useState<Voice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<AudioBuffer[]>([]);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const currentBufferIndexRef = useRef(0);

  useEffect(() => {
    fetchVoices();
  }, []);

  useEffect(() => {
    const filtered = voices.filter((voice) =>
      voice.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredVoices(filtered);
  }, [searchQuery, voices]);

  const fetchVoices = async () => {
    try {
      const response = await fetch("/api/ttsgoogle/voices");
      if (!response.ok) throw new Error("Failed to fetch voices");
      const data = await response.json();
      setVoices(data.voices);
      setFilteredVoices(data.voices);
      if (data.voices.length > 0) {
        setSelectedVoice(data.voices[0].name);
      }
    } catch (error) {
      console.error("Error fetching voices:", error);
    }
  };

  const playNextBuffer = () => {
    if (!audioContextRef.current) return;

    if (currentBufferIndexRef.current < audioBuffersRef.current.length) {
      const buffer = audioBuffersRef.current[currentBufferIndexRef.current];
      audioSourceRef.current = audioContextRef.current.createBufferSource();
      audioSourceRef.current.buffer = buffer;
      audioSourceRef.current.connect(audioContextRef.current.destination);

      audioSourceRef.current.onended = () => {
        currentBufferIndexRef.current++;
        playNextBuffer();
      };

      audioSourceRef.current.start();
    } else {
      setIsPlaying(false);
    }
  };

  const handlePlay = async () => {
    if (isPlaying) {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }

      audioBuffersRef.current = [];
      currentBufferIndexRef.current = 0;

      const response = await fetch("/api/ttsgoogle/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice: selectedVoice }),
      });

      if (!response.ok) throw new Error("Failed to synthesize speech");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Response body is not readable");

      setIsPlaying(true);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const audioBuffer = await audioContextRef.current.decodeAudioData(
          value.buffer,
        );
        audioBuffersRef.current.push(audioBuffer);

        if (audioBuffersRef.current.length === 1) {
          playNextBuffer();
        }
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconAudioWaveform className="h-6 w-6" />
            Text-to-Speech with Streaming
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="voice-search" className="text-sm font-medium">
              Search Voices
            </label>
            <Input
              id="voice-search"
              type="text"
              placeholder="Search voices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="voice-select" className="text-sm font-medium">
              Select Voice
            </label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger id="voice-select">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {filteredVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name.split("-").pop()} ({voice.ssmlGender},{" "}
                    {voice.languageCodes[0]})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="text-input" className="text-sm font-medium">
              Text to Speak
            </label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to convert to speech..."
              className="mx-auto block min-h-[200px] w-full max-w-[500px] resize-none"
            />
          </div>

          <Button
            onClick={handlePlay}
            disabled={!selectedVoice || !text || isLoading}
            className="mx-auto block w-full max-w-[500px]"
          >
            {isLoading ? (
              "Loading..."
            ) : isPlaying ? (
              <>
                <IconStop className="mr-2 h-4 w-4" /> Stop
              </>
            ) : (
              <>
                <PlayIcon className="mr-2 h-4 w-4" /> Play
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

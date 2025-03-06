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
  name: string; // Full voice name (e.g., "en-GB-Wavenet-G")
  languageCodes: string[]; // Language codes (e.g., ["en-GB"])
  ssmlGender: string; // Gender (e.g., "FEMALE" or "MALE")
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch voices on component mount
  useEffect(() => {
    fetchVoices();
  }, []);

  // Filter voices based on search query
  useEffect(() => {
    const filtered = voices.filter((voice) =>
      voice.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredVoices(filtered);
  }, [searchQuery, voices]);

  // Fetch voices from the backend
  const fetchVoices = async () => {
    try {
      const response = await fetch("/api/ttsgoogle/voices");
      if (!response.ok) throw new Error("Failed to fetch voices");
      const data = await response.json();
      setVoices(data.voices);
      setFilteredVoices(data.voices);
      if (data.voices.length > 0) {
        setSelectedVoice(data.voices[0].name); // Select the first voice by default
      }
    } catch (error) {
      console.error("Error fetching voices:", error);
    }
  };

  // Handle play button click
  const handlePlay = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    try {
      // Find the selected voice object to send both name and languageCode
      const selectedVoiceObj = voices.find(
        (voice) => voice.name === selectedVoice,
      );

      if (!selectedVoiceObj) {
        throw new Error("Selected voice not found");
      }

      const response = await fetch("/api/ttsgoogle/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice: selectedVoice,
          languageCode: selectedVoiceObj.languageCodes[0], // Send the language code directly
        }),
      });

      if (!response.ok) throw new Error("Failed to synthesize speech");

      // Create a blob from the streaming response
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);

      // Create or use existing audio element
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      audioRef.current.src = audioUrl;
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };

      audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
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
          {/* Search Voices */}
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

          {/* Select Voice */}
          <div className="space-y-2">
            <label htmlFor="voice-select" className="text-sm font-medium">
              Select Voice
            </label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger id="voice-select">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {filteredVoices.map((voice, index) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {index + 1}. {voice.name} ({voice.ssmlGender},{" "}
                    {voice.languageCodes[0]})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Text Input */}
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

          {/* Play Button */}
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

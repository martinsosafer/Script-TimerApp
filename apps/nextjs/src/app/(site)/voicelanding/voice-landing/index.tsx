"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@voiceai/ui";
import { Card } from "@voiceai/ui/@/components/ui/card";
import { Textarea } from "@voiceai/ui/@/components/ui/textarea";
import { PlayIcon as Play } from "@voiceai/ui/@/icons/icons";

// Simulated actor data
const actors = [
  { id: 1, name: "John Doe", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Jane Smith", image: "/placeholder.svg?height=100&width=100" },
  {
    id: 3,
    name: "Mike Johnson",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Emily Brown",
    image: "/placeholder.svg?height=100&width=100",
  },
  { id: 5, name: "Chris Lee", image: "/placeholder.svg?height=100&width=100" },
  {
    id: 6,
    name: "Sarah Wilson",
    image: "/placeholder.svg?height=100&width=100",
  },
];

// Simulated voice data
const voices = Array(100)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: `Voice ${i + 1}`,
    sample: "/path-to-audio-sample.mp3",
  }));

const ITEMS_PER_PAGE = 20;

export default function AIVoiceLandingPage() {
  const [selectedActor, setSelectedActor] = useState<number | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState<string>(""); // To track user text input
  const [loading, setLoading] = useState<boolean>(false); // To show loading state
  const [error, setError] = useState<string | null>(null); // To track any errors

  const totalPages = Math.ceil(voices.length / ITEMS_PER_PAGE);
  const paginatedVoices = voices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleActorSelection = (id: number) => {
    setSelectedActor((prev) => (prev === id ? null : id));
  };

  const handleVoiceSelection = (id: number) => {
    setSelectedVoice((prev) => (prev === id ? null : id));
  };

  const playVoiceSample = (sample: string) => {
    console.log(`Playing sample: ${sample}`);
  };

  const handleCreateVoice = async () => {
    if (!inputText) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call the API endpoint to generate the voice
      const response = await fetch("/api/voicegpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate voice.");
      }

      // Create an audio element and play the streamed audio
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();

      // Optionally handle the generated voice data here (e.g., save audio URL)
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(249,115,22,0.1) 100%)",
            "radial-gradient(circle, rgba(249,115,22,0.1) 0%, rgba(59,130,246,0.1) 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <main className="container mx-auto px-4 py-8">
        <motion.h1
          className="mb-4 text-center text-5xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-blue-600">Co-Producer</span>
        </motion.h1>
        <motion.p
          className="mb-12 text-center text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Create amazing AI-powered voices for your projects
        </motion.p>

        {/* Actor Selection */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {actors.map((actor, index) => (
            <motion.div
              key={actor.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card
                className={`cursor-pointer p-4 text-center transition-all duration-300 ${
                  selectedActor === actor.id
                    ? "border-2 border-orange-500 shadow-lg"
                    : ""
                }`}
                onClick={() => handleActorSelection(actor.id)}
              >
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="mx-auto mb-2 rounded-full"
                />
                <h3 className="font-semibold">{actor.name}</h3>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Text Area and Create Button */}
        <div className="mx-auto mb-8 max-w-2xl">
          <Textarea
            placeholder="Enter your text here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="mb-4"
          />
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleCreateVoice}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>

        {/* Voice Selection */}
        <h2 className="mb-8 text-center text-3xl font-bold">
          Choose Your Voice
        </h2>

        <motion.div
          className="mb-8 rounded-lg p-4"
          animate={{
            boxShadow: [
              "0 0 0 2px rgba(59,130,246,0.5)",
              "0 0 0 4px rgba(59,130,246,0.5)",
              "0 0 0 2px rgba(59,130,246,0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {paginatedVoices.map((voice) => (
              <Card
                key={voice.id}
                className={`cursor-pointer p-2 ${
                  selectedVoice === voice.id ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleVoiceSelection(voice.id)}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={voice.image}
                    alt={voice.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-grow">
                    <h3 className="text-sm font-semibold">{voice.name}</h3>
                    <p className="text-xs text-gray-500">{voice.modelName}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      playVoiceSample(voice.sample);
                    }}
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center space-x-4">
          <Button
            className="bg-gray-300 hover:bg-gray-400"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            className="bg-gray-300 hover:bg-gray-400"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
}

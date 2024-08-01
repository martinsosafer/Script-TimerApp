"use client";

import React, { useRef, useState } from "react";

import { Button } from "@voiceai/ui";
import IconUserRound from "@voiceai/ui/@/components/ui/icons";

import LoadingDots from "~/app/(site)/components/loadingdots"; // Assuming the loading dots component is here
import { api } from "~/utils/api";

interface CloningCardProps {
  id: string;
  name: string;
  description: string;
  externalId: string;
  onGenerateDemo: (
    externalId: string,
    audioRef: React.RefObject<HTMLAudioElement>,
  ) => void;
  onDelete: (id: string) => void;
}

const CloningCard: React.FC<CloningCardProps> = ({
  id,
  name,
  description,
  externalId,
  onGenerateDemo,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGenerateDemo = async () => {
    setLoading(true);
    try {
      await onGenerateDemo(externalId, audioRef);
    } catch (error) {
      console.error("Failed to generate demo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:bg-gray-800 dark:text-white">
      <div className="flex items-center">
        <IconUserRound className="mr-4 h-12 w-12 text-primary" />{" "}
        <div className="flex-grow">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <Button
          onClick={handleGenerateDemo}
          className={`flex items-center justify-center ${
            loading ? "bg-blue-400" : "bg-blue-600"
          } h-9 w-40 rounded-md text-white`}
        >
          {loading ? (
            <LoadingDots color="white" style="small" />
          ) : (
            "Generate Demo"
          )}
        </Button>
        <Button
          onClick={handleDelete}
          className="rounded-md bg-red-600 px-4 py-2 text-white"
        >
          Delete
        </Button>
      </div>
      <audio ref={audioRef} controls style={{ display: "none" }} />
    </div>
  );
};

const CustomVoiceCards: React.FC = () => {
  const { data: customvoices = [] } =
    api.voiceCustom.listAllCustomVoices.useQuery("");
  console.log("CUSTOMVOICES", customvoices);

  const handleGenerateDemo = async (
    externalId: string,
    audioRef: React.RefObject<HTMLAudioElement>,
  ) => {
    console.log("Generate demo for:", externalId);

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "This is a cloned voice created by Script Timer",
          voice_id: externalId,
          voice_actor: "your-demo-voice-actor",
          stability: 0.5,
          similarity: 0.5,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from API:", errorText);
        throw new Error("Failed to fetch the text-to-speech stream.");
      }

      const responseBody = response.body;
      if (!responseBody) {
        throw new Error("Response body is null.");
      }

      const mediaSource = new MediaSource();
      const objectUrl = URL.createObjectURL(mediaSource);
      if (audioRef.current) {
        audioRef.current.src = objectUrl;
      }

      mediaSource.addEventListener("sourceopen", async () => {
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
        const reader = responseBody.getReader();

        const readStream = async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Wait for sourceBuffer to finish updating before ending the stream
              if (!sourceBuffer.updating) {
                mediaSource.endOfStream();
                if (audioRef.current) {
                  audioRef.current.play().catch((error) => {
                    console.error("Failed to play audio:", error);
                  });
                }
              } else {
                sourceBuffer.addEventListener(
                  "updateend",
                  () => {
                    mediaSource.endOfStream();
                    if (audioRef.current) {
                      audioRef.current.play().catch((error) => {
                        console.error("Failed to play audio:", error);
                      });
                    }
                  },
                  { once: true },
                );
              }
              break;
            }
            sourceBuffer.appendBuffer(value);
          }
        };

        readStream().catch((error) => {
          console.error("Error reading stream:", error);
          if (!sourceBuffer.updating) {
            mediaSource.endOfStream("decode");
          } else {
            sourceBuffer.addEventListener(
              "updateend",
              () => {
                mediaSource.endOfStream("decode");
              },
              { once: true },
            );
          }
        });
      });

      console.log("Demo generated successfully!");
    } catch (error) {
      console.error("Failed to generate demo:", error);
    }
  };

  const handleDelete = (id: string) => {
    console.log("Delete voice with id:", id);
    // Handle delete logic here
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {customvoices.map((voice) => (
        <CloningCard
          key={voice.id}
          id={voice.id}
          name={voice.name}
          description={voice.description || "No description available"}
          externalId={voice.external_id}
          onGenerateDemo={handleGenerateDemo}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default CustomVoiceCards;

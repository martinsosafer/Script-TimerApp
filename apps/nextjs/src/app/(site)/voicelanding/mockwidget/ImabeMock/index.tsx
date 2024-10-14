import React, { useState } from "react";

import { Button } from "@voiceai/ui";
import { Card } from "@voiceai/ui/@/components/ui/card";

export default function ImageGenerationMock() {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const prompts = [
    "Show me 2 samples of what the opening scene in Pulp Fiction would look like if it were filmed today",
    "Show me a network support center with people at work, with large screens like a NASA launch, use the style of Isometric Perspective (with no vanishing)",
    "Storyboard Show me a biotech lab focused on DNA sequencing, with a lead scientist, female, asian, 30 years old and support staff in a vast computer supported lab",
  ];

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setIsLoading(true);
    setImages([]);

    // Simulate image generation
    setTimeout(() => {
      setIsLoading(false);
      setImages([
        `/placeholder.svg?height=300&width=400`,
        `/placeholder.svg?height=300&width=400`,
      ]);
    }, 3000);
  };

  return (
    <Card className="mx-auto max-w-4xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Image Generation Widget</h2>
      <div className="mb-6 space-y-4">
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            className="h-auto w-full whitespace-normal text-left"
            disabled={isLoading}
          >
            {prompt}
          </Button>
        ))}
      </div>
      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Generated image ${index + 1}`}
              className="h-auto w-full rounded-lg shadow-md"
            />
          ))}
        </div>
      )}
      <style jsx>{`
        .loader {
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Card>
  );
}

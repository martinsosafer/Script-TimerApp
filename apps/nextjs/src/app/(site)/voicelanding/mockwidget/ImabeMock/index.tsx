import React, { useState } from "react";
import Image from "next/image";

import { Button } from "@voiceai/ui";
import { Card } from "@voiceai/ui/@/components/ui/card";

// Importing images
import PulpFictionImg1 from "./images/Plup Fiction single shot.png";
import PulpFictionImg2 from "./images/storyboard pulp fiction 1.png";
import StoryBoardImg2 from "./images/storyboard2 bio.png";
import StoryBoardImg1 from "./images/Storyboarda.png";

export default function ImageGenerationMock() {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  // Mapping of prompts to imported image variables
  const imageMapping = {
    "Show me 2 samples of what the opening scene in Pulp Fiction would look like if it were filmed today":
      [PulpFictionImg1, PulpFictionImg2],
    "Show me a network support center with people at work, with large screens like a NASA launch, use the style of Isometric Perspective (with no vanishing)":
      [StoryBoardImg1, StoryBoardImg2],
    "Storyboard Show me a biotech lab focused on DNA sequencing, with a lead scientist, female, asian, 30 years old and support staff in a vast computer supported lab":
      [StoryBoardImg1, StoryBoardImg2],
  };

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setIsLoading(true);
    setImages([]);

    // Simulate image generation loading
    setTimeout(() => {
      setIsLoading(false);
      setImages(imageMapping[prompt] || []);
    }, 1000); // Reduced timeout for faster testing
  };

  return (
    <Card className="mx-auto max-w-4xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Image Generation Widget</h2>
      <div className="mb-6 space-y-4">
        {Object.keys(imageMapping).map((prompt, index) => (
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
            <Image
              key={index}
              src={image}
              alt={`Generated image ${index + 1}`}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
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

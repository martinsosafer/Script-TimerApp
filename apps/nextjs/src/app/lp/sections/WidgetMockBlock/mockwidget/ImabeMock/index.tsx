"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@voiceai/ui";
import { Card } from "@voiceai/ui/@/components/ui/card";
import {
  FileImageIcon,
  IconArrowLeft,
} from "@voiceai/ui/@/components/ui/icons";

import { roboto } from "~/app/fonts";
// Importing images
import PulpFictionImg1 from "./images/Plup Fiction single shot.png";
import PulpFictionImg2 from "./images/storyboard pulp fiction 1.png";
import StoryBoardImg2 from "./images/storyboard2 bio.png";
import StoryBoardImg1 from "./images/Storyboarda.png";

export default function ImageGenerationMock() {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [showImages, setShowImages] = useState(false);

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
    setShowImages(false);

    // Simulate image generation loading
    setTimeout(() => {
      setIsLoading(false);
      setImages(imageMapping[prompt] || []);
      setShowImages(true);
    }, 1000); // Reduced timeout for faster testing
  };

  const handleGoBack = () => {
    setSelectedPrompt("");
    setImages([]);
    setShowImages(false);
  };

  return (
    <div style={{ minHeight: "250px" }}>
      <h3 className="mb-4 text-[14px] font-normal leading-[19.6px] ">
        In the app, enter your text here. This is our sample:
      </h3>

      <AnimatePresence>
        {!selectedPrompt && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Object.keys(imageMapping).map((prompt, index) => (
              <Card
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className={`border-cp-primary cursor-pointer border p-4 ${
                  selectedPrompt === prompt
                    ? "bg-cp-primary text-white"
                    : "bg-white text-black"
                } hover:bg-cp-primary transition-all hover:text-white ${
                  roboto.className
                } text-sm font-normal`}
              >
                <div className="flex items-center">
                  <FileImageIcon
                    className="mr-2"
                    color={selectedPrompt === prompt ? "#FFCB7F" : "#0066FF"}
                  />
                  <span>{prompt}</span>
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {selectedPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4"
          >
            <Card className="border-cp-primary bg-cp-primary border p-4 text-white">
              <div className="flex items-center">
                <FileImageIcon className="mr-2" color="#FFCB7F" />
                <span>{selectedPrompt}</span>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="flex h-[180px] items-center justify-center">
          <div className="loader"></div>
        </div>
      )}

      <AnimatePresence>
        {!isLoading && showImages && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="grid h-[210px] grid-cols-2 gap-4">
              {images.map((image, index) => (
                <Card
                  key={index}
                  className="overflow-hidden rounded-lg border-slate-200 shadow-md"
                >
                  <Image
                    src={image}
                    alt={`Generated image ${index + 1}`}
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                </Card>
              ))}
            </div>
            <Button onClick={handleGoBack} className="w-full">
              <IconArrowLeft className="mr-2 h-4 w-4" /> Try other Prompt
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  );
}

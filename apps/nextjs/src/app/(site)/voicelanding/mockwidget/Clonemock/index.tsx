import React from "react";

import { Button } from "@voiceai/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import { IconPlay as Play } from "@voiceai/ui/@/components/ui/icons";

const voiceData = [
  {
    name: "Lily",
    original: "https://example.com/lily-original.mp3",
    clone: "https://example.com/lily-clone.mp3",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#10B981", // Green
  },
  {
    name: "Chris",
    original: "https://example.com/chris-original.mp3",
    clone: "https://example.com/chris-clone.mp3",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#8B5CF6", // Purple
  },
  {
    name: "Laura",
    original:
      "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockClone/EllaReal-rSKPMfBYc8VTXFe7I8EI1C9MGFFVfQ.mp3",
    clone: "https://example.com/laura-clone.mp3",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#EC4899", // Pink
  },
];

const RobotIcon = ({ color }: { color: string }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill={color} />
    <path d="M12 14h16v12H12V14z" fill="#fff" />
    <circle cx="16" cy="18" r="2" fill={color} />
    <circle cx="24" cy="18" r="2" fill={color} />
    <path d="M15 25h10v2H15v-2z" fill={color} />
    <path
      d="M13 11v4m14-4v4M10 28l3-3m17 3l-3-3"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function CloneMock() {
  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div
      className="mx-auto w-full max-w-3xl  rounded-lg bg-white  shadow"
      style={{ minHeight: "250px" }}
    >
      {voiceData.map((voice) => (
        <div
          key={voice.name}
          className="flex flex-col items-center justify-between rounded-lg bg-gray-50 p-3 sm:flex-row"
        >
          <div className="mb-1 flex items-center space-x-4 sm:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={voice.avatar} alt={voice.name} />
              <AvatarFallback>{voice.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{voice.name}</p>
              <p className="text-sm text-gray-500">ORIGINAL</p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => playAudio(voice.original)}
          >
            <Play className="h-6 w-6" />
            <span className="sr-only">Play original voice</span>
          </Button>
          <div className="my-4 flex items-center sm:my-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mb-4 flex items-center space-x-4 sm:mb-0">
            <RobotIcon color={voice.color} />
            <div>
              <p className="text-lg font-semibold">{voice.name}</p>
              <p className="text-sm text-gray-500">CLONE</p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => playAudio(voice.clone)}
          >
            <Play className="h-6 w-6" />
            <span className="sr-only">Play cloned voice</span>
          </Button>
        </div>
      ))}
    </div>
  );
}

import React from "react";

import { Button } from "@voiceai/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import { IconPlay as Play } from "@voiceai/ui/@/components/ui/icons";

import ChrisImg from "./CloneMockImg/chris.png";
import LauraImg from "./CloneMockImg/Laura.png";
import LilyImg from "./CloneMockImg/lili.png";

const voiceData = [
  {
    name: "Lily",
    original: "https://example.com/lily-original.mp3",
    clone: "https://example.com/lily-clone.mp3",
    avatar: LilyImg,
    color: "#10B981", // Green
  },
  {
    name: "Chris",
    original: "https://example.com/chris-original.mp3",
    clone: "https://example.com/chris-clone.mp3",
    avatar: LauraImg,
    color: "#8B5CF6", // Purple
  },
  {
    name: "Laura",
    original:
      "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockClone/EllaReal-rSKPMfBYc8VTXFe7I8EI1C9MGFFVfQ.mp3",
    clone: "https://example.com/laura-clone.mp3",
    avatar: ChrisImg,
    color: "#EC4899", // Pink
  },
];

const RobotIcon = ({ color }: { color: string }) => (
  <svg
    width="52"
    height="52"
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
    <div style={{ minHeight: "250px" }}>
      <h3 className="text-[14px] font-normal leading-[19.6px]">
        Choose the delivery and attitude you like and change to another voice
        with the same inflection.
      </h3>
      <div className="h-[327px] w-[860px] rounded-2xl bg-[#E2E8F0]">
        {voiceData.map((voice, index) => (
          <div
            key={voice.name}
            className="flex flex-col items-center justify-between rounded-lg sm:flex-row"
          >
            <div
              className={`mb-3 ml-[129px] flex h-[85px] w-[239px] items-center rounded-lg bg-white sm:mb-0 ${index === 0 ? "mt-[24px]" : "mt-[12px]"}`}
            >
              <Avatar className="ml-3 h-[52px] w-[52px]">
                <AvatarImage src={voice.avatar.src} alt={voice.name} />
                <AvatarFallback>{voice.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-[22px] mr-2 h-[39px] w-[101px]">
                <p className="text-[16px] font-bold leading-[23px]">
                  {voice.name}
                </p>
                <p className="font-roboto text-[12px] leading-[17px] text-[#636D80]">
                  Original
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => playAudio(voice.original)}
              >
                <Play className="text-cp-primary h-[40px] w-[30px]" />
              </Button>
            </div>

            <div className="flex items-center justify-center pt-[20px]">
              <svg
                className="h-6 w-6 text-gray-500"
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
            <div
              className={`mb-3 mr-[129px] flex h-[85px] w-[239px] items-center rounded-lg bg-white sm:mb-0 ${
                index === 0 ? "mt-[24px]" : "mt-[12px]"
              }`}
            >
              <div className="ml-3">
                <RobotIcon color={voice.color} />
              </div>
              <div className="ml-[22px] mr-2 h-[39px] w-[101px]">
                <p className="text-[16px] font-bold leading-[23px]">
                  {voice.name}
                </p>
                <p className="font-roboto text-[12px] leading-[17px] text-[#636D80]">
                  CLONE
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => playAudio(voice.clone)}
              >
                <Play className="text-cp-primary h-[40px] w-[30px]" />
                <span className="sr-only">Play cloned voice</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";

import { Button } from "@voiceai/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import {
  IconPlay as Play,
  IconStop as Stop,
} from "@voiceai/ui/@/components/ui/icons";

import ChrisImg from "./CloneMockImg/chris.png";
import LauraImg from "./CloneMockImg/Laura.png";
import LilyImg from "./CloneMockImg/lili.png";
import RobotIconPng from "./CloneMockImg/Script Coach.png";

const voiceData = [
  {
    name: "Lily",
    original:
      "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockClone/LiliRealVoice-sSAXYX9xfoi5xvh2DWiiFt7dT9FFJF.mp3",
    clone:
      "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockClone/LilyFakeVoice-w5Y8f2cRsZGBnb6GynND5k7j60m2q7.mp3",
    avatar: LilyImg,
    color: "#10B981", // Green
  },
  {
    name: "Chris",
    original:
      "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockClone/ChrisReallife-cw8b0d1PHVFeEWDdZ3U2VaxRsYFQPy.mp3",
    clone:
      "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockClone/Chrisfake-ZbIFeBYVtjfZ42ORFdWOJsSSKizuAd.mp3",
    avatar: LauraImg,
    color: "#8B5CF6", // Purple
  },
  {
    name: "Laura",
    original:
      "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockClone/LauraReal-qPZVH9I8o84NcG0Blh3qvTCLxZbQ40.mp3",
    clone:
      "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockClone/LauraFake-NFMWGdDa1DwHU5qNNbikkEgnaOzmeh.mp3",
    avatar: ChrisImg,
    color: "#EC4899", // Pink
  },
];

interface CloneMockProps {
  activeTab: string;
}

export default function CloneMock({ activeTab }: CloneMockProps) {
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(
    null,
  );
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  const playAudio = (url: string) => {
    // Stop any currently playing audio
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }

    // If the clicked audio is already playing, stop it
    if (url === playingUrl) {
      setPlayingAudio(null);
      setPlayingUrl(null);
      return;
    }

    // Play new audio
    const audio = new Audio(url);
    audio.play();
    setPlayingAudio(audio);
    setPlayingUrl(url);
  };

  const stopAudio = () => {
    // Ensure audio is completely stopped and state is reset
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
    setPlayingAudio(null);
    setPlayingUrl(null);
  };

  // Stop audio when tab changes
  useEffect(() => {
    stopAudio();
  }, [activeTab]);

  // Cleanup to stop audio when component unmounts
  useEffect(() => {
    return () => {
      if (playingAudio) {
        playingAudio.pause();
        playingAudio.currentTime = 0;
      }
    };
  }, [playingAudio]);
  return (
    <div style={{ minHeight: "250px" }}>
      <h3 className="mb-2 text-[14px] font-normal leading-[19.6px]">
        Choose the delivery and attitude you like and change to another voice
        with the same inflection.
      </h3>
      {/* DESKTOP */}
      <div className="hidden bg-[#E2E8F0] lg:block lg:h-[327px] lg:w-[860px] lg:rounded-2xl">
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
                {playingUrl === voice.original ? (
                  <Stop className="text-cp-primary h-[40px] w-[30px]" />
                ) : (
                  <Play className="text-cp-primary h-[40px] w-[30px]" />
                )}
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
              <div
                className="ml-3"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: voice.color,
                }}
              >
                <img
                  src={RobotIconPng.src}
                  alt="Robot Icon"
                  className="h-full w-full object-cover"
                />
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
                {playingUrl === voice.clone ? (
                  <Stop className="text-cp-primary h-[40px] w-[30px]" />
                ) : (
                  <Play className="text-cp-primary h-[40px] w-[30px]" />
                )}
                <span className="sr-only">
                  {playingUrl === voice.clone ? "Stop" : "Play"} cloned voice
                </span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* MOBILE */}
      <div className="block space-y-4  lg:hidden">
        {voiceData.map((voice, index) => (
          <div
            key={voice.name}
            className="space-y-2 rounded-2xl bg-[#E2E8F0] p-4"
          >
            {/* Original Voice Card */}
            <div className="flex h-[85px] w-full items-center rounded-lg bg-white">
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
                className="ml-auto mr-3"
                onClick={() => playAudio(voice.original)}
              >
                {playingUrl === voice.original ? (
                  <Stop className="text-cp-primary h-[40px] w-[30px]" />
                ) : (
                  <Play className="text-cp-primary h-[40px] w-[30px]" />
                )}
              </Button>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-1">
              <svg
                className="h-6 w-6 text-gray-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5L12 19M12 19L18 13M12 19L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Clone Voice Card */}
            <div className="flex h-[85px] w-full items-center rounded-lg bg-white">
              <div
                className="ml-3"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: voice.color,
                }}
              >
                <img
                  src={RobotIconPng.src}
                  alt="Robot Icon"
                  className="h-full w-full object-cover"
                />
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
                className="ml-auto mr-3"
                onClick={() => playAudio(voice.clone)}
              >
                {playingUrl === voice.clone ? (
                  <Stop className="text-cp-primary h-[40px] w-[30px]" />
                ) : (
                  <Play className="text-cp-primary h-[40px] w-[30px]" />
                )}
                <span className="sr-only">
                  {playingUrl === voice.clone ? "Stop" : "Play"} cloned voice
                </span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

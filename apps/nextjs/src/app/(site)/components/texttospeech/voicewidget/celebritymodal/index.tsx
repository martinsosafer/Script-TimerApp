import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@voiceai/ui/@/components/ui/card";
import { IconStop } from "@voiceai/ui/@/components/ui/icons";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

import { poppins } from "~/app/fonts";
import type { SubscriptionData } from "~/lib/types";
import Button from "../../../button";
import HeroImage from "./HeroImage.png";

interface FreeModalProps {
  subData?: SubscriptionData | null | undefined;
  openModal: boolean;
  page:
    | "home"
    | "voice"
    | "chat"
    | "courses"
    | "plagiarism"
    | "translator"
    | "clone"
    | "image";
  position?: { x: number; y: number }; // Optional initial position
}

const pageData: Record<
  string,
  {
    image: StaticImageData;
    list: string[];
    message: string;
    subMessage: string;
  }
> = {
  home: {
    image: HeroImage,
    list: [
      "Save your scripts and voice overs",
      "Clone and translate your voice",
      "Create scripts, images for videos, social media, presentations...",
      "Learn in Masterclasses seen by 70,000 professionals",
    ],
    message: "Clone your own voice!",
    subMessage: "Celeb voices are demos to show you what you can build",
  },
};

export default function CelebrityModal({
  openModal,
  page,
  position = { x: 100, y: 100 }, // Default position
}: FreeModalProps) {
  if (!openModal) {
    return null;
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(
    new Audio(
      "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/PreRecordAudios/audio-0TlgYhDGl5YEVhzyJVrfF2ke7oUjRt.mp3",
    ),
  );

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const currentPage = pageData[page];
  return (
    <div
      className={`absolute z-50 ${poppins.className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="border-cp-secondary h-[300px] w-[525px] overflow-hidden rounded-xl border-4 bg-white shadow-xl">
        <div className="flex h-full">
          {/* Left section (Image) */}
          <div className="flex h-full w-[200px] flex-col items-center justify-center bg-gray-100">
            {page === "home" || page === "voice" ? (
              <div className="flex h-[442px] w-[328px] flex-col items-center justify-center px-[12px] pt-[20px]">
                <Card className="h-[59px] w-[180px] rounded-lg border border-black">
                  <CardContent className="flex h-full w-full items-center justify-between px-[12px] py-[18px]">
                    <div className="flex items-center space-x-[10px]">
                      <div className="h-[38px] w-[128px]">
                        <p className="mb-[3px] text-[13px] font-bold leading-[18px]">
                          David (Male)
                        </p>
                        <p className="text-[12px] font-normal leading-[17px] text-gray-500">
                          English Male Voice
                        </p>
                      </div>
                    </div>
                    <div className="flex h-[43px] w-[43px] items-center">
                      <button
                        onClick={toggleAudio}
                        className="border-cp-secondary text-cp-secondary hover:bg-cp-secondary flex h-[36px] w-[36px] items-center justify-center rounded-full border transition-colors duration-300 ease-in-out hover:text-white focus:outline-none"
                        aria-label={isPlaying ? "Stop audio" : "Play audio"}
                      >
                        {isPlaying ? (
                          <IconStop className="h-[14px] w-[14px]" />
                        ) : (
                          <PlayIcon className="h-[14px] w-[14px]" />
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>

                <div className="mb-[52px] mt-[33px]">
                  <div className="relative h-[160px] w-[170px] overflow-hidden rounded-xl px-[35px]">
                    <Image
                      src={currentPage?.image}
                      alt="Cartoon character, hero of co-producer!"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex h-[330px] w-[330px] items-center justify-center overflow-hidden rounded-xl border-4 border-primary">
                <Image
                  src={currentPage?.image}
                  alt="Alternate content image"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Right section (Content) */}
          <div className="bg-cp-primary flex w-[325px] flex-col items-center pb-[60px] text-white">
            <div className="flex w-[375px] flex-grow flex-col items-center justify-start px-[75px] pt-[30px]">
              <div className="mb-[44px] h-[85px] w-[320px] items-center">
                <h2 className="mb-2 text-center text-[24px] font-bold leading-[33.6px]">
                  {currentPage?.message}
                </h2>
                {currentPage?.subMessage && (
                  <p className="text-center text-[16px] font-bold leading-[22px]">
                    {currentPage.subMessage.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </div>
              <div className="flex w-[375px] flex-col items-center justify-center">
                <p className="mb-2 text-center text-[20px] font-bold leading-[28px]">
                  Let's do it!
                </p>
                <Link href="voicecloning" target="_blank">
                  <Button label="Voice Cloning" type="accent" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

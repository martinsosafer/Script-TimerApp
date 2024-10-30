import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import { Card, CardContent } from "@voiceai/ui/@/components/ui/card";
import { IconStop } from "@voiceai/ui/@/components/ui/icons";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

import { poppins } from "~/app/fonts";
import type { SubscriptionData } from "~/lib/types";
import ScriptCoachImg from "../modalimgs/DirectorImg.png";
import HeroAvatar from "../modalimgs/HeroAvatar.png";
import HeroImage from "../modalimgs/HeroImage.png";
import MasterclassImg from "../modalimgs/MastarclassesImg.png";
import PlagImg from "../modalimgs/PlagiarismImg.png";
import StoryBoardImg from "../modalimgs/StoryboardImg.png";
import TranslatorImg from "../modalimgs/TranslatorImg.png";

interface FreeModalProps {
  subData?: SubscriptionData | null | undefined;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  page:
    | "home"
    | "voice"
    | "chat"
    | "courses"
    | "plagiarism"
    | "translator"
    | "clone"
    | "image";
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
    message: "Great to see you here!",
    subMessage: "Please log in and enjoy the full app!",
  },
  voice: {
    image: HeroImage,
    list: [
      "Listen to your scripts with over 120 different voices",
      "Customize voice tones and accents",
      "Export audio files for use in projects",
      "Clone voices with just an example audio",
    ],
    message: "Almost there ! ",
    subMessage: "Please , create an account to listen \nto your script!",
  },
  chat: {
    image: ScriptCoachImg,
    list: [
      "Upgrade your scripts in seconds",
      "Increase the value of your work with AI coaching",
      "Hundreds of built-in formulas: from TED Talks to sales pitches.",
    ],
    message: "I'd love to deliver that to you",
    subMessage: "Please sign up and start creating with me!",
  },
  courses: {
    image: MasterclassImg,
    list: [
      "Learn in Masterclasses seen by 70,000 professionals",
      "Transform your career learning Storytelling,AI,Pitch Matery,Rapport",
    ],
    message: "Excited to learn together!",
    subMessage: "Please log in and join our Story University!",
  },
  plagiarism: {
    image: PlagImg,
    list: [
      "Assure originality with 99.12% accuracy",
      "Improve your copywritting with AI & plagiarism detectors",
      "Save time and increase knowledge with our included Source Search",
    ],
    message: "I'll check that text for you now",
    subMessage: "please log in below!",
  },
  translator: {
    image: TranslatorImg,
    list: [
      "Translate documents,Audio or Videos",
      "Support for over 70 languages",
      "Translate into audio and text",
    ],
    message: "Happy to translate that for you!",
    subMessage: "Please log in, so i can deliver that with a smile",
  },
  clone: {
    image: HeroImage,
    list: [
      "Listen to your scripts with  over 120 different voices",
      "Customize voice tones and accents",
      "Export audio files for use in projects",
      "Clone voices with just an example audio",
    ],
    message: "Voice Cloning",
    subMessage: "",
  },
  image: {
    image: StoryBoardImg,
    list: [
      "Upgrade your visuals in seconds",
      "Increase the value of your scripts",
      "The right images can tell your story",
    ],
    message: "Happy to help!",
    subMessage: "Please login and let's create your images!",
  },
};
export default function NoSessionModal({
  setOpenModal,
  openModal,
  page,
}: FreeModalProps) {
  if (!openModal) {
    return null;
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(
    new Audio(
      "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/PreRecordAudios/DavidModalAudio-oUXaAbvlRQQls4iCQEHIM5kDekyYl5.mp3",
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
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur ${poppins.className}`}
    >
      <div className="h-[545px] w-[925px] overflow-hidden rounded-xl border border-primary bg-white shadow-xl">
        <div className="flex h-full">
          {/* Left section */}
          <div className="flex h-full w-[400px] flex-col items-center justify-center bg-gray-100">
            {page === "home" || page === "voice" ? (
              <div className="flex h-[442px] w-[328px] flex-col items-center justify-center px-[36px] pt-[52px]">
                <Card className="h-[79px] w-[241px] rounded-lg border border-black">
                  <CardContent className="flex h-full w-full items-center justify-between px-[12px] py-[18px]">
                    <div className="flex items-center space-x-[10px]">
                      <Avatar className="h-[42px] w-[39px]">
                        <AvatarImage src={HeroAvatar.src} alt="David" />
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
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
                  <div className="relative h-[330px] w-[330px] px-[35px]">
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
              // Render this div with an image if page is not "home" or "voice"
              <div className="relative flex h-[330px] w-[330px] items-center justify-center">
                <Image
                  src={currentPage?.image}
                  alt="Alternate content image"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="bg-cp-primary flex w-[525px] flex-col items-center pb-[60px] text-white">
            <div className="flex w-[375px] flex-grow flex-col items-center justify-start px-[75px] pt-[60px]">
              <div className="mb-[44px] h-[85px] w-[375px] items-center">
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
              <div className="h-[192px] w-[375px]">
                <p className="mb-2 text-left text-[20px] font-bold leading-[28px]">
                  Let's do it!:
                </p>
                <div className="h-[149px] w-[374px]">
                  <ul className="list-inside list-disc font-roboto text-lg">
                    {currentPage?.list.map((item, index) => (
                      <li key={index} className="mb-2 ml-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Placed the button at the bottom with padding alignment */}
            <div className="flex w-[375px] flex-col items-center">
              <button className="bg-cp-secondary mb-[8px] h-[45px] w-[375px] rounded-md px-[24px] py-[2px] font-bold uppercase leading-[20px] text-white hover:bg-orange-500">
                <Link href="/signin">LOGIN-FREE</Link>
              </button>
              <p className="text-center font-poppins text-[14px] font-normal leading-5">
                Free trial. No credit card needed.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setOpenModal(false)}
        className="absolute right-4 top-4 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Close modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

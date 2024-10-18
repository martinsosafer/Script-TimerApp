import { useState } from "react";
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

import type { SubscriptionData } from "~/lib/types";
import ScriptCoachImg from "../modalimgs/DirectorImg.png";
import HeroAvatar from "../modalimgs/HeroAvatar.png";
import HeroImage from "../modalimgs/HeroImage.png";
import MasterclassImg from "../modalimgs/MastarclassesImg.png";
import PlagImg from "../modalimgs/PlagiarismImg.png";
import StoryBoardImg from "../modalimgs/StoryboardImg.png";

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
    message: "Try the full app!",
    subMessage: "",
  },
  voice: {
    image: HeroImage,
    list: [
      "Listen to your scripts with over 120 different voices",
      "Customize voice tones and accents",
      "Export audio files for use in projects",
      "Clone voices with just an example audio",
    ],
    message: "Listen To Your Script",
    subMessage: "",
  },
  chat: {
    image: ScriptCoachImg,
    list: [
      "Upgrade your scripts in seconds",
      "Increase the value of your work with AI coaching",
      "Hundreds of built-in formulas: from TED Talks to sales pitches.",
    ],
    message: "Script Coach",
    subMessage: "for presentations,speeches,videos and much,much more!",
  },
  courses: {
    image: MasterclassImg,
    list: [
      "Learn in Masterclasses seen by 70,000 professionals",
      "Transform your career learning Storytelling,AI,Pitch Matery,Rapport",
    ],
    message: "Learn From Experts",
    subMessage: "in our Story University",
  },
  plagiarism: {
    image: PlagImg,
    list: [
      "Assure originality with 99.12% accuracy",
      "Improve your copywritting with AI & plagiarism detectors",
      "Save time and increase knowledge with our included Source Search",
    ],
    message: "Plagiarism check ",
    subMessage: "across nearly every language , detect AI generated content",
  },
  translator: {
    image: HeroImage,
    list: [
      "Translate documents,Audio or Videos",
      "Support for over 70 languages",
    ],
    message: "Translate",
    subMessage: "",
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
    message: "Create your own storyboards",
    subMessage: "or any image you like",
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
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-primary bg-white shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Left section */}
          <div className="w-full items-center bg-gray-100 p-6 pt-[60px] md:w-1/2">
            {/* Conditionally render this section only on the home page */}
            {page === "home" && (
              <div className="flex items-center justify-center">
                <Card className="mb-6 w-72 border-2 border-black">
                  <CardContent className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={HeroAvatar.src} alt="David" />
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">David (Male)</p>
                        <p className="text-sm text-gray-500">
                          English Male Voice
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleAudio}
                      className="rounded-full bg-tertiary p-2 text-white hover:bg-orange-600 focus:outline-none"
                      aria-label={isPlaying ? "Stop audio" : "Play audio"}
                    >
                      {isPlaying ? (
                        <IconStop className="h-6 w-6" />
                      ) : (
                        <PlayIcon className="h-6 w-6" />
                      )}
                    </button>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex items-center justify-center">
              <Image
                src={currentPage?.image}
                alt="Cartoon character ,hero of co-producer!"
                width={350}
                height={350}
              />
            </div>
          </div>

          {/* Right section */}
          <div className="r w-full bg-primary p-6 pt-[60px] text-white md:w-1/2">
            <div className=" mb-11">
              <h2 className="mb-2 text-center text-4xl font-bold">
                {currentPage?.message}
              </h2>
              {currentPage?.subMessage && (
                <p className=" text-center text-lg font-semibold">
                  {currentPage.subMessage}
                </p>
              )}
            </div>
            <p className="mb-6 ml-6 text-lg font-bold">Don't Miss Out</p>
            <ul className="text-md mb-8 ml-6 list-inside list-disc space-y-4">
              {currentPage?.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <Link href="/signin">
              <button className="w-full rounded-md bg-tertiary px-2 py-4 text-xs font-bold uppercase tracking-wide text-white hover:bg-orange-600">
                LOGIN AND START YOUR SCRIPTS, VOICES AND CLASSES
              </button>
            </Link>
            <p className="mt-4 text-center font-poppins text-lg font-medium">
              Free trial. No credit card needed.
            </p>
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

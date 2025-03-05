import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
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
import EmailOrGoogleForm from "./email-or-google-form";

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
    | "recorder"
    | "image";
}

const pageData: Record<
  string,
  {
    image: StaticImport;
    list: string[];
    message: string;
    subMessage: string;
  }
> = {
  home: {
    image: StoryBoardImg,
    list: [
      "Save your scripts and voice overs",
      "Clone and translate your voice",
      "Create scripts, images for videos, social media, presentations...",
      "Learn in Masterclasses seen by 70,000 professionals",
    ],
    message: "Happy to help!",
    subMessage: "Let's get you in the app:",
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
    subMessage: "Please create a free account to listen \nto your script!",
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
    subMessage: "Let's get you in the app:",
  },
  plagiarism: {
    image: PlagImg,
    list: [
      "Assure originality with 99.12% accuracy",
      "Improve your copywritting with AI & plagiarism detectors",
      "Save time and increase knowledge with our included Source Search",
    ],
    message: "I'll check that text for you now",
    subMessage: "Let's get you in the app:",
  },
  translator: {
    image: TranslatorImg,
    list: [
      "Translate documents,Audio or Videos",
      "Support for over 70 languages",
      "Translate into audio and text",
    ],
    message: "Happy to translate that for you!",
    subMessage: "Let's get you in the app:",
  },
  clone: {
    image: HeroImage,
    list: [
      "Listen to your scripts with over 120 different voices",
      "Customize voice tones and accents",
      "Export audio files for use in projects",
      "Clone voices with just an example audio",
    ],
    message: "Happy to help!",
    subMessage: "Let's get you in the app:",
  },
  recorder: {
    image: HeroImage,
    list: [
      "Listen to your scripts with over 120 different voices",
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

  const showEmailLinkOrGoogleForm = [
    "home",
    "chat",
    "image",
    "plagiarism",
    "recorder",
    "courses",
    "voice",
    "translator",
    "clone",
  ];

  if (!openModal) {
    return null;
  }

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur ${poppins.className}`}
    >
      <div className=" h-[532px] w-[312px]  overflow-hidden rounded-xl border border-primary bg-white  shadow-xl lg:h-[545px] lg:w-[925px]">
        <div className="flex h-full flex-col lg:flex-row">
          {/* Left section */}
          <div className="flex h-[151px] w-full flex-col items-center justify-center bg-[#F5F5F7] lg:h-full lg:w-[400px]">
            {/* {page === "home" || page === "voice" ? ( */}
            {page === "voice" ? (
              <div className="flex h-full w-full flex-col items-center justify-center px-4 pt-8 lg:h-[442px] lg:w-[328px] lg:px-[36px] lg:pt-[52px]">
                <Card className="h-[79px] w-full rounded-lg border border-black lg:w-[241px]">
                  <CardContent className="flex h-full w-full items-center justify-between px-3 py-4 lg:px-[12px] lg:py-[18px]">
                    <div className="flex items-center space-x-2 lg:space-x-[10px]">
                      <Avatar className="h-10 w-10 lg:h-[42px] lg:w-[39px]">
                        <AvatarImage src={HeroAvatar.src} alt="David" />
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
                      <div className="w-28 lg:h-[38px] lg:w-[128px]">
                        <p className="mb-1 text-xs font-bold leading-tight lg:text-[13px] lg:leading-[18px]">
                          David (Male)
                        </p>
                        <p className="text-xs font-normal leading-tight text-gray-500 lg:text-[12px] lg:leading-[17px]">
                          English Male Voice
                        </p>
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center lg:h-[43px] lg:w-[43px]">
                      <button
                        onClick={toggleAudio}
                        className="border-cp-secondary text-cp-secondary hover:bg-cp-secondary flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300 ease-in-out hover:text-white focus:outline-none lg:h-[36px] lg:w-[36px]"
                        aria-label={isPlaying ? "Stop audio" : "Play audio"}
                      >
                        {isPlaying ? (
                          <IconStop className="h-3 w-3 lg:h-[14px] lg:w-[14px]" />
                        ) : (
                          <PlayIcon className="h-3 w-3 lg:h-[14px] lg:w-[14px]" />
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>

                <div className="mb-8 mt-6 lg:mb-[52px] lg:mt-[33px]">
                  <div className="relative h-64 w-64 px-6 lg:h-[330px] lg:w-[330px] lg:px-[35px]">
                    <Image
                      src={currentPage?.image ?? ""}
                      alt="Cartoon character, hero of co-producer!"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Render this div with an image if page is not "voice"
              <div className="relative mt-16 flex h-64 w-64 items-center justify-center lg:mt-0 lg:h-[330px] lg:w-[330px]">
                <Image
                  src={currentPage?.image ?? ""}
                  alt="Alternate content image"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="bg-cp-primary z-10 flex h-[402px] w-full flex-col items-center pb-8 text-white lg:h-full lg:w-[525px] lg:pb-[60px]">
            <div className="flex w-full flex-grow flex-col items-center justify-start px-4 pt-5 lg:w-[375px] lg:px-[75px] lg:pt-[60px]">
              <div className="w-full items-center pb-2 lg:mb-[44px] lg:h-[85px] lg:w-[375px]">
                <h2 className="mb-2 text-center text-xl font-bold leading-tight lg:text-[24px] lg:leading-[33.6px]">
                  {currentPage?.message}
                </h2>
                {currentPage?.subMessage && (
                  <p className="text-center text-sm font-bold leading-snug lg:text-[16px] lg:leading-[22px]">
                    {currentPage.subMessage.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </div>

              {!showEmailLinkOrGoogleForm.includes(page) ? (
                <div className="w-full lg:h-[192px] lg:w-[375px]">
                  <p className="mb-2 text-left text-[16px] font-bold leading-[22.4px] lg:text-[20px] lg:leading-[28px]">
                    Let's do it!:
                  </p>
                  <div className="lg:h-[149px] lg:w-[374px]">
                    <ul className="list-inside list-disc font-roboto text-[14px]  leading-[19px] lg:text-lg">
                      {currentPage?.list.map((item, index) => (
                        <li key={index} className="mb-2 ml-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>

            {showEmailLinkOrGoogleForm.includes(page) ? (
              <EmailOrGoogleForm />
            ) : null}

            {/* Placed the button at the bottom with padding alignment */}
            <div className="flex w-full flex-col items-center pt-2 lg:w-[375px] lg:pt-6">
              {!showEmailLinkOrGoogleForm.includes(page) ? (
                <button className="bg-cp-secondary mb-2 h-10 w-full rounded-md px-4 py-1 text-sm font-bold uppercase leading-tight text-white hover:bg-orange-500 lg:mb-[8px] lg:h-[45px] lg:w-[375px] lg:px-[24px] lg:py-[2px] lg:text-base lg:leading-[20px]">
                  <Link href="/signin">LOGIN-FREE</Link>
                </button>
              ) : null}
              <p className="text-center font-poppins text-xs font-normal leading-snug lg:text-[14px] lg:leading-5">
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
          className="h-10 w-10 lg:h-8 lg:w-8"
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

// Old data
// home: {
//   image: HeroImage,
//   list: [
//     "Save your scripts and voice overs",
//     "Clone and translate your voice",
//     "Create scripts, images for videos, social media, presentations...",
//     "Learn in Masterclasses seen by 70,000 professionals",
//   ],
//   message: "Great to see you here!",
//   subMessage: "Please log in and enjoy the full app!",
// },
// clone: {
//   image: HeroImage,
//   list: [
//     "Listen to your scripts with over 120 different voices",
//     "Customize voice tones and accents",
//     "Export audio files for use in projects",
//     "Clone voices with just an example audio",
//   ],
//   message: "Voice Cloning",
//   subMessage: "",
// },
// translator: {
//   image: TranslatorImg,
//   list: [
//     "Translate documents,Audio or Videos",
//     "Support for over 70 languages",
//     "Translate into audio and text",
//   ],
//   message: "Happy to translate that for you!",
//   subMessage: "Please log in, so I can deliver that with a smile",
// },
// plagiarism: {
//   image: PlagImg,
//   list: [
//     "Assure originality with 99.12% accuracy",
//     "Improve your copywritting with AI & plagiarism detectors",
//     "Save time and increase knowledge with our included Source Search",
//   ],
//   message: "I'll check that text for you now",
//   subMessage: "please log in below!",
// },
// courses: {
//   image: MasterclassImg,
//   list: [
//     "Learn in Masterclasses seen by 70,000 professionals",
//     "Transform your career learning Storytelling,AI,Pitch Matery,Rapport",
//   ],
//   message: "Excited to learn together!",
//   subMessage: "Please log in and join our Story University!",
// },

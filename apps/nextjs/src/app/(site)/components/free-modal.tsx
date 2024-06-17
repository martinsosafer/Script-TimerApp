"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  IconAudioWaveform,
  IconBookPlus,
  IconBotMessageSquare,
  IconSave,
  IconScanText,
} from "@voiceai/ui/@/components/ui/icons";

import reminder from "../../../../public/dontmissout.png";

interface SubData {
  status: string | null;
  userId: string;
}
function FreeModal({ subData }: { subData: SubData }) {
  const isSubscriptionActive =
    subData &&
    (subData.status === "CREATOR" ||
      subData.status === "STUDENT" ||
      subData.status === "BUSINESS");
  const [modalOpen, setModalOpen] = useState(!isSubscriptionActive);

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!modalOpen) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div className="max-h-full w-full max-w-xl overflow-y-auto border border-black bg-white dark:bg-white sm:rounded-2xl">
        <div className="flex h-full w-full flex-col">
          <div className="m-8 mx-auto my-2 flex flex-grow flex-col items-center px-4">
            <div className="relative mb-2 h-60 w-full">
              {/* Container with fixed height to constrain the image */}
              <Image
                src={reminder}
                layout="fill"
                objectFit="cover"
                alt="Picture of the author"
              />
            </div>
            {/* Heading */}

            <div className="mt-2">
              {/* Options with icons */}
              <h2 className=" ml-7 text-left text-xl font-bold text-primary">
                Join us for :
              </h2>
              <ul className="pl-6">
                <li className="dark:text-primary-foreground">
                  <IconAudioWaveform className="mr-2 inline-block h-6 w-6 font-extrabold text-primary" />
                  Dozens of voices to choose from
                </li>
                <li className="dark:text-primary-foreground">
                  <IconSave className="mr-3 inline-block h-6 w-6 font-extrabold text-primary" />
                  Save your voice files - licensed to you
                </li>
                <li className="dark:text-primary-foreground">
                  <IconScanText className="mr-3 inline-block h-6 w-6 font-extrabold text-primary" />
                  Translate your scripts & voices to other languages
                </li>
                <li className="dark:text-primary-foreground">
                  <IconBotMessageSquare className="mr-2 inline-block h-6 w-6 font-extrabold text-primary" />
                  Full access to the Magic AI to speed script writing, speech
                  creation, presentation ideas, even coding
                </li>
                <li className="dark:text-primary-foreground">
                  <IconBookPlus className="mr-2 inline-block h-6 w-6 font-extrabold text-primary" />
                  Improve your skills in writing, public speaking, producing
                  videos
                </li>
              </ul>
            </div>
            <div className="mt-8 space-y-4">
              {/* Buttons */}
              <Link href="/plans" target="_blank">
                <button
                  className="w-full transform rounded-md border-2 border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 p-3 font-semibold text-white transition-transform duration-300 hover:scale-105"
                  onClick={closeModal}
                >
                  Upgrade Plan
                </button>
              </Link>
              <button
                className="w-full transform rounded-md border-2 border-black bg-white p-3 font-semibold transition-transform duration-300 hover:scale-105 dark:text-primary-foreground"
                onClick={closeModal} // Close the modal when clicked
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeModal;

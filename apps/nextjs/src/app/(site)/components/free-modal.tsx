import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  IconAudioWaveform,
  IconBookPlus,
  IconBotMessageSquare,
  IconDownload,
  IconMic2,
  IconSave,
  IconScanText,
} from "@voiceai/ui/@/components/ui/icons";

import reminder from "../../../../public/freereminder.png";

function FreeModal({ onClose }) {
  // If the user is not a free user, don't render anything

  const handleSkipForNow = () => {
    onClose();
  };

  return (
    <div className="fixed left-0 top-0 z-50  flex h-full w-full items-center justify-center bg-black  bg-opacity-50 backdrop-blur ">
      <div className="max-h-full w-full max-w-xl overflow-y-auto bg-white dark:bg-white sm:rounded-2xl">
        <div className="w-full">
          <div className="m-8 mx-auto my-2 flex max-w-[600px] flex-col items-center px-4">
            <div className="mb-2">
              <h1 className="mb-4 text-3xl font-extrabold  dark:text-primary-foreground">
                You are missing out !
              </h1>
              <div className="ml-5">
                <Image
                  src={reminder}
                  width={200}
                  height={200}
                  alt="Picture of the author"
                />
              </div>
            </div>
            <div className="mt-2 ">
              <div className="mt-2 ">
                <ul className="pl-6">
                  <li className="dark:text-primary-foreground">
                    {" "}
                    <IconAudioWaveform className="mr-2 inline-block h-6 w-6 font-extrabold text-primary" />{" "}
                    Dozens of voices to choose from
                  </li>
                  <li className="dark:text-primary-foreground">
                    <IconSave className="mr-3 inline-block h-6 w-6 font-extrabold text-primary" />
                    Save your voice files - licensed to you
                  </li>
                  <li className="dark:text-primary-foreground">
                    {" "}
                    <IconScanText className="mr-3 inline-block h-6 w-6 font-extrabold text-primary" />
                    Translate your scripts & voices to other languages
                  </li>
                  <li className="dark:text-primary-foreground">
                    <IconBotMessageSquare className="mr-2 inline-block h-6 w-6 font-extrabold text-primary" />{" "}
                    Full access to the Magic AI to speed script writing, speech
                    creation, presentation ideas, even coding
                  </li>
                  <li className="dark:text-primary-foreground">
                    <IconBookPlus className="mr-2 inline-block h-6 w-6 font-extrabold text-primary" />{" "}
                    Improve your skills in writing, public speaking, producing
                    videos
                  </li>
                </ul>
              </div>
              <div className=" mt-8">
                <Link
                  href="https://script-timer.com/voice123-promo-pricing/"
                  target="_blank"
                >
                  <button
                    className="w-full rounded-full bg-tertiary p-3 font-semibold text-primary-foreground"
                    onClick={() => handleSkipForNow()}
                  >
                    Upgrade Plan
                  </button>
                </Link>
                <button
                  className="w-full rounded-full border border-black bg-white p-3 font-semibold dark:text-primary-foreground"
                  onClick={() => handleSkipForNow()} // Close the modal when clicked
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeModal;

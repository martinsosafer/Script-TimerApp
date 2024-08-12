import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import microphone2side from "@public/11differentside.png";
import microphone from "@public/microphone (1).png";

import { IconSquareArrowUpRight } from "@voiceai/ui/@/components/ui/icons";

import type { SubscriptionData } from "~/lib/types";

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
    | "clone";
}

const pageMessage: Record<string, string> = {
  home: "Try the full app & create",
  voice: "Listen To Your Script by Signing In",
  chat: "Brainstorm and Create Your Scripts by Signing In",
  courses: "Learn From Experts by Signing In",
  plagiarism:
    "Plagiarism check across nearly every language, detect AI-generated content.",
  translator: "Translate anything by Signing In",
  clone: "For cloning any voice first you need to Sign in",
};

export default function NoSessionModal({
  setOpenModal,
  openModal,
  page,
}: FreeModalProps) {
  if (!openModal) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur">
      <div className="w-full rounded-md bg-primary p-3 md:w-[650px] md:rounded-xl md:p-6">
        <div className="w-full rounded-md bg-white p-2 dark:bg-white md:p-4 lg:rounded-xl">
          <div className="m-2 flex flex-col items-center">
            {/* Heading */}
            <h2 className="text-center font-poppins text-xl font-bold text-primary md:text-2xl">
              {pageMessage[page]}
            </h2>

            {/* New Rectangular Rounded Bubble */}
            <div className="primary relative mb-3 mt-3 rounded-lg border-2 border-primary p-2 text-center md:mb-2 md:mt-2 md:rounded-full md:p-4">
              <div className="absolute -left-64 top-1/2 hidden -translate-y-1/2 transform md:flex">
                <Image
                  src={microphone}
                  alt="Microphone"
                  width={400}
                  height={400}
                />
              </div>
              <div className="text-md font-poppins font-medium text-black md:text-lg">
                <div>Radio Spot * Podcast * Speech</div>
                <div>Marketing * Video * Content</div>
              </div>
              <div className="rotate-y-180  absolute -right-64 top-1/2 hidden -translate-y-1/2 transform md:flex">
                <Image
                  src={microphone2side}
                  alt="microphone"
                  width={400}
                  height={400}
                />
              </div>
            </div>

            <div className="w-full">
              <h2 className="mb-2 w-full text-center font-poppins text-xl font-bold text-primary md:text-2xl">
                Don&apos;t Miss Out
              </h2>
              <ul className="w-full list-disc pl-6">
                <li className="w-full font-poppins text-sm font-medium dark:text-primary-foreground md:text-base">
                  Use Ai custom made for scripts & voices
                </li>
                <li className="w-full font-poppins text-sm font-medium dark:text-primary-foreground md:text-base">
                  Download and save voices over and scripts.
                </li>
                <li className="w-full font-poppins text-sm font-medium dark:text-primary-foreground md:text-base">
                  Almost 100 Voices: English, French, German, Hindi...
                </li>
                <li className="w-full font-poppins text-sm font-medium dark:text-primary-foreground md:text-base">
                  Upgrade your skills with masterclasses on public speaking,
                  writing, stories that win.
                </li>
              </ul>
            </div>
            <div className="mt-4 space-y-2 md:mt-8 md:space-y-4">
              {/* Buttons */}
              <Link
                href="/signin"
                className="flex w-full transform items-center rounded-lg bg-orange-500 p-3 text-center font-poppins font-medium text-white underline transition-transform duration-300 hover:scale-105"
              >
                <IconSquareArrowUpRight className="mr-4 hidden h-6 w-6 md:flex" />
                <span>Login and Start your Scripts, Voices and Classes.</span>
              </Link>
              <button
                className="w-full  bg-white p-3 font-poppins font-bold text-primary underline"
                onClick={() => setOpenModal(false)} // Close the modal when clicked
              >
                Or continue with a look around
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

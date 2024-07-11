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
  page: "home" | "voice" | "chat" | "courses";
}

const pageMessage: Record<string, string> = {
  home: "Try the full app & create",
  voice: "Listen To Your Script by Signing In",
  chat: "Brainstorm and Create Your Scripts by Signing In",
  courses: "Learn From Experts by Signing In",
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
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center  bg-black bg-opacity-50 backdrop-blur">
      <div className="rounded-xl bg-primary p-8">
        <div className="w-full max-w-xl overflow-y-auto overflow-x-hidden rounded-full border-4 border-primary bg-white p-4 dark:bg-white sm:rounded-lg">
          <div className="flex h-full w-full flex-col">
            <div className="m-8 mx-auto my-2 flex flex-grow flex-col items-center px-4">
              {/* Heading */}
              <h2 className="text-center font-poppins text-2xl font-bold text-primary">
                {pageMessage[page]}
              </h2>

              {/* New Rectangular Rounded Bubble */}
              <div className="primary relative mb-4 mt-4 rounded-full border-2 border-primary px-6 text-center">
                <div className="absolute -left-64 top-1/2 -translate-y-1/2 transform">
                  <Image
                    src={microphone}
                    alt="Microphone"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="font-poppins text-lg font-medium text-black">
                  <div>Radio Spot * Podcast * Speech</div>
                  <div>Marketing * Video * Content</div>
                </div>
                <div className="rotate-y-180  absolute   -right-64 top-1/2 -translate-y-1/2 transform">
                  <Image
                    src={microphone2side}
                    alt="microphone"
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="">
                <h2 className="mb-2 mt-2 text-center font-poppins text-2xl font-bold text-primary">
                  Don&apos;t Miss Out
                </h2>
                <ul className="list-disc pl-6">
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Use Ai custom made for scripts & voices
                  </li>
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Download and save voices over and scripts.
                  </li>
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Almost 100 Voices: English, French, German, Hindi...
                  </li>
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Upgrade your skills with masterclasses on public speaking,
                    writing, stories that win.
                  </li>
                </ul>
              </div>
              <div className="mt-8 space-y-4">
                {/* Buttons */}
                <Link
                  href="/signin"
                  className="flex w-full transform items-center rounded-lg border-2 border-orange-500 bg-orange-500 p-3 font-poppins font-medium text-white underline transition-transform duration-300 hover:scale-105"
                >
                  <IconSquareArrowUpRight className="mr-4 h-6 w-6" />
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
    </div>
  );
}

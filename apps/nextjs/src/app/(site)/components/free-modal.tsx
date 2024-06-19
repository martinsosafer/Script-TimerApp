"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IconSquareArrowUpRight } from "@voiceai/ui/@/components/ui/icons";

import microphone from "../../../../public/microphone (1).png";
import notebook from "../../../../public/notebook.png";

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
      <div className="  rounded-xl bg-primary p-8">
        <div className="max-h-[100vh] min-h-[80vh] w-full max-w-lg overflow-y-auto rounded-full border-4 border-primary bg-white p-4 dark:bg-white sm:rounded-lg">
          <div className="flex h-full w-full flex-col">
            <div className="m-8 mx-auto my-2 flex flex-grow flex-col items-center px-4">
              {/* Heading */}
              <h2 className="font-poppins text-2xl font-bold text-primary">
                Upgrade & Create Today!
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
                <div className="rotate-y-180  absolute -right-44 top-1/2 -translate-y-1/2 transform">
                  <Image
                    src={microphone}
                    alt="microphone"
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="">
                <h2 className="mb-2 mt-2 text-center font-poppins text-2xl font-bold text-primary">
                  Don't Miss Out
                </h2>
                <ul className="list-disc pl-6">
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Use AI custom made for scripts & Voices
                  </li>
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Download and save voice overs and scripts
                  </li>
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Almost 100 voices: English, French, German, Hindi...
                  </li>
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Upgrade your skills with masterclasses on public speaking,
                    writing, stories that win
                  </li>
                </ul>
              </div>
              <div className="mt-8 space-y-4">
                {/* Buttons */}
                <Link href="/plans" target="_blank">
                  <button
                    className="flex w-full transform items-center rounded-lg border-2 border-orange-500 bg-orange-500 p-3 font-poppins font-medium text-white underline transition-transform duration-300 hover:scale-105"
                    onClick={closeModal}
                  >
                    <IconSquareArrowUpRight className="mr-4 h-6 w-6" />
                    <span>Start your Scripts, Voices and Learning.</span>
                  </button>
                </Link>
                <button
                  className="w-full transform rounded-md border-2 border-black bg-white p-3 font-poppins font-medium transition-transform duration-300 hover:scale-105 dark:text-primary-foreground"
                  onClick={closeModal} // Close the modal when clicked
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

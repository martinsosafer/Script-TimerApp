"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IconSquareArrowUpRight } from "@voiceai/ui/@/components/ui/icons";

import microphone2side from "../../../../public/11differentside.png";
import microphone from "../../../../public/microphone (1).png";

interface SubData {
  status: string | null;
  userId: string;
}

function InitialModal({ subData }: { subData: SubData }) {
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
      <div className="rounded-xl bg-primary p-8">
        <div className="max-h-[100vh] min-h-[80vh] w-full max-w-lg overflow-y-auto overflow-x-hidden rounded-full border-4 border-primary bg-white p-4 dark:bg-white sm:rounded-lg">
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
                <div className="rotate-y-180 absolute -right-64 top-1/2 -translate-y-1/2 transform">
                  <Image
                    src={microphone2side}
                    alt="microphone"
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              {/* Wave Separator */}
              <div className="relative w-full overflow-hidden">
                <div className="absolute inset-0 h-20 -skew-y-3 bg-primary before:absolute before:-inset-0 before:-skew-y-3 before:bg-white"></div>
              </div>

              <div className="mt-4">
                <h2 className="mb-2 text-center font-poppins text-xl font-bold text-primary">
                  Create your account and transform your work
                </h2>
                <ul className="list-disc pl-6">
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Acess magical AI custom made for scripts & voices
                  </li>
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Download and save licensed files
                  </li>
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    International translation
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
                  onClick={closeModal}
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

export default InitialModal;

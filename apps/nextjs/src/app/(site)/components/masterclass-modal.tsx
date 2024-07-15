"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IconSquareArrowUpRight } from "@voiceai/ui/@/components/ui/icons";

import microphone2side from "../../../../public/11differentside.png";
import microphone from "../../../../public/microphone (1).png";

interface SubData {
  status: string | undefined;
  userId: string;
}

function MasterClassModal({ status }: SubData) {
  const isSubscriptionActive = status && status === "BUSINESS";
  const [modalOpen, setModalOpen] = useState(!isSubscriptionActive);

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!modalOpen) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center  bg-black bg-opacity-50 backdrop-blur">
      <div className="  rounded-xl bg-primary p-8">
        <div className="max-h-[100vh] min-h-[80vh] w-full max-w-lg overflow-y-auto overflow-x-hidden rounded-full border-4 border-primary bg-white p-4 dark:bg-white sm:rounded-lg">
          <div className="flex h-full w-full flex-col">
            <div className="m-8 mx-auto my-2 flex flex-grow flex-col items-center px-4">
              {/* Heading */}
              <h2 className="mb-6 font-poppins text-2xl font-bold text-primary">
                Continue Your Learning <br />
                with Masterclass Access
              </h2>

              <div className="">
                <h2 className="mb-6 mt-2 text-center font-poppins text-2xl font-bold text-primary">
                  Don't Miss Out
                </h2>
                <ul className="list-disc pl-6">
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Join over 100,000 professionals thata have improved their
                    careers on the{" "}
                    <span className="font-bold text-primary ">Business</span>{" "}
                    plan
                  </li>
                  <li className="font-poppins text-base font-medium dark:text-primary-foreground">
                    Upgrade your skill
                  </li>
                </ul>
              </div>
              <div className="mt-10 space-y-4">
                {/* Buttons */}
                <Link href="/plans" target="_blank">
                  <button className="flex w-full transform items-center rounded-lg border-2 border-orange-500 bg-orange-500 p-3 font-poppins font-medium text-white underline transition-transform duration-300 hover:scale-105">
                    <IconSquareArrowUpRight className="mr-4 h-6 w-6" />
                    <span>Start your Classes, Voices and Learning.</span>
                  </button>
                </Link>

                <button className="w-full transform rounded-md border-2 border-black bg-white p-3 font-poppins font-medium transition-transform duration-300 hover:scale-105 dark:text-primary-foreground">
                  <Link href="/masterclasses">Go back</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterClassModal;

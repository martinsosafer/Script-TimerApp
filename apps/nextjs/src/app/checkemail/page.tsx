"use client";

import React, { useState } from "react";
import ReactConfetti from "react-confetti"; // Make sure this is imported

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@voiceai/ui/@/components/ui/accordion";
import {
  IconChevronDown,
  IconChevronUpDown,
} from "@voiceai/ui/@/components/ui/icons";

// import { resend } from "../../../../../packages/email/resend/client";
import { poppins } from "../fonts";

export default function CheckEmail() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // console.log("resend", resend);
  return (
    <div
      className={`min-h-screen bg-gradient-to-tr from-black to-blue-500 p-8 ${poppins.className}`}
    >
      {/* Confetti will cover the whole page */}
      <ReactConfetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={4000}
        recycle={false}
        gravity={0.1}
        initialVelocityX={2}
        initialVelocityY={10}
        colors={["#0123e7", "#eb8806"]}
      />

      <div className="relative z-10 mx-auto h-full max-w-6xl">
        {" "}
        {/* Added relative z-10 to ensure content appears above confetti */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Your email was sent. Congrats!
          </h1>
          <p className="pb-1 text-base text-cyan-300 md:text-xl">
            Please check your email to verify and open your free access. Get
            ready to save time, money, and stress:
          </p>
          <p className="pb-8 text-2xl font-semibold text-white">
            In minutes! - not weeks
          </p>

          <h2 className="mb-8 text-4xl font-bold">
            <span className="text-cyan-300">Watch how Script-Timer Ai</span>
            <br />
            <span className="text-white">saves you time, money and stress</span>
          </h2>

          <div className="aspect-video w-full max-w-4xl rounded-lg bg-blue-500 shadow-lg">
            <iframe
              src="https://player.vimeo.com/video/1020211350"
              className="h-full w-full rounded-lg"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Script-Timer Video"
            />
          </div>

          <div className=" w-full max-w-3xl pt-6">
            <div className="bg-cp-background flex justify-between rounded-lg">
              <p className="text-cp-black px-4 py-2 text-left text-base">
                Need help with the login email?
              </p>
              <button
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                className="px-3"
              >
                {isAccordionOpen ? (
                  <IconChevronDown style={{ transform: `rotate(180deg)` }} />
                ) : (
                  <IconChevronDown />
                )}
              </button>
            </div>

            {isAccordionOpen && (
              <div className="text-cp-white flex flex-col gap-2 p-4 text-left">
                <p>
                  • Check your spam folder. If it's there, please mark it as
                  "not spam"
                </p>
                <p>• Make sure your inbox is not full</p>
                <p>• If you use Gmail, check the "Promotions" tab</p>
                <p>
                  • If you still can't find the email click, please write to
                  maury@script-timer.ai
                </p>
              </div>
            )}

            {/* <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="bg-cp-background text-cp-black border-none px-6 font-bold shadow-sm">
                  <span>What to do if you can't find our login email</span>
                </AccordionTrigger>
                <AccordionContent className="text-cp-white p-2 text-left md:p-6">
                  <p>
                    • Check your spam folder. If it's there, please mark it as
                    "not spam"
                  </p>
                  <p>• Make sure your inbox is not full</p>
                  <p>• If you use Gmail, check the "Promotions" tab</p>
                  <p>
                    • If you still can't find the email click{" "}
                    <button
                      className="text-cp-accent-light px-2 text-lg font-bold leading-none underline"
                      onClick={() => console.log("CLICK")}
                    >
                      here
                    </button>
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion> */}
          </div>
        </div>
      </div>
    </div>
  );
}

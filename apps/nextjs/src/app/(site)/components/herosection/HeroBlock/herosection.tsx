// "use client";

// import React, { useState } from "react";
import Link from "next/link";

// import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@voiceai/ui";

import { RevealText } from "~/app/animations/RevealText";
import { poppins } from "~/app/fonts";
import MotionTransition from "../MotionTransition/MotionTransition";

export default function HeroSection() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const toggleModal = () => setIsModalOpen(!isModalOpen);

  // const modalVariants = {
  //   hidden: { opacity: 0, scale: 0.8, y: 50 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     y: 0,
  //     transition: {
  //       type: "spring",
  //       damping: 25,
  //       stiffness: 300,
  //       duration: 0.5,
  //     },
  //   },
  //   exit: {
  //     opacity: 0,
  //     scale: 0.8,
  //     y: 50,
  //     transition: { duration: 0.3 },
  //   },
  // };

  // const overlayVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1, transition: { duration: 0.3 } },
  //   exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
  // };

  return (
    <>
      <div
        className={`${poppins.className} from-cp-primary relative mx-auto flex justify-center bg-gradient-to-br to-[#000000] pb-16 pt-10 lg:py-20`}
      >
        <div className="flex flex-col gap-10">
          <div className="flex h-full max-w-[1024px] flex-col items-start justify-items-center gap-[24px] lg:flex-row lg:justify-between lg:gap-12">
            {/* Text Content (left) */}
            <div className="flex w-[316px] flex-col gap-3 lg:w-[50%] lg:text-start">
              <RevealText>
                <h1 className="text-3xl font-bold leading-[38.3px] text-white lg:text-[52px]  lg:leading-[60px]">
                  <span className="text-cyan-300">Create Voices </span>
                  <br />
                  {""} & Scripts
                  <br />
                  in seconds
                </h1>
              </RevealText>
              <RevealText>
                <p className="text-[18px] font-normal leading-[25px] text-white lg:text-[20px] lg:leading-[28px]">
                  Text to Speech, AI Voices, Script Writing,{" "}
                  <br className="hidden lg:block" />
                  Image Creation to make your scripts amazing.{" "}
                </p>
              </RevealText>
            </div>

            {/* Video (right) */}
            <div className="flex h-full items-center w-[50%]">
              <MotionTransition>
                <div className="outline-cp-primary-lightest h-[176px] w-[312px]  self-center rounded-lg outline lg:h-[255px] lg:w-[452px]">
                  <iframe
                    src="https://player.vimeo.com/video/1020211350?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    title="Script-Timer Ai Onboarding video"
                  />
                </div>
              </MotionTransition>
            </div>
          </div>
          {/* Bottom (center) */}
          <Link href="/texttovoice" className="flex w-full justify-center">
            <Button variant="accent" size="lg">
              Listen to your script here
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal */}
      {/* <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
          >
            <motion.div className="fixed inset-0 bg-black bg-opacity-50" />
            <motion.div
              className="relative h-[30vh] w-[80vw] overflow-hidden  rounded-lg  bg-gradient-to-br from-[#000000] to-[#0066FF] px-[20px] py-5 lg:h-[50vh] lg:w-[80vh]"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://player.vimeo.com/video/1020211350?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                className="h-full w-full rounded-lg"
                allow="autoplay; fullscreen; picture-in-picture"
                title="Script-Timer Ai Onboarding video"
              />
              <motion.button
                className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-2 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
}

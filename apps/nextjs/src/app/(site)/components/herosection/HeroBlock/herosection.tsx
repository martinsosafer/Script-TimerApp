"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { RevealText } from "~/app/animations/RevealText";
import { poppins } from "~/app/fonts";
import HeroImg from "../../../../../../public/HeroImg.png";
import MotionTransition from "../MotionTransition/MotionTransition";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
  };

  return (
    <div>
      <div
        className={`from-cp-primary relative bg-gradient-to-br to-[#000000] px-4 py-8 sm:px-6 lg:px-8 ${poppins.className}`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="mt-8 lg:mt-16">
              <RevealText>
                <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[58px] lg:leading-[60px]">
                  <span className="text-cyan-300">Automate</span>
                  <br />
                  content <br />
                  production
                </h1>
              </RevealText>
              <RevealText>
                <p className="mt-4 text-base font-normal leading-relaxed text-white sm:text-lg lg:text-[20px] lg:leading-[20px]">
                  The tools supported by AI will automate
                  <br className="hidden sm:inline" /> your creative process:
                  Writing viral posts,
                  <br className="hidden sm:inline" /> presos, promos, voice
                  overs, images,
                  <br className="hidden sm:inline" /> and much more.
                </p>
              </RevealText>
              <RevealText>
                <div className="mt-6 flex justify-center lg:justify-start">
                  <p className="text-cp-secondary-lightest text-lg font-bold leading-7 sm:text-xl lg:text-[20px] lg:leading-[28px]">
                    What do you want to create?
                  </p>
                </div>
              </RevealText>
            </div>

            <MotionTransition className="mt-8 flex flex-col items-center justify-center lg:mt-16">
              <button onClick={toggleModal} className="w-full max-w-[550px]">
                <div className="flex flex-col items-center">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={HeroImg}
                      alt="Hero image"
                      fill
                      sizes="(max-width: 550px) 100vw, 550px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="border-cp-secondary mt-4 flex w-full items-center justify-center rounded-md border-2 sm:mt-6">
                    <span
                      className="text-cp-secondary flex cursor-pointer items-center py-3 text-sm font-semibold leading-5 sm:py-4 sm:text-base lg:text-[16px] lg:leading-[22px]"
                      onClick={toggleModal}
                    >
                      Speed your results with this video
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M7 7h10v10"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            </MotionTransition>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:p-0"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
          >
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={toggleModal}
            />
            <motion.div
              className="relative mx-auto w-full max-w-lg overflow-hidden rounded-lg bg-gradient-to-br from-[#000000] to-[#0066FF] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://player.vimeo.com/video/1020211350?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  className="absolute inset-0 h-full w-full rounded-lg"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="Script-Timer Ai Onboarding video"
                />
              </div>
              <motion.button
                className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-2 text-white sm:right-3 sm:top-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
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
      </AnimatePresence>
    </div>
  );
}

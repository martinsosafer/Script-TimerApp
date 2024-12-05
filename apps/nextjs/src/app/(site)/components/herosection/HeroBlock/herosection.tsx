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
      transition: { duration: 0.3 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className={`from-cp-primary relative bg-gradient-to-br to-[#000000] px-6 py-1 lg:px-6 lg:py-1 ${poppins.className}`}
      >
        <div className="grid items-start gap-[82px] px-4 lg:grid-cols-2 lg:gap-[82px] lg:px-[200px]">
          {/* Text Content */}
          <div className="mt-8 h-auto lg:mt-[68px] lg:h-[414px]">
            <RevealText>
              <h1 className="mb-[24px] text-3xl font-bold leading-tight text-white lg:text-[58px] lg:leading-[60px]">
                <span className="text-cyan-300">Automate</span>
                <br /> content <br /> production
              </h1>
            </RevealText>
            <RevealText>
              <p className="text-base font-normal leading-snug text-white lg:text-[20px] lg:leading-[20px]">
                The tools supported by AI will automate{" "}
                <br className="hidden lg:block" />
                your creative process: Writing viral posts,{" "}
                <br className="hidden lg:block" />
                presos, promos, voice overs, images,{" "}
                <br className="hidden lg:block" />
                and much more.
              </p>
            </RevealText>
            <RevealText>
              <div className="mt-6 flex justify-center lg:mt-[17px]">
                <p className="text-cp-secondary-lightest text-center text-lg font-bold leading-[28px] lg:text-[20px]">
                  What do you want to create?
                </p>
              </div>
            </RevealText>
          </div>

          {/* Hero Image & Button */}
          <MotionTransition className="mt-8 flex flex-col justify-center lg:mt-[60px]">
            <button onClick={toggleModal} className="w-full">
              <div className="flex flex-col items-center">
                <div className="relative h-[200px] w-full max-w-[550px] lg:h-[300px]">
                  <Image
                    src={HeroImg}
                    alt="Hero image"
                    fill
                    sizes="(max-width: 1040px) 100vw, 550px"
                    className="rounded-lg object-cover"
                    priority
                  />
                </div>
                <div className="border-cp-secondary mt-4 flex w-full items-center justify-center rounded-md border-2 lg:mt-[22px]">
                  <span
                    className="text-cp-secondary flex cursor-pointer items-center px-2 py-3 text-center text-sm font-semibold leading-[22px] lg:py-[13px] lg:text-[16px]"
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

      {/* Modal */}
      <AnimatePresence>
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
              className="relative h-[60vh] w-[90vw] max-w-[600px] overflow-hidden rounded-lg bg-gradient-to-br from-[#000000] to-[#0066FF] px-[20px]"
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
      </AnimatePresence>
    </div>
  );
}

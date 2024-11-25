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
        className={`from-cp-primary relative bg-gradient-to-br to-[#000000] px-6 py-1 ${poppins.className}`}
      >
        <div className="grid items-start gap-[82px] px-[200px] md:grid-cols-2">
          <div className="mt-[68px] h-[414px] ">
            <RevealText>
              <h1 className="text-[58px] font-bold leading-[60px] text-white">
                <span className="text-cyan-300">Automate</span>
                <br />
                content <br />
                producti
              </h1>
            </RevealText>
            <RevealText>
              <p className="mt-4 text-[20px] font-normal leading-[20px] text-white">
                The tools supported by AI will automate
                <br /> your creative process: Writing viral posts,
                <br /> presos, promos, voice overs, images,
                <br /> and much more.
              </p>
            </RevealText>
            <RevealText>
              <div className="mt-[17px] flex justify-center">
                <p className="text-cp-secondary-lightest text-[20px] font-bold leading-[28px]">
                  What do you want to create?
                </p>
              </div>
            </RevealText>
          </div>

          <MotionTransition className="mt-[60px] flex flex-col justify-center">
            <button onClick={toggleModal}>
              <div className="flex flex-col items-center">
                <div className="relative h-[300px] w-full max-w-[550px]">
                  <Image
                    src={HeroImg}
                    alt="Hero image"
                    fill
                    sizes="(max-width: 550px) 100vw, 550px"
                    className="rounded-lg object-cover"
                    priority
                  />
                </div>
                <div className="border-cp-secondary mt-[22px] flex w-full items-center justify-center rounded-md border-2">
                  <span
                    className="text-cp-secondary flex cursor-pointer items-center py-[13px] text-[16px] font-semibold leading-[22px]"
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
              className="relative h-[80vh] w-[60vw] overflow-hidden rounded-lg bg-gradient-to-br from-[#000000] to-[#0066FF] px-[40px]"
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
                className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-2 text-white"
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

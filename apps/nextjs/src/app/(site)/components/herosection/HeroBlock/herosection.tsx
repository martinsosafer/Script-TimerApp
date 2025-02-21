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
    <div className={`${poppins.className}`}>
      <div
        className={`from-cp-primary relative mx-auto flex justify-center bg-gradient-to-br to-[#000000] lg:h-[554px]`}
      >
        <div className="flex max-w-[1024px] flex-col items-center justify-items-center gap-[24px] py-[24px] lg:flex-row lg:justify-between lg:gap-[90px]">
          {/* Text Content */}
          <div className="h-[266px]  w-[312px] lg:h-[414px] lg:w-[409px] lg:text-start">
            <RevealText>
              <div className="h-[76px] lg:h-[210px] lg:w-[409px]">
                <h1 className="mb-[16px] text-[32px]  font-bold leading-[38.3px] text-white lg:mb-6 lg:text-[58px]  lg:leading-[70px]">
                  <span className="text-cyan-300">Automate </span>
                  {""}content production
                </h1>
              </div>
            </RevealText>
            <RevealText>
              <div className="  h-[125px] lg:mb-[36px] lg:h-[112px]  lg:w-[409px] ">
                <p className="text-[18px] font-normal leading-[25px] text-white lg:text-[20px] lg:leading-[28px]">
                  The tools supported by AI will automate{" "}
                  <br className="hidden lg:block" />
                  your creative process: Writing viral posts,{" "}
                  <br className="hidden lg:block" />
                  presos, promos, voice overs, images,{" "}
                  <br className="hidden lg:block" />
                  and much more.
                </p>
              </div>
            </RevealText>
            <RevealText>
              <div className="flex justify-center ">
                <p className="text-cp-secondary-lightest text-center text-[18px]  font-bold leading-[25px] lg:text-[20px] lg:leading-[28px]">
                  What do you want to create?
                </p>
              </div>
            </RevealText>
          </div>

          {/* Hero Image & Button */}
          <MotionTransition className="flex flex-col justify-start lg:mt-[42px]">
            <button onClick={toggleModal} className="w-full">
              <div className="flex h-[391px] w-[312px] flex-col items-center pb-6  lg:h-[452px] lg:w-[439px]">
                <div className="relative h-[331px] w-[312px]  lg:h-[368px] lg:w-[452px]">
                  <Image
                    src={HeroImg}
                    alt="Hero image"
                    fill
                    className="rounded-lg object-cover"
                    priority
                  />
                </div>
                <div className="border-cp-secondary mt-4 flex w-full  items-center justify-center rounded-md border-2 lg:mt-[22px]">
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
      </AnimatePresence>
    </div>
  );
}

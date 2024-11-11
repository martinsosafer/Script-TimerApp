"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { RevealText } from "~/app/animations/RevealText";
import { poppins } from "~/app/fonts";
import MotionTransition from "../../components/herosection/MotionTransition/MotionTransition";

export default function SuccessMessage() {
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
    <div className={`${poppins.className} relative`}>
      <div className="mb-[40px] grid items-start gap-10 px-[122px] pt-[60px] md:grid-cols-2">
        <div className="h-[169px] w-[452px]">
          <RevealText>
            <h1 className="text-cp-primary font-poppins text-[50px] font-bold leading-[60px]">
              Congratulations!
            </h1>
          </RevealText>
          <RevealText>
            <p className="mt-[25px] justify-start text-start text-[20px] font-normal leading-[28px]">
              You have upgraded your Co-Producer <br /> to create the highest
              quality content,
              <br /> faster than ever before!
            </p>
          </RevealText>
        </div>

        <MotionTransition className="flex items-center justify-center">
          <motion.div
            className="h-[169px] w-[288px] cursor-pointer overflow-hidden rounded-2xl border-2 border-blue-800 bg-blue-700"
            onClick={toggleModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative h-full w-full">
              <img
                src="https://vumbnail.com/969324308.jpg"
                alt="Video thumbnail"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-16 w-16 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </MotionTransition>
      </div>
      <div className="mx-auto mb-10 flex w-full justify-center text-center">
        <RevealText>
          <h2 className="text-cp-secondary text-[50px] font-bold leading-[60px]">
            Thank you for joining us!
          </h2>
        </RevealText>
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
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={toggleModal}
            />
            <motion.div
              className="relative h-[80vh] w-[60vw] overflow-hidden rounded-lg bg-gradient-to-br from-[#0066FF] to-[#000000] px-[40px]"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://player.vimeo.com/video/969324308?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                className="h-full w-full"
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

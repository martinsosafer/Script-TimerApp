"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import {

  IconAudioLines,
  IconBot,
  IconFileStack,
  IconHandshake,
  IconHistory,
  IconLibraryBig,
  IconLightbulb,
  IconMic2,
  IconMonitorPlay,
  IconPencilLine,
  IconXCircle,
} from "@voiceai/ui/@/components/ui/icons";

const menuVars = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    scaleY: 0,

    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};
const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

export default function MobileNavBar({ toggle }) {
  return (
    <motion.div
      variants={menuVars}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed left-0 top-0 h-screen w-full origin-top bg-slate-100  px-10 text-primary-foreground dark:bg-primary-foreground"
    >
      <div className="flex h-full flex-col">
        <div className="mb-3 flex  justify-between">
          <h1 className="text-lg text-primary">Script Timer</h1>
          <button
            className="text-md flex cursor-pointer items-center text-black dark:text-secondary-foreground"
            onClick={toggle}
          >
            <IconXCircle /> CLOSE
          </button>
        </div>
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="open"
          exit="initial"
          className="flex h-full flex-col  items-start  justify-start gap-4"
        >
          <div className="overflow-hidden">
            <motion.div
              variants={mobileLinkVars}
              className=" text-secondary-foreground"
            >
              <h2 className="flex items-center text-2xl underline ">
                <IconAudioLines className="mr-2 h-7 w-7 underline " />
                Text to voice
              </h2>
              <Link href={`/texttospeech`} onClick={toggle}>
                <div className="mt-4 flex items-center text-secondary-foreground">
                  {" "}
                  {/* Wrapping h4 and IconMic2 in a flex container */}
                  <IconMic2 className="mr-2" />{" "}
                  {/* Moving the icon outside of the <h4> */}
                  <h4 className="inline text-lg  ">Text to voice</h4>
                </div>
                <p className="text-gray-500">
                  {" "}
                  Add text, listen to the best grammar & voices
                </p>
              </Link>
              <Link href={`/library`} onClick={toggle}>
                <div className="mt-4 flex items-center text-secondary-foreground">
                  {" "}
                  {/* Wrapping h4 and IconMic2 in a flex container */}
                  <IconLibraryBig className="mr-2" />{" "}
                  {/* Moving the icon outside of the <h4> */}
                  <h4 className="inline text-lg ">Voice Library</h4>
                </div>
                <p className="text-gray-500">
                  {" "}
                  Dozens of voices to review & choose
                </p>
              </Link>
              <Link href={`/history`} onClick={toggle}>
                <div className="mt-4 flex items-center text-secondary-foreground">
                  {" "}
                  {/* Wrapping h4 and IconMic2 in a flex container */}
                  <IconHistory className="mr-2" />{" "}
                  {/* Moving the icon outside of the <h4> */}
                  <h4 className="inline text-lg text-secondary-foreground">
                    Voice History
                  </h4>
                </div>
                <p className="text-gray-500"> Voice log, download, & share</p>
              </Link>
            </motion.div>
            <motion.div
              variants={mobileLinkVars}
              className=" text-secondary-foreground"
            >
              <h2 className="flex items-center text-2xl underline ">
                <IconPencilLine className="mr-2 mt-2 h-7 w-7 underline" />
                Script Writing
              </h2>
              <Link href={`/chat`} onClick={toggle}>
                <div className="mt-4 flex items-center text-secondary-foreground">
                  {" "}
                  {/* Wrapping h4 and IconMic2 in a flex container */}
                  <IconBot className="mr-2 " />{" "}
                  {/* Moving the icon outside of the <h4> */}
                  <h4 className="inline text-lg text-secondary-foreground">
                    Script Coach
                  </h4>
                </div>
                <p className="text-gray-500"> Sharpen and create scripts</p>
              </Link>
              <Link href={`/library`} onClick={toggle}>
                <div className="mt-4 flex items-center text-secondary-foreground">
                  {" "}
                  {/* Wrapping h4 and IconMic2 in a flex container */}
                  <IconFileStack className="mr-2" />{" "}
                  {/* Moving the icon outside of the <h4> */}
                  <h4 className="inline text-lg text-secondary-foreground">
                    Script History
                  </h4>
                </div>
                <p className="text-gray-500"> Your writing history</p>
              </Link>
            </motion.div>
            <motion.div
              variants={mobileLinkVars}
              className=" mt-2 text-secondary-foreground"
            >
              <Link
                href="https://script-timer.com/blogs/"
                target="_blank"
                onClick={toggle}
              >
                <h2 className="flex items-center text-2xl underline ">
                  <IconLightbulb className="mr-2 mt-2 h-7 w-7 underline" />
                  Blog
                </h2>
              </Link>
            </motion.div>
            <motion.div
              variants={mobileLinkVars}
              className=" mt-2 text-secondary-foreground"
            >
              <Link href="/masterclasses" target="_blank" onClick={toggle}>
                <h2 className="flex items-center text-2xl underline ">
                  <IconMonitorPlay className="mr-2 mt-2 h-7 w-7 underline" />
                  Masterclasses
                </h2>
              </Link>
            </motion.div>
            <motion.div
              variants={mobileLinkVars}
              className=" mt-2 text-secondary-foreground"
            >
              <Link
                href="https://script-timer.com/voice123-pricing/"
                target="_blank"
                onClick={toggle}
              >
                <h2 className="flex items-center text-2xl underline ">
                  <IconHandshake className="mr-2 mt-2 h-7 w-7 underline" />
                  Plans
                </h2>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

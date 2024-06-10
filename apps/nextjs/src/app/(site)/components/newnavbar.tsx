"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

import { Button } from "@voiceai/ui";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import {
  IconArrowDown,
  IconAudioLines,
  IconBrainCog,
  IconFileHeart,
  IconFileType,
  IconGraduationCap,
  IconHandshake,
  IconHistory,
  IconLibraryBig,
  IconLightbulb,
  IconMic2,
  IconMoon,
  IconPencilLine,
  IconSun,
  IconWallet,
} from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";
import MobileNavBar from "./mobile-navbar";

interface Subscription {
  userId: string;
  status: string;
}

interface Props {
  signOut: () => Promise<null>;
  subData: Subscription | null;
}
const Newnavbar: React.FC<Props> = ({ signOut, subData }) => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  //Get subscription info

  const isSubscriptionActive =
    subData &&
    (subData.status === "STUDENT" ||
      subData.status === "CREATOR" ||
      subData.status === "BUSINESS");
  return (
    <header className=" sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-primary">
      <Link
        href={`/`}
        className="ml-8 font-poppins text-2xl font-bold text-primary-foreground"
      >
        Script Timer
      </Link>

      <nav className="mt-4 hidden md:block lg:block xl:block">
        <ul className="flex items-center justify-center font-semibold">
          <li className=" group relative items-center px-3 py-2  text-primary-foreground">
            <div className="flex flex-col items-center">
              <Link href={`/texttospeech`}>
                <IconAudioLines className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                <IconFileType className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
              </Link>
            </div>
            <button className="relative z-10 flex cursor-default items-center justify-center font-semibold">
              <span className="relative z-10 font-poppins">Text to Voice</span>
            </button>
            <div className="absolute inset-x-0 bottom-0  mb-2 h-0.5 origin-left scale-x-0 transform bg-primary-foreground transition-transform duration-300 group-hover:scale-x-100"></div>
            <div className="invisible absolute -left-48 top-0 z-50 min-w-[300px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100">
              <div className="relative top-6 w-full rounded-xl   bg-slate-100 p-6 shadow-xl dark:bg-primary-foreground ">
                <div className="absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-slate-100 transition-transform duration-500 ease-in-out group-hover:translate-x-[16rem] dark:bg-primary-foreground "></div>

                <div className="relative z-10">
                  <div className="grid  grid-cols-1 gap-6">
                    <div>
                      {/* <p className="text-[13px] font-medium uppercase tracking-wider text-gray-500  ">
                        Voice Tools
                      </p> */}
                      <ul className="mt-3 text-[15px]">
                        <li className="flex items-center">
                          <Link
                            href={`/texttospeech`}
                            className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                          >
                            <div className="flex items-center ">
                              {" "}
                              {/* Envuelve el icono y el texto en un div flex */}
                              <span>
                                <IconMic2 />
                              </span>
                              <span className="ml-1 ">Text to voice</span>
                            </div>
                            <p className="font-normal text-gray-500">
                              Add text, listen to the best grammar & voices
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium uppercase tracking-wider text-gray-500">
                        Voice Repository
                      </p>
                      <ul className="mt-3 text-[15px]">
                        <li>
                          <Link
                            href={`/library`}
                            className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                          >
                            <div className="flex items-center">
                              {" "}
                              {/* Envuelve el icono y el texto en un div flex */}
                              <span>
                                <IconLibraryBig />
                              </span>
                              <span className="ml-1">Voice Library</span>
                            </div>
                            <p className="font-normal text-gray-500">
                              Dozens of voices to review & choose
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/history`}
                            className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                          >
                            <div className="flex items-center ">
                              {" "}
                              {/* Envuelve el icono y el texto en un div flex */}
                              <span>
                                <IconHistory />
                              </span>
                              <span className="ml-1">Voice History</span>
                            </div>
                            <p className="font-normal text-gray-500">
                              Voice log, download, & share
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div>
                <li
                  className={`group relative px-3 py-2 text-primary-foreground ${!isSubscriptionActive && "pointer-events-none opacity-50"}`}
                >
                  <div className="flex flex-col items-center">
                    <Link href={`/chat`}>
                      <IconPencilLine className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                      <IconBrainCog className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
                    </Link>
                  </div>
                  <button className="relative z-10 cursor-default font-poppins font-semibold ">
                    <Link href={`/chat`}>Script Coach</Link>
                  </button>
                </li>
              </div>
            </HoverCardTrigger>
            {!isSubscriptionActive && (
              <HoverCardContent>
                <p>This section is only available for paying users.</p>
              </HoverCardContent>
            )}
          </HoverCard>

          <li className="group relative px-3 py-2 text-primary-foreground ">
            <div className="flex flex-col items-center">
              <IconLightbulb className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
              <IconGraduationCap className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
            </div>
            <button className="cursor-default font-poppins font-semibold ">
              Learn
            </button>
            <div className="absolute inset-x-0 bottom-0  mb-2 h-0.5 origin-left scale-x-0 transform bg-primary-foreground transition-transform duration-300 group-hover:scale-x-100"></div>
            <div className="invisible absolute -left-48 top-0 z-50 min-w-[300px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100 ">
              <div className="relative top-6 w-full rounded-xl bg-slate-100 p-6 shadow-xl dark:bg-primary-foreground">
                <div className="absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-slate-100 transition-transform duration-500 ease-in-out group-hover:translate-x-[12.65rem] dark:bg-primary-foreground"></div>

                <div className="relative z-10">
                  <Link
                    href="https://script-timer.com/blogs/"
                    target="_blank"
                    className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                  >
                    <div className="flex items-center ">
                      <span>
                        <IconFileHeart />
                      </span>
                      <span className="ml-1">Blog</span>
                    </div>
                    <p className="font-normal text-gray-500">
                      Keep up with the latest news about Script Timer
                    </p>
                  </Link>
                  <div className="mt-2 grid grid-cols-1 gap-6">
                    <div>
                      <p className="text-[13px] font-medium uppercase tracking-wider text-gray-500 dark:text-secondary-foreground">
                        Learning Links
                      </p>
                      <ul className="mt-1 text-[15px]">
                        <li>
                          <Link
                            href="https://script-timer.com/chatgpt-prompts/chatgpt-cheatsheet-guide-to-efficiency-without-the-burnout-2/"
                            target="_blank"
                            className="block py-1 font-normal text-gray-500 hover:text-gray-800"
                          >
                            Easy Prompt Guide
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://script-timer.com/chatgpt-prompts/chatgpt-prompting-guide-from-openai/"
                            target="_blank"
                            className="block py-1 font-normal text-gray-500 hover:text-gray-800"
                          >
                            Open AI Guide
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://script-timer.com/script-writing/how-long-will-my-script-take-to-read/"
                            target="_blank"
                            className="block py-1 font-normal text-gray-500 hover:text-gray-800"
                          >
                            Script Timing Foundations
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://script-timer.com/lcs-masterclass/"
                            target="_blank"
                            className="block py-1 font-normal text-gray-500 hover:text-gray-800"
                          >
                            Video Creator MasterClass
                          </Link>
                        </li>
                        <li>
                          <h3 className="block py-1 font-normal text-gray-400">
                            Video Guides (coming soon)
                          </h3>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="group relative px-3 py-2 text-primary-foreground hover:cursor-default ">
            <div className="flex flex-col items-center">
              <Link href="/plans">
                <IconHandshake className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                <IconWallet className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
              </Link>
            </div>
            <Link
              href="/plans"
              className="cursor-pointer font-poppins font-semibold "
            >
              Plans
            </Link>
          </li>
        </ul>
      </nav>
      <nav className=" ml-6 sm:block md:hidden lg:hidden xl:hidden">
        <button
          className="inline-flex items-center rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          onClick={toggleMenu}
        >
          <IconArrowDown />
          <span>Menu</span>
        </button>
      </nav>
      <nav>
        <ul className="flex">
          <li>
            <Button
              variant="ghost"
              size="lg"
              onClick={toggleTheme}
              className=""
            >
              {!theme ? null : theme === "dark" ? (
                <IconMoon className="transition-all " />
              ) : (
                <IconSun className="transition-all" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </li>
          <li>
            <button
              className="group flex items-center rounded-full border-b-4  border-blue-700 bg-blue-300 bg-opacity-10 px-3  py-2 font-semibold"
              onClick={async () => {
                await signOut();
              }}
            >
              <span className="mr-2 font-poppins">Sign out</span>
              <svg
                className="stroke-current"
                width="10"
                height="10"
                strokeWidth="2"
                viewBox="0 0 10 10"
                aria-hidden="true"
              >
                <g fillRule="evenodd">
                  <path
                    className="opacity-0 transition duration-200 ease-in-out group-hover:opacity-100"
                    d="M0 5h7"
                  ></path>
                  <path
                    className="opacity-100 transition duration-200 ease-in-out group-hover:translate-x-1 group-hover:transform"
                    d="M1 1l4 4-4 4"
                  ></path>
                </g>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
      <AnimatePresence>
        {open && <MobileNavBar toggle={toggleMenu} />}
      </AnimatePresence>
    </header>
  );
};
export default Newnavbar;

"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function newnavbar({
  signOut,
}: {
  signOut: () => Promise<null>;
}) {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };
  return (
    <header className=" sticky top-0 z-50 mx-auto flex h-12 items-center justify-between bg-gradient-to-r from-blue-500 to-blue-200 px-2 ">
      <Link
        href={`/`}
        className="ml-4 text-xl font-bold text-primary-foreground"
      >
        Script Timer
      </Link>

      <nav>
        <ul className="flex items-center justify-center font-semibold">
          <li className="hover:text-bold group relative px-3 py-2 text-primary-foreground hover:text-orange-500">
            <button className="cursor-default font-semibold  ">Services</button>
            <div className="invisible absolute -left-48 top-0 z-50 min-w-[560px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100">
              <div className="relative top-6 w-full rounded-xl   bg-slate-100 p-6 shadow-xl">
                <div className="absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-slate-100 transition-transform duration-500 ease-in-out group-hover:translate-x-[12rem]"></div>

                <div className="relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[13px] font-medium uppercase tracking-wider text-gray-500">
                        Mind helpers
                      </p>
                      <ul className="mt-3 text-[15px]">
                        <li>
                          <Link
                            href={`/texttospeech`}
                            className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600"
                          >
                            Text2Speech
                            <p className="font-normal text-gray-500">
                              you give us text , we give you voice
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/chat`}
                            className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600"
                          >
                            Script Coach
                            <p className="font-normal text-gray-500">
                              Our AI will help you sharpen ideas
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
                            className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600"
                          >
                            Voice Actor Library
                            <p className="font-normal text-gray-500">
                              over 30 voices to choose
                            </p>
                          </Link>
                        </li>
                        <li>
                          <a
                            href={`/history`}
                            className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600"
                          >
                            Voice Activity Log
                            <p className="font-normal text-gray-500">
                              Your voice history here
                            </p>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="group relative px-3 py-2 text-primary-foreground hover:text-orange-500">
            <button className="cursor-default font-semibold ">Learn</button>
            <div className="invisible absolute -left-2 top-0 z-50 min-w-[260px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100">
              <div className="relative top-6 w-full rounded-xl bg-slate-100 p-6 shadow-xl">
                <div className="absolute top-0 z-0 h-10 w-10 -translate-x-4 rotate-45 transform rounded-sm bg-slate-100 transition-transform duration-500 ease-in-out group-hover:translate-x-3"></div>
                <div className="relative z-10">
                  <p className="text-[13px] font-medium uppercase tracking-wider text-gray-500">
                    Helpfull Links
                  </p>
                  <ul className="mt-3 text-[15px]">
                    <li>
                      <a
                        href={"https://script-timer.com/blogs/"}
                        target="_blank"
                        className="block bg-transparent bg-gradient-to-br from-indigo-400 via-blue-500 to-orange-700 bg-clip-text py-1 font-semibold text-transparent hover:from-blue-600 hover:via-orange-400 hover:to-indigo-600"
                        rel="noreferrer"
                      >
                        Prompt Resources
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="block bg-transparent bg-gradient-to-br from-indigo-400 via-blue-500 to-orange-700 bg-clip-text py-1 font-semibold text-transparent hover:from-blue-600 hover:via-orange-400 hover:to-indigo-600"
                      >
                        Streamers
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="block bg-transparent bg-gradient-to-br from-indigo-400 via-blue-500 to-orange-700 bg-clip-text py-1 font-semibold text-transparent hover:from-blue-600 hover:via-orange-400 hover:to-indigo-600"
                      >
                        Influence
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="block bg-transparent bg-gradient-to-br from-indigo-400 via-blue-500 to-orange-700 bg-clip-text py-1 font-semibold text-transparent hover:from-blue-600 hover:via-orange-400 hover:to-indigo-600"
                      >
                        Programming
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="block bg-transparent bg-gradient-to-br from-indigo-400 via-blue-500 to-orange-700 bg-clip-text py-1 font-semibold text-transparent hover:from-blue-600 hover:via-orange-400 hover:to-indigo-600"
                      >
                        Design
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="group relative px-3 py-2 text-primary-foreground hover:text-orange-500">
            <button className="cursor-default font-semibold ">About</button>
            <div className="invisible absolute -left-48 top-0 z-50 min-w-[560px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100">
              <div className="relative top-6 w-full rounded-xl bg-slate-100 p-6 shadow-xl">
                <div className="absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-slate-100 transition-transform duration-500 ease-in-out group-hover:translate-x-[12.65rem]"></div>

                <div className="relative z-10">
                  <a
                    href="/"
                    className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600"
                  >
                    Blog
                    <p className="font-normal text-gray-500">
                      Keep up with the latest news about Script Timer
                    </p>
                  </a>
                  <div className="mt-6 grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[13px] font-medium uppercase tracking-wider text-gray-500">
                        Get started
                      </p>
                      <ul className="mt-3 text-[15px]">
                        <li>
                          <a
                            href="/"
                            className="block py-1 font-normal text-gray-500 hover:text-gray-800"
                          >
                            Libraries and SDKs
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            className="block py-1 font-normal text-gray-500 hover:text-gray-800"
                          >
                            Plugins
                          </a>
                        </li>

                        <li>
                          <a
                            href="/"
                            className="block py-1 font-normal text-gray-500 hover:text-gray-800"
                          >
                            Tutorials
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium uppercase tracking-wider text-gray-500">
                        Guides
                      </p>
                      <ul className="mt-3 text-[15px]">
                        <li>
                          <a
                            href="/"
                            className="block py-1 font-normal text-gray-500 hover:text-gray-800"
                          >
                            Link to important blog article 1
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            className="block py-1 font-normal text-gray-500 hover:text-gray-800"
                          >
                            Link to important blog article 2
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            className="block py-1 font-normal text-gray-600 hover:text-gray-800"
                          >
                            Link to important blog article 3
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            className="block py-1 font-normal text-gray-600 hover:text-gray-800"
                          >
                            Link to important blog article 4
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="group relative px-3 py-2 text-primary-foreground hover:text-orange-500">
            <button className="cursor-default font-semibold ">Theme</button>
            <div className="invisible absolute -left-2 top-0 z-50 min-w-[200px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100">
              <div className="relative top-6 w-full rounded-xl bg-slate-100 p-6 shadow-xl">
                <div className="absolute top-0 z-0 h-10 w-10 -translate-x-4 rotate-45 transform rounded-sm bg-slate-100 transition-transform duration-500 ease-in-out group-hover:translate-x-3"></div>
                <div className="relative z-10">
                  <ul className="text-[15px]">
                    <li>
                      <button
                        className="block py-1 font-normal text-gray-600 hover:text-gray-800"
                        onClick={() => handleThemeChange("light")}
                      >
                        Light
                      </button>
                    </li>
                    <li>
                      <button
                        className="block py-1 font-normal text-gray-600 hover:text-gray-800"
                        onClick={() => handleThemeChange("dark")}
                      >
                        Dark
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="group relative px-3 py-2 text-primary-foreground hover:text-orange-500">
            <a href="#" className="cursor-default font-semibold ">
              Pricing
            </a>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <button
              className="group flex items-center rounded-full bg-blue-500 bg-opacity-10 px-3 py-2 font-semibold"
              onClick={async () => {
                await signOut();
              }}
            >
              <span className="mr-2">Sign out</span>
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
    </header>
  );
}

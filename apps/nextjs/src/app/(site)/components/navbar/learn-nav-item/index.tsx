import Link from "next/link";

import {
  IconFileHeart,
  IconGraduationCap,
  IconLightbulb,
} from "@voiceai/ui/@/components/ui/icons";

export default function LearnNavItem() {
  return (
    <>
      <div className="flex flex-col items-center">
        <IconLightbulb className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
        <IconGraduationCap className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
        <span className=" font-poppins font-semibold ">Learn</span>
      </div>
      <div className="absolute inset-x-0 bottom-0  mb-2 h-0.5 origin-left scale-x-0 transform bg-primary-foreground transition-transform duration-300 group-hover:scale-x-100" />
      <div className="invisible absolute -left-48 top-0 z-50 min-w-[300px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100 ">
        <div className="relative top-6 w-full rounded-xl bg-slate-100 p-6 shadow-xl dark:bg-primary-foreground">
          <div className="absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-slate-100 transition-transform duration-500 ease-in-out group-hover:translate-x-[12.65rem] dark:bg-primary-foreground" />
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
    </>
  );
}

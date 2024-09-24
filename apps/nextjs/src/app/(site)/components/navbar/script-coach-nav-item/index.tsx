import Link from "next/link";

import {
  IconBot,
  IconBotMessageSquare,
  IconCopyright,
  IconGlobe,
  IconNoAi,
  IconPencilLine,
} from "@voiceai/ui/@/components/ui/icons";

export default function ScriptCoachNavItem() {
  return (
    <>
      <Link href={`/chat`} className="flex flex-col items-center">
        <div className="mb-2">
          <IconPencilLine className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
          <IconBotMessageSquare className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
        </div>
        <span className="font-poppins font-semibold">Script</span>
        <span className="font-poppins font-semibold">Writing</span>
      </Link>
      <div className="absolute inset-x-0 bottom-0  mb-2 h-0.5 origin-left scale-x-0 transform bg-primary-foreground transition-transform duration-300 group-hover:scale-x-100" />
      <div className="invisible absolute -left-48 top-7 z-50 min-w-[300px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100">
        <div className="relative top-6 w-full rounded-xl   bg-slate-100 p-6 shadow-xl dark:bg-primary-foreground ">
          <div className="absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-slate-100 transition-transform duration-500 ease-in-out group-hover:translate-x-[14rem] dark:bg-primary-foreground " />

          <div className="relative z-10">
            <div className="grid  grid-cols-1 gap-6">
              <div>
                {/* <p className="text-[13px] font-medium uppercase tracking-wider text-gray-500  ">
                  Voice Tools
                </p> */}
                <ul className="mt-3 text-[15px]">
                  <li className="flex items-center">
                    <Link
                      href={`/chat`}
                      className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                    >
                      <div className="flex items-center ">
                        {" "}
                        {/* Envuelve el icono y el texto en un div flex */}
                        <span>
                          <IconBot />
                        </span>
                        <span className="ml-1 ">Script-Coach</span>
                      </div>
                      <p className="font-normal text-gray-500">
                        Create your script with the aid of the best AI.
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/translatetext`}
                      className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                    >
                      <div className="flex items-center">
                        <span>
                          <IconGlobe className="h-4 w-4" />
                        </span>
                        <span className="ml-1">Translate Text</span>
                      </div>
                      <p className="font-normal text-gray-500">
                        Translate text and audio to multiple languages.
                      </p>
                    </Link>
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

import Link from "next/link";

import {
  IconAudioLines,
  IconClone,
  IconEar,
  IconFileType,
  IconHistory,
  IconLibraryBig,
  IconMic2,
} from "@voiceai/ui/@/components/ui/icons";

export default function TextToVoiceNavItem() {
  return (
    <>
      <Link href={`/texttovoice`} className="flex flex-col items-center">
        <IconAudioLines className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
        <IconFileType className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
        <span className="font-poppins font-semibold">Text to Voice</span>
      </Link>
      <div className="absolute inset-x-0 bottom-0  mb-2 h-0.5 origin-left scale-x-0 transform bg-primary-foreground transition-transform duration-300 group-hover:scale-x-100" />
      <div className="invisible absolute -left-48 top-0 z-50 min-w-[300px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100">
        <div className="relative top-6 w-full rounded-xl   bg-slate-100 p-6 shadow-xl dark:bg-primary-foreground ">
          <div className="absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-slate-100 transition-transform duration-500 ease-in-out group-hover:translate-x-[16rem] dark:bg-primary-foreground " />

          <div className="relative z-10">
            <div className="grid  grid-cols-1 gap-6">
              <div>
                {/* <p className="text-[13px] font-medium uppercase tracking-wider text-gray-500  ">
                  Voice Tools
                </p> */}
                <ul className="text-[15px]">
                  <li className="flex items-center">
                    <Link
                      href={`/texttovoice`}
                      className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                    >
                      <div className="flex items-center ">
                        <span>
                          <IconMic2 />
                        </span>
                        <span className="ml-1 ">Text to Voice</span>
                      </div>
                      <p className="font-normal text-gray-500">
                        Add text, listen to the best grammar & voices...
                      </p>
                    </Link>
                  </li>
                </ul>

                <ul className="text-[15px]">
                  <li>
                    <Link
                      href={`/voicecloning`}
                      className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                    >
                      <div className="flex items-center ">
                        <span>
                          <IconClone />
                        </span>
                        <span className="ml-1 ">Voice Cloning</span>
                      </div>
                      <p className="font-normal text-gray-500">
                        Give us an audio and we will create a voice for you
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/translateaudio`}
                      className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                    >
                      <div className="flex items-center">
                        <span>
                          <IconEar />
                        </span>
                        <span className="ml-1">Translate Audio</span>
                      </div>
                      <p className="font-normal text-gray-500">
                        Upload an Audio File and we will translate it
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/library`}
                      className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                    >
                      <div className="flex items-center">
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
    </>
  );
}

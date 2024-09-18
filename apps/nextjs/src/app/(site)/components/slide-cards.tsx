import React from "react";
import Image from "next/image";
import Link from "next/link";

import MasterClassesLanding from "../../../../public/MasterClassesLanding.png";
import ScriptCoachLanding from "../../../../public/ScriptCoachLanding.png";
import TTVLanding from "../../../../public/TextToVoiceLanding.png";

function SlideCards() {
  return (
    <div className="grid grid-cols-1 gap-32 px-8  py-10 md:grid-cols-2 lg:grid-cols-3">
      <div className="beauty-card group relative cursor-pointer items-center justify-center overflow-hidden rounded-md border border-black transition-shadow hover:shadow-xl hover:shadow-black/30">
        <div className="h-64 w-64">
          <Image
            className=" h-full  w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
            src={ScriptCoachLanding}
            alt="speech area image"
          />
        </div>
        <div className="absolute inset-0  from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <button className="inline-flex h-9 items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
            <Link href="/chat" target="_blank">
              See More
            </Link>
          </button>
        </div>
      </div>
      <div className="beauty-card group relative translate-y-[-60px] cursor-pointer items-center justify-center overflow-hidden rounded-md border border-black transition-shadow hover:shadow-xl hover:shadow-black/30">
        <div className="h-64 w-64">
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
            src={TTVLanding}
            alt="voice actor library"
          />
        </div>
        <div className="absolute inset-0  from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <button className="inline-flex h-9 items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
            <Link href="/texttovoice">See More</Link>
          </button>
        </div>
      </div>
      <div className="beauty-card group relative cursor-pointer items-center justify-center overflow-hidden rounded-md border border-black transition-shadow hover:shadow-xl hover:shadow-black/30">
        <div className="h-64 w-64">
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
            src={MasterClassesLanding}
            alt="Voice Library image"
          />
        </div>
        <div className="absolute inset-0 from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <button className="inline-flex h-9 items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
            <Link href="/masterclasses">See More</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SlideCards;

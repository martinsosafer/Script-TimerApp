import React from "react";
import Image from "next/image";
import Link from "next/link";

import actorsImg from "../../../../public/actors.jpg";
import aiwritterImg from "../../../../public/aiwritting.jpg";
import speechImg from "../../../../public/speech.png";

function SlideCards() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="beauty-card group relative cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-black transition-shadow hover:shadow-xl hover:shadow-black/30">
        <div className="h-96 w-72">
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
            src={speechImg}
            alt="speech area image"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <h3 className="font-dmserif text-2xl font-bold text-white">
            Masterclasses
          </h3>
          <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Speaking, Presenting, Storytelling, Video Production
          </p>
          <button className="inline-flex h-9 items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
            <Link href="/masterclasses" target="_blank">
              See More
            </Link>
          </button>
        </div>
      </div>
      <div className="beauty-card group relative cursor-pointer items-center justify-center overflow-hidden rounded-md border border-black transition-shadow hover:shadow-xl hover:shadow-black/30">
        <div className="h-96 w-72">
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
            src={actorsImg}
            alt="voice actor library"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <h3 className="font-dmserif text-2xl font-bold text-white">
            Text to Voice
          </h3>
          <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            AI voice generation , choose a voice actor and give us a script.
          </p>
          <button className="inline-flex h-9 items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
            <Link href="/texttospeech">See More</Link>
          </button>
        </div>
      </div>
      <div className="beauty-card group relative cursor-pointer items-center justify-center overflow-hidden rounded-md border border-black transition-shadow hover:shadow-xl hover:shadow-black/30">
        <div className="h-96 w-72">
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
            src={aiwritterImg}
            alt="Voice Library image"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <h3 className="font-dmserif text-2xl font-bold text-white">
            Script Coach AI
          </h3>
          <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Assist from our AI to help your creativity and provide innovative
            solutions.
          </p>
          <button className="inline-flex h-9 items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
            <Link href="/chat">See More</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SlideCards;

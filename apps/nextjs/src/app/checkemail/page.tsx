"use client";

import React from "react";
import ReactConfetti from "react-confetti"; // Make sure this is imported

import { poppins } from "../fonts";

export default function CheckEmail() {
  return (
    <div
      className={`min-h-screen bg-gradient-to-tr from-black to-blue-500 p-8 ${poppins.className}`}
    >
      {/* Confetti will cover the whole page */}
      <ReactConfetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={4000}
        recycle={false}
        gravity={0.1}
        initialVelocityX={2}
        initialVelocityY={10}
        colors={["#0123e7", "#eb8806"]}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {" "}
        {/* Added relative z-10 to ensure content appears above confetti */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Your email was sent. Congrats!
          </h1>
          <p className="pb-1 text-base text-cyan-300 md:text-xl">
            Please check your email to verify and open your free access. Get
            ready to save time, money, and stress:
          </p>
          <p className="text-cp-white-ghost pb-8 text-xs md:text-sm">
            If you don't find our email, please check your spam folder
          </p>
          <p className="mb-12 text-2xl font-semibold text-white">
            In minutes! - not weeks
          </p>

          <h2 className="mb-8 text-4xl font-bold">
            <span className="text-cyan-300">Watch how Script-Timer Ai</span>
            <br />
            <span className="text-white">saves you time, money and stress</span>
          </h2>

          <div className="aspect-video w-full max-w-4xl rounded-lg bg-blue-500 shadow-lg">
            <iframe
              src="https://player.vimeo.com/video/1020211350"
              className="h-full w-full rounded-lg"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Script-Timer Video"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

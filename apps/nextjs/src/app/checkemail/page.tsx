"use client";

import ReactConfetti from "react-confetti"; // Make sure this is imported

import { poppins } from "../fonts";

export default function CheckEmail() {
  return (
    <div
      className={`h-full w-full bg-gradient-to-tr from-black to-blue-500 ${poppins.className} flex`}
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

      <div className="relative z-10 flex flex-1 justify-center px-3 py-8">
        {" "}
        {/* Added relative z-10 to ensure content appears above confetti */}
        <div className="flex h-full max-w-6xl flex-col items-center justify-start text-center ">
          <h1 className="pb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Your email was sent. Congrats!
          </h1>
          <p className="pb-1 text-base text-cyan-300 md:text-xl">
            Please check your email to verify and open your free access. Get
            ready to save time, money, and stress:
          </p>
          <p className="pb-8 text-2xl font-semibold text-white">
            In minutes! - not weeks
          </p>

          <h2 className="pb-8 text-xl font-bold md:text-4xl">
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

          <div className=" w-full max-w-3xl pt-7 text-sm lg:text-base">
            <p className="text-cp-accent pb-2 text-left">
              Need help with the login email?
            </p>

            <div className="text-cp-white flex flex-col gap-1 p-1 text-left">
              <p>
                • Check your spam folder. If it's there, please mark it as "not
                spam"
              </p>
              <p>• If you use Gmail, check the "Promotions" tab</p>
              <p>
                • If you still can't find the email, please write to
                maury@co-producer.ai
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

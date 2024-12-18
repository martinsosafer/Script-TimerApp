"use client";

import Link from "next/link";
import Lottie from "lottie-react";

import RobotAnimation from "../../public/animations/error404robot.json";
import Button from "./(site)/components/button";
import { poppins } from "./fonts";

export default function NotFound() {
  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-white via-purple-50/50 to-blue-50/50 p-4 ${poppins.className}`}
    >
      <div className="relative w-full max-w-3xl space-y-6 text-center">
        {/* Decorative blobs */}
        <div className="absolute left-1/4 top-0 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl" />
        <div className="absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />

        {/* Main content */}
        <h1 className="text-cp-primary text-4xl font-bold ">Ooops...</h1>
        <p className="text-vlack text-xl font-normal">
          We Think You Got Lost On Your Way To The Home Page!
        </p>

        {/* Lottie Animation */}
        <div className="relative mx-auto my-2 w-full max-w-lg">
          <Lottie
            loop
            animationData={RobotAnimation}
            play
            style={{ width: "100%", height: "300px" }}
          />
        </div>
        <Link href="/" className=" inline-block px-6  ">
          <Button type="accent" label="Back to Home Page" />
        </Link>
        {/* Bottom button */}

        {/* Additional decorative blobs */}
        <div className="absolute right-0 top-1/3 h-16 w-16 rounded-full bg-blue-500/20 blur-xl" />
        <div className="absolute bottom-1/3 left-0 h-20 w-20 rounded-full bg-blue-500/20 blur-xl" />
      </div>
    </div>
  );
}

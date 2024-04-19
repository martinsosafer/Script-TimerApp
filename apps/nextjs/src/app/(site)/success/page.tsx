"use client";

import React from "react";
import Confetti from "react-confetti";

import { AspectRatio } from "@voiceai/ui/@/components/ui/aspect-ratio";

import SlideCards from "../components/slide-cards";
import ThanksCard from "../components/thanksCard";

function SuccessPage() {
  return (
    <div className="mb-20 flex min-h-screen flex-col items-center justify-center space-y-4 text-center">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={1000}
        recycle={false}
        gravity={0.1}
        initialVelocityX={2}
        initialVelocityY={10}
        colors={["#0123e7", "#eb8806"]}
      />
      <ThanksCard />
      <AspectRatio ratio={30 / 8}>
        <iframe
          src="https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Script-Timer Ai_ On boarding video (Short version) (1)"
        />
      </AspectRatio>
      <h2 className="mb-8 text-5xl font-bold tracking-wider text-primary">
        Welcome to Our Site!
      </h2>
      <SlideCards />
    </div>
  );
}
export default SuccessPage;

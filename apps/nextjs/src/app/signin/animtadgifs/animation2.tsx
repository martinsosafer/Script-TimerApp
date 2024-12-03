"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import AiHollywoodGif from "./animatedgifs/AI Hollywood (289x162.56).gif";
import ListenAndUpgradeGif from "./animatedgifs/Listen to and upgrade your script (275x154.69).gif";
import ScriptAndVoiceGif from "./animatedgifs/Script and voice over (340x191.25).gif";
import WordSorterGif from "./animatedgifs/Word sorter (373x209.81).gif";

const gifs = [
  AiHollywoodGif,
  WordSorterGif,
  ScriptAndVoiceGif,
  ListenAndUpgradeGif,
];

export default function AnimatedGifs2({
  marginTop = 0,
}: {
  marginTop?: number;
}) {
  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  useEffect(() => {
    const switchGif = () => {
      setCurrentGifIndex((prev) => (prev + 1) % gifs.length);
    };

    const gifInterval = setInterval(switchGif, 10000);

    return () => {
      clearInterval(gifInterval);
    };
  }, []);

  return (
    <div
      className="relative flex h-full w-full items-center justify-center bg-gradient-to-tr from-black to-blue-500 text-white"
      style={{ marginTop }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGifIndex}
          className="absolute overflow-hidden rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: "30%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-30%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={gifs[currentGifIndex]}
            alt={`GIF ${currentGifIndex + 1}`}
            width={480}
            height={280}
            objectFit="contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

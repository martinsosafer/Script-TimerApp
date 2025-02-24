"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import AiHollywoodGif from "./animatedgifs/AI Hollywood (289x162.56).gif";
import ListenAndUpgradeGif from "./animatedgifs/Listen to and upgrade your script (275x154.69).gif";
import ScriptAndVoiceGif from "./animatedgifs/Script and voice over (340x191.25).gif";
import WordSorterGif from "./animatedgifs/Word sorter (373x209.81).gif";

export default function AnimatedGifs({
  marginTop = 0,
}: {
  marginTop?: number;
}) {
  const [currentGif, setCurrentGif] = useState(0);
  const [isLargeSize, setIsLargeSize] = useState(true);
  const [gifPair, setGifPair] = useState(0);

  useEffect(() => {
    const switchGif = () => {
      setCurrentGif((prev) => (prev === 0 ? 1 : 0));
      setIsLargeSize((prev) => !prev);
    };

    const switchGifPair = () => {
      setGifPair((prev) => (prev === 0 ? 1 : 0));
    };

    const gifInterval = setInterval(switchGif, 8000);
    const pairInterval = setInterval(switchGifPair, 24000);

    return () => {
      clearInterval(gifInterval);
      clearInterval(pairInterval);
    };
  }, []);

  const getGifSrc = (index) => {
    if (gifPair === 0) {
      return index === 0 ? AiHollywoodGif : WordSorterGif;
    } else {
      return index === 0 ? ScriptAndVoiceGif : ListenAndUpgradeGif;
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-tr from-black to-blue-500 text-white">
      <div className="flex items-center    " style={{ marginTop }}>
        <AnimatePresence mode="wait">
          {/* First GIF */}
          <motion.div
            key={`gif-0-${gifPair}`}
            className="absolute overflow-hidden rounded-2xl shadow-xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              width: isLargeSize ? "480px" : "289px",
              height: isLargeSize ? "280px" : "166px",
              x: isLargeSize ? -240 : -240,
              y: isLargeSize ? -40 : -220,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={getGifSrc(0)}
              alt="First GIF"
              layout="fill"
              objectFit="contain"
            />
          </motion.div>

          {/* Second GIF */}
          <motion.div
            key={`gif-1-${gifPair}`}
            className="absolute overflow-hidden rounded-2xl shadow-xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              width: isLargeSize ? "275px" : "480px",
              height: isLargeSize ? "162px" : "280px",
              x: isLargeSize ? -240 : -240,
              y: isLargeSize ? 180 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={getGifSrc(1)}
              alt="Second GIF"
              layout="fill"
              objectFit="contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

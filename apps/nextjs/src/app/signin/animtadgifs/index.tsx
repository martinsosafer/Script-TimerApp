"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import AiHollywoodGif from "./animatedgifs/AI Hollywood (289x166).gif";
import ListenAndUpgradeGif from "./animatedgifs/Listen to and upgrade your script (275x162).gif";

export default function AnimatedGifs() {
  const [currentGif, setCurrentGif] = useState(0);
  const [isLargeSize, setIsLargeSize] = useState(true);

  useEffect(() => {
    const switchGif = () => {
      setCurrentGif((prev) => (prev === 0 ? 1 : 0));
      setIsLargeSize((prev) => !prev);
    };

    const interval = setInterval(switchGif, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-tr from-black to-blue-500 p-10 text-white">
      <div className="relative h-[530px] w-[365px]">
        {/* AI Hollywood GIF */}
        <motion.div
          className="absolute left-0 top-0 overflow-hidden rounded-lg shadow-xl"
          animate={{
            width: isLargeSize ? "578px" : "289px",
            height: isLargeSize ? "332px" : "166px",
            x: isLargeSize ? 0 : -100,
            y: isLargeSize ? 0 : 38,
          }}
          transition={{ duration: 1 }}
        >
          <Image
            src={AiHollywoodGif}
            alt="AI Hollywood GIF"
            layout="fill"
            objectFit="contain"
          />
        </motion.div>

        {/* Listen and Upgrade GIF */}
        <motion.div
          className="absolute left-0 top-[364px] overflow-hidden rounded-lg shadow-xl"
          animate={{
            width: isLargeSize ? "275px" : "550px",
            height: isLargeSize ? "162px" : "324px",
            x: isLargeSize ? -100 : 0,
            y: isLargeSize ? 38 : 0,
          }}
          transition={{ duration: 1 }}
        >
          <Image
            src={ListenAndUpgradeGif}
            alt="Listen and Upgrade GIF"
            layout="fill"
            objectFit="contain"
          />
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import AiHollywoodGif from "./animatedgifs/AI Hollywood (289x162.56).gif";
import ListenAndUpgradeGif from "./animatedgifs/Listen to and upgrade your script (275x154.69).gif";
import ScriptAndVoiceGif from "./animatedgifs/Script and voice over (340x191.25).gif";
import WordSorterGif from "./animatedgifs/Word sorter (373x209.81).gif";

export default function AnimatedGifs() {
  const [currentGif, setCurrentGif] = useState(0);
  const [isLargeSize, setIsLargeSize] = useState(true);
  const [gifPair, setGifPair] = useState(0);
  const [restartKey, setRestartKey] = useState(0);

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

  useEffect(() => {
    if (isLargeSize) {
      setRestartKey((prev) => prev + 1);
    }
  }, [isLargeSize]);

  const getGifSrc = (index: number) => {
    if (gifPair === 0) {
      return index === 0 ? AiHollywoodGif : WordSorterGif;
    } else {
      return index === 0 ? ScriptAndVoiceGif : ListenAndUpgradeGif;
    }
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-tr from-black to-blue-500 p-10 text-white">
      <div className="flex items-center">
        <AnimatePresence mode="wait">
          {/* First GIF */}
          <motion.div
            key={`gif-0-${gifPair}`}
            className="absolute overflow-hidden rounded-2xl shadow-xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              width: isLargeSize ? "578px" : "289px",
              height: isLargeSize ? "332px" : "166px",
              x: -300,
              y: isLargeSize ? 0 : -250,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              key={`img-0-${restartKey}`}
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
              width: isLargeSize ? "275px" : "550px",
              height: isLargeSize ? "162px" : "324px",
              x: -300,
              y: isLargeSize ? 250 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              key={`img-1-${restartKey}`}
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
// //"use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { AnimatePresence, motion } from "framer-motion";

// import AiHollywoodGif from "./animatedgifs/AI Hollywood (289x162.56).gif";
// import ListenAndUpgradeGif from "./animatedgifs/Listen to and upgrade your script (275x154.69).gif";
// import ScriptAndVoiceGif from "./animatedgifs/Script and voice over (340x191.25).gif";
// import WordSorterGif from "./animatedgifs/Word sorter (373x209.81).gif";

// export default function AnimatedGifs() {
//   const [currentGif, setCurrentGif] = useState(0);
//   const [isLargeSize, setIsLargeSize] = useState(true);

//   useEffect(() => {
//     const switchGif = () => {
//       setCurrentGif((prev) => (prev === 0 ? 1 : 0));
//       setIsLargeSize((prev) => !prev);
//     };

//     const interval = setInterval(switchGif, 7000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-tr from-black to-blue-500 p-10 text-white">
//       <div className="flex items-center">
//         {/* AI Hollywood GIF */}
//         <motion.div
//           className="absolute overflow-hidden rounded-2xl shadow-xl"
//           animate={{
//             width: isLargeSize ? "578px" : "289px",
//             height: isLargeSize ? "332px" : "166px",
//             x: isLargeSize ? -300 : -300, // Adjusting X position to 47
//             y: isLargeSize ? 0 : -250, // Adjusting Y position to 156
//           }}
//           transition={{ duration: 1 }}
//         >
//           <Image
//             src={AiHollywoodGif}
//             alt="AI Hollywood GIF"
//             layout="fill"
//             objectFit="contain"
//           />
//         </motion.div>

//         {/* Listen and Upgrade GIF */}
//         <motion.div
//           className="absolute overflow-hidden rounded-2xl shadow-xl"
//           animate={{
//             width: isLargeSize ? "275px" : "550px",
//             height: isLargeSize ? "162px" : "324px",
//             x: isLargeSize ? -300 : -300, // Adjusting X position to 76
//             y: isLargeSize ? 250 : 0, // Adjusting Y position to 364
//           }}
//           transition={{ duration: 1 }}
//         >
//           <Image
//             src={WordSorterGif}
//             alt="Listen and Upgrade GIF"
//             layout="fill"
//             objectFit="contain"
//           />
//         </motion.div>
//       </div>
//     </div>
//   );
// }

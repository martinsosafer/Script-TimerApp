"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import BmwImg from "../../../../../../public/Bmw Foundation.webp";
import CbsImg from "../../../../../../public/cbs.webp";
import StarbucksImg from "../../../../../../public/Starbucks4.webp";
import TommyHilfigerImg from "../../../../../../public/TommyHilfiger.webp";
import UniversalImg from "../../../../../../public/universal.webp";
import WbImg from "../../../../../../public/WB.jpeg";

const logos = [
  { src: BmwImg, alt: "BMW Foundation" },
  { src: CbsImg, alt: "CBS" },
  { src: StarbucksImg, alt: "Starbucks" },
  { src: TommyHilfigerImg, alt: "Tommy Hilfiger" },
  { src: UniversalImg, alt: "Universal" },
  { src: WbImg, alt: "Warner Bros" },
];

export default function MarqueeLogos() {
  return (
    <div className="relative w-full overflow-hidden bg-white px-[200] md:px-16 lg:px-24">
      <div className="flex min-w-full">
        <motion.div
          className="flex shrink-0"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex w-[200px] items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120} // Smaller width
                height={60} // Smaller height
                className="h-auto w-auto object-contain"
                priority
              />
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex shrink-0"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {logos.map((logo, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex w-[200px] items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120} // Smaller width
                height={60} // Smaller height
                className="h-auto w-auto object-contain"
                priority
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// Import actual images
import MasterclassesImage from "../../../../../../public/MasterClassesLanding.png";
import ScriptCoachImage from "../../../../../../public/ScriptCoachLanding.png";
import LandingPageImage from "../../../../../../public/TextToVoiceLanding.png";
import MotionTransition from "../MotionTransition/MotionTransition";

export default function GoSection() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 to-blue-500 p-8 text-white">
      <MotionTransition>
        <h1 className="mb-12 text-center font-poppins text-4xl font-bold">
          It Used To Take Weeks to Deliver Content That Built an Audience
        </h1>
        <p className="text-center text-xl">
          No more. Improve your pitch, speeches, presentations, and video with
          the best writers, voices, and AI available.
        </p>
      </MotionTransition>

      <div className="mx-auto mt-10 max-w-5xl space-y-24">
        <Section
          title="Text to Voice"
          number={1}
          description="Tailor-made voices, celebrity sound alike, cloning, translating: Deliver your best."
          imageUrl={LandingPageImage}
          imagePosition="right"
        />

        <Section
          title="Script Coach AI"
          number={2}
          description="What you say in videos, text, graphics, and messaging are all pieces that build, or erode, brand reputation."
          imageUrl={ScriptCoachImage}
          imagePosition="left"
        />

        <Section
          title="Masterclasses"
          number={3}
          description="Speaking, Presenting, Storytelling, Video Production."
          imageUrl={MasterclassesImage}
          imagePosition="right"
        />
      </div>
    </div>
  );
}

function Section({ title, number, description, imageUrl, imagePosition }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const imageVariants = {
    hidden: { opacity: 0, x: imagePosition === "left" ? -20 : 20 }, // Reduced movement distance
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      ref={ref}
      className={`mx-auto flex flex-col md:max-w-3xl ${
        imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"
      } items-center justify-between gap-8`}
    >
      <div
        className={`flex-1 space-y-4 ${imagePosition === "left" ? "ml-16" : "mr-16"}`}
      >
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
            {number}
          </span>
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        <p className="text-lg">{description}</p>
      </div>
      <motion.div
        className="mx-auto max-w-lg rounded-lg bg-white p-2 shadow-lg"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={imageVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="beauty-card group relative cursor-pointer items-center justify-center overflow-hidden rounded-md border border-black transition-shadow hover:shadow-xl hover:shadow-black/30">
          <Image
            src={imageUrl}
            alt={title}
            width={300} // Adjusted image width
            height={180}
            className="h-auto w-full rounded-lg transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" // Ensure image takes full width of its container
          />
        </div>
        <div className="absolute inset-0 from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <button className="inline-flex h-9 items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
            <Link href="/masterclasses">See More</Link>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

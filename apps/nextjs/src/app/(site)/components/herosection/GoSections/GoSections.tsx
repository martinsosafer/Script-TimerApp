"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// Import actual images
import MasterclassesImage from "../../../../../../public/MasterClassesLanding.png";
import ScriptCoachImage from "../../../../../../public/ScriptCoachLanding.gif";
import LandingPageImage from "../../../../../../public/TextToVoiceLanding.gif";
import MotionTransition from "../MotionTransition/MotionTransition";

export default function GoSection() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 to-blue-500 p-8 text-white">
      <MotionTransition>
        <h1 className="mb-12 text-center font-poppins text-5xl font-bold">
          It Used To Take Weeks to Deliver Content That Built an Audience
        </h1>
        <p className="text-center text-2xl">
          No more. Improve your pitch, speeches, presentations, and video with
          the best writers, voices, and AI available.
        </p>
      </MotionTransition>

      <div className="mx-auto mt-10 max-w-6xl space-y-32">
        <Section
          title="Text to Voice"
          number={1}
          description="Tailor-made voices, celebrity sound alike, cloning, translating: Deliver your best."
          imageUrl={ScriptCoachImage}
          imagePosition="right"
        />
        <Section
          title="Script Coaching"
          number={2}
          description="Our AI is a collaborator, it asks you questions and clarifies your needs. What you say in videos, text, graphics, and messaging are all pieces that build, or erode, brand reputation."
          imageUrl={LandingPageImage}
          imagePosition="left"
        />
        <Section
          title="Masterclasses"
          number={3}
          description="After Production, and Using AI to build marketing assets are courses that can move you from beginner to 'expert' level storyteller."
          imageUrl={MasterclassesImage}
          imagePosition="right"
        />
      </div>
    </div>
  );
}

function Section({ title, number, description, imageUrl, imagePosition }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const imageVariants = {
    hidden: { opacity: 0, x: imagePosition === "left" ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      ref={ref}
      className={`mx-auto flex flex-col md:max-w-4xl ${
        imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"
      } items-center justify-between gap-12`}
    >
      <div
        className={`flex-1 space-y-6 ${imagePosition === "left" ? "ml-16" : "mr-16"}`}
      >
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
            {number}
          </span>
          <h2 className="text-3xl font-semibold">{title}</h2>
        </div>
        <p className="text-xl">{description}</p>
      </div>

      <motion.div
        className="flex h-[250px] w-[450px] items-center justify-center rounded-lg bg-white p-2 shadow-lg" // Uniform size for all images
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={imageVariants}
        transition={{ duration: 0.7 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill" // Fills the container
            objectFit="contain" // Ensures no distortion, but fits within the box
            className="transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
          />
        </div>
      </motion.div>
    </div>
  );
}

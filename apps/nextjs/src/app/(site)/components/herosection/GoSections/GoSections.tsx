"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { poppins } from "~/app/fonts";
//imgs
import Directorimg from "../../modals/modalimgs/DirectorImg.png";
import TextToVoiceimg from "../../modals/modalimgs/HeroImage.png";
import MasterClassesImg from "../../modals/modalimgs/MastarclassesImg.png";
import Imagesimg from "../../modals/modalimgs/StoryboardImg.png";
import MotionTransition from "../MotionTransition/MotionTransition";

export default function GoSection() {
  return (
    <div
      className={`flex min-h-screen flex-col items-center bg-gradient-to-r from-blue-500 via-blue-600 to-black  text-white ${poppins.className}`}
    >
      <MotionTransition className="mt-[60px]">
        <h1 className="text-cp-secondary-lightest text-center text-[28px] font-normal leading-[33.6px]">
          It Used To Take Weeks to Deliver Content That Built <br /> an
          Audience.
          <span className="text-[28px] font-bold leading-[33.6px]">
            No More
          </span>
        </h1>
        <p className="mt-[40px] justify-center text-center text-[34px] font-bold leading-[40.1px]">
          Improve your pitch, speeches,
          <br /> presentations, and video with the best
          <br />
          writers, voices, and AI available.
        </p>
      </MotionTransition>

      <div className="mx-auto mb-[60px] mt-[60px] max-w-6xl space-y-[32px]">
        <Section
          title="Text to Voice"
          description="Tailor-made voices, celebrity sound alike, cloning, translating: Deliver your best."
          imageUrl={TextToVoiceimg}
          imagePosition="right"
        />
        <Section
          title="Script Coaching"
          description="Our AI is a collaborator, it asks you questions and clarifies your needs. What you say in videos, text, graphics, and messaging are all pieces that build, or erode, brand reputation."
          imageUrl={Directorimg}
          imagePosition="left"
        />
        <Section
          title="Masterclasses"
          description="After Production, and Using AI to build marketing assets are courses that can move you from beginner to 'expert' level storyteller."
          imageUrl={MasterClassesImg}
          imagePosition="right"
        />
        <Section
          title="Image Creation"
          description="Get your pitch, storyboard or presentation in shape by 'painting a picture' of your vision. Create your amazing images now!"
          imageUrl={Imagesimg}
          imagePosition="left"
        />
      </div>
    </div>
  );
}
function Section({ title, description, imageUrl, imagePosition }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const sectionVariants = {
    hidden: {
      opacity: 0,
      x: imagePosition === "left" ? -100 : 100, // Slide in from left or right
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`${poppins.className} mx-auto flex h-[340px] w-[862px] flex-col ${
        imagePosition === "left"
          ? "ml-20 md:flex-row-reverse"
          : "mr-20 md:flex-row"
      } items-center justify-between gap-12 rounded-2xl border border-blue-500 bg-white p-6 shadow-lg`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div
        className={`flex-1 space-y-6 pl-[69px] ${
          imagePosition === "left" ? "ml-16" : "mr-16"
        }`}
      >
        <div className="flex items-center gap-6  ">
          <span className="bg-cp-secondary flex h-10 w-10 items-center justify-center rounded-full font-bold text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M7 7h10v10"
              />
            </svg>
          </span>
          <h2 className="text-cp-primary text-[34px] font-bold leading-[41px]">
            {title}
          </h2>
        </div>
        <p className="text-cp-primary text-[20px] font-normal leading-[28px]">
          {description}
        </p>
      </div>

      <div className="flex h-[250px] w-[250px] items-center justify-center rounded-lg bg-white p-2">
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="contain"
            className="transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
          />
        </div>
      </div>
    </motion.div>
  );
}

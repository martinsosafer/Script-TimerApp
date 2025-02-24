"use client";

import { useEffect, useRef, useState } from "react";
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
      className={`flex min-h-screen flex-col items-center bg-gradient-to-r from-blue-500 via-blue-600 to-black text-white ${poppins.className}`}
    >
      <MotionTransition className="mt-[60px] sm:mt-[30px]">
        <h1 className="text-cp-secondary-lightest text-center text-[20px] leading-[24px] sm:text-[28px] sm:leading-[33.6px]">
          It Used To Take Weeks to Deliver Content That Built{" "}
          <br className="hidden sm:inline" /> an Audience.
          <span className="text-[20px] font-bold leading-[24px] sm:text-[28px] sm:leading-[33.6px]">
            {" "}
            No More
          </span>
        </h1>
        <p className="mt-[20px] justify-center text-center text-[24px] font-bold leading-[28px] sm:mt-[40px] sm:text-[34px] sm:leading-[40.1px]">
          Improve your pitch, speeches,
          <br className="hidden sm:inline" /> presentations, and video with the
          best
          <br className="hidden sm:inline" />
          writers, voices, and AI available.
        </p>
      </MotionTransition>

      <div className="mx-auto mb-[30px] mt-[30px] max-w-6xl space-y-[16px] sm:mb-[60px] sm:mt-[60px] sm:space-y-[32px]">
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sectionVariants = {
    hidden: {
      opacity: 0,
      x: imagePosition === "left" ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`${poppins.className} mx-auto flex h-auto w-full flex-col sm:w-[862px] ${
        imagePosition === "left"
          ? "sm:ml-20 sm:flex-row-reverse"
          : "sm:mr-20 sm:flex-row"
      } items-center justify-between gap-6 rounded-2xl border border-blue-500 bg-white p-4 shadow-lg sm:gap-12 sm:p-6`}
      initial="hidden"
      animate={isInView && !isMobile ? "visible" : "hidden"}
      variants={sectionVariants}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div
        className={`flex-1 space-y-3 sm:space-y-6 sm:pl-[69px] ${
          imagePosition === "left" ? "sm:ml-16" : "sm:mr-16"
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-6">
          <span className="bg-cp-secondary flex h-8 w-8 items-center justify-center rounded-full font-bold text-white sm:h-10 sm:w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-3 w-3 sm:h-4 sm:w-4"
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
          <h2 className="text-cp-primary text-[24px] font-bold leading-[28px] sm:text-[34px] sm:leading-[41px]">
            {title}
          </h2>
        </div>
        <p className="text-cp-primary text-[16px] font-normal leading-[22px] sm:text-[20px] sm:leading-[28px]">
          {description}
        </p>
      </div>

      <div className="flex h-[200px] w-[200px] items-center justify-center rounded-lg bg-white p-2 sm:h-[250px] sm:w-[250px]">
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

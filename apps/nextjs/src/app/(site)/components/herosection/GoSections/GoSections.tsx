"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

import { poppins } from "~/app/fonts";
// Images
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
      <MotionTransition className="mt-[24px]">
        <div className="mx-auto flex h-[78px] w-[312px] items-center justify-center">
          <h1 className="text-cp-secondary-lightest text-center text-[22px] leading-[26px]">
            <div className="flex h-[78px] w-[312px] items-center justify-center">
              <h1 className="text-cp-secondary-lightest text-center text-[22px] leading-[26px]">
                It used to take weeks to deliver content that built <br />
                <br className="hidden sm:inline" />
                an audience.
                <span className="text-[22px] font-bold leading-[26px] ">
                  {" "}
                  No More
                </span>
              </h1>
            </div>{" "}
          </h1>
        </div>
        <div className="items center mx-auto h-[186px] w-[312px] justify-center">
          <p className="mt-[20px] justify-center text-center text-[26px] font-bold leading-[31px] ">
            Improve your pitch, <br /> speeches,
            <br /> presentations, and <br /> video with the best
            <br />
            writers, voices, and AI <br />
            available.
          </p>
        </div>
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
          title="Image Creation"
          description="Get your pitch, storyboard or presentation in shape by 'painting a picture' of your vision. Create your amazing images now!"
          imageUrl={Imagesimg}
          imagePosition="left"
        />
        <Section
          title="Masterclasses"
          description="After Production, and Using AI to build marketing assets are courses that can move you from beginner to 'expert' level storyteller."
          imageUrl={MasterClassesImg}
          imagePosition="right"
        />
      </div>
    </div>
  );
}

function Section({ title, description, imageUrl, imagePosition }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.01 });
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      controls.start("visible"); // Always visible on mobile
    } else if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, isMobile, controls]);

  const sectionVariants = {
    hidden: {
      opacity: 0,
      x: imagePosition === "left" ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`${poppins.className} mx-auto flex h-[597px] w-[312px] flex-col items-center justify-between gap-6 rounded-2xl border border-blue-500 bg-white p-4 shadow-lg lg:w-[862px] lg:gap-12 lg:p-6 ${
        imagePosition === "left"
          ? "lg:ml-20 lg:flex-row-reverse"
          : "lg:mr-20 lg:flex-row"
      }`}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      <div className="mt-[70px] flex h-[312px] w-[309px] items-center justify-center rounded-lg  bg-white lg:h-[250px] lg:w-[250px]">
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
      <div
        className={`flex-1 space-y-3 lg:space-y-6 ${
          imagePosition === "left" ? "lg:ml-16" : "lg:mr-16"
        }`}
      >
        <div className="flex items-center gap-3 lg:gap-6">
          <span className="bg-cp-secondary flex h-8 w-8 items-center justify-center rounded-full font-bold text-white lg:h-10 lg:w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-3 w-3 lg:h-4 lg:w-4"
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
          <h2 className="text-cp-primary text-[24px] font-bold leading-[28px] lg:text-[34px] lg:leading-[41px]">
            {title}
          </h2>
        </div>
        <p className="text-cp-primary text-[16px] font-normal leading-[22px] lg:text-[20px] lg:leading-[28px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

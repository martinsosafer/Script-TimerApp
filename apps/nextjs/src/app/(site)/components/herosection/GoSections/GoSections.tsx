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
      <MotionTransition className="mt-[24px] lg:mt-[60px] ">
        <div className="flex h-[78px] w-[312px] items-center justify-center  lg:w-[695px] ">
          <div className="flex h-[78px] w-[312px] items-center justify-center lg:w-full">
            <h2 className="text-cp-secondary-lightest text-center text-[22px] leading-[26px] lg:text-[28px] lg:leading-[34px]">
              It used to take weeks to deliver content that built{" "}
              <br className="lg:hidden" />
              <br className="hidden sm:inline lg:hidden" />
              an audience.
              <span className="text-[22px] font-bold leading-[26px]">
                {" "}
                No More
              </span>
            </h2>
          </div>
        </div>
        <div className="items center mx-auto h-[186px] w-[312px] justify-center lg:mx-0 lg:h-[123px] lg:w-full lg:justify-center">
          <p className="mt-[20px] justify-center text-center text-[26px] font-bold leading-[31px] lg:w-full lg:text-center lg:text-[34px] lg:leading-[41px]  ">
            Improve your pitch, <br className="lg:hidden" /> speeches,
            <br /> presentations, and <br className="lg:hidden" /> video with
            the best
            <br />
            writers, voices, and AI <br className="lg:hidden" />
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
          imagePosition="right"
        />
        <Section
          title="Masterclasses"
          description="After Production, and Using AI to build marketing assets are courses that can move you from beginner to 'expert' level storyteller."
          imageUrl={MasterClassesImg}
          imagePosition="left"
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
      className={`${poppins.className} mx-auto flex h-[597px] w-[312px] flex-col items-center justify-between gap-6 rounded-2xl border border-blue-500 bg-white p-4 shadow-lg lg:flex lg:h-[340px] lg:w-[862px] lg:flex-row lg:items-center lg:gap-12  ${
        imagePosition === "left"
          ? "lg:ml-50 lg:flex-row-reverse"
          : "lg:mr-20 lg:flex-row"
      }`}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      <div className="mt-[70px] flex h-[312px] w-[309px] items-center justify-center rounded-lg  bg-white lg:mt-[10px] lg:h-[250px] lg:w-[250px] lg:items-center  lg:justify-center">
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
          <span className="bg-cp-secondary flex h-8 w-8 items-center justify-center rounded-full lg:h-10 lg:w-10">
            <svg
              className="h-3 w-3 lg:h-4 lg:w-4"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.51118 0.684412L13.7495 0.684414C13.8552 0.684355 13.9599 0.705132 14.0575 0.745559C14.1552 0.785985 14.244 0.845268 14.3187 0.920017C14.3935 0.994765 14.4527 1.08351 14.4932 1.18119C14.5336 1.27886 14.5544 1.38355 14.5543 1.48926L14.5543 11.7275C14.5543 11.941 14.4695 12.1457 14.3186 12.2967C14.1676 12.4476 13.9629 12.5324 13.7495 12.5324C13.536 12.5324 13.3313 12.4476 13.1804 12.2967C13.0294 12.1457 12.9446 11.941 12.9446 11.7275L12.9453 3.43098L1.8048 14.5715C1.65395 14.7224 1.44935 14.8071 1.23601 14.8071C1.02267 14.8071 0.818068 14.7224 0.667215 14.5715C0.516361 14.4207 0.431612 14.2161 0.431612 14.0027C0.431612 13.7894 0.516361 13.5848 0.667214 13.4339L11.8077 2.29339L3.51118 2.2941C3.29772 2.2941 3.09301 2.2093 2.94207 2.05837C2.79113 1.90743 2.70634 1.70271 2.70634 1.48926C2.70634 1.2758 2.79113 1.07108 2.94207 0.920145C3.09301 0.769208 3.29772 0.684411 3.51118 0.684412Z"
                fill="white"
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

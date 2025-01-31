import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@voiceai/ui";

import CourseHeroImg from "../../../../../../public/CoursesHeroImg.png";

function CoursesHeroBlock() {
  return (
    <div className="h-[808px] w-full font-poppins lg:h-[513px] lg:w-full">
      <div className="relative h-[785px] bg-gradient-to-br from-[#0066FF] to-[#000000] lg:h-[513px]">
        <div className="container mx-auto px-4">
          {/* Main content container */}
          <div className="mx-[24px]  mb-[20px] grid grid-cols-1 items-center  justify-center  gap-5 pt-[32px] lg:mx-auto lg:mb-[60px] lg:h-[254px] lg:w-[944px] lg:grid-cols-2 lg:gap-10 lg:pt-16">
            {/* Left column - Text content */}
            <div className=" items-end justify-center">
              <h1 className="text-cp-accent mb-3 text-[32px] font-bold  leading-[38.4px] lg:mb-5  lg:text-[58px] lg:leading-[68.6px] ">
                Masterclasses
              </h1>
              <p className="mb-[24px] text-[18px] font-bold leading-[25.2px]  text-white/90 lg:mb-14 lg:text-[20px] lg:leading-[28px]">
                The best stories and structure connect you emotionally and
                <br className="lg:hidden " />
                inspire your audience.
              </p>
              <Button className="bg-cp-secondary h-[48px] w-[312px] text-center   font-semibold text-white hover:bg-[#FF8A00]/90 lg:w-[452px] lg:px-8 lg:py-6 lg:text-[16px] lg:leading-[22.4px] ">
                <Link target="_blank" href="/plans">
                  Buy now
                </Link>
              </Button>
            </div>

            {/* Right column - Video */}
            <div className="relative aspect-video h-[175px] w-[312px] lg:h-[254px] lg:w-[452px]">
              <iframe
                className="absolute inset-0 h-full w-full rounded-lg shadow-xl"
                src="https://player.vimeo.com/video/462792560"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Bottom illustration section */}
          <div className="mx-[34px] lg:items-center lg:text-center">
            <div className="inline-flex h-[364px] w-[292px] items-center rounded-md border bg-white shadow-xl backdrop-blur-sm lg:mt-[60px] lg:h-[169px] lg:w-[860px] lg:gap-4 lg:px-6 lg:py-3">
              <div className="flex flex-col-reverse items-center lg:flex-row lg:items-center lg:gap-12 ">
                <div className="relative h-[201px] w-[201px] flex-shrink-0">
                  <Image
                    className="h-full w-full object-contain"
                    src={CourseHeroImg}
                    alt="Course Video"
                  />
                </div>
                <div className="mt-[24px] flex flex-col gap-6 px-[24px] text-left lg:gap-4 ">
                  <p className="text-cp-primary text-left text-[12px] font-normal leading-[16.8px]   lg:text-[14px] lg:leading-[19.6px]">
                    Join 75,000 people who have transformed their careers by
                    presenting their best on audience, when interviewing,
                    closing 10k podcasts, and videos.
                  </p>
                  <p className="text-cp-primary text-left text-[12px]  font-normal leading-[16.8px] lg:text-[14px] lg:leading-[19.6px]">
                    Learn the specific story frameworks inside great stories and
                    transform your career like those who have created over
                    $100,000,000 in new revenue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesHeroBlock;

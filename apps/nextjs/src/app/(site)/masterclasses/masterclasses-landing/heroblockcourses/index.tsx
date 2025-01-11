import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@voiceai/ui";

import CourseHeroImg from "../../../../../../public/CoursesHeroImg.png";

function CoursesHeroBlock() {
  return (
    <div className="h-[513px] w-full font-poppins">
      <div className="relative h-[513px] bg-gradient-to-br from-[#0066FF] to-[#000000]">
        <div className="container mx-auto px-4">
          {/* Main content container */}
          <div className="mx-auto grid h-[254px] w-[944px] grid-cols-1 items-center justify-center gap-8 pt-16 lg:mb-[60px] lg:grid-cols-2 lg:gap-10">
            {/* Left column - Text content */}
            <div className=" items-end justify-center">
              <h1 className="text-cp-accent mb-5 font-bold  leading-[68.6px] lg:text-[58px] ">
                Masterclasses
              </h1>
              <p className="mb-14  font-bold leading-[28px] text-white/90 lg:text-[20px]">
                The best stories and structure connect you emotionally and
                inspire your audience.
              </p>
              <Button className="bg-cp-secondary w-[452px]  px-8 py-6 text-center text-[16px] font-semibold leading-[22.4px] text-white hover:bg-[#FF8A00]/90 ">
                <Link target="_blank" href="/plans">
                  Buy now
                </Link>
              </Button>
            </div>

            {/* Right column - Video */}
            <div className="relative aspect-video h-[254px] w-[452px]">
              <iframe
                className="absolute inset-0 h-full w-full rounded-lg shadow-xl"
                src="https://player.vimeo.com/video/462792560"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Bottom illustration section */}
          <div className="items-center text-center">
            <div className="inline-flex items-center gap-4 rounded-md border bg-white px-6 py-3 shadow-xl backdrop-blur-sm lg:mt-[60px] lg:h-[169px] lg:w-[860px]">
              <div className="flex flex-col items-center gap-12 sm:flex-row sm:items-center">
                <div className="relative h-[201px] w-[201px] flex-shrink-0">
                  <Image
                    className="h-full w-full object-contain"
                    src={CourseHeroImg}
                    alt="Course Video"
                  />
                </div>
                <div className="flex flex-col gap-4 text-left">
                  <p className="text-cp-primary text-left font-normal lg:text-[14px] lg:leading-[19.6px]">
                    Join 75,000 people who have transformed their careers by
                    presenting their best on audience, when interviewing,
                    closing 10k podcasts, and videos.
                  </p>
                  <p className="text-cp-primary text-left font-normal lg:text-[14px] lg:leading-[19.6px]">
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

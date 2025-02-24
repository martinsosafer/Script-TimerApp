import React from "react";
import Link from "next/link";

interface CourseInfo {
  id: number;
  title: string;
  text: string;
  modules: number;
  learning: string;
  percent: string;
  reviews: number;
}

interface DynamicCourseProps {
  courseInfo: CourseInfo;
}

export default function DynamicCourse({ courseInfo }: DynamicCourseProps) {
  return (
    <div className="w-full font-poppins lg:mb-[106px] lg:h-[513px]">
      <div className="relative  h-[878px] bg-gradient-to-br from-[#0066FF] to-[#000000] lg:h-[513px]">
        <div className="lg:flex-col-2 mx-6 w-[360px]  flex-row items-center pt-6 lg:mx-auto lg:flex lg:items-center lg:justify-center lg:gap-x-[41px]">
          {/* currentcoursecard */}
          <div className="flex  h-[370px] w-[312px] flex-col items-center rounded-lg bg-white shadow-lg lg:mt-[60px] lg:h-[526px] lg:w-[410px] lg:px-[24px] lg:py-[24px]">
            <div className="relative mx-[24px] mt-6 h-[152px] w-[300px] lg:h-[227px] lg:w-[362px]">
              <iframe
                className="inset-0 h-full w-full rounded-lg shadow-xl"
                src="https://player.vimeo.com/video/462792560"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-5 h-[102px] w-[280px] lg:mt-[24px] lg:h-[150px] lg:w-[360px] ">
              <h3 className="text-cp-primary text-[28px] font-bold leading-[33.6px] lg:text-[42px] lg:leading-[51px]">
                {courseInfo.title}
              </h3>
            </div>
            <div className="mt-4 h-[48px] w-[280px] lg:mt-[28px] lg:h-[48px] lg:w-[362px]">
              <Link href="/plans" target="_blank">
                <button className="text-cente bg-cp-secondary h-full w-full items-center justify-center rounded-lg text-[16px] font-semibold leading-[22px] text-white">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
          {/* Second col */}
          <div className="mt-6 flex flex-col items-end justify-end lg:mt-[60px] lg:h-[526px] lg:w-[492px] ">
            <div className="mb-[48px] ">
              {courseInfo.text.split("\n").map(
                (paragraph, index) =>
                  paragraph.trim() !== "" && (
                    <p
                      key={index}
                      className="mt-4 text-[20px] font-normal leading-[28px] text-white first:mt-0"
                    >
                      {paragraph}
                    </p>
                  ),
              )}
            </div>
            <div className="flex flex-row gap-x-[18px]">
              <div className="flex h-[101px] w-[98px] flex-col items-center justify-center rounded-lg bg-white shadow-lg lg:h-[128px] lg:w-[152px]">
                <h4 className="text-cp-secondary  text-[18px] font-bold leading-[25px] lg:text-[28px] lg:leading-[34px]">
                  {courseInfo.modules}
                </h4>
                <span className="text-[12px] font-bold leading-[17px] text-gray-500 lg:text-[16px] lg:leading-[23px]">
                  Modules
                </span>
              </div>
              <div className="flex h-[101px]  w-[98px] flex-col items-center justify-center rounded-lg bg-white shadow-lg lg:h-[128px] lg:w-[152px]">
                <h4 className="text-cp-secondary  text-[18px] font-bold leading-[25px] lg:text-[28px] lg:leading-[34px]">
                  {courseInfo.learning}
                </h4>
                <span className="text-[12px] font-bold leading-[17px] text-gray-500 lg:text-[16px] lg:leading-[23px]">
                  Learning
                </span>
              </div>
              <div className="flex h-[101px] w-[98px] flex-col  items-center justify-center rounded-lg bg-white shadow-lg lg:h-[128px] lg:w-[152px]">
                <h4 className="text-cp-secondary  text-[18px] font-bold leading-[25px] lg:text-[28px] lg:leading-[34px]">
                  {courseInfo.percent}
                </h4>
                <span className="text-[12px] font-bold font-bold leading-[17px] text-gray-500 lg:text-[16px] lg:leading-[23px]">
                  Like this course
                </span>
                <span className="text-[12px] font-normal leading-[17px] text-gray-500 lg:text-[12px] lg:leading-[16px]">
                  ({courseInfo.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

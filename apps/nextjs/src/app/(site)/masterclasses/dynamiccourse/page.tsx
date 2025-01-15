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
    <div className="h-[513px] w-full font-poppins">
      <div className="relative h-[513px] bg-gradient-to-br from-[#0066FF] to-[#000000]">
        <div className="flex-col-2 mx-auto flex items-center justify-center gap-x-[41px]">
          {/* currentcoursecard */}
          <div className="mt-[60px] h-[526px] w-[410px] items-center rounded-lg bg-white px-[24px] py-[24px] shadow-lg">
            <div className="relative aspect-video h-[227px] w-[362px]">
              <iframe
                className="absolute inset-0 h-full w-full rounded-lg shadow-xl"
                src="https://player.vimeo.com/video/462792560"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-[24px] h-[150px] w-[360px] ">
              <h3 className="text-cp-primary text-[42px] font-bold leading-[51px]">
                {courseInfo.title}
              </h3>
            </div>
            <div className="mt-[28px] h-[48px] w-[362px]">
              <Link href="/plans" target="_blank">
                <button className="text-cente bg-cp-secondary h-full w-full items-center justify-center rounded-lg text-[16px] font-semibold leading-[22px] text-white">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
          {/* Second col */}
          <div className="mt-[60px] flex h-[526px] w-[492px] flex-col items-end justify-end ">
            <div className="mb-[48px] ">
              <h3 className="items text-white">{courseInfo.text}</h3>
            </div>
            <div className="flex flex-row gap-x-[18px]">
              <div className="flex h-[128px] w-[152px] flex-col items-center justify-center rounded-lg bg-white shadow-lg">
                <h4 className="text-cp-secondary text-[28px] font-bold leading-[34px]">
                  {courseInfo.modules}
                </h4>
                <span className="text-[16px] font-bold leading-[23px] text-gray-500">
                  Modules
                </span>
              </div>
              <div className="flex h-[128px] w-[152px] flex-col items-center justify-center rounded-lg bg-white shadow-lg">
                <h4 className="text-cp-secondary text-[28px] font-bold leading-[34px]">
                  {courseInfo.learning}
                </h4>
                <span className="text-[16px] font-bold leading-[23px] text-gray-500">
                  Learning
                </span>
              </div>
              <div className="flex h-[128px] w-[152px] flex-col items-center justify-center rounded-lg bg-white shadow-lg">
                <h4 className="text-cp-secondary text-[28px] font-bold leading-[34px]">
                  {courseInfo.percent}
                </h4>
                <span className="text-[16px] font-bold leading-[23px] text-gray-500">
                  Like this course
                </span>
                <span className="text-[12px] font-normal leading-[16px] text-gray-500">
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

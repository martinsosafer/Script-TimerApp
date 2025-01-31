"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const OtherCoursesBanner = () => {
  const params = useParams();
  const currentCourseId = parseInt(params?.id as string, 10);

  const courses = [
    { id: 1, title: "Stories That Transform Marketing" },
    { id: 2, title: "How to create stunning videos" },
    { id: 3, title: "Present and win your audience" },
    { id: 4, title: "Create with Hollywood movie storylines" },
    { id: 5, title: "How to build rapport with your audience" },
  ];

  const otherCourses = courses.filter(
    (course) => course.id !== currentCourseId,
  );
  const coursesToShow = otherCourses.slice(0, 4);

  return (
    <div className="bg-cp-accent flex min-h-[300px] w-full flex-col items-center px-4 lg:h-[245px]">
      <h3 className="text-cp-primary mt-6 text-center text-xl font-bold leading-tight lg:mt-[40px] lg:text-[24px] lg:leading-[34px]">
        Increase revenue and save time with these courses
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2 lg:mt-[24px] lg:grid-cols-4 lg:gap-[60px] lg:pb-0">
        {coursesToShow.map((course) => (
          <Link
            key={course.id}
            href={`/masterclasses/${course.id}/1`}
            target="_blank"
          >
            <div className="bg-cp-primary flex h-[107px] w-full items-center justify-center rounded-lg p-4 lg:w-[176px]">
              <h4 className="text-cp-secondary-lightest text-center text-sm font-bold leading-snug lg:text-[16px] lg:leading-[22px]">
                {course.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherCoursesBanner;

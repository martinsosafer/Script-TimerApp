"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const OtherCoursesBanner = () => {
  const params = useParams();
  const currentCourseId = parseInt(params?.id as string, 10);

  const courses = [
    {
      id: 1,
      title: "Stories That Transform Marketing",
    },
    {
      id: 2,
      title: "How to create stunning videos",
    },
    {
      id: 3,
      title: "Present and win your audience",
    },
    {
      id: 4,
      title: "Create with Hollywood movie storylines",
    },
    {
      id: 5,
      title: "How to build rapport with your audience",
    },
  ];

  const otherCourses = courses.filter(
    (course) => course.id !== currentCourseId,
  );
  const coursesToShow = otherCourses.slice(0, 4); // Only show 3 courses

  return (
    <div className="bg-cp-accent flex h-[245px] w-full flex-col items-center">
      <h3 className="text-cp-primary mt-[40px] text-center text-[24px] font-bold leading-[34px]">
        Increase revenue and save time with these courses
      </h3>

      <div className="mt-[24px] flex gap-x-[60px]">
        {coursesToShow.map((course) => (
          <Link
            key={course.id}
            href={`/masterclasses/${course.id}/1`}
            target="_blank"
          >
            <div className="bg-cp-primary flex h-[107px] w-[176px] items-center justify-center rounded-lg">
              <h4 className="text-cp-secondary-lightest text-center text-[16px] font-bold leading-[22px]">
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

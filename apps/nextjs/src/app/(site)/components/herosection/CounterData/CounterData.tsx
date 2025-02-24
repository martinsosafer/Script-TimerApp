"use client";

import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

import MotionTransition from "../MotionTransition/MotionTransition";
import { counterNumbers } from "./counterNumbers";

export default function CounterData() {
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px", // Increase margin to trigger earlier
      threshold: 0.1, // Trigger with less visibility
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, options);

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F5F5F7]">
      <MotionTransition className=" w-full  py-3 ">
        {/* Add gap-x-6 for spacing between columns */}
        <div className="flex h-[218px] w-[312px] flex-col gap-4 rounded-2xl bg-white  py-3 shadow-md transition-shadow hover:shadow-lg lg:h-[128px]   lg:w-[944px] lg:flex-row lg:items-center lg:justify-center lg:gap-x-[124px]">
          {counterNumbers.map(({ id, startNumber, endNumber, text }) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center rounded-lg text-center font-poppins text-[22px] font-bold leading-[27px] text-black lg:mb-1  lg:text-[28px] lg:leading-[32px]"
              ref={counterRef}
            >
              {isVisible && (
                <>
                  <CountUp
                    start={startNumber}
                    end={endNumber}
                    duration={4}
                    enableScrollSpy
                  />
                  <span className="text-cp-secondary text-[20px] font-bold leading-[28px] lg:text-[24px] lg:leading-[32px] ">
                    {text}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </MotionTransition>
    </div>
  );
}

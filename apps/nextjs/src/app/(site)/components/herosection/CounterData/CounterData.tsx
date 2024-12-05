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
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin
      threshold: 0.5, // 50% visibility needed to trigger
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
      <MotionTransition className="w-full max-w-3xl px-4 py-5 lg:px-0 lg:py-10">
        {/* Add gap-x-6 for spacing between columns */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg lg:flex-row lg:gap-x-28 lg:p-7">
          {counterNumbers.map(({ id, startNumber, endNumber, text }) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center rounded-lg text-center font-poppins text-xl font-bold text-black lg:text-2xl"
            >
              {isVisible && (
                <>
                  <CountUp
                    start={startNumber}
                    end={endNumber}
                    duration={4}
                    enableScrollSpy
                  />
                  <span className="mt-2 text-base font-bold text-tertiary lg:text-lg">
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

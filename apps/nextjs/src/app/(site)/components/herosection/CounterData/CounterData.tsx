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
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
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
    <div className="w-full bg-[#F5F5F7]">
      <MotionTransition className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg sm:grid-cols-2 lg:grid-cols-4">
          {counterNumbers.map(({ id, startNumber, endNumber, text }) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center rounded-lg px-4 py-6 text-center font-poppins"
              ref={counterRef}
            >
              {isVisible && (
                <>
                  <CountUp
                    start={startNumber}
                    end={endNumber}
                    duration={4}
                    enableScrollSpy
                    className="text-2xl font-bold text-black sm:text-3xl md:text-4xl"
                  />
                  <span className="mt-2 text-sm font-bold text-tertiary sm:text-base md:text-lg">
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

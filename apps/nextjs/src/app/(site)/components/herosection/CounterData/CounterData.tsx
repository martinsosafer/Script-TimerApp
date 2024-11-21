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
      root: null, // use the viewport as the root
      rootMargin: "0px", // no margin
      threshold: 0.5, // 50% visibility needed to trigger
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // stop observing once visible
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
    <MotionTransition className="mx-auto max-w-5xl bg-[#F5F5F7]  py-20">
      <div className=" justify-between  rounded-2xl border-none shadow-md   transition-shadow hover:shadow-lg md:flex">
        {counterNumbers.map(({ id, startNumber, endNumber, text }) => (
          <div
            key={id}
            className="flex  flex-col  rounded-lg px-7 py-7  text-center font-poppins text-2xl font-bold  text-black md:text-left"
            ref={counterRef}
          >
            {isVisible && ( // Render count-up only when visible
              <>
                <CountUp
                  start={startNumber}
                  end={endNumber}
                  duration={4}
                  enableScrollSpy
                />{" "}
                <span className="   text-lg font-bold text-tertiary">
                  {text}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </MotionTransition>
  );
}

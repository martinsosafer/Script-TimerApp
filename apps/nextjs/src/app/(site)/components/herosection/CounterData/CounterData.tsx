"use client";

import React from "react";
import CountUp from "react-countup";

import MotionTransition from "../MotionTransition/MotionTransition";
import { counterNumbers } from "./counterNumbers";

export function CounterData() {
  return (
    <MotionTransition className="mx-auto max-w-5xl">
      <div className="justify-between md:flex">
        {counterNumbers.map(({ id, startNumber, endNumber, text }) => (
          <div
            key={id}
            className="py-5 text-center font-poppins text-2xl font-bold md:text-left"
          >
            +
            <CountUp
              start={startNumber}
              end={endNumber}
              duration={1.5}
              enableScrollSpy
            />{" "}
            <span className=" font-bold text-blue-700">{text}</span>
          </div>
        ))}
      </div>
    </MotionTransition>
  );
}

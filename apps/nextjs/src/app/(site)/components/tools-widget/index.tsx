"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import Image from "next/image";

import { poppins } from "~/app/fonts";
import AutoCapitalize from "./autocapitalize";
import GradeLevel from "./grade-level";
import ScriptTimer from "./script-timer";
import ToolsNavigator from "./tools-navigator";
import WordsCounter from "./word-counter";
import WordsSorter from "./word-sorter";

export default function ToolsWidget() {
  const [selectedTool, setSelectedTool] = useState("script-timer");

  const tools: Record<string, ReactElement> = {
    "script-timer": <ScriptTimer />,
    "word-counter": <WordsCounter />,
    autocapitalize: <AutoCapitalize />,
    "word-sorter": <WordsSorter />,
    "grade-level": <GradeLevel />,
  };

  return (
    <section className="from-cp-primary flex w-full flex-col items-center bg-gradient-to-t to-white pb-10">
      <div className="flex w-full items-center justify-center gap-[125px] py-3">
        <div className={`${poppins.className} w-[454px]`}>
          <h5 className="text-2xl">Easy to use</h5>
          <h2 className="text-cp-primary mt-1 text-[58px] font-bold">
            Free Tools
          </h2>
          <h3 className="text-cp-primary mt-3 text-xl font-bold">
            To help you manage your writing projects more efficiently
          </h3>
          <p className="mt-8 text-xl">
            Perfect for writers, students and professionals
          </p>
        </div>
        <div className="relative h-[365px] w-[365px]">
          <Image src="/lp-tools.png" alt="Tools widget" fill />
        </div>
      </div>
      <div className="bg-cp-background flex w-[1024px] flex-col items-center rounded-2xl py-8 ">
        <ToolsNavigator
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
        {tools[selectedTool]}
      </div>
    </section>
  );
}

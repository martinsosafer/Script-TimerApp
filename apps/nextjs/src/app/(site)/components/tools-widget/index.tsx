"use client";

import { useState } from "react";
import type { ReactElement } from "react";

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
    <section
      className="from-cp-primary flex w-full justify-center bg-gradient-to-t
to-white p-10"
    >
      <div className="bg-cp-background flex w-[1024px] flex-col items-center rounded-2xl">
        <ToolsNavigator
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
        {tools[selectedTool]}
      </div>
    </section>
  );
}

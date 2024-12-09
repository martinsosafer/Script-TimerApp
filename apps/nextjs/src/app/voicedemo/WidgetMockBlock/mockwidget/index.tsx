"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@voiceai/ui";
import {
  IconArrowRight,
  IconChevronLeft,
} from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";
import CloneMock from "./Clonemock";
import ImageGenerationMock from "./ImabeMock";
import {
  audioSamples,
  languages,
  tasks,
  taskTexts,
  voices,
} from "./mockupdata/mockup";
import PlagiarismCheckMock from "./PlagiarismMock";
import ScriptAiMock from "./ScriptAiMock";
import TTSMock from "./TTSmock";

export default function VoiceGeneratorMockup() {
  const [activeTab, setActiveTab] = useState("Voice Over");
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [text, setText] = useState(taskTexts[selectedTask]);

  const handlePlay = () => {
    const audioUrl =
      audioSamples[selectedTask]?.[selectedVoice]?.[selectedLanguage.code];
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      console.error("Audio sample not found for the selected combination");
    }
  };

  const handleTaskChange = (task: string) => {
    setSelectedTask(task);
    setText(taskTexts[task]);
  };

  const tabs = [
    "Voice Over",
    "Clone a Voice",
    "Write a Script",
    "Create Images",
    "Check for Plagiarism",
  ];

  return (
    <div
      className={`mx-auto flex ${activeTab === "Check for Plagiarism" ? "h-[926px]" : "h-[640px]"} w-[944px] flex-col items-center rounded-lg bg-[#F5F5F7] shadow-lg`}
    >
      <div className="h-[610px] w-[860px]">
        <div className="mb-3 w-[780px] border-b  ">
          <div className="mt-10 flex w-[800px] justify-center  space-x-10  ">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                className={`relative px-1 py-4 transition-colors
            ${
              activeTab === tab
                ? "text-cp-primary text-[16px] font-bold  leading-[22px]"
                : "text-[16px] font-normal leading-[22px] text-gray-600  hover:text-gray-900"
            }
          `}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    className="bg-cp-primary absolute bottom-0 left-0 right-0 h-0.5"
                    layoutId="activeTab"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <div>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-[20px]  mt-[35px] justify-start text-start">
                <h3
                  className={`text-cp-primary text-[24px]  font-bold leading-[34px] ${poppins.className}`}
                >
                  {activeTab}
                </h3>
              </div>
              {activeTab === "Voice Over" && (
                <TTSMock
                  text={text}
                  setText={setText}
                  languages={languages}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                  tasks={tasks}
                  selectedTask={selectedTask}
                  handleTaskChange={handleTaskChange}
                  voices={voices}
                  selectedVoice={selectedVoice}
                  setSelectedVoice={setSelectedVoice}
                  handlePlay={handlePlay}
                  maxLength={500}
                />
              )}

              {activeTab === "Clone a Voice" && <CloneMock />}

              {activeTab === "Write a Script" && <ScriptAiMock />}

              {activeTab === "Create Images" && <ImageGenerationMock />}

              {activeTab === "Check for Plagiarism" && <PlagiarismCheckMock />}
            </motion.div>
          </div>
        </AnimatePresence>
        <div
          className={`mt-${activeTab === "Create Images" ? "2" : "10"} w-full ${poppins.className}`}
        >
          <Link href="/register" className="w-full">
            <Button
              size="lg"
              className="h-[48px] w-full bg-[#FF8A00] text-base font-semibold text-white hover:bg-[#FF8A00]/90"
            >
              Open my Free Access! <IconArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { MobileTabDropdown } from "./mobiledropdown";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePlay = () => {
    stopAudio(); // Stop any currently playing audio
    const audioUrl =
      audioSamples[selectedTask]?.[selectedVoice]?.[selectedLanguage.code];
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      audioRef.current = audio;
    } else {
      console.error("Audio sample not found for the selected combination");
    }
  };

  const handleTaskChange = (task: string) => {
    setSelectedTask(task);
    setText(taskTexts[task]);
  };

  // Effect to stop audio when changing tabs
  useEffect(() => {
    stopAudio();
  }, [activeTab]);

  const tabs = [
    "Voice Over",
    "Clone a Voice",
    "Write a Script",
    "Create Images",
    "Check for Plagiarism",
  ];

  return (
    <div
      className={`mx-auto flex flex-col items-center rounded-lg bg-[#F5F5F7] shadow-lg
        ${activeTab === "Check for Plagiarism" ? "h-[1100px] lg:h-[926px]" : "h-[879px] lg:h-[640px]"}
        ${activeTab === "Create Images" ? "h-[930px] lg:h-[710px]" : ""}
         ${activeTab === "Clone a Voice" ? "h-[1110px] lg:h-[700px]" : ""}
          ${activeTab === "Write a Script" ? "h-[1030px] lg:h-[700px]" : ""}
        w-[312px] lg:w-[944px]`}
    >
      <div className="w-full px-4 lg:h-[610px] lg:w-[860px] lg:px-0">
        <div className="mb-3 w-full border-b lg:w-[780px]">
          <div className="mt-5 lg:mt-10 lg:w-[800px]">
            {/* Mobile Dropdown */}
            <div className="lg:hidden">
              <MobileTabDropdown
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* Desktop Tabs */}
            <div className="hidden justify-center space-x-10 lg:flex">
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  className={`relative px-1 py-4 text-base transition-colors
                    ${
                      activeTab === tab
                        ? "text-cp-primary font-bold"
                        : "font-normal text-gray-600 hover:text-gray-900"
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
              <div className="mb-4 mt-6 justify-start text-start lg:mb-[20px] lg:mt-[35px]">
                <h3
                  className={`text-cp-primary text-xl font-bold lg:text-[24px] lg:leading-[34px] ${poppins.className}`}
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
                  handleStop={stopAudio}
                  maxLength={500}
                />
              )}

              {activeTab === "Clone a Voice" && (
                <CloneMock activeTab={activeTab} />
              )}

              {activeTab === "Write a Script" && <ScriptAiMock />}

              {activeTab === "Create Images" && <ImageGenerationMock />}

              {activeTab === "Check for Plagiarism" && <PlagiarismCheckMock />}
            </motion.div>
          </div>
        </AnimatePresence>
        <div
          className={`mt-6 w-full pb-6 lg:mt-10 lg:pb-10 ${poppins.className}`}
        >
          <Link href="/register" className="w-full">
            <Button
              size="lg"
              className="h-[40px] w-full bg-[#FF8A00] text-sm font-semibold text-white hover:bg-[#FF8A00]/90 lg:h-[48px] lg:text-base"
            >
              Open my Free Access! <IconArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

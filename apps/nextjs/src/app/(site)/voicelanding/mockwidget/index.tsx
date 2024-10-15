"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Importing UI components
import { Button } from "@voiceai/ui";

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
  const [activeTab, setActiveTab] = useState("Text to speech");
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

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 flex space-x-4">
        {[
          "Text to speech",
          "Voice Cloning",
          "Script Ai",
          "Images",
          "Plagiarism/Ai Check",
        ].map((tab) => (
          <motion.button
            key={tab}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab}
          </motion.button>
        ))}
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
            {activeTab === "Text to speech" && (
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
                maxLength={500} // Optional: Can be omitted if default is fine
              />
            )}

            {activeTab === "Voice Cloning" && <CloneMock />}

            {activeTab === "Script Ai" && <ScriptAiMock />}

            {activeTab === "Images" && <ImageGenerationMock />}

            {activeTab === "Plagiarism/Ai Check" && <PlagiarismCheckMock />}
          </motion.div>
        </div>
      </AnimatePresence>

      <Button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700">
        Experience the full Co-Producer Experience
      </Button>
    </div>
  );
}

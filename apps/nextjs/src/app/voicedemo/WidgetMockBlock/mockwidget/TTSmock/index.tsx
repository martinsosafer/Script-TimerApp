import React from "react";
import { motion } from "framer-motion";

import {
  IconChevronUpDown as ChevronDown,
  IconPlay as Play,
  TalkIcon,
} from "@voiceai/ui/@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@voiceai/ui/@/components/ui/select";

import Button from "~/app/(site)/components/button";

// Adjust path as needed

const TTSMock = ({
  text,
  setText,
  languages,
  selectedLanguage,
  setSelectedLanguage,
  tasks,
  selectedTask,
  handleTaskChange,
  voices,
  selectedVoice,
  setSelectedVoice,
  handlePlay,
  maxLength = 500, // Default maxLength if not provided
}) => {
  return (
    <div style={{ minHeight: "250px" }}>
      <h3 className="text-[14px] font-normal leading-[19.6px]">
        Choose type of script
      </h3>
      <div className="mt-2 flex space-x-2">
        {tasks.map((task) => (
          <Button
            label={task}
            className={`border-cp-primary rounded-full border px-4 py-4 font-roboto text-sm font-normal ${
              selectedTask === task
                ? "bg-cp-primary text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleTaskChange(task)}
            type="custom"
            icon={TalkIcon}
            iconPosition="left"
            iconColor={`${selectedTask === task ? "#FFCB7F" : "#0066FF"}`}
          />
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mb-5 mt-3 h-[142px] w-[860px] rounded border border-gray-300 p-2"
        maxLength={maxLength}
      />
      <h4> Select the language and voice character and then play it!</h4>
      <div className="mb-4 mt-2 flex items-center space-x-4">
        <Select
          value={selectedLanguage.code}
          onValueChange={(value) =>
            setSelectedLanguage(
              languages.find((lang) => lang.code === value) || languages[0],
            )
          }
        >
          <SelectTrigger className="h-[49px] w-[239px] px-6">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedVoice} onValueChange={setSelectedVoice}>
          <SelectTrigger className="h-[49px] w-[239px] px-6">
            <SelectValue placeholder="Select voice" />
          </SelectTrigger>
          <SelectContent>
            {voices.map((voice) => (
              <SelectItem key={voice} value={voice}>
                {voice}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Button
            onClick={handlePlay}
            type="primary"
            icon={Play}
            iconPosition="right"
            label="Play"
            iconColor=""
          />
        </div>
      </div>
    </div>
  );
};

export default TTSMock;

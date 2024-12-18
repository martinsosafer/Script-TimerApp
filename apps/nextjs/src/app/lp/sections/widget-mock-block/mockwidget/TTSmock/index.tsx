import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  IconChevronUpDown as ChevronDown,
  IconPlay as Play,
  IconStop as Stop,
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
import { poppins, roboto } from "~/app/fonts";

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
  handleStop,
  maxLength = 500, // Default maxLength if not provided
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      handleStop();
      setIsPlaying(false);
    } else {
      handlePlay();
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ minHeight: "250px" }}>
      <h3 className="text-[14px] font-normal leading-[19.6px]">
        Choose type of script
      </h3>
      <div className="mt-2 flex flex-col items-center space-y-2 lg:flex-row lg:justify-start lg:space-x-2 lg:space-y-0">
        {tasks.map((task) => (
          <Button
            key={task}
            label={task}
            className={`border-cp-primary h-[56px] w-[238px]  rounded-full border px-4 py-4 ${roboto.className} text-sm font-normal ${
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
        className="mb-5 mt-3 h-[176px] w-[280px] rounded border border-gray-300 p-2 lg:h-[142px] lg:w-[860px]"
        maxLength={maxLength}
      />
      <h4> Select the language and voice character and then play it!</h4>
      <div className="mb-4 mt-2 items-center space-y-3 lg:flex lg:gap-0 lg:space-x-4 lg:space-y-0">
        <Select
          value={selectedLanguage.code}
          onValueChange={(value) =>
            setSelectedLanguage(
              languages.find((lang) => lang.code === value) || languages[0],
            )
          }
        >
          <SelectTrigger className="h-[48px] w-[280px] px-6 lg:h-[49px] lg:w-[239px]">
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
          <SelectTrigger className="h-[48px] w-[280px] px-6 lg:h-[49px] lg:w-[239px]">
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
        <div
          className={`bg-cp-primary flex h-[48px] w-full flex-col items-center justify-center lg:hidden ${poppins.className} rounded-md text-[16px] font-semibold  leading-[22px] text-white`}
        >
          <button
            className="flex items-center justify-center gap-2"
            onClick={togglePlayPause}
          >
            {isPlaying ? "Pause" : "Play"} {isPlaying ? <Stop /> : <Play />}
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-2">
          <Button
            onClick={togglePlayPause}
            type="primary"
            icon={isPlaying ? Stop : Play}
            iconPosition="right"
            label={isPlaying ? "Pause" : "Play"}
          />
        </div>
      </div>
    </div>
  );
};

export default TTSMock;

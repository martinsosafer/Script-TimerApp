import React from "react";
import { motion } from "framer-motion";

import { Button } from "@voiceai/ui"; // Adjust path as needed

import {
  IconChevronUpDown as ChevronDown,
  IconPlay as Play,
} from "@voiceai/ui/@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@voiceai/ui/@/components/ui/select";

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
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mb-4 h-32 w-full rounded border border-gray-300 p-2"
        maxLength={maxLength}
      />

      <div className="mb-4 flex items-center space-x-4">
        <Select
          value={selectedLanguage.code}
          onValueChange={(value) =>
            setSelectedLanguage(
              languages.find((lang) => lang.code === value) || languages[0],
            )
          }
        >
          <SelectTrigger className="w-[180px]">
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

        <div className="flex space-x-2">
          {tasks.map((task) => (
            <motion.button
              key={task}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                selectedTask === task
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleTaskChange(task)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {task}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <Select value={selectedVoice} onValueChange={setSelectedVoice}>
          <SelectTrigger className="w-[180px]">
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
          <span className="text-sm text-gray-500">
            {text.length}/{maxLength}
          </span>
          <Button onClick={handlePlay} size="icon">
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TTSMock;

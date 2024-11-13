import type { Dispatch, SetStateAction } from "react";

interface SelectorProps {
  isMagicPrompt: boolean;
  setIsMagicPrompt: Dispatch<SetStateAction<boolean>>;
}

export default function PromptSelector({
  isMagicPrompt,
  setIsMagicPrompt,
}: SelectorProps) {
  return (
    <div className="flex justify-center space-x-4">
      <div className="flex gap-2 rounded-full border-2 border-gray-500 p-2">
        <button
          className={`${
            isMagicPrompt
              ? "rounded-full bg-primary font-bold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
          onClick={() => setIsMagicPrompt(true)}
        >
          <span
            className={`${
              isMagicPrompt ? "translate-x-0" : "-translate-x-full"
            } absolute left-0 top-0 h-full w-full rounded-full transition-transform duration-300 ease-in-out`}
          ></span>
          <span className="relative z-10">Use Our Magic Prompt</span>
        </button>
        <button
          className={`${
            !isMagicPrompt
              ? "rounded-full bg-primary font-semibold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
          onClick={() => setIsMagicPrompt(false)}
        >
          <span
            className={`${
              !isMagicPrompt ? "translate-x-0" : "translate-x-full"
            } absolute left-0 top-0 h-full w-full rounded-full transition-transform duration-300 ease-in-out`}
          ></span>
          <span className="relative z-10">Use your Own Prompt</span>
        </button>
      </div>
    </div>
  );
}

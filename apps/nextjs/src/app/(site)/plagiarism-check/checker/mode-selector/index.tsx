import type { Dispatch, SetStateAction } from "react";

import type { PlagiarismPayload } from "~/app/api/webhook/plagiarism-result/[status]/[id]/route";
import type { CheckResult } from "../index";

interface SelectorProps {
  aiCheck: boolean;
  setAiCheck: Dispatch<SetStateAction<boolean>>;
  setAiCheckResult: Dispatch<SetStateAction<CheckResult | null>>;
  setPlagiarismCheck: Dispatch<SetStateAction<PlagiarismPayload | null>>;
}

export default function ModeSelector({
  aiCheck,
  setAiCheck,
  setAiCheckResult,
  setPlagiarismCheck,
}: SelectorProps) {
  return (
    <div className="mt-8 flex justify-center space-x-4">
      <div className="flex gap-2 rounded-full border-2 border-gray-500 p-2">
        <button
          className={`${
            aiCheck
              ? "rounded-full bg-primary font-bold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
          onClick={() => {
            setAiCheck(true);
            setAiCheckResult(null);
            setPlagiarismCheck(null);
          }}
        >
          <span
            className={`${
              aiCheck ? "translate-x-0" : "-translate-x-full"
            } absolute left-0 top-0 h-full w-full rounded-full transition-transform duration-300 ease-in-out`}
          ></span>
          <span className="relative z-10">Ai Scan</span>
        </button>
        <button
          className={`${
            !aiCheck
              ? "rounded-full bg-primary font-semibold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
          onClick={() => {
            setAiCheck(false);
            setAiCheckResult(null);
            setPlagiarismCheck(null);
          }}
        >
          <span
            className={`${
              !aiCheck ? "translate-x-0" : "translate-x-full"
            } absolute left-0 top-0 h-full w-full rounded-full transition-transform duration-300 ease-in-out`}
          ></span>
          <span className="relative z-10">Plagiarism Scan</span>
        </button>
      </div>
    </div>
  );
}

import Link from "next/link";

interface SelectorProps {
  aiCheck: boolean;
}

export default function ModeSelector({ aiCheck }: SelectorProps) {
  return (
    <div className="flex justify-center space-x-4">
      <div className="flex gap-2 rounded-full border-2 border-gray-500 p-2">
        <Link
          href="/ai-detector"
          className={`${
            aiCheck
              ? "rounded-full bg-primary font-bold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
        >
          <span
            className={`${
              aiCheck ? "translate-x-0" : "-translate-x-full"
            } absolute left-0 top-0 h-full w-full rounded-full transition-transform duration-300 ease-in-out`}
          ></span>
          <span className="relative z-10">Ai Scan</span>
        </Link>
        <Link
          href="/plagiarism-detector"
          className={`${
            !aiCheck
              ? "rounded-full bg-primary font-semibold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
        >
          <span
            className={`${
              !aiCheck ? "translate-x-0" : "translate-x-full"
            } absolute left-0 top-0 h-full w-full rounded-full transition-transform duration-300 ease-in-out`}
          ></span>
          <span className="relative z-10">Plagiarism Scan</span>
        </Link>
      </div>
    </div>
  );
}

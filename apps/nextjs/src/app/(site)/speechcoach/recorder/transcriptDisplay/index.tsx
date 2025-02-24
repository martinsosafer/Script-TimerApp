"use client";

import { motion } from "framer-motion";

interface TranscriptDisplayProps {
  isProcessingWhisper: boolean;
  completeTranscript: string;
  transcript: string;
  whisperTranscription: string | null;
}

export function TranscriptDisplay({
  isProcessingWhisper,
  completeTranscript,
  transcript,
  whisperTranscription,
}: TranscriptDisplayProps) {
  return (
    <div className="relative mt-4 h-full rounded-md border p-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isProcessingWhisper
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center rounded-md border-2 border-secondary-foreground bg-secondary p-4 text-secondary-foreground"
      >
        <div className="flex flex-col items-center space-y-2 text-center">
          <svg
            className="h-8 w-8 animate-spin text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="font-medium">Processing your audio...</p>
          <p className="text-sm opacity-80">This may take a few moments</p>
          <p className="text-warning text-sm font-bold">
            Please do not close this tab while your audio is being processed!
          </p>
        </div>
      </motion.div>

      <textarea
        className="h-40 w-full border bg-background p-2 transition-colors"
        value={whisperTranscription || completeTranscript + transcript}
        readOnly
        placeholder="Transcript will appear here..."
        style={{
          minHeight: "10rem",
        }}
      />
    </div>
  );
}

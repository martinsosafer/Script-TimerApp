import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  IconFileHeart,
  IconMic2,
  IconPause,
  IconPlay,
  IconStop,
  IconXCircle,
} from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";

interface RecordButtonProps {
  isRecording: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPauseResume: () => void;
  onStop: () => void;
}

export function RecordButton({
  isRecording,
  isPaused,
  onStart,
  onPauseResume,
  onStop,
}: RecordButtonProps) {
  const [showTeleprompter, setShowTeleprompter] = useState(false);
  const [teleprompterText, setTeleprompterText] = useState("");

  return (
    <div className="relative w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {!isRecording ? (
              <Button
                label="Start Recording"
                type="accent"
                onClick={onStart}
                icon={IconMic2}
                iconColor="#FFFFFF"
              />
            ) : (
              <>
                <Button
                  label={isPaused ? "Resume" : "Pause"}
                  type="secondary"
                  onClick={onPauseResume}
                  icon={isPaused ? IconPlay : IconPause}
                  iconColor="#FFFFFF"
                />
                <Button
                  label="Finish Recording"
                  type="danger"
                  onClick={onStop}
                  icon={IconStop}
                  iconColor="#FFFFFF"
                />
              </>
            )}
          </div>

          <Button
            label={
              showTeleprompter ? "Close Teleprompter" : "Open Teleprompter"
            }
            type="primary"
            onClick={() => setShowTeleprompter(!showTeleprompter)}
            icon={showTeleprompter ? IconXCircle : IconFileHeart}
            iconColor="#FFFF"
          />
        </div>

        <AnimatePresence>
          {showTeleprompter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <div className="w-full rounded-md border p-2">
                <motion.textarea
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="h-40 w-full resize-none rounded border p-2"
                  value={teleprompterText}
                  onChange={(e) => setTeleprompterText(e.target.value)}
                  placeholder="Enter your script here..."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default RecordButton;

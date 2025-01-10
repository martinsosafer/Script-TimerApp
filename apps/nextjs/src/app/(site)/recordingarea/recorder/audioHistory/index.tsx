import React, { useState } from "react";
import { motion } from "framer-motion";

import { IconMusic as Music } from "@voiceai/ui/@/components/ui/icons";
import { Separator } from "@voiceai/ui/@/components/ui/separator";

import Button from "~/app/(site)/components/button";

interface AudioRecording {
  url: string;
  filename: string;
  uploadedAt: string;
}

interface AudioHistoryProps {
  savedAudios: AudioRecording[];
  displayAudioCount: number;
  onLoadMore: () => void;
}

const AudioHistory: React.FC<AudioHistoryProps> = ({
  savedAudios = [],
  displayAudioCount,
  onLoadMore,
}) => {
  const displayedRecordings = savedAudios.slice(0, displayAudioCount);

  return (
    <div className="mt-[20px]">
      <Separator className="bg-cp-primary mb-8 h-1" />

      <h3 className="mb-4 text-lg font-semibold">Audio Recording History</h3>

      {savedAudios.length > 0 ? (
        <>
          <ul className="space-y-4">
            {displayedRecordings.map((recording, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center rounded-lg bg-gray-50 p-4"
              >
                {/* Audio Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200">
                  <Music className="h-8 w-8 text-gray-500" />
                </div>

                {/* Info */}
                <div className="ml-4 flex flex-1 flex-col justify-center">
                  <span className="font-medium">{recording.filename}</span>
                  <audio controls src={recording.url} className="mt-2 w-full" />
                </div>

                {/* Upload Date */}
                <div className="text-sm text-gray-500">
                  {new Date(recording.uploadedAt).toLocaleString()}
                </div>
              </motion.li>
            ))}
          </ul>

          {displayAudioCount < savedAudios.length && (
            <div className="mt-4 flex justify-center">
              <Button label="Load More" type="secondary" onClick={onLoadMore} />
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">No saved audio recordings yet.</p>
      )}
    </div>
  );
};

export default AudioHistory;

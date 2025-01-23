import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { IconXCircle as X } from "@voiceai/ui/@/components/ui/icons";
import { Separator } from "@voiceai/ui/@/components/ui/separator";

import Button from "~/app/(site)/components/button";
import AIFeedback from "./aiFeedback";

// New function to fetch KV database content

const VideoHistory = ({
  savedWebcam = [],
  displayVideoCount,
  onLoadMore,
  userId,
}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Sort the savedWebcam array by date and time
  const sortedRecordings = useMemo(() => {
    return [...savedWebcam].sort((a, b) => {
      const dateA = new Date(a.uploadedAt);
      const dateB = new Date(b.uploadedAt);
      return dateB - dateA; // Sort in descending order (newest first)
    });
  }, [savedWebcam]);

  const displayedRecordings = sortedRecordings.slice(0, displayVideoCount);

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="mt-[20px]">
      <Separator className="bg-cp-primary mb-8 h-1" />

      <h3 className="mb-4 text-lg font-semibold">Webcam Recording History</h3>

      {sortedRecordings.length > 0 ? (
        <>
          <ul className="space-y-4">
            {displayedRecordings.map((recording, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center rounded-lg bg-gray-50 p-4"
              >
                {/* Thumbnail */}
                <div
                  className="h-32 w-48 cursor-pointer overflow-hidden rounded-md"
                  onClick={() => setSelectedVideo(recording)}
                >
                  <video
                    src={recording.url}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="ml-4 flex flex-1 flex-col justify-center">
                  <span className="font-medium">{recording.filename}</span>
                </div>

                {/* Upload Date */}
                <div className="text-sm text-gray-500">
                  {new Date(recording.uploadedAt)
                    .toLocaleString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                    .replace(",", "")}
                </div>
              </motion.li>
            ))}
          </ul>

          {displayVideoCount < sortedRecordings.length && (
            <div className="mt-4 flex justify-center">
              <Button label="Load More" type="secondary" onClick={onLoadMore} />
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">No saved webcam recordings yet.</p>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-cp-primary relative w-3/5 max-w-xl overflow-hidden rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 z-10 text-white hover:text-gray-200"
                onClick={handleCloseModal}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="p-4">
                <video
                  controls
                  src={selectedVideo.url}
                  className="w-full rounded-md"
                />

                <div className="mt-2 font-medium text-white">
                  {selectedVideo.filename}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoHistory;

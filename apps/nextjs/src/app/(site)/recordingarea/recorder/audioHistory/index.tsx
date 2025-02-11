import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  IconMusic as Music,
  IconTrash as TrashIcon,
  IconXCircle as X,
} from "@voiceai/ui/@/components/ui/icons";
import { Separator } from "@voiceai/ui/@/components/ui/separator";

import Button from "~/app/(site)/components/button";
import AIFeedbackContent from "../../webcamrecorder/videoHistory/aiFeedback";

interface AudioRecording {
  url: string;
  filename: string;
  uploadedAt: string;
  aiContent?: { type: string; content: string }[];
}

interface AudioHistoryProps {
  savedAudios?: AudioRecording[];
  displayAudioCount: number;
  onLoadMore: () => void;
  userId: string | undefined;
}

const AudioHistory: React.FC<AudioHistoryProps> = ({
  savedAudios = [],
  displayAudioCount,
  onLoadMore,
  userId,
}) => {
  console.log("Audios", savedAudios);
  const [selectedAudio, setSelectedAudio] = useState<AudioRecording | null>(
    null,
  );
  const [expandedRecordings, setExpandedRecordings] = useState<
    Record<number, boolean>
  >({});
  const [loading, setLoading] = useState(false);
  const [localSavedAudios, setLocalSavedAudios] = useState(savedAudios);

  useEffect(() => {
    setLoading(true);
    setLocalSavedAudios(savedAudios);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [savedAudios]);

  const parseDate = (dateString: string): Date => {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("-");
    const [hour, minute] = timePart.split(":");
    return new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
      Number.parseInt(hour),
      Number.parseInt(minute),
    );
  };

  const sortedRecordings = useMemo(() => {
    return [...localSavedAudios].sort((a, b) => {
      const dateA = parseDate(a.uploadedAt);
      const dateB = parseDate(b.uploadedAt);
      return dateB.getTime() - dateA.getTime(); // Sort in descending order (newest first)
    });
  }, [localSavedAudios, parseDate]); // Added parseDate to dependencies

  const displayedRecordings = sortedRecordings.slice(0, displayAudioCount);

  const handleCloseModal = () => {
    setSelectedAudio(null);
  };

  const toggleAIFeedback = (index: number) => {
    setExpandedRecordings((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = parseDate(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return date
        .toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(",", "");
    } catch (error) {
      console.error("Error parsing date:", error);
      return dateString; // Fallback to original string if parsing fails
    }
  };

  if (loading) {
    return (
      <div className="mt-[20px] flex justify-center py-4">
        <div className="animate-pulse text-gray-500">
          Updating recordings...
        </div>
      </div>
    );
  }
  const handleDelete = async (urlToDelete: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recording?",
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/deletespeech", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlToDelete }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete recording");
      }

      // Optimistically update UI
      setLocalSavedAudios((prev) =>
        prev.filter((rec) => rec.url !== urlToDelete),
      );
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message || "Failed to delete recording.");
    }
  };
  return (
    <div className="mt-[20px]">
      <Separator className="bg-cp-primary mb-8 h-1" />

      <h3 className="mb-4 text-lg font-semibold">Audio Recording History</h3>

      {sortedRecordings.length > 0 ? (
        <>
          <ul className="space-y-4">
            {displayedRecordings.map((recording, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-gray-50 p-4"
              >
                <div className="flex items-center">
                  {/* Audio Icon */}
                  <div
                    className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-md bg-gray-200"
                    onClick={() => setSelectedAudio(recording)}
                  >
                    <Music className="h-8 w-8 text-gray-500" />
                  </div>

                  {/* Info */}
                  <div className="ml-4 flex flex-1 flex-col justify-center">
                    <span className="font-medium">{recording.filename}</span>
                    <audio
                      controls
                      src={recording.url}
                      className="mt-2 w-full"
                    />
                  </div>

                  {/* Upload Date */}
                  <div className="ml-4 flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {formatDate(recording.uploadedAt)}
                    </div>
                    <button
                      onClick={() => handleDelete(recording.url)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete recording"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* AI Feedback Toggle */}
                {recording.aiContent && recording.aiContent.length > 0 && (
                  <div className="mt-4">
                    <motion.button
                      onClick={() => toggleAIFeedback(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                    >
                      {expandedRecordings[index]
                        ? "Hide AI Feedback"
                        : "Show AI Feedback"}
                    </motion.button>

                    <AnimatePresence>
                      {expandedRecordings[index] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          {recording.aiContent.map((item, feedbackIndex) => {
                            const isEmpty =
                              (Array.isArray(item.content) &&
                                item.content.length === 0) ||
                              (typeof item.content === "string" &&
                                (item.content.includes("too short") ||
                                  item.content.includes("lacks sufficient") ||
                                  item.content.trim() === ""));

                            if (isEmpty) return null;

                            return (
                              <motion.div
                                key={feedbackIndex}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: feedbackIndex * 0.1 }}
                                className="mt-2 rounded-md bg-gray-100 p-3"
                              >
                                <AIFeedbackContent
                                  type={item.type}
                                  content={item.content}
                                />
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.li>
            ))}
          </ul>

          {displayAudioCount < sortedRecordings.length && (
            <div className="mt-4 flex justify-center">
              <Button label="Load More" type="secondary" onClick={onLoadMore} />
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">No saved audio recordings yet.</p>
      )}

      {/* Audio Modal */}
      <AnimatePresence>
        {selectedAudio && (
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
                <audio
                  controls
                  src={selectedAudio.url}
                  className="w-full rounded-md"
                />

                <div className="mt-2 font-medium text-white">
                  {selectedAudio.filename}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioHistory;

import React, { useEffect, useState } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import { AIFeatureButtons } from "../aifeaturebutton";

interface AIContentWrapperProps {
  whisperTranscription: boolean;
  isLoading: boolean;
  recordingUrl: string;
  summary: string | null;
  bulletPoints: string[];
  sortedWords: string[];
  mainTheme: string | null;
  cutDowns: string | null;
  soundBites: string | null;
  onGenerateSummary: () => void;
  onGenerateBulletPoints: () => void;
  onSortWords: () => void;
  onMainTheme: () => void;
  onUsefulCutdowns: () => void;
  onGenerateSoundBites: () => void;
}

type ContentType =
  | "summary"
  | "bulletPoints"
  | "sortedWords"
  | "mainTheme"
  | "cutDowns"
  | "soundBites";

export function AIContentWrapper({
  whisperTranscription,
  isLoading,
  recordingUrl,
  summary,
  bulletPoints,
  sortedWords,
  mainTheme,
  cutDowns,
  soundBites,
  onGenerateSummary,
  onGenerateBulletPoints,
  onSortWords,
  onMainTheme,
  onUsefulCutdowns,
  onGenerateSoundBites,
}: AIContentWrapperProps) {
  const [contentOrder, setContentOrder] = useState<ContentType[]>([]);

  useEffect(() => {
    setContentOrder((prevOrder) => {
      const newOrder: ContentType[] = [];

      // Check for new content that's not in the previous order
      if (summary && !prevOrder.includes("summary")) newOrder.push("summary");
      if (bulletPoints.length > 0 && !prevOrder.includes("bulletPoints"))
        newOrder.push("bulletPoints");
      if (sortedWords.length > 0 && !prevOrder.includes("sortedWords"))
        newOrder.push("sortedWords");
      if (mainTheme && !prevOrder.includes("mainTheme"))
        newOrder.push("mainTheme");
      if (cutDowns && !prevOrder.includes("cutDowns"))
        newOrder.push("cutDowns");
      if (soundBites && !prevOrder.includes("soundBites"))
        newOrder.push("soundBites");

      // Add existing items that are still available
      prevOrder.forEach((type) => {
        if (
          (type === "summary" && summary) ||
          (type === "bulletPoints" && bulletPoints.length > 0) ||
          (type === "sortedWords" && sortedWords.length > 0) ||
          (type === "mainTheme" && mainTheme) ||
          (type === "cutDowns" && cutDowns) ||
          (type === "soundBites" && soundBites)
        ) {
          newOrder.push(type);
        }
      });

      return newOrder;
    });
  }, [summary, bulletPoints, sortedWords, mainTheme, cutDowns, soundBites]);

  const handleAction = (type: ContentType) => {
    setContentOrder((prev) => {
      const newOrder = prev.filter((t) => t !== type);
      return [type, ...newOrder];
    });
  };

  const renderContent = (type: ContentType) => {
    switch (type) {
      case "summary":
        return (
          summary && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Summary:</h3>
              <p className="mt-2">{summary}</p>
            </div>
          )
        );
      case "bulletPoints":
        return (
          bulletPoints.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Key Points:</h3>
              <ul className="mt-2 list-disc pl-5">
                {bulletPoints[0]
                  .split("-")
                  .filter((point) => point.trim() && !point.includes("*"))
                  .map((point, index) => (
                    <li key={index}>{point.trim()}</li>
                  ))}
              </ul>
            </div>
          )
        );
      case "sortedWords":
        return (
          sortedWords.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Sorted Words:</h3>
              <ul className="mt-2 list-disc pl-5">
                {sortedWords.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </ul>
            </div>
          )
        );
      case "mainTheme":
        return (
          mainTheme && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Main Theme:</h3>
              <p className="mt-2">{mainTheme}</p>
            </div>
          )
        );
      case "cutDowns":
        return (
          cutDowns && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Useful Cutdowns:</h3>
              <ul className="mt-2 list-disc pl-5">
                {cutDowns.split("\n").map((cutdown, index) => (
                  <li key={index}>{cutdown.replace(/^\d+\.\s*/, "").trim()}</li>
                ))}
              </ul>
            </div>
          )
        );
      case "soundBites":
        return (
          soundBites && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Sound Bites:</h3>
              <div className="mt-2 space-y-2">
                {soundBites.split("\n").map((bite, index) => (
                  <p key={index} className="rounded-lg bg-gray-50 p-2">
                    {bite}
                  </p>
                ))}
              </div>
            </div>
          )
        );
    }
  };

  return (
    <div>
      {whisperTranscription && (
        <AIFeatureButtons
          onGenerateSummary={() => {
            handleAction("summary");
            onGenerateSummary();
          }}
          onGenerateBulletPoints={() => {
            handleAction("bulletPoints");
            onGenerateBulletPoints();
          }}
          onSortWords={() => {
            handleAction("sortedWords");
            onSortWords();
          }}
          onMainTheme={() => {
            handleAction("mainTheme");
            onMainTheme();
          }}
          onUsefulCutdowns={() => {
            handleAction("cutDowns");
            onUsefulCutdowns();
          }}
          onGenerateSoundBites={() => {
            handleAction("soundBites");
            onGenerateSoundBites();
          }}
          isLoading={isLoading}
          audioUrl={null}
          videoUrl={recordingUrl}
        />
      )}
      {isLoading && (
        <p className="text-cp-primary mt-4 flex items-center justify-center gap-2 text-center text-[24px] font-semibold leading-[22.4px]">
          We are creating feedback for you, please wait
          <IconSpinner className="h-6 w-6" />
        </p>
      )}
      {contentOrder.map((type) => renderContent(type))}
    </div>
  );
}

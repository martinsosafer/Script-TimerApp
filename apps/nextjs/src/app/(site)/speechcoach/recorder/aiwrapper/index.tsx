"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@voiceai/ui";
import { IconBookPlus, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import { revalidateRecordingPage } from "~/app/actions/speechcoach";
import { AIFeatureButtons } from "../aifeaturebutton";

interface AIContentWrapperProps {
  userId?: string;
  whisperTranscription: boolean;
  isLoading: boolean;
  recordingUrl: string | null;
  uploadUrl: string | null;
  summary: string | null;
  bulletPoints: string[];
  sortedWords: string[];
  sortedFillerWords: string[];
  mainTheme: string | null;
  cutDowns: string | null;
  soundBites: string | null;
  onGenerateSummary: () => Promise<string>;
  onGenerateBulletPoints: () => Promise<string[]>;
  onSortWords: () => Promise<string[]>;
  onMainTheme: () => Promise<string>;
  onUsefulCutdowns: () => Promise<string>;
  onGenerateSoundBites: () => Promise<string>;
  onSortFillerWords: () => Promise<string[]>;
}

type ContentType =
  | "summary"
  | "bulletPoints"
  | "sortedWords"
  | "mainTheme"
  | "cutDowns"
  | "soundBites"
  | "sortedFillerWords";

interface AIContent {
  type: ContentType;
  content: string | string[];
}

interface ApiResponse {
  success: boolean;
  error?: string;
}

export function AIContentWrapper({
  userId,
  whisperTranscription,
  isLoading,
  recordingUrl,
  uploadUrl,
  summary,
  bulletPoints,
  sortedWords,
  mainTheme,
  cutDowns,
  sortedFillerWords,
  soundBites,
  onGenerateSummary,
  onSortFillerWords,
  onGenerateBulletPoints,
  onSortWords,
  onMainTheme,
  onUsefulCutdowns,
  onGenerateSoundBites,
}: AIContentWrapperProps) {
  const router = useRouter();
  const [contentOrder, setContentOrder] = useState<ContentType[]>([]);
  const [aiContent, setAIContent] = useState<AIContent[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setContentOrder((prevOrder) => {
      const newOrder: ContentType[] = [];

      if (summary && !prevOrder.includes("summary")) newOrder.push("summary");
      if (bulletPoints.length > 0 && !prevOrder.includes("bulletPoints"))
        newOrder.push("bulletPoints");
      if (sortedWords.length > 0 && !prevOrder.includes("sortedWords"))
        newOrder.push("sortedWords");
      if (
        sortedFillerWords &&
        sortedFillerWords.length > 0 &&
        !prevOrder.includes("sortedFillerWords")
      ) {
        newOrder.push("sortedFillerWords");
      }
      if (mainTheme && !prevOrder.includes("mainTheme"))
        newOrder.push("mainTheme");
      if (cutDowns && !prevOrder.includes("cutDowns"))
        newOrder.push("cutDowns");
      if (soundBites && !prevOrder.includes("soundBites"))
        newOrder.push("soundBites");

      prevOrder.forEach((type) => {
        if (
          (type === "summary" && summary) ||
          (type === "bulletPoints" && bulletPoints.length > 0) ||
          (type === "sortedWords" && sortedWords.length > 0) ||
          (type === "sortedFillerWords" && sortedFillerWords.length > 0) ||
          (type === "mainTheme" && mainTheme) ||
          (type === "cutDowns" && cutDowns) ||
          (type === "soundBites" && soundBites)
        ) {
          if (!newOrder.includes(type)) {
            newOrder.push(type);
          }
        }
      });

      return newOrder;
    });
  }, [
    summary,
    bulletPoints,
    sortedWords,
    mainTheme,
    cutDowns,
    soundBites,
    sortedFillerWords,
  ]);

  const saveContent = async (
    type: ContentType,
    content: string | string[],
    uploadUrl: string,
  ) => {
    if (userId && uploadUrl) {
      try {
        const response = await fetch("/api/speechcoachai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            contentType: type,
            content,
            uploadUrl,
          }),
        });

        const result: ApiResponse = await response.json();

        if (result.success) {
          setAIContent((prev) => [
            ...prev.filter((item) => item.type !== type),
            { type, content },
          ]);

          // Trigger page revalidation and refresh
          await revalidateRecordingPage();
          router.refresh();
        }
      } catch (error) {
        console.error("Error saving AI content:", error);
      }
    }
  };

  const saveAllContent = async () => {
    if (!userId || !uploadUrl) return;

    setIsSaving(true);
    try {
      const contentToSave: ContentType[] = [
        "summary",
        "bulletPoints",
        "sortedWords",
        "mainTheme",
        "cutDowns",
        "soundBites",
        "sortedFillerWords",
      ];

      for (const type of contentToSave) {
        const content = (() => {
          switch (type) {
            case "summary":
              return summary;
            case "bulletPoints":
              return bulletPoints;
            case "sortedWords":
              return sortedWords;
            case "sortedFillerWords":
              return sortedFillerWords;
            case "mainTheme":
              return mainTheme;
            case "cutDowns":
              return cutDowns;
            case "soundBites":
              return soundBites;
            default:
              return null;
          }
        })();

        if (content) {
          await saveContent(type, content, uploadUrl);
        }
      }
    } catch (error) {
      console.error("Error saving all AI content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAction = async (
    type: ContentType,
    action: () => Promise<string | string[]>,
  ) => {
    try {
      const newContent = await action();

      if (type === "summary" && !newContent && summary) {
        await saveContent(type, summary, uploadUrl);
      } else if (newContent) {
        await saveContent(type, newContent, uploadUrl);
      }

      setContentOrder((prev) => [type, ...prev.filter((t) => t !== type)]);
    } catch (error) {
      console.error(`Error generating ${type}:`, error);
    }
  };

  const renderContent = (type: ContentType) => {
    const getContent = () => {
      const savedContent = aiContent.find(
        (item) => item.type === type,
      )?.content;
      switch (type) {
        case "summary":
          return savedContent || summary;
        case "bulletPoints":
          return savedContent || bulletPoints;
        case "sortedWords":
          return savedContent || sortedWords;
        case "sortedFillerWords":
          return savedContent || sortedFillerWords;
        case "mainTheme":
          return savedContent || mainTheme;
        case "cutDowns":
          return savedContent || cutDowns;
        case "soundBites":
          return savedContent || soundBites;
        default:
          return null;
      }
    };

    const content = getContent();
    if (!content) return null;

    switch (type) {
      case "summary":
        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Summary:</h3>
            <p className="mt-2">{content as string}</p>
          </div>
        );
      case "bulletPoints":
        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Key Points:</h3>
            <ul className="mt-2 list-disc pl-5">
              {Array.isArray(content) && typeof content[0] === "string"
                ? content[0]
                    .split("\n")
                    .filter((line) => line.trim().startsWith("-"))
                    .map((line, index) => (
                      <li key={index}>{line.replace(/^-/, "").trim()}</li>
                    ))
                : null}
            </ul>
          </div>
        );
      case "sortedWords":
        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Sorted Words:</h3>
            <ul className="mt-2 list-disc pl-5">
              {(Array.isArray(content) ? content : [content]).map(
                (word, index) => (
                  <li key={index}>{word}</li>
                ),
              )}
            </ul>
          </div>
        );
      case "sortedFillerWords":
        const fillerContent = getContent();
        if (!fillerContent) return null;

        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Filler Words:</h3>
            {typeof fillerContent === "string" ? (
              <p className="mt-2">{fillerContent}</p>
            ) : (
              <ul className="mt-2 list-disc pl-5">
                {(Array.isArray(fillerContent)
                  ? fillerContent
                  : [fillerContent]
                )
                  .filter((word) => word !== null && word !== undefined)
                  .map((word, index) => (
                    <li key={index}>{word}</li>
                  ))}
              </ul>
            )}
          </div>
        );
      case "mainTheme":
        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Main Theme:</h3>
            <p className="mt-2">{content as string}</p>
          </div>
        );
      case "cutDowns":
        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Useful Cutdowns:</h3>
            <ul className="mt-2 list-disc pl-5">
              {(content as string).split("\n").map((cutdown, index) => (
                <li key={index}>{cutdown.replace(/^\d+\.\s*/, "").trim()}</li>
              ))}
            </ul>
          </div>
        );
      case "soundBites":
        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Sound Bites:</h3>
            <div className="mt-2 space-y-2">
              {(content as string).split("\n").map((bite, index) => (
                <p key={index} className="rounded-lg bg-gray-50 p-2">
                  {bite}
                </p>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {whisperTranscription && (
        <div className="flex items-center gap-2">
          <AIFeatureButtons
            onGenerateSummary={() => handleAction("summary", onGenerateSummary)}
            onGenerateBulletPoints={() =>
              handleAction("bulletPoints", onGenerateBulletPoints)
            }
            onSortWords={() => handleAction("sortedWords", onSortWords)}
            onSortFillerWords={() =>
              handleAction("sortedFillerWords", onSortFillerWords)
            }
            onMainTheme={() => handleAction("mainTheme", onMainTheme)}
            onUsefulCutdowns={() => handleAction("cutDowns", onUsefulCutdowns)}
            onGenerateSoundBites={() =>
              handleAction("soundBites", onGenerateSoundBites)
            }
            isLoading={isLoading}
            audioUrl={null}
            videoUrl={uploadUrl}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    variant="outline"
                    onClick={saveAllContent}
                    disabled={!uploadUrl || isSaving}
                    className="flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <IconSpinner className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <IconBookPlus className="h-4 w-4" />
                        Save AI Feature
                      </>
                    )}
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center">
                <p>
                  To save the AI feature, you need to save your recording first.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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

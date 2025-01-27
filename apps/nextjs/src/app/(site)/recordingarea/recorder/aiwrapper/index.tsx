import React, { useEffect, useState } from "react";



import { Button } from "@voiceai/ui";
import { IconBookPlus, IconSpinner } from "@voiceai/ui/@/components/ui/icons";



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
  mainTheme: string | null;
  cutDowns: string | null;
  soundBites: string | null;
  onGenerateSummary: () => Promise<string>;
  onGenerateBulletPoints: () => Promise<string[]>;
  onSortWords: () => Promise<string[]>;
  onMainTheme: () => Promise<string>;
  onUsefulCutdowns: () => Promise<string>;
  onGenerateSoundBites: () => Promise<string>;
}

type ContentType =
  | "summary"
  | "bulletPoints"
  | "sortedWords"
  | "mainTheme"
  | "cutDowns"
  | "soundBites";

interface AIContent {
  type: ContentType;
  content: string | string[];
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
  soundBites,
  onGenerateSummary,
  onGenerateBulletPoints,
  onSortWords,
  onMainTheme,
  onUsefulCutdowns,
  onGenerateSoundBites,
}: AIContentWrapperProps) {
  const [contentOrder, setContentOrder] = useState<ContentType[]>([]);
  const [aiContent, setAIContent] = useState<AIContent[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Update content order based on props
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
          if (!newOrder.includes(type)) {
            newOrder.push(type);
          }
        }
      });

      return newOrder;
    });
  }, [summary, bulletPoints, sortedWords, mainTheme, cutDowns, soundBites]);
  
  const saveContent = async (
    type: ContentType,
    content: string | string[],
    uploadUrl: string,
  ) => {
    if (userId && uploadUrl) {
      try {
        await fetch("/api/speechcoachai", {
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
        setAIContent((prev) => [
          ...prev.filter((item) => item.type !== type),
          { type, content },
        ]);
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
    // Get content from props or saved state
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
                ? content[0] // Access the first element of the array
                    .split("\n") // Split by line breaks
                    .filter((line) => line.trim().startsWith("-")) // Keep lines starting with a dash
                    .map((line, index) => (
                      <li key={index}>{line.replace(/^-/, "").trim()}</li> // Clean up dashes and spaces
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
            onMainTheme={() => handleAction("mainTheme", onMainTheme)}
            onUsefulCutdowns={() => handleAction("cutDowns", onUsefulCutdowns)}
            onGenerateSoundBites={() =>
              handleAction("soundBites", onGenerateSoundBites)
            }
            isLoading={isLoading}
            audioUrl={null}
            videoUrl={uploadUrl}
          />
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
                Save All
              </>
            )}
          </Button>
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
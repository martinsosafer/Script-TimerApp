"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Separator } from "@voiceai/ui/@/components/ui/separator";

interface AIContent {
  id: string;
  userId: string;
  type:
    | "summary"
    | "bulletPoints"
    | "sortedWords"
    | "mainTheme"
    | "cutDowns"
    | "soundBites";
  content: string | string[];
  createdAt: string;
}

interface AIFeedbackProps {
  userId: string;
}

const AIFeedback: React.FC<AIFeedbackProps> = ({ userId }) => {
  const [aiContent, setAIContent] = useState<AIContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAIContent = async () => {
      try {
        const response = await fetch(`/api/speechcoachai?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch AI content");
        }
        const data = await response.json();
        setAIContent(data);
      } catch (err) {
        setError("Failed to load AI content. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAIContent();
  }, [userId]);

  const renderContent = (
    type: AIContent["type"],
    content: string | string[],
  ) => {
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
              {Array.isArray(content)
                ? content.map((point, index) => <li key={index}>{point}</li>)
                : content
                    .split("-")
                    .filter((point) => point.trim() && !point.includes("*"))
                    .map((point, index) => <li key={index}>{point.trim()}</li>)}
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
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div>Loading AI content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8">
      <Separator className="bg-cp-primary mb-8 h-1" />
      <h2 className="mb-4 text-xl font-semibold">AI Feedback</h2>
      {aiContent.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {aiContent.map((item) => (
            <div key={item.id} className="mb-6 rounded-lg bg-gray-50 p-4">
              {renderContent(item.type, item.content)}
            </div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-500">No AI feedback available yet.</p>
      )}
    </div>
  );
};

export default AIFeedback;

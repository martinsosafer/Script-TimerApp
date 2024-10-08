"use client";

import React, { useEffect, useState } from "react";

interface TextCorrectionComponentProps {
  transcript: string;
}

export default function TextCorrectionComponent({
  transcript,
}: TextCorrectionComponentProps) {
  const [userText, setUserText] = useState(transcript);
  const [correctedText, setCorrectedText] = useState("");
  const [summarizedText, setSummarizedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(e.target.value);
  };

  // Handle grammar, spelling, and coherence correction
  const handleCorrectGrammar = async () => {
    if (userText.trim() === "") {
      alert("Please enter some text.");
      return;
    }

    setLoading(true);
    setAiError(null);

    try {
      const response = await fetch("/api/translatorText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Correct the grammar, spelling, and coherence of the following text:\n"${userText}"`,
          currentModel: "gpt-4",
        }),
      });

      const data = await response.json();
      setCorrectedText(data.data);
    } catch (error) {
      console.error("Error with AI processing:", error);
      setAiError("Failed to process the AI request.");
    } finally {
      setLoading(false);
    }
  };

  // Handle text summarization with bullet points
  const handleSummarizeText = async () => {
    if (userText.trim() === "") {
      alert("Please enter some text.");
      return;
    }

    setLoading(true);
    setAiError(null);

    try {
      const response = await fetch("/api/translatorText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Summarize the following text in bullet points:\n"${userText}"`,
          currentModel: "gpt-4",
        }),
      });

      const data = await response.json();
      // Format summarized text to replace line breaks with <li> tags for bullet points
      const formattedText = data.data
        .split("\n")
        .filter((line) => line.trim() !== "") // Remove empty lines
        .map((line) => `<li>${line}</li>`)
        .join("");

      setSummarizedText(formattedText);
    } catch (error) {
      console.error("Error with AI processing:", error);
      setAiError("Failed to process the AI request.");
    } finally {
      setLoading(false);
    }
  };

  // Update userText if transcript changes
  useEffect(() => {
    setUserText(transcript);
  }, [transcript]);

  return (
    <div className="w-full p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold">Text Correction and Summarization</h1>
      </div>

      {/* Input Textarea */}
      <div className="mb-6">
        <textarea
          value={userText}
          onChange={handleTextChange}
          placeholder="Enter text to correct or summarize..."
          className="h-32 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Buttons for Actions */}
      <div className="mb-6 space-x-4">
        <button
          onClick={handleCorrectGrammar}
          className="rounded bg-green-500 px-4 py-2 text-white"
          disabled={loading}
        >
          {loading ? "Correcting..." : "Correct Grammar"}
        </button>

        <button
          onClick={handleSummarizeText}
          className="rounded bg-blue-500 px-4 py-2 text-white"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize Text"}
        </button>
      </div>

      {/* Display Corrected Text in a Textarea */}
      {correctedText && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Corrected Text</h2>
          <textarea
            value={correctedText}
            readOnly
            className="h-32 w-full rounded border border-gray-300 bg-gray-50 p-2 focus:outline-none"
          />
        </div>
      )}

      {/* Display Summarized Text with Bullet Points */}
      {summarizedText && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Summarized Text</h2>
          <ul className="list-disc pl-6">
            <div dangerouslySetInnerHTML={{ __html: summarizedText }} />
          </ul>
        </div>
      )}

      {/* Display AI error if any */}
      {aiError && (
        <div className="text-red-500">
          <p>{aiError}</p>
        </div>
      )}
    </div>
  );
}
9
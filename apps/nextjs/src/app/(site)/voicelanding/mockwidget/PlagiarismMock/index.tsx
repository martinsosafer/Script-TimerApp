import React, { useEffect, useState } from "react";

import { Button } from "@voiceai/ui";
import { Card } from "@voiceai/ui/@/components/ui/card";

export default function PlagiarismCheckWidget() {
  const [isChecked, setIsChecked] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [displayReport, setDisplayReport] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const originalText =
    "To become a screenwriter you need both a deep understanding and passion for storytelling and a strong understanding of character development, plot structure, and dialogue. So let's see some tips to get you started:";

  const highlightedText = [
    {
      text: "To become a screenwriter you need both a deep understanding and passion for storytelling and a strong understanding of character development,",
      highlight: "yellow",
    },
    { text: " plot structure, and dialogue.", highlight: "orange" },
    { text: " So let's see some tips to get you started:", highlight: "none" },
  ];

  const reportText = `Plagiarism Report:
Similar source: (In Yellow)
https://script-timer.com/storytelling/script-writing-and-screenwriting-whats-the-difference/
There is an 88% chance this sentence was written by AI: Please rewrite`;

  useEffect(() => {
    if (isChecked && !isTyping) {
      setIsTyping(true);
      setDisplayText("");
      setDisplayReport("");
      const fullText = highlightedText.map((segment) => segment.text).join("");
      let i = 0;
      const textIntervalId = setInterval(() => {
        setDisplayText((prev) => fullText.slice(0, prev.length + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(textIntervalId);
          let j = 0;
          const reportIntervalId = setInterval(() => {
            setDisplayReport((prev) => reportText.slice(0, prev.length + 1));
            j++;
            if (j === reportText.length) {
              clearInterval(reportIntervalId);
              setIsTyping(false);
            }
          }, 20);
        }
      }, 20);
      return () => {
        clearInterval(textIntervalId);
      };
    }
  }, [isChecked]);

  const handlePlagiarismCheck = () => {
    setIsChecked(true);
  };

  return (
    <Card className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Plagiarism Check Widget</h2>
      <div className="mb-4">
        <p className="text-gray-700">{originalText}</p>
      </div>
      <Button
        onClick={handlePlagiarismCheck}
        className="mb-4"
        disabled={isChecked}
      >
        Plagiarism Check
      </Button>
      {isChecked && (
        <div className="space-y-4">
          <div className="min-h-[100px] rounded-lg bg-gray-100 p-4">
            {highlightedText.map((segment, index) => (
              <span
                key={index}
                className={
                  segment.highlight === "yellow"
                    ? "bg-yellow-200"
                    : segment.highlight === "orange"
                      ? "bg-orange-200"
                      : ""
                }
              >
                {displayText.slice(
                  highlightedText
                    .slice(0, index)
                    .reduce((acc, curr) => acc + curr.text.length, 0),
                  highlightedText
                    .slice(0, index + 1)
                    .reduce((acc, curr) => acc + curr.text.length, 0),
                )}
              </span>
            ))}
          </div>
          <div className="min-h-[100px] space-y-2">
            {displayReport.split("\n").map((line, index) => {
              if (index === 0) {
                return (
                  <p key={index} className="font-semibold">
                    {line}
                  </p>
                );
              } else if (index === 1) {
                return (
                  <p key={index} className="text-yellow-600">
                    {line}
                  </p>
                );
              } else if (index === 2) {
                return (
                  <a
                    key={index}
                    href="https://script-timer.com/storytelling/script-writing-and-screenwriting-whats-the-difference/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {line}
                  </a>
                );
              } else if (index === 3) {
                return (
                  <p key={index} className="text-red-600">
                    {line}
                  </p>
                );
              } else {
                return <p key={index}>{line}</p>;
              }
            })}
          </div>
          {isTyping && <span className="animate-pulse">|</span>}
        </div>
      )}
    </Card>
  );
}

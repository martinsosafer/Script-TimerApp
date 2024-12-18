import React, { useEffect, useState } from "react";

import { Card } from "@voiceai/ui/@/components/ui/card";

import Button from "~/app/(site)/components/button";

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
    <div style={{ minHeight: "250px" }}>
      <h3 className="mb-4 text-[14px] font-normal leading-[19.6px]">
        Checks your script, blog, or story for plagiarism and whether it was
        created by an Ai.
        <br />
        Shows sources and links to the similar text.
      </h3>

      <h3 className=" mb-2 text-[14px] font-normal leading-[19.6px]">
        In the app, enter your text here. This is our sample:
      </h3>
      <div className="mb-3 h-[94px] w-[860px] rounded-lg border border-slate-300 bg-white">
        <p className="px-[24px] py-[14px]">{originalText}</p>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handlePlagiarismCheck}
          disabled={isChecked}
          label="Plagiarism check"
          type="primary"
        />
      </div>

      {isChecked && (
        <div className="mt-[57px] rounded-lg  border border-slate-300  bg-white ">
          <div className="h-[128px] w-[790] rounded-lg bg-white p-4">
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
          <div className="h-[164px] w-[790] rounded-lg bg-[#E2E8F0] p-4">
            {displayReport.split("\n").map((line, index) => {
              if (index === 0) {
                return (
                  <p key={index} className=" mt-[20px] text-base font-semibold">
                    {line}
                  </p>
                );
              } else if (index === 1) {
                return (
                  <p key={index} className="mt-[14px] text-base">
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
                  <p key={index} className="mt-3 text-red-600">
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
    </div>
  );
}

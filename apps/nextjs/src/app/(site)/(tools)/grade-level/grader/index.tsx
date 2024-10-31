"use client";

import { useState } from "react";
import { set } from "zod";

import type { CounterValues } from "../../utils";
import {
  calculateLevel,
  counterHelper,
  getAdverbs,
  simpleTimeCalculator,
} from "../../utils";

export default function Grader() {
  const [text, setText] = useState("");
  const [countResult, setCountResult] = useState<CounterValues>({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    letters: 0,
  });
  const [readingTime, setReadingTime] = useState<string | null>(null);
  const [highlightedText, setHighlightedText] = useState<string | null>(null);

  function handleTest() {
    const countResult = counterHelper(text);
    const readingTime = simpleTimeCalculator(text, 3.5);
    const adverbs = getAdverbs(text);

    setHighlightedText(adverbs.adverbsText as string);

    setReadingTime(readingTime);
    setCountResult(countResult);
  }

  console.log("TEXT", highlightedText);

  function textMapper(text: string) {
    const paragraphs = text?.split("\n") ?? [];

    const newText = paragraphs.map((paragraph, idx) => {
      const newParagraph = paragraph.split(/\s+/).map((word, idx) => {
        if (word.includes("::adverb")) {
          return (
            <span key={idx + word} className="bg-blue-300 p-1">
              {" "}
              {word.split("::")[0]}
            </span>
          );
        }
        return ` ${word}`;
      });
      return newParagraph;
    });

    return (
      <div>
        {newText.map((paragraph, idx) => {
          return (
            <div key={idx} className="mt-3">
              {paragraph}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section className="mb-10 flex w-full gap-4">
      <div className="flex w-[70%] flex-col ">
        <textarea
          name="text"
          rows={12}
          className="w-full rounded-md border border-gray-300 bg-gray-50 p-4 outline-none"
          placeholder="Type or paste your text here..."
          onChange={(e) => setText(e.currentTarget.value)}
        />

        <button
          className="mt-2 flex h-12 w-full items-center justify-center rounded-md bg-tertiary text-lg font-semibold text-white"
          onClick={() => handleTest()}
        >
          Test Me
        </button>
        <div className="mt-2">{textMapper(highlightedText!)}</div>
      </div>
      <article className="flex w-[30%] flex-col">
        <h3>Readability</h3>
        <h2>
          Grade:{" "}
          {calculateLevel(
            countResult.letters!,
            countResult.words,
            countResult.sentences,
          )}
        </h2>

        <p>Letters: {countResult.letters} </p>
        <p>Characters: {countResult.characters}</p>
        <p>Words: {countResult.words}</p>
        <p>Sentences: {countResult.sentences}</p>
        <p>Paragraphs: {countResult.paragraphs}</p>
        <p>Reading Time: {readingTime}</p>
      </article>
    </section>
  );
}

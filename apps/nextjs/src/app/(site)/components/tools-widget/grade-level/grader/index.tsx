"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IconArrowRight } from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { roboto } from "~/app/fonts";
import type { CounterValues } from "../../utils";
import {
  calculateLevel,
  counterHelper,
  getAdverbs,
  simpleTimeCalculator,
} from "../../utils";

export default function Grader() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [countResult, setCountResult] = useState<CounterValues>({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    letters: 0,
  });
  const [readingTime, setReadingTime] = useState<string | null>(null);
  const [highlightedText, setHighlightedText] = useState({
    adverbsText: "",
    adverbs: 0,
    passive: 0,
    simplify: 0,
    hard: 0,
    veryHard: 0,
  });

  function handleTest() {
    const countResult = counterHelper(text);
    const readingTime = simpleTimeCalculator(text, 3.5);
    const adverbs = getAdverbs(text);

    setHighlightedText({
      adverbsText: adverbs.adverbsText,
      adverbs: adverbs.adverbs,
      passive: adverbs.adverbs,
      simplify: adverbs.simplifyWords,
      hard: adverbs.hardSentences,
      veryHard: adverbs.veryHardSentences,
    });

    setReadingTime(readingTime);
    setCountResult(countResult);
  }

  function textMapper(text: string) {
    const paragraphs = text?.split("\n") ?? [];

    const newText = paragraphs.map((paragraph) => {
      const sentences = paragraph.split(".");
      const newParagraph = sentences.map((sentence, idx) => {
        if (sentence.includes("::hard")) {
          return (
            <span key={idx + sentence} className="bg-[#F7ECB5] p-1">
              {sentence.split("-*-")[1]}
            </span>
          );
        }
        if (sentence.includes("::veryHard")) {
          return (
            <span key={idx + sentence} className="bg-[#E4B9B9] p-1">
              {sentence.split("-*-")[1]}
            </span>
          );
        }
        const newSentence = sentence.split(/\s+/).map((word, idx) => {
          if (word.includes("::simplify")) {
            const formatted = word.replace("::simplify", "");
            const splitted = formatted.replace("-*-", " ");
            return (
              <span key={idx + word} className="bg-[#E3B7E8] p-1">
                {splitted}
              </span>
            );
          }
          if (word.includes("::passive")) {
            const pre = word.split("-*-")[0];
            const post = word.split("-*-")[1]?.split("::")[0];
            return (
              <span key={idx + word} className="bg-[#C4ED9D] p-1">
                {" "}
                {pre} {post}
              </span>
            );
          }
          if (word.includes("::adverb")) {
            return (
              <span key={idx + word} className="bg-[#C4E3F3] p-1">
                {" "}
                {word.split("::")[0]}
              </span>
            );
          }
          return ` ${word}`;
        });
        return newSentence;
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
    <main className="w-full">
      <div className="mb-4 flex w-full justify-between gap-4">
        <Button
          label="Listen to your script"
          type="secondary"
          className="w-[300px]"
          onClick={() => router.push("/texttovoice")}
        />
        <Button
          label="Specialized AI rewriting"
          type="secondary"
          className="w-[300px]"
          onClick={() => router.push("/chat")}
        />
        <Button
          label="Detect Plagiarism & AI"
          type="secondary"
          className="w-[300px]"
          onClick={() => router.push("/plagiarism-detector")}
        />
      </div>
      <section
        className={`${roboto.className} border-cp-primary-lightest flex w-full flex-col rounded-lg border bg-white p-4`}
      >
        <textarea
          name="text"
          rows={20}
          className="w-full rounded-2xl bg-[#F2F2F5] p-4 outline-none"
          placeholder="Type or paste your text here..."
          onChange={(e) => setText(e.currentTarget.value)}
        />

        <article className="mt-3 flex w-full items-start">
          <div className="w-[20%]">
            <h3 className="text-base font-normal">Readability</h3>
            <span className="text-xs">Goal: 9th grade</span>
            <h2 className="mt-1 text-[18px] font-bold">
              Grade:{" "}
              {calculateLevel(
                countResult.letters!,
                countResult.words,
                countResult.sentences,
              )}
            </h2>
          </div>
          <div className="w-[30%] text-base font-bold">
            <p className="mt-1">
              Letters:{" "}
              <span className="font-normal">{countResult.letters}</span>{" "}
            </p>
            <p className="mt-1">
              Characters:{" "}
              <span className="font-normal">{countResult.characters}</span>
            </p>
            <p className="mt-1">
              Words: <span className="font-normal">{countResult.words}</span>
            </p>
            <p>
              Sentences:{" "}
              <span className="font-normal">{countResult.sentences}</span>
            </p>
            <p className="mt-1">
              Paragraphs:{" "}
              <span className="font-normal">{countResult.paragraphs}</span>
            </p>
            <p className="mt-1">
              Reading Time: <span className="font-normal">{readingTime}</span>
            </p>
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <div className="flex h-[38px] w-full items-center rounded bg-[#C4E3F3] px-3 text-[16px]">
              You have used {highlightedText.adverbs} adverbs. Try to use 2 or
              less.
            </div>

            <div className="flex h-[38px] w-full items-center rounded bg-[#C4ED9D] px-3 text-[16px]">
              You have used passive voice {highlightedText.passive} time. Aim
              for 2 or less.
            </div>

            <div className="flex h-[38px] w-full items-center rounded bg-[#E3B7E8] px-3 text-[16px]">
              {highlightedText.simplify} phrase could be simplified.
            </div>

            <div className="flex h-[38px] w-full items-center rounded bg-[#F7ECB5] px-3 text-[16px]">
              {highlightedText.hard} of {countResult.sentences} sentences are
              hard to read.
            </div>

            <div className="flex h-[38px] w-full items-center rounded bg-[#E4B9B9] px-3 text-[16px]">
              {highlightedText.veryHard} of {countResult.sentences} sentences
              are very hard to read.
            </div>
          </div>
        </article>
        {highlightedText.adverbsText && (
          <div className="mt-5">{textMapper(highlightedText.adverbsText)}</div>
        )}
      </section>
      <Button
        label="Calculate"
        type="primary"
        fit
        onClick={() => handleTest()}
        className="mt-[18px]"
      />
      <Button
        label="Listen to your script"
        type="accent"
        fit
        icon={IconArrowRight}
        onClick={() => router.push("/texttovoice")}
        className="mt-[12px]"
      />
    </main>
  );
}

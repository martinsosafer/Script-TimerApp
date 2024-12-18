"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IconArrowRight } from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { roboto } from "~/app/fonts";
import { counterHelper, wordsFrecuency } from "../../utils";
import type { CounterValues } from "../../utils";

export default function Counter() {
  const router = useRouter();
  const [counterValues, setCounterValues] = useState<CounterValues>({
    words: 0,
    characters: 0,
    allCharacters: 0,
    sentences: 0,
    paragraphs: 0,
  });
  const [text, setText] = useState("");

  function handleCounterValues(event: React.ChangeEvent<HTMLTextAreaElement>) {
    event.preventDefault();

    const text: string = event.target.value;

    const counts = counterHelper(text);

    setCounterValues(counts);
    setText(text);
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
          name="counter"
          rows={20}
          className="w-full rounded-2xl bg-[#F2F2F5] p-4 outline-none"
          onChange={handleCounterValues}
          placeholder="Type or paste your text here..."
        />
        <p className="mt-4 text-base font-bold text-[#212121]">
          Words: <span className="font-normal">{counterValues.words}</span>
        </p>
        <p className="text-base font-bold text-[#212121]">
          Characters (including spaces):{" "}
          <span className="font-normal">{counterValues.allCharacters}</span>
        </p>
        <p className="text-base font-bold text-[#212121]">
          Characters (excluding spaces):{" "}
          <span className="font-normal">{counterValues.characters}</span>
        </p>
        <p className="text-base font-bold text-[#212121]">
          Sentences:{" "}
          <span className="font-normal">{counterValues.sentences}</span>
        </p>
        <p className="text-base font-bold text-[#212121]">
          Paragraphs:{" "}
          <span className="font-normal">{counterValues.paragraphs}</span>
        </p>
        {text.trim().length > 0 && (
          <article className="mt-4 flex w-full flex-col">
            <div className="flex w-full">
              <div className="bg-cp-primary-lightest border-cp-primary-lightest h-[38px] w-1/2 border p-2 font-bold text-white">
                Words
              </div>
              <div className="bg-cp-primary-lightest border-cp-primary-lightest h-[38px] w-1/2 border p-2 font-bold text-white">
                Count
              </div>
            </div>
            {Object.entries(wordsFrecuency(text))
              .sort((a, b) => b[1] - a[1])
              .slice(0, 10)
              .map(([word, count], idx) => {
                return (
                  <div
                    className="flex w-full text-base font-normal text-black"
                    key={word + idx}
                  >
                    <div className="border-cp-primary-lightest w-1/2 border p-2">
                      {word}
                    </div>
                    <div className="border-cp-primary-lightest w-1/2 border p-2">
                      {count}
                    </div>
                  </div>
                );
              })}
          </article>
        )}
      </section>
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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { IconArrowRight } from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { roboto } from "~/app/fonts";
import { calculateTime, defineTimeText } from "../../utils";

type SpeedValues = 1.5 | 2 | 2.5 | 3 | 3.5;
interface Result {
  title: string | undefined;
  words: number;
  seconds: number | null;
  minutes: number | null;
  speed: number;
}

const speedValues: SpeedValues[] = [1.5, 2, 2.5, 3, 3.5];

export default function TimeCalculator() {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);
  const [text, setText] = useState("");
  const [speed, setSpeed] = useState<SpeedValues>(2.5);

  function handleCounterValues() {
    const result = calculateTime(text, speed);

    setResult(result);
  }

  useEffect(() => {
    if (result) {
      const result = calculateTime(text, speed);
      setResult(result);
    }
  }, [speed]);

  return (
    <main className="mb-[100px] w-full">
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
      <section className="border-cp-primary-lightest flex w-full flex-col rounded-lg border bg-white p-4">
        <textarea
          name="text"
          rows={20}
          className="w-full rounded-2xl bg-[#F2F2F5] p-4 outline-none"
          placeholder="Type or paste your text here..."
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <div className="min-h-20 relative mt-2 flex w-full flex-col items-center justify-center rounded-md bg-white p-4">
          <div className="relative mt-2 flex w-full items-center justify-between">
            {speedValues.map((value) => {
              return (
                <button
                  key={value}
                  className="bg-cp-primary-lightest relative z-10 flex h-[12px] w-[12px] items-center justify-center rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setSpeed(value);
                  }}
                >
                  {speed === value && (
                    <span className="absolute h-[20px] w-[20px] rounded-full border-2 border-white bg-tertiary" />
                  )}
                </button>
              );
            })}

            <div className="bg-cp-primary-lightest absolute h-[4px] w-full" />
          </div>
          <div className="text-cp-primary mt-1 flex w-full justify-between text-xs">
            <span>Slowest</span>
            <span>Average</span>
            <span>Fastest</span>
          </div>
        </div>
      </section>
      {result && (
        <article
          className={`${roboto.className} bg-cp-primary-lightest mb-3 mt-[18px] rounded-lg p-[12px]`}
        >
          <h4 className="text-[18px] font-bold">{result.title}</h4>
          <p className="mt-[12px] text-[18px] font-normal">
            {`Your script has ${result.words} ${result.words === 1 ? "word" : "words"}.  We estimate a recording of
                it would be ${defineTimeText(result.seconds, result.minutes)}, if you average ${result.speed} words per second.`}
          </p>
        </article>
      )}
      <Button
        label="Calculate"
        type="primary"
        fit
        onClick={() => handleCounterValues()}
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

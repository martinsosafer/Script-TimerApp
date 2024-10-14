"use client";

import { useEffect, useState } from "react";

import { calculateTime, defineTimeText } from "./utils";

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
    <section className="mb-10 flex w-full flex-col rounded-md border border-gray-300 p-4">
      <textarea
        name="text"
        rows={10}
        className="w-full rounded-md border border-gray-300 bg-gray-50 p-4 outline-none"
        placeholder="Type or paste your text here..."
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <div className="min-h-20 relative mt-2 flex w-full flex-col items-center justify-center rounded-md bg-primary p-4">
        {result && (
          <article className="mb-2 mt-2 flex flex-col items-center gap-2 text-white">
            <h4 className="text-2xl font-semibold">{result.title}</h4>
            <p>
              {`Your script has ${result.words} ${result.words === 1 ? "word" : "words"}.  We estimate a recording of
                it would be ${defineTimeText(result.seconds, result.minutes)}, if you average ${result.speed} words per second.`}
            </p>
          </article>
        )}

        <div className="relative mt-2 mt-2 flex w-full items-center justify-between">
          {speedValues.map((value) => {
            return (
              <button
                key={value}
                className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white"
                onClick={(e) => {
                  e.preventDefault();
                  setSpeed(value);
                }}
              >
                {speed === value && (
                  <span className="h-5 w-5 rounded-full bg-tertiary" />
                )}
              </button>
            );
          })}

          <div className="absolute h-1.5 w-full bg-white" />
        </div>
        <div className="mt-1 flex w-full justify-between text-xs text-white">
          <span>Slowest</span>
          <span>Average</span>
          <span>Fastest</span>
        </div>
      </div>
      <button
        className="mt-2 flex h-12 w-full items-center justify-center rounded-md bg-tertiary text-lg font-semibold text-white"
        onClick={() => handleCounterValues()}
      >
        Calculate
      </button>
    </section>
  );
}

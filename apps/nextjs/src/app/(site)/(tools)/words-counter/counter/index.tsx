"use client";

import { useState } from "react";

import { counterHelper, wordsFrecuency } from "./utils";

export default function Counter() {
  const [counterValues, setCounterValues] = useState({
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
    <section className="mb-10 flex w-full flex-col rounded-md border border-gray-300 p-4">
      <textarea
        name="counter"
        rows={10}
        className="w-full rounded-md border border-gray-300 bg-gray-50 p-4 outline-none"
        onChange={handleCounterValues}
        placeholder="Type or paste your text here..."
      />
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Words: <span className="font-normal">{counterValues.words}</span>
      </p>
      <p className="text-lg font-semibold text-gray-700">
        Characters (including spaces):{" "}
        <span className="font-normal">{counterValues.characters}</span>
      </p>
      <p className="text-lg font-semibold text-gray-700">
        Characters (excluding spaces):{" "}
        <span className="font-normal">{counterValues.allCharacters}</span>
      </p>
      <p className="text-lg font-semibold text-gray-700">
        Sentences:{" "}
        <span className="font-normal">{counterValues.sentences}</span>
      </p>
      <p className="text-lg font-semibold text-gray-700">
        Paragraphs:{" "}
        <span className="font-normal">{counterValues.paragraphs}</span>
      </p>
      {text.trim().length > 0 && (
        <article className="mt-4 flex w-full flex-col">
          <div className="flex w-full">
            <div className="w-1/2 border border-gray-300 bg-green-600 p-1.5 font-bold text-white">
              Words
            </div>
            <div className="w-1/2 border border-gray-300 bg-green-600 p-1.5 font-bold text-white">
              Count
            </div>
          </div>
          {Object.entries(wordsFrecuency(text))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word, count], idx) => {
              return (
                <div className="flex w-full text-gray-800" key={word + idx}>
                  <div className="w-1/2 border border-gray-300 p-1.5">
                    {word}
                  </div>
                  <div className="w-1/2 border border-gray-300 p-1.5">
                    {count}
                  </div>
                </div>
              );
            })}
        </article>
      )}
    </section>
  );
}

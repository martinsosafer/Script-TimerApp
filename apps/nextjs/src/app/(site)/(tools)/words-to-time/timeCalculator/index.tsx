"use client";

import { useState } from "react";

export default function TimeCalculator() {
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

    // const text: string = event.target.value;

    // setCounterValues(counts);
    // setText(text);
  }

  return (
    <section className="mb-10 flex w-full flex-col rounded-md border border-gray-300 p-4">
      <form action="w-[800px]">
        <textarea
          name="counter"
          rows={10}
          className="w-full rounded-md border border-gray-300 bg-gray-50 p-4 outline-none"
          onChange={handleCounterValues}
          placeholder="Type or paste your text here..."
        />
        <button
          type="submit"
          className="mt-2 flex h-12 w-full items-center justify-center rounded-md bg-primary text-lg font-semibold text-white"
        >
          Calculate
        </button>
      </form>
    </section>
  );
}

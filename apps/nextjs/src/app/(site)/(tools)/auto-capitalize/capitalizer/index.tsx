"use client";

import { useState } from "react";

export default function Capitalizer() {
  const [text, setText] = useState("");
  const [option, setOption] = useState("");

  console.log("OPTION", option);

  function handleTransformText() {
    if (option === "capitalize") {
      const newText = text
        .split(". ")
        .map((sentence) => {
          return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        })
        .join(". ");
      setText(newText);
    }
    if (option === "uppercase") {
      setText(text.toUpperCase());
    }
    if (option === "lowercase") {
      setText(text.toLowerCase());
    }
    if (option === "capitalizeWords") {
      const newText = text
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
      setText(newText);
    }
  }

  return (
    <section className="mb-10 flex w-full flex-col rounded-md border border-gray-300 p-4">
      <textarea
        name="text"
        rows={10}
        className="w-full rounded-md border border-gray-300 bg-gray-50 p-4 outline-none"
        onChange={(e) => setText(e.currentTarget.value)}
        value={text}
        placeholder="Type or paste your text here..."
      />
      <select
        className="mt-2 w-full rounded-md p-3"
        name="trasnformer"
        onChange={(e) => setOption(e.currentTarget.value)}
      >
        <option value="">Select text transformation</option>
        <option value="capitalize">Capitalize sentences</option>
        <option value="uppercase">Make all words uppercase</option>
        <option value="lowercase">Make all words lowercase</option>
        <option value="capitalizeWords">Capitalize each word</option>
      </select>

      <button
        className="mt-2 flex h-12 w-full items-center justify-center rounded-md bg-tertiary text-lg font-semibold text-white"
        onClick={() => handleTransformText()}
      >
        Transform
      </button>
    </section>
  );
}

"use client";

import { useState } from "react";

export default function WordsSorter() {
  const [text, setText] = useState("");
  const [separator, setSeparator] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortedText, setSortedText] = useState("");

  function handleSort() {
    if (!text) return;
    const words = text.trim().split(/\s+/);

    if (separator === "line") {
      const sorted = words
        .sort((a, b) =>
          sortType === "asc" ? a.localeCompare(b) : b.localeCompare(a),
        )
        .join("\n");
      setSortedText(sorted);
    }

    if (separator === "comma") {
      const sorted = words
        .sort((a, b) =>
          sortType === "asc" ? a.localeCompare(b) : b.localeCompare(a),
        )
        .join(", ");
      setSortedText(sorted);
    }

    if (separator === "space") {
      const sorted = words
        .sort((a, b) =>
          sortType === "asc" ? a.localeCompare(b) : b.localeCompare(a),
        )
        .join(" ");
      setSortedText(sorted);
    }
  }

  return (
    <section className="mb-10 flex w-full flex-col rounded-md border border-gray-300 p-4">
      <textarea
        name="text"
        rows={10}
        className="w-full rounded-md border border-gray-300 bg-gray-50 p-4 outline-none"
        placeholder="Type or paste your text here..."
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <select
        className="mt-2 w-full rounded-md p-3"
        name="separator"
        onChange={(e) => setSeparator(e.currentTarget.value)}
      >
        <option value="">Select a separator</option>
        <option value="line">Line Break</option>
        <option value="comma">Comma</option>
        <option value="space">Space 4</option>
      </select>
      <select
        className="mt-2 w-full rounded-md p-3"
        name="sortType"
        onChange={(e) => setSortType(e.currentTarget.value)}
      >
        <option value="">Select a Sort order</option>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>

      <button
        className="mt-2 flex h-12 w-full items-center justify-center rounded-md bg-tertiary text-lg font-semibold text-white"
        onClick={() => handleSort()}
      >
        Sort
      </button>
      {sortedText && (
        <div className="mt-4 flex flex-col items-center">
          <span className="text-lg font-semibold text-primary">
            Sorted words:
          </span>
          <textarea
            className="mt-4 w-full resize-y rounded-md bg-gray-200 p-4 text-xl text-gray-700 outline-none"
            readOnly
            rows={10}
            value={sortedText}
          />
        </div>
      )}
    </section>
  );
}

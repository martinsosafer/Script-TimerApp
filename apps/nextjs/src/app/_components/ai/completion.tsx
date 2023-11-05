"use client";

import { useCompletion } from "ai/react";

export default function SloganGenerator() {
  const { completion, input, handleInputChange, handleSubmit } =
    useCompletion();

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl dark:text-black"
          value={input}
          placeholder="Describe your business..."
          onChange={handleInputChange}
        />
      </form>
      {completion ? (
        <div className="my-4 whitespace-pre-wrap">{completion}</div>
      ) : (
        <div>
          Enter a business description and click enter to generate slogans.
        </div>
      )}
    </div>
  );
}

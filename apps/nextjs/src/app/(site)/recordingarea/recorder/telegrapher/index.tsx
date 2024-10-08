import React, { useState } from "react";

export default function TelegraphComponent() {
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [userText, setUserText] = useState("");

  const handleToggleTextarea = () => {
    setIsTextareaVisible(!isTextareaVisible);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(e.target.value);
  };

  const handleSubmit = () => {
    if (userText.trim() === "") {
      alert("Please enter some text.");
      return;
    }
    alert("Text uploaded successfully!");
    console.log("User's Text: ", userText);
    // You can handle saving or processing the text here.
  };

  return (
    <div className="m-auto w-full rounded-md border bg-white p-4">
      <div className="flex w-full justify-between space-y-1">
        <div>
          <p className="text-sm font-medium leading-none">Telegraph</p>
          <p className="text-sm text-muted-foreground">
            {isTextareaVisible
              ? "Paste or upload the text you want to read."
              : "Click the button to upload or paste text!"}
          </p>
        </div>
      </div>

      {isTextareaVisible && (
        <div className="mt-4 h-full rounded-md border p-2">
          <textarea
            value={userText}
            onChange={handleTextChange}
            className="h-40 w-full border p-2"
            placeholder="Paste your text here..."
          ></textarea>
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={handleToggleTextarea}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {isTextareaVisible ? "Close Text Area" : "Upload Text"}
        </button>

        {isTextareaVisible && (
          <button
            onClick={handleSubmit}
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

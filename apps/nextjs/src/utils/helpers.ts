import type { DragEvent } from "react";
import { customAlphabet } from "nanoid";

// helpers.ts

export const generateRandomString = (length = 6): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export const useDragAndDrop = (
  revisedScript: string,
  setScript: (script: string) => void,
) => {
  const handleDragStart = (event: DragEvent<HTMLTextAreaElement>) => {
    event.dataTransfer.setData("text/plain", revisedScript);
  };

  const handleDrop = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const droppedText = event.dataTransfer.getData("text/plain");
    setScript(droppedText);
  };

  const handleDragOver = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault(); // Necessary for the drop event to fire
  };

  return { handleDragStart, handleDrop, handleDragOver };
};

import type { Prompt } from "~/app/(site)/data/chat-prompts/types";
import type { Chat } from "./types";

export async function getChatHistory({
  userId,
  setChatHistory,
}: {
  userId: string | undefined;
  setChatHistory: React.Dispatch<React.SetStateAction<Chat[]>>;
}) {
  try {
    const response = await fetch("/api/chatHistory", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as Chat[];
    setChatHistory(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function replaceWordInString(
  prompt: string,
  additionalFields: Record<string, string>,
): string {
  let modiffiedPrompt = prompt;

  Object.entries(additionalFields).forEach((field) => {
    const [label, value] = field;
    const escapedLabel = escapeRegExp(label);
    const regex = new RegExp(`\\[${escapedLabel}\\]`, "g");

    modiffiedPrompt = modiffiedPrompt.replace(regex, value);
  });
  return modiffiedPrompt;
}

export function isNewPrompt(prompt?: Prompt) {
  if (!prompt?.created_at) return false;
  const today = new Date();
  const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
  const promptDate = new Date(prompt.created_at);

  return oneMonthAgo < promptDate;
}

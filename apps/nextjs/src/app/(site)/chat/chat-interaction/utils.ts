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

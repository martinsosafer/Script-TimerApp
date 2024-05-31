export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface Chat {
  id: string | null;
  title: string | undefined;
  userId: string;
  prevMessages: ChatMessage[] | null;
  messages: ChatMessage[];
}

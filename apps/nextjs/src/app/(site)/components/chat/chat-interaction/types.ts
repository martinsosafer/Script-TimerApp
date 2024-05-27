export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface Chat {
  chatId: string | null;
  chatTitle: string | undefined;
  prevMessages: ChatMessage[] | null;
  messages: ChatMessage[];
}

export interface DbPayload {
  id: string;
  title: string;
  userId: string;
  createdAt: number;
  messages: ChatMessage[];
}

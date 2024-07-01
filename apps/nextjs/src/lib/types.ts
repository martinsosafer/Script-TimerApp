import type { Message } from "ai";

export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export interface SubscriptionData {
  userId: string;
  status: string;
  planId: string | null;
}

export interface SessionData {
  name: string;
  email: string;
  id: string;
  subscription: SubscriptionData;
}

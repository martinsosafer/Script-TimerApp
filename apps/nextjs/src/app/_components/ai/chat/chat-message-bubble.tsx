import type { Message } from "ai/react";

import { Card, CardContent } from "@voiceai/ui/@/components/ui/card";

export function ChatMessageBubble(props: {
  message: Message;
  aiEmoji?: string;
}) {
  const colorClassName =
    props.message.role === "user" ? "bg-slate-500" : "bg-slate-50 text-black";
  const alignmentClassName =
    props.message.role === "user" ? "ml-auto" : "mr-auto";
  const prefix = props.message.role === "user" ? "🧑" : props.aiEmoji;
  return (
    <Card
      className={`${alignmentClassName} ${colorClassName} mb-8 flex max-w-lg rounded px-4 py-2`}
    >
      <CardContent className="space-x-4 p-4">
        <div className="flex flex-grow flex-col">
          <p className="overflow-hidden whitespace-normal break-words text-sm font-medium leading-none">
            {props.message.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

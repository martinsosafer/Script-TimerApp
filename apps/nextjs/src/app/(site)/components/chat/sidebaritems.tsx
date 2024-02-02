"use client";

import React from "react";

import { IconMessage } from "@voiceai/ui/@/components/ui/icons";

import { Chat } from "~/lib/types";

interface Message {
  id: number;
  text: string;
}

interface SidebarItemsProps {
  messages: Message[];
  userId?: string;
}

export function SidebarItems({ messages }: SidebarItemsProps) {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className="mt-2 flex items-center  overflow-hidden bg-secondary  transition duration-300 ease-in-out hover:bg-slate-500"
        >
          <div className="mt-1 h-6 w-6 flex-shrink-0">
            <IconMessage />
          </div>
          <div className="h-6 w-full flex-shrink-0 rounded-md  text-left">
            {message.text}
          </div>
        </div>
      ))}
    </>
  );
}

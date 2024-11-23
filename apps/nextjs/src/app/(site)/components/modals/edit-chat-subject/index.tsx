import { useState } from "react";

import { IconPencilLine, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import type { Chat } from "~/app/(site)/chat/chat-interaction/types";
import { editChatSubject } from "~/app/actions/newChatActions";

interface ModalProps {
  onClose: () => void;
  selectedChat: Chat | undefined;
  chatHistory: Chat[];
  setChatHistory: (value: Chat[]) => void;
}

export default function EditChatSubjectModal({
  onClose,
  selectedChat,
  chatHistory,
  setChatHistory,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newSubject = form.get("title") as string;
    if (selectedChat?.id) {
      await editChatSubject(selectedChat.id, newSubject);
    }
    const newChatHistory = chatHistory.map((chat) => {
      if (chat.id === selectedChat?.id) {
        return { ...chat, title: newSubject };
      }
      return chat;
    });

    setChatHistory(newChatHistory);
    onClose();
    setIsLoading(false);
  }
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="w-full max-w-lg rounded-lg border-4 border-blue-500 bg-white p-6 shadow-lg">
        <h2 className="mb-4 flex w-full items-center justify-center gap-2 text-2xl font-bold text-primary">
          <IconPencilLine className="h-6 w-6 text-primary" /> Edit Chat Subject
        </h2>
        <div className="my-6 w-full">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder={selectedChat?.title}
              className="mb-4 w-full rounded-md border-2 border-primary p-3 font-poppins text-lg"
            />
            <div className="flex justify-center space-x-4">
              <button
                className="flex w-[130px] items-center justify-center rounded-md border-2 border-red-500 px-6 py-3 font-poppins text-lg font-semibold text-red-500 hover:bg-red-100"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="flex w-[130px] items-center justify-center rounded-md bg-primary px-6 py-3 font-poppins text-lg font-semibold text-white hover:bg-opacity-80"
                type="submit"
              >
                {isLoading ? (
                  <IconSpinner className="h-6 w-6 animate-spin" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

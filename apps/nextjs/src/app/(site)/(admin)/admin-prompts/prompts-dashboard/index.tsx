"use client";

import { useState } from "react";

import { IconPencilLine, IconTrash } from "@voiceai/ui/@/components/ui/icons";

import AdminPromptModal from "~/app/(site)/components/modals/admin-prompt-modal";
import DeletePromptModal from "~/app/(site)/components/modals/delete-prompt";
import { api } from "~/utils/api";
import { deletePrompt } from "../actions";
import type { Prompt } from "../types";

export default function PromptsDashboard() {
  const [promptModalOpen, setPromptModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | undefined>();
  const [isDeletingPrompt, setIsDeletingPrompt] = useState(false);

  const {
    data: allPrompts,
    isLoading,
    isError,
    refetch,
  } = api.prompts.listAllPrompts.useQuery();

  return (
    <>
      <div className="mb-20 flex w-[1200px] flex-col items-center">
        <h2 className="text-2xl font-bold text-primary">Prompts Dashboard</h2>

        <button
          className="mt-8 rounded-sm bg-primary p-2 text-lg text-white"
          onClick={() => setPromptModalOpen(true)}
        >
          <span className="text-xl">+</span> Add a New Prompt
        </button>
        <div className="mt-8">
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error fetching data</div>}
          {allPrompts && allPrompts.length === 0 && <div>No prompts found</div>}
          {allPrompts && allPrompts.length > 0 && (
            <div>
              <div className="mb-2 flex w-full text-lg">
                <div className="w-[20%] p-1 font-bold">Name</div>
                <div className="w-[40%] p-1 font-bold">Description</div>
                <div className="w-[20%] p-1 font-bold">Type</div>
                <div className="w-[10%] p-1 font-bold">AI Type</div>
                <div className="w-[10%] p-1 text-center font-bold">Actions</div>
              </div>
            </div>
          )}

          {allPrompts?.map((prompt) => (
            <div key={prompt.id} className="flex w-full">
              <div className="w-[20%] border border-gray-300 p-1">
                {prompt.name}
              </div>
              <div className="w-[40%] border border-gray-300 p-1">
                {prompt.description}
              </div>
              <div className="w-[20%] border border-gray-300 p-1">
                {prompt.type}
              </div>
              <div className="w-[10%] border border-gray-300 p-1">
                {prompt.ai_model_type}
              </div>
              <div className="flex w-[10%] justify-around p-2">
                <button
                  onClick={() => {
                    setSelectedPrompt(prompt as Prompt);
                    setPromptModalOpen(true);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white"
                >
                  <IconPencilLine className="h-6 w-6" />
                </button>
                <button
                  onClick={() => {
                    setSelectedPrompt(prompt as Prompt);
                    setIsDeletingPrompt(true);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-red-500 text-white"
                >
                  <IconTrash className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {promptModalOpen && (
        <AdminPromptModal
          onClose={() => {
            setSelectedPrompt(undefined);
            setPromptModalOpen(false);
          }}
          prompt={selectedPrompt}
          refetch={refetch}
        />
      )}
      {isDeletingPrompt && (
        <DeletePromptModal
          onClose={() => setIsDeletingPrompt(false)}
          onConfirm={async () => {
            if (selectedPrompt) {
              await deletePrompt(selectedPrompt.id);
              await refetch();
              setIsDeletingPrompt(false);
            }
          }}
        />
      )}
    </>
  );
}

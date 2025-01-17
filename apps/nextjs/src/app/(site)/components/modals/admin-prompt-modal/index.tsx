import { useState } from "react";

import { IconPencilLine, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import type {
  PromptCategory,
  PromptSubcategory,
} from "~/app/(site)/(admin)/admin-prompt-categories/types";
import {
  addPrompt,
  updatePrompt,
} from "~/app/(site)/(admin)/admin-prompts/actions";
import type { Prompt } from "~/app/(site)/(admin)/admin-prompts/types";

interface ModalProps {
  onClose: () => void;
  prompt?: Prompt;
  categories: PromptCategory[] | [];
  subcategories: PromptSubcategory[] | [];
  refetch: () => void;
}

const aiTypes = ["CHAT", "IMAGE", "VOICE", "OTHER"];

export default function AdminPromptModal({
  onClose,
  prompt,
  categories,
  subcategories,
  refetch,
}: ModalProps) {
  console.log("categories", categories);
  console.log("subcategories", subcategories);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAiType, setSelectedAiType] = useState<string | undefined>(
    () => prompt?.ai_model_type,
  );
  const [selectedCategory, setSelectedCategory] = useState<
    PromptCategory | undefined
  >(() =>
    selectedAiType === "CHAT"
      ? categories.find((cat) => cat.id === prompt?.category_id)
      : undefined,
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    PromptSubcategory | undefined
  >(() =>
    selectedAiType === "CHAT"
      ? subcategories.find((cat) => cat.id === prompt?.subcategory_id)
      : undefined,
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (prompt) {
      await updatePrompt(
        form,
        prompt.id,
        selectedCategory!.id!,
        selectedSubCategory!.id!,
      );
      refetch();
      return onClose();
    }
    await addPrompt(form, selectedCategory!.id!, selectedSubCategory!.id!);
    refetch();
    onClose();
    setIsLoading(false);
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="flex flex-col items-center justify-between rounded-lg bg-white p-4">
        <h2 className="flex w-full items-center gap-2 text-xl font-semibold text-gray-800">
          {" "}
          <IconPencilLine /> Add or Edit Prompt
        </h2>
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          <div className="flex w-full gap-2">
            <div className="flex w-[300px] flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold">
                Prompt name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={prompt?.name}
                placeholder={"Prompt Name"}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="description" className="text-sm font-semibold">
                Prompt description
              </label>
              <textarea
                name="description"
                defaultValue={prompt?.description}
                placeholder={"Prompt Description"}
                rows={4}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="ai_model_type" className="text-sm font-semibold">
                AI Type
              </label>
              <select
                name="ai_model_type"
                defaultValue={prompt?.ai_model_type}
                className="w-full rounded-md border-2 border-primary p-2"
                onChange={(e) => {
                  setSelectedAiType(e.target.value);
                  setSelectedCategory(undefined);
                  setSelectedSubCategory(undefined);
                }}
              >
                <option value="" hidden>
                  Select AI Type
                </option>
                {aiTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {selectedAiType === "CHAT" && (
                <>
                  <label htmlFor="type" className="text-sm font-semibold">
                    Chat Prompt Category
                  </label>
                  <select
                    name="type"
                    defaultValue={selectedCategory?.name}
                    className="w-full rounded-md border-2 border-primary p-2"
                    disabled={selectedAiType === "CHAT" ? false : true}
                    onChange={(e) => {
                      const category = categories.find(
                        (cat) => cat.name === e.target.value,
                      );
                      setSelectedCategory(category);
                    }}
                  >
                    <option value="" hidden>
                      Select Chat Prompt Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="subtype" className="text-sm font-semibold">
                    Chat Prompt SubCategory
                  </label>
                  <select
                    name="subtype"
                    defaultValue={selectedSubCategory?.name}
                    className="w-full rounded-md border-2 border-primary p-2"
                    disabled={selectedAiType === "CHAT" ? false : true}
                    onChange={(e) => {
                      const subCategory = subcategories.find(
                        (subCat) => subCat.name === e.target.value,
                      );
                      setSelectedSubCategory(subCategory);
                    }}
                  >
                    <option value="" hidden>
                      Select Chat Prompt SubType
                    </option>

                    {selectedCategory &&
                      subcategories
                        .filter(
                          (subCat) => subCat.categoryId === selectedCategory.id,
                        )
                        .map((subCat) => (
                          <option key={subCat.id} value={subCat.name}>
                            {subCat.name}
                          </option>
                        ))}
                  </select>
                </>
              )}
            </div>
            <div className="flex w-[500px] flex-col gap-2">
              <label htmlFor="prompt_ai" className="text-sm font-semibold">
                Ai Prompt
              </label>
              <textarea
                name="prompt_ai"
                defaultValue={prompt?.prompt_ai}
                placeholder={"Ai Prompt"}
                rows={6}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="prompt_display" className="text-sm font-semibold">
                Display Prompt
              </label>
              <textarea
                name="prompt_display"
                defaultValue={prompt?.prompt_display}
                placeholder={"Prompt to Display"}
                rows={6}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="additional" className="text-sm font-semibold">
                Additional inputs, separate each item with a comma.
              </label>
              <input
                type="text"
                name="additional"
                defaultValue={prompt?.additional_fields?.join(", ")}
                placeholder={"Additional fileds"}
                className="w-full rounded-md border-2 border-primary p-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="rounded-md bg-gray-500 px-4 py-3 text-white hover:opacity-80"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex w-[140px] items-center justify-center rounded-md bg-primary px-4 py-3 text-white hover:opacity-80"
              type="submit"
            >
              {isLoading ? (
                <IconSpinner className="h-6 w-6 animate-spin" />
              ) : prompt ? (
                "Edit Prompt"
              ) : (
                "Save Prompt"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";

import { IconPencilLine, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import type {
  PromptCategory,
  PromptSubcategory,
} from "~/app/(site)/(admin)/admin-prompt-categories/types";
import {
  addCategory,
  addSubCategory,
  updateCategory,
  updateSubcategory,
} from "~/app/(site)/(admin)/admin-prompts/actions";

interface ModalProps {
  onClose: () => void;
  category?: PromptCategory | PromptSubcategory;
  isCategoryTab: boolean;
  categories: PromptCategory[] | [];
  refetch: () => void;
}

export default function AdminCategoryModal({
  onClose,
  category,
  isCategoryTab,
  categories,
  refetch,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    categories?.find((cat) => cat.id === category?.id)?.name,
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const categoryId = categories.find(
      (cat) => cat.name === selectedCategory,
    )?.id;
    if (category?.id) {
      isCategoryTab
        ? await updateCategory(form, category.id)
        : await updateSubcategory(form, categoryId!, category.id);
      refetch();
      return onClose();
    }
    isCategoryTab
      ? await addCategory(form)
      : await addSubCategory(form, categoryId!);
    refetch();
    onClose();
    setIsLoading(false);
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="flex flex-col items-center justify-between rounded-lg bg-white p-4">
        <h2 className="flex w-full items-center gap-2 text-xl font-semibold text-gray-800">
          {" "}
          <IconPencilLine />{" "}
          {isCategoryTab ? "Add or Edit Category" : "Add or Edit Sub Category"}
        </h2>
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          <div className="flex w-full gap-2">
            <div className="flex w-[300px] flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold">
                {isCategoryTab ? "Category Name" : "Subcategory name"}
              </label>
              <input
                type="text"
                name="name"
                defaultValue={category?.name}
                placeholder={
                  isCategoryTab ? "Category Name" : "Subcategory Name"
                }
                className="w-full rounded-md border-2 border-primary p-2"
              />
              {!isCategoryTab && (
                <>
                  <label
                    htmlFor="ai_model_type"
                    className="text-sm font-semibold"
                  >
                    Select parent category
                  </label>
                  <select
                    name="ai_model_type"
                    defaultValue={selectedCategory}
                    className="w-full rounded-md border-2 border-primary p-2"
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                    }}
                  >
                    <option value="" hidden>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
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
              ) : category ? (
                "Edit Category"
              ) : (
                "Save Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

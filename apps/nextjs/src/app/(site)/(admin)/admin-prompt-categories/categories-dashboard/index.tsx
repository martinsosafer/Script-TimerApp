"use client";

import { useState } from "react";

import { IconPencilLine, IconTrash } from "@voiceai/ui/@/components/ui/icons";

import AdminCategoryModal from "~/app/(site)/components/modals/admin-category-modal";
import DeletePromptModal from "~/app/(site)/components/modals/delete-prompt";
import Tabs from "~/app/(site)/components/tabs";
import { api } from "~/utils/api";
//import { deletePrompt } from "../actions";
import type { PromptCategory, PromptSubcategory } from "../types";

export default function PromptsCategoriesDashboard() {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isCategoryTab, setIsCategoryTab] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<
    PromptCategory | undefined
  >();
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    PromptSubcategory | undefined
  >();
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);

  const {
    data: allCategories,
    isLoading: loadingCategories,
    isError: errorCategories,
    refetch: refetchCategories,
  } = api.prompts.listAllPromptCategories.useQuery();

  const {
    data: allSubCategories,
    isLoading: loadingSubCategories,
    isError: errorSubCategories,
    refetch: refetchSubCategories,
  } = api.prompts.listAllPromptSunCategories.useQuery();

  const tabs = [
    {
      label: "Categories",
      action: () => setIsCategoryTab(true),
      active: isCategoryTab,
    },
    {
      label: "SubCategories",
      action: () => setIsCategoryTab(false),
      active: !isCategoryTab,
    },
  ];

  return (
    <>
      <div className="mb-20 flex w-[1200px] flex-col items-center">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Prompts Categories and SubCategories Dashboard
        </h2>

        <Tabs options={tabs} />

        <button
          className="mt-8 rounded-sm bg-primary p-2 text-lg text-white"
          onClick={() => setCategoryModalOpen(true)}
        >
          <span className="text-xl">+</span>{" "}
          {isCategoryTab ? "Add Category" : "Add Subcategory"}
        </button>

        <div className="mt-8">
          {isCategoryTab
            ? loadingCategories
            : loadingSubCategories && <div>Loading...</div>}
          {isCategoryTab
            ? errorCategories
            : errorSubCategories && <div>Error fetching data</div>}
          {isCategoryTab && allCategories && allCategories.length === 0 && (
            <div>No data found</div>
          )}
          {!isCategoryTab &&
            allSubCategories &&
            allSubCategories.length === 0 && <div>No data found</div>}
          {allCategories && allCategories.length > 0 && (
            <div>
              <div className="mb-2 flex w-full text-lg">
                <div className="w-[300px] p-1 font-bold">
                  {" "}
                  {isCategoryTab ? "Category Name" : "Subcategory Name"}
                </div>
                {!isCategoryTab && (
                  <div className="w-[300px] p-1 font-bold">Category</div>
                )}
                <div className="w-[100px] p-1 font-bold">Actions</div>
              </div>
            </div>
          )}

          {isCategoryTab
            ? allCategories?.map((category) => (
                <div key={category.id} className="flex w-full">
                  <div className="w-[300px] border border-gray-300 p-1">
                    {category.name}
                  </div>

                  <div className="flex w-[100px] justify-around p-2">
                    <button
                      onClick={() => {
                        // setSelectedPrompt(prompt as Prompt);
                        // setPromptModalOpen(true);
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white"
                    >
                      <IconPencilLine className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => {
                        // setSelectedPrompt(prompt as Prompt);
                        // setIsDeletingPrompt(true);
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-red-500 text-white"
                    >
                      <IconTrash className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))
            : allSubCategories?.map((subcategory) => (
                <div key={subcategory.id} className="flex w-full">
                  <div className="w-[300px] border border-gray-300 p-1">
                    {subcategory.name}
                  </div>
                  <div className="w-[300px] border border-gray-300 p-1">
                    {
                      allCategories?.find(
                        (cat) => cat.id === subcategory.categoryId,
                      )?.name
                    }
                  </div>
                  <div className="flex w-[100px] justify-around p-2">
                    <button
                      onClick={() => {
                        // setSelectedPrompt(prompt as Prompt);
                        // setPromptModalOpen(true);
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white"
                    >
                      <IconPencilLine className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => {
                        // setSelectedPrompt(prompt as Prompt);
                        // setIsDeletingPrompt(true);
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

      {categoryModalOpen && (
        <AdminCategoryModal
          onClose={() => {
            setSelectedCategory(undefined);
            setCategoryModalOpen(false);
          }}
          isCategoryTab={isCategoryTab}
          category={selectedCategory}
          categories={allCategories ?? []}
          refetch={isCategoryTab ? refetchCategories : refetchSubCategories}
        />
      )}
      {/* {isDeletingCategory && (
        <DeletePromptModal
          onClose={() => setIsDeletingCategory(false)}
          onConfirm={async () => {
            if (selectedCategory) {
              await deletePrompt(selectedCategory.id);
              await refetch();
              setIsDeletingCategory(false);
            }
          }}
        />
      )} */}
    </>
  );
}

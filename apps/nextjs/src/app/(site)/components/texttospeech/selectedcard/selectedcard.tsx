import React from "react";

import { IconUserRound } from "@voiceai/ui/@/components/ui/icons";

const SelectedModelCard = ({ selectedModel }) => {
  return (
    <div className="mb-2 cursor-pointer rounded-lg bg-white shadow-sm dark:bg-slate-500">
      <div className="flex items-center p-1 ">
        <div className="mr-2  h-7 w-7 flex-shrink-0 overflow-hidden rounded-full">
          {selectedModel ? (
            <img
              src={selectedModel.picture}
              alt={selectedModel.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <IconUserRound className="h-8 w-8 object-cover" />
          )}
        </div>

        <div className="flex-grow">
          <h2 className="text-sm font-semibold dark:text-secondary-foreground">
            {selectedModel ? selectedModel.name : "Choose Actor"}
          </h2>

          {selectedModel && (
            <p className="text-xs text-gray-500 dark:text-slate-100">
              {selectedModel.metadata?.labels.gender ?? "Unknown"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedModelCard;

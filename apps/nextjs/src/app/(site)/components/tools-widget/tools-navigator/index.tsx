import type { Dispatch, SetStateAction } from "react";

import { roboto } from "~/app/fonts";
import Tabs from "../../tabs";

interface ToolsNavigatorProps {
  selectedTool: string;
  setSelectedTool: Dispatch<SetStateAction<string>>;
}

export default function ToolsNavigator({
  selectedTool,
  setSelectedTool,
}: ToolsNavigatorProps) {
  const tools = [
    {
      label: "Script Timer",
      active: selectedTool === "script-timer",
      action: () => setSelectedTool("script-timer"),
    },
    {
      label: "Word Counter",
      active: selectedTool === "word-counter",
      action: () => setSelectedTool("word-counter"),
    },
    {
      label: "Auto Capitalize/Case",
      active: selectedTool === "autocapitalize",
      action: () => setSelectedTool("autocapitalize"),
    },
    {
      label: "Word Sorter",
      active: selectedTool === "word-sorter",
      action: () => setSelectedTool("word-sorter"),
    },
    {
      label: "Hemingway App Scorer",
      active: selectedTool === "grade-level",
      action: () => setSelectedTool("grade-level"),
    },
  ];

  return (
    <>
      <div className="hidden items-center justify-center gap-4 lg:flex">
        <Tabs options={tools} />
      </div>
      <select
        className={`${roboto.className}text-[16px] border-cp-primary text-cp-primary w-full rounded-[4px] border bg-white px-4 py-6 font-bold lg:hidden`}
      >
        {tools.map((tool) => (
          <option
            key={tool.label}
            value={tool.label}
            selected={tool.active}
            onClick={tool.action}
          >
            {tool.label}
          </option>
        ))}
      </select>
    </>
  );
}

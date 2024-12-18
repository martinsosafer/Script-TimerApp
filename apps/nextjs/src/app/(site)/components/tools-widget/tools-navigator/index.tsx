import type { Dispatch, SetStateAction } from "react";

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
    <div className="flex items-center justify-center gap-4">
      <Tabs options={tools} />
    </div>
  );
}

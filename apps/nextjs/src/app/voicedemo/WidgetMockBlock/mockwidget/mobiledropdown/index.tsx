import React, { useState } from "react";

import { IconChevronDown } from "@voiceai/ui/@/components/ui/icons";

interface MobileTabDropdownProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MobileTabDropdown({
  tabs,
  activeTab,
  setActiveTab,
}: MobileTabDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-cp-primary text-cp-primary flex  h-[56px] w-full items-center justify-between rounded-md border-2 bg-white px-4 py-2 text-left text-[16px] font-bold leading-[22px] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span>{activeTab}</span>
        <IconChevronDown className="h-5 w-5 text-black" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  activeTab === tab
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

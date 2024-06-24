import React, { useState } from "react";

import { IconUsers } from "@voiceai/ui/@/components/ui/icons";

interface ActorsDropdownProps {
  voices?: any[];
  setSelectedModel: React.Dispatch<React.SetStateAction<any>>;
  selectedModel: any;
}

export function ActorsDropdown({
  voices,
  setSelectedModel,
  selectedModel,
}: ActorsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const filteredVoices = voices?.filter((voice) =>
    voice.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleActorSelection = (voice: any) => {
    setSelectedModel(voice);
    toggleDropdown();
  };

  return (
    <div>
      <button
        onClick={toggleDropdown}
        className="relative inline-flex items-center p-2"
      >
        {selectedModel ? (
          <img
            src={selectedModel.picture}
            className="h-6 w-6 rounded-full"
            alt="Selected Model"
          />
        ) : (
          <IconUsers />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 h-full w-full bg-black opacity-50"></div>
          <div className="flex min-h-screen items-center px-4 py-8">
            <div className="relative mx-auto w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="text-lg font-semibold">Select Voice Model</h4>
                <button onClick={toggleDropdown}>&times;</button>
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Search actors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border px-4 py-2"
                />
                <ul className="mt-3 max-h-48 overflow-y-auto">
                  {filteredVoices?.map((voice, index) => (
                    <li key={index}>
                      <button
                        className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-200"
                        onClick={() => handleActorSelection(voice)}
                      >
                        <img
                          className="mr-2 h-6 w-6 rounded-full"
                          src={voice.picture}
                          alt={voice.name}
                        />
                        {voice.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={toggleDropdown}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

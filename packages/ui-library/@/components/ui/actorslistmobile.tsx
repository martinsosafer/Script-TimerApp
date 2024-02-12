import React from "react";

interface ActorsListMobileProps {
  isMobileOpen: boolean;
  toggleMobileDropdown: () => void;
  voices?: any[];
  setSelectedModel: React.Dispatch<React.SetStateAction<any>>;
}

export function ActorsListMobile({
  isMobileOpen,
  toggleMobileDropdown,
  voices,
  setSelectedModel,
}: ActorsListMobileProps) {
  const handleActorSelection = (name: string) => {
    toggleMobileDropdown();
  };

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 md:hidden">
          <div className="w-60 rounded-lg bg-white shadow-lg dark:bg-gray-700">
            <ul
              className="h-48 overflow-y-auto py-2 text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActorsButton"
            >
              {voices?.map((voice, index) => (
                <li key={index}>
                  <button
                    className="flex w-full items-center px-4 py-2 text-left hover:bg-primary hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleActorSelection(voice.id)}
                  >
                    <img
                      className="me-2 h-6 w-6 rounded-full"
                      src={voice.picture}
                      alt={voice.name}
                    />
                    {voice.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

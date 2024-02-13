import React from "react";

interface ActorsListProps {
  isOpen: boolean;
  toggleDropdown: () => void;
  voices?: any[];
  setSelectedModel: React.Dispatch<React.SetStateAction<any>>;
}

export function ActorsList({
  isOpen,
  toggleDropdown,
  voices,
  setSelectedModel,
}: ActorsListProps) {
  const handleActorSelection = (voice: any) => {
    setSelectedModel(voice);

    toggleDropdown();
  };

  return (
    <>
      {/* Hide on small screens */}
      {isOpen && (
        <div className="absolute right-0 top-0 z-10 mt-12 hidden w-60 rounded-lg bg-white shadow dark:bg-gray-700 sm:block">
          <ul
            className="h-48 overflow-y-auto py-2 text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUsersButton"
          >
            {voices?.map((voice, index) => (
              <li key={index}>
                <button
                  className="flex w-full items-center px-4 py-2 text-left hover:bg-primary hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleActorSelection(voice)}
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
      )}
    </>
  );
}

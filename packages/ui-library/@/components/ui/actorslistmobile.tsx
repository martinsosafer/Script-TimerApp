import React from "react";

interface ActorsListMobileProps {
  actorNames: string[];
  isMobileOpen: boolean;
  toggleMobileDropdown: () => void;
}

export function ActorsListMobile({
  actorNames,
  isMobileOpen,
  toggleMobileDropdown,
}: ActorsListMobileProps) {
  const handleActorSelection = (name: string) => {
    toggleMobileDropdown();
  };
  console.log("isMobileOpen:", isMobileOpen);

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 md:hidden">
          <div className="w-60 rounded-lg bg-white shadow-lg dark:bg-gray-700">
            <ul
              className="h-48 overflow-y-auto py-2 text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActorsButton"
            >
              {actorNames.map((name, index) => (
                <li key={index}>
                  <button
                    className="flex w-full items-center px-4 py-2 text-left hover:bg-primary hover:text-white dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleActorSelection(name)}
                  >
                    <img
                      className="me-2 h-6 w-6 rounded-full"
                      src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                      alt={name}
                    />
                    {name}
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

import React, { useEffect, useState } from "react";

import { Button } from "./button";
import { IconUsers } from "./icons";

interface ActorsDropdownProps {
  actorNames?: string[];
}

export function ActorsDropdown({
  actorNames = [
    "Jese Leos",
    "Robert Gough",
    "Bonnie Green",
    "Leslie Livingston",
    "Michael Gough",
    "Joseph Mcfall",
  ],
}: ActorsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleActorSelection = (name: string) => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Assuming small screen below 768px width
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={toggleDropdown}>
        <IconUsers />
        <span className="sr-only">Choose Actor</span>
      </Button>
      {isOpen && (
        <div
          id="dropdownUsers"
          className={`${
            isSmallScreen
              ? "fixed inset-0 flex items-center justify-center"
              : "absolute right-0 top-0"
          } z-10 mt-12 w-60 rounded-lg bg-white shadow dark:bg-gray-700`}
        >
          <ul
            className={`${
              isSmallScreen ? "pt-6" : ""
            } h-48 overflow-y-auto py-2 text-gray-700 dark:text-gray-200`}
            aria-labelledby="dropdownUsersButton"
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
      )}
    </div>
  );
}

import React, { useState } from "react";

import { ActorsList } from "./actorslist";
import { ActorsListMobile } from "./actorslistmobile";
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    toggleMobileDropdown();
  };

  const toggleMobileDropdown = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleActorSelection = (name: string) => {
    setIsOpen(false);
    setIsMobileOpen(false);
    // Do something with the selected actor
  };
  return (
    <div>
      <Button variant="ghost" size="icon" onClick={toggleDropdown}>
        <IconUsers />
        <span className="sr-only">Choose Actor</span>
      </Button>
      <ActorsList
        isOpen={isOpen}
        actorNames={actorNames}
        toggleDropdown={toggleDropdown}
      />
      <ActorsListMobile
        isMobileOpen={isMobileOpen}
        actorNames={actorNames}
        toggleMobileDropdown={toggleMobileDropdown}
      />
    </div>
  );
}

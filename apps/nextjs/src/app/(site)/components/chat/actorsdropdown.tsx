import React, { useState } from "react";

import { Button } from "@voiceai/ui";
import { ActorsList } from "@voiceai/ui/@/components/ui/actorslist";
import { ActorsListMobile } from "@voiceai/ui/@/components/ui/actorslistmobile";
import { IconUsers } from "@voiceai/ui/@/components/ui/icons";

interface ActorsDropdownProps {
  voices?: any[];
  setSelectedModel: React.Dispatch<React.SetStateAction<any>>;
}

export function ActorsDropdown({
  voices,
  setSelectedModel,
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

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={toggleDropdown}>
        <IconUsers />
        <span className="sr-only">Choose Actor</span>
      </Button>
      <ActorsList
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
        voices={voices}
        setSelectedModel={setSelectedModel}
      />
      <ActorsListMobile
        isMobileOpen={isMobileOpen}
        toggleMobileDropdown={toggleMobileDropdown}
        voices={voices}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
}

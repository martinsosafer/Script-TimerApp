import React, { useState } from "react";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@voiceai/ui";
import { ActorsList } from "@voiceai/ui/@/components/ui/actorslist";
import { ActorsListMobile } from "@voiceai/ui/@/components/ui/actorslistmobile";
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
      <Tooltip>
        <TooltipTrigger>
          <TooltipContent>Choose your voice model</TooltipContent>
          <Button variant="ghost" size="icon" onClick={toggleDropdown}>
            {selectedModel ? (
              <img
                src={selectedModel.picture}
                className="h-6 w-6 rounded-full"
                alt="Selected Model"
              />
            ) : (
              <IconUsers />
            )}
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
          <TooltipContent>Choose your voice model</TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </div>
  );
}

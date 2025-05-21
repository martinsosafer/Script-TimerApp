import { useState } from "react";
import Link from "next/link";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import ReactConfetti from "react-confetti";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@voiceai/ui";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import {
  CorrectDocumentIcon,
  IconClose,
  IconPlus,
  Icons,
  PencilIcon,
  BurgerIcon as MenuIcon,
} from "@voiceai/ui/@/components/ui/icons";
import { TabsList, TabsTrigger } from "@voiceai/ui/@/components/ui/tabs";
import { MagicWandIcon, SpeakerLoudIcon } from "@voiceai/ui/@/icons/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@voiceai/ui/@/components/ui/dropdown-menu";

import { HistoryButton } from "../../../history-button";
import { SaveScript } from "../../../save-script";
import { ScriptSelector } from "../../../script-selector";
import { ToggleAudio } from "../../../toggle-audio";
import { ToggleLibrary } from "../../../toggle-voice-library";
import { SpeedButton } from "./speedbutton";

const ButtonsMenu = ({
  script,
  subData,
  richContent,
  setOpenFreeModal,
  toggleAudioRef,
  audio,
  isSubscriptionActive,
  audioRef,
  showPlayer,
  downloadLink,
  loading,
  setShowConfetti,
  handleCloseAudio,
  showConfetti,
}) => {
  return (
    <div className="ml-auto flex w-full lg:w-auto space-x-1 lg:space-x-2">
      {/* Mobile menu - dropdown for smaller screens */}
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="px-2">
              <MenuIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/texttovoice" className="w-full">
                <IconPlus className="mr-2 h-4 w-4" />
                New Script
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={subData ? undefined : () => setOpenFreeModal(true)}
            >
              <SaveScript
                script={script}
                subData={subData?.status}
                richContent={richContent}
                mobile
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HistoryButton
                subData={subData?.status}
                setOpenFreeModal={() => setOpenFreeModal(true)}
                mobile
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={subData ? undefined : () => setOpenFreeModal(true)}
            >
              <Icons.SoundLibrary className="mr-2 h-4 w-4" />
              Library
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop buttons - hidden on mobile */}
      <Tooltip>
        <TooltipTrigger className="hidden lg:block">
          <Link href="/texttovoice">
            <Button
              type="button"
              size="sm"
              className="rounded-xl bg-primary px-2 font-bold"
            >
              <IconPlus className="mr-2 h-4 w-4" />
              <span className="hidden lg:inline">New Script</span>
              <span className="sr-only">Library</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>Start a new fresh story</TooltipContent>
      </Tooltip>

      <div className="hidden lg:block">
        <ScriptSelector script={script} />
      </div>

      <Tooltip>
        <TooltipTrigger className="hidden lg:block">
          <button onClick={subData ? undefined : () => setOpenFreeModal(true)}>
            <SaveScript
              script={script}
              subData={subData?.status}
              richContent={richContent}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>Save a favorite script for later</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger className="hidden lg:block">
          <HistoryButton
            subData={subData?.status}
            setOpenFreeModal={() => setOpenFreeModal(true)}
          />
        </TooltipTrigger>
        <TooltipContent>Your full voice-over history</TooltipContent>
      </Tooltip>

      {/* Always visible buttons (mobile and desktop) */}
      <Tooltip>
        <TooltipTrigger>
          {subData ? (
            <ToggleLibrary />
          ) : (
            <Button
              type="button"
              size="sm"
              className="rounded-xl bg-primary px-2 lg:px-3 font-bold hover:text-tertiary"
              onClick={() => setOpenFreeModal(true)}
            >
              <Icons.SoundLibrary className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Library</span>
              <span className="sr-only">Library</span>
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>Voice actor library</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          {subData ? (
            <ToggleAudio
              ref={toggleAudioRef}
              audio={audio}
              isSubscriptionActive={isSubscriptionActive}
            />
          ) : (
            <Button
              type="button"
              size="sm"
              className="rounded-xl bg-primary px-2 lg:px-3 font-bold hover:text-tertiary"
              onClick={subData ? undefined : () => setOpenFreeModal(true)}
            >
              <MagicWandIcon className="h-4 w-4" />
              <span className="sr-only">Player</span>
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>Open the voice player</TooltipContent>
      </Tooltip>

      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {subData ? (
              <TabsList className="grid grid-cols-2 bg-slate-300">
                <TabsTrigger
                  value="complete"
                  className="flex items-center justify-center rounded-full data-[state=active]:bg-primary"
                >
                  <span className="sr-only">Complete</span>
                  <PencilIcon className="h-4 w-4 text-primary-foreground" />
                </TabsTrigger>
                <TabsTrigger
                  value="insert"
                  className="flex items-center justify-center rounded-full data-[state=active]:bg-primary"
                >
                  <span className="sr-only">Insert</span>
                  <CorrectDocumentIcon className="h-4 w-4 text-primary-foreground" />
                </TabsTrigger>
              </TabsList>
            ) : (
              <button
                className="flex h-full items-center justify-around rounded-xl bg-slate-300 px-2 font-bold"
                onClick={() => setOpenFreeModal(true)}
              >
                <div className="flex h-6 w-10 items-center justify-center rounded-full bg-primary">
                  <span className="sr-only">Complete</span>
                  <PencilIcon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex h-6 w-10 items-center justify-center rounded-full data-[state=active]:bg-primary">
                  <span className="sr-only">Insert</span>
                  <CorrectDocumentIcon className="h-4 w-4 text-primary-foreground" />
                </div>
              </button>
            )}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-[320px] text-sm" side="left">
          Click to open grammar, spelling and script suggestions.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default ButtonsMenu;

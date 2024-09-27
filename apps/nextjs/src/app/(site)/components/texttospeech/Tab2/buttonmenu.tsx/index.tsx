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
} from "@voiceai/ui/@/components/ui/icons";
import { TabsList, TabsTrigger } from "@voiceai/ui/@/components/ui/tabs";
import { MagicWandIcon, SpeakerLoudIcon } from "@voiceai/ui/@/icons/icons";

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
    <div className="ml-auto flex w-full space-x-2 sm:justify-end">
      <Tooltip>
        <TooltipTrigger>
          <Link href="/texttovoice">
            <Button
              type="button"
              size="sm"
              className="rounded-xl bg-primary px-2 font-bold"
            >
              <IconPlus className="mr-2 h-4 w-4" />
              New Script
              <span className="sr-only">Library</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>Start a new fresh story</TooltipContent>
      </Tooltip>

      <ScriptSelector script={script} />

      <Tooltip>
        <TooltipTrigger>
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
        <TooltipTrigger>
          <HistoryButton
            subData={subData?.status}
            setOpenFreeModal={() => setOpenFreeModal(true)}
          />
        </TooltipTrigger>
        <TooltipContent>Your full voice-over history</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          {subData ? (
            <ToggleLibrary />
          ) : (
            <Button
              type="button"
              size="sm"
              className="rounded-xl bg-primary px-3 font-bold hover:text-tertiary"
              onClick={() => setOpenFreeModal(true)}
            >
              <Icons.SoundLibrary className="mr-2 h-4 w-4" />
              Library
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
              className="rounded-xl bg-primary px-3 font-bold hover:text-tertiary"
              onClick={subData ? undefined : () => setOpenFreeModal(true)}
            >
              <MagicWandIcon />
              <SpeakerLoudIcon />
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

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
  const containerStyle = {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: "500px", // Reduced size
    width: "100%",
    height: "80px", // Reduced height
    backgroundColor: "#3B82F6",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderRadius: "8px",
    zIndex: 1000,
    opacity: showPlayer ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
    border: "1px solid black", // Subtle black border
  };

  const audioStyle = {
    flex: 1,
    height: "50px", // Slightly smaller height
    backgroundColor: "transparent",
    border: "none",
  };

  const buttonStyle = {
    backgroundColor: "#F97316",
    border: "1px solid black", // Subtle black border
    borderRadius: "4px", // Square corners
    color: "white",
    padding: "8px", // Padding around the icon
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
    width: "40px", // Square size
    height: "40px", // Square size
    marginLeft: "4px",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#e76f00", // Darker on hover
  };
  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f7a07a", // Lighter orange
    cursor: "not-allowed",
    opacity: 0.6,
  };

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
          <div style={containerStyle}>
            <audio ref={audioRef} controls="controls" style={audioStyle} />
            {showPlayer && (
              <div
                className="controls-container"
                style={{ display: "flex", gap: "10px" }}
              >
                {/* Speed Button */}
                <SpeedButton
                  audioRef={audioRef}
                  buttonStyle={buttonStyle}
                  buttonHoverStyle={buttonHoverStyle}
                  disabledButtonStyle={disabledButtonStyle}
                />

                {/* Download Button */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button
                      onClick={() => {
                        if (downloadLink && isSubscriptionActive) {
                          const anchor = document.createElement("a");
                          anchor.href = downloadLink;
                          anchor.download = "audio.mp3";
                          anchor.click();
                          URL.revokeObjectURL(downloadLink);
                          setShowConfetti(true);
                        }
                      }}
                      disabled={
                        !downloadLink || !isSubscriptionActive || loading
                      }
                      style={
                        !isSubscriptionActive
                          ? disabledButtonStyle
                          : buttonStyle
                      }
                      onMouseOver={(e) =>
                        !isSubscriptionActive || loading
                          ? null
                          : (e.currentTarget.style.backgroundColor =
                              buttonHoverStyle.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        !isSubscriptionActive || loading
                          ? null
                          : (e.currentTarget.style.backgroundColor =
                              buttonStyle.backgroundColor)
                      }
                    >
                      {loading ? (
                        <Icons.spinner
                          className="h-6 w-6"
                          style={{ color: "white" }}
                        />
                      ) : (
                        <ArrowDownOnSquareIcon
                          width={24}
                          style={{ color: "white" }}
                        />
                      )}
                    </button>
                  </HoverCardTrigger>
                  {!isSubscriptionActive && (
                    <HoverCardContent
                      className="w-[320px] text-sm"
                      side="right"
                    >
                      Free users can't download audio files.
                    </HoverCardContent>
                  )}
                </HoverCard>

                {/* Close Button */}
                <button
                  onClick={handleCloseAudio}
                  style={buttonStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      buttonHoverStyle.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      buttonStyle.backgroundColor)
                  }
                >
                  <IconClose width={24} style={{ color: "white" }} />
                </button>
              </div>
            )}
            {showConfetti && (
              <ReactConfetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={1000}
                recycle={false}
                gravity={0.1}
                initialVelocityX={2}
                initialVelocityY={10}
                colors={["#0123e7", "#eb8806"]}
              />
            )}
          </div>
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

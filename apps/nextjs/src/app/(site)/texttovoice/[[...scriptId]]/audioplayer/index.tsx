"use client";

import * as React from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { Icons } from "@voiceai/ui/@/components/ui/icons";

import { SpeedButton } from "~/app/(site)/components/texttospeech/Tab2/buttonmenu.tsx/speedbutton";

interface AudioControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  downloadLink: string | null;
  loading: boolean;
  isSubscriptionActive: boolean;
  setShowConfetti: (show: boolean) => void;
}

export function AudioPlayerControls({
  audioRef,
  downloadLink,
  loading,
  isSubscriptionActive,
  setShowConfetti,
}: AudioControlsProps) {
  const buttonBaseStyle = {
    backgroundColor: "#1E88E5",
    border: "none",
    borderRadius: "8px",
    color: "white",
    padding: "8px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
    width: "40px",
    height: "40px",
    marginLeft: "8px",
  };

  const buttonHoverStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#1976D2",
  };

  const disabledButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: "#90CAF9",
    cursor: "not-allowed",
    opacity: 0.6,
  };

  return (
    <div
      className="mt-14"
      style={{
        position: "relative",
        bottom: "27px",
        left: "47%",
        transform: "translateX(-50%)",
        maxWidth: "1000px",
        width: "100%",
        height: "60px",
        backgroundColor: "#BDF3F0",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 15px",
        borderRadius: "8px",
        zIndex: 0,
        opacity: 1,
        transition: "opacity 0.5s ease-in-out",
        border: "none",
      }}
    >
      <audio
        ref={audioRef}
        controls
        style={{
          flex: 1,
          height: "40px",
          backgroundColor: "transparent",
          border: "none",
        }}
      />
      <div
        className="controls-container"
        style={{ display: "flex", gap: "10px" }}
      >
        <SpeedButton
          audioRef={audioRef}
          buttonStyle={buttonBaseStyle}
          buttonHoverStyle={buttonHoverStyle}
          disabledButtonStyle={disabledButtonStyle}
        />
        <HoverCard>
          <HoverCardTrigger asChild>
            <button
              onClick={() => {
                if (downloadLink) {
                  const anchor = document.createElement("a");
                  anchor.href = downloadLink;
                  anchor.download = "audio.mp3";
                  anchor.click();
                  URL.revokeObjectURL(downloadLink);
                  setShowConfetti(true);
                }
              }}
              disabled={loading || !downloadLink}
              style={
                !downloadLink || loading ? disabledButtonStyle : buttonBaseStyle
              }
              onMouseOver={(e) => {
                if (!downloadLink || loading) return;
                e.currentTarget.style.backgroundColor =
                  buttonHoverStyle.backgroundColor!;
              }}
              onMouseOut={(e) => {
                if (!downloadLink || loading) return;
                e.currentTarget.style.backgroundColor =
                  buttonBaseStyle.backgroundColor!;
              }}
            >
              {loading ? (
                <Icons.spinner className="h-6 w-6" style={{ color: "white" }} />
              ) : (
                <ArrowDownOnSquareIcon width={24} style={{ color: "white" }} />
              )}
            </button>
          </HoverCardTrigger>
          {!isSubscriptionActive && (
            <HoverCardContent className="w-[200px] text-sm" side="left">
              Download audio file.
            </HoverCardContent>
          )}
        </HoverCard>
      </div>
    </div>
  );
}

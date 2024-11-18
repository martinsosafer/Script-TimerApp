"use client";

import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";

import { Button } from "@voiceai/ui";
import {
  IconCameraVideo,
  IconCircleStop,
  IconSilence,
  IconStop,
} from "@voiceai/ui/@/components/ui/icons";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

export default function ScreenRecorder() {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true });

  const webcamRef = useRef<Webcam | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handlePauseResume = () => {
    if (isPaused) {
      resumeRecording();
    } else {
      pauseRecording();
    }
    setIsPaused(!isPaused);
  };

  const enablePictureInPicture = async () => {
    try {
      if (webcamRef.current && webcamRef.current.video) {
        await webcamRef.current.video.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Failed to enable Picture-in-Picture:", error);
    }
  };

  const disablePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      console.error("Failed to disable Picture-in-Picture:", error);
    }
  };

  const downloadRecording = () => {
    if (mediaBlobUrl) {
      const a = document.createElement("a");
      a.href = mediaBlobUrl;
      a.download = "screen-recording.mp4";
      a.click();
    }
  };

  return (
    <div className="relative mx-auto flex h-screen max-w-xl flex-col items-center rounded-lg bg-gray-100 p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-semibold">
        Screen Recorder
      </h2>
      <p className="mb-4 text-lg">
        Status: <span className="font-bold">{status}</span>
      </p>

      <div className="mb-4 flex flex-wrap justify-center space-x-3">
        <Button onClick={startRecording} variant="default">
          <IconCameraVideo className="mr-2 h-4 w-4" />
          Start Screen Recorder
        </Button>
        <Button onClick={handlePauseResume} variant="default">
          <IconStop className="mr-2 h-4 w-4" />
          {isPaused ? "Resume Recording" : "Pause Recording"}
        </Button>
        <Button onClick={stopRecording} variant="destructive">
          <IconCircleStop className="mr-2 h-4 w-4" />
          Stop Recording
        </Button>
        {mediaBlobUrl && (
          <Button onClick={downloadRecording} variant="default">
            <PlayIcon className="mr-2 h-4 w-4" />
            Download Recording
          </Button>
        )}
      </div>

      <div className="mb-4 flex flex-wrap justify-center space-x-3">
        <Button onClick={enablePictureInPicture} variant="default">
          <IconCameraVideo className="mr-2 h-4 w-4" />
          Enable Webcam (PiP)
        </Button>
        <Button onClick={disablePictureInPicture} variant="outline">
          <IconStop className="mr-2 h-4 w-4" />
          Exit Webcam (PiP)
        </Button>
      </div>

      {mediaBlobUrl && (
        <div className="mt-6 w-full">
          <video
            src={mediaBlobUrl}
            controls
            autoPlay
            loop
            className="h-auto w-full rounded-lg border shadow-lg"
          />
        </div>
      )}

      <div
        className="fixed bottom-4 right-4 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg"
        style={{ zIndex: 9999 }}
      >
        <Draggable>
          <Webcam
            ref={webcamRef}
            className="h-full w-full rounded-full object-cover"
          />
        </Draggable>
      </div>
    </div>
  );
}

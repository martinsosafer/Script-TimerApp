import React, { useRef } from "react";
import Draggable from "react-draggable";
import Webcam from "react-webcam";

import { Button } from "@voiceai/ui";
import { IconStop, IconVideoCamera } from "@voiceai/ui/@/components/ui/icons";

export function WebcamPreview() {
  const webcamRef = useRef<Webcam | null>(null);

  const enablePictureInPicture = async () => {
    try {
      if (webcamRef.current?.video) {
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

  return (
    <>
      <div className="mb-4 flex flex-wrap justify-center space-x-3">
        <Button onClick={enablePictureInPicture} variant="default">
          <IconVideoCamera className="mr-2 h-4 w-4" />
          Enable Webcam (PiP)
        </Button>
        <Button onClick={disablePictureInPicture} variant="outline">
          <IconStop className="mr-2 h-4 w-4" />
          Exit Webcam (PiP)
        </Button>
      </div>
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
    </>
  );
}

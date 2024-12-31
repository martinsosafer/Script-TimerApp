import { useCallback, useState } from "react";
import { upload } from "@vercel/blob/client";
import { useReactMediaRecorder } from "react-media-recorder";

export function useScreenRecorder(userId: string | undefined) {
  const [isPaused, setIsPaused] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({ screen: true, audio: true });

  const handleStartRecording = useCallback(() => {
    startRecording();
  }, [startRecording]);

  const handleStopRecording = useCallback(() => {
    stopRecording();
  }, [stopRecording]);

  const handlePauseResume = useCallback(() => {
    if (isPaused) {
      resumeRecording();
    } else {
      pauseRecording();
    }
    setIsPaused(!isPaused);
  }, [isPaused, pauseRecording, resumeRecording]);

  const uploadToVercelBlob = useCallback(
    async (blob: Blob) => {
      try {
        const filename = `RecordedScreen/${userId}/recording-${Date.now()}.mp4`;
        const uploadedFile = await upload(filename, blob, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });

        setUploadUrl(uploadedFile.url);
        return uploadedFile.url;
      } catch (error) {
        console.error("Error uploading to Vercel Blob:", error);
        alert("Failed to upload recording. Please try again.");
        return null;
      }
    },
    [userId],
  );

  return {
    status,
    isPaused,
    mediaBlobUrl,
    uploadUrl,
    handleStartRecording,
    handleStopRecording,
    handlePauseResume,
    uploadToVercelBlob,
    clearBlobUrl,
  };
}

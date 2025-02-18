import { useCallback, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { useReactMediaRecorder } from "react-media-recorder";

export function useScreenRecorder(userId: string | undefined) {
  const [isPaused, setIsPaused] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isProcessingWhisper, setIsProcessingWhisper] = useState(false);
  const [whisperTranscription, setWhisperTranscription] = useState<
    string | null
  >(null);
  const recordingBlobRef = useRef<Blob | null>(null);

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({
    screen: true,
    audio: true,
    onStop: (blobUrl, blob) => {
      recordingBlobRef.current = blob;
      processWhisperTranscription(blob);
    },
  });

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

  const processWhisperTranscription = async (blob: Blob) => {
    setIsProcessingWhisper(true);
    try {
      // Extract audio from the video blob
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(
        await blob.arrayBuffer(),
      );
      const audioBlob = await new Promise<Blob>((resolve) => {
        const dest = audioContext.createMediaStreamDestination();
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(dest);
        const mediaRecorder = new MediaRecorder(dest.stream);
        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () =>
          resolve(new Blob(chunks, { type: "audio/webm" }));
        mediaRecorder.start();
        source.start(0);
        setTimeout(() => mediaRecorder.stop(), audioBuffer.duration * 1000);
      });

      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");

      const response = await fetch("/api/live-transcription", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      console.log("Whisper Transcription:", result.transcription);
      setWhisperTranscription(result.transcription);
    } catch (error) {
      console.error("Error in Whisper transcription:", error);
      alert("Failed to process audio with Whisper.");
    } finally {
      setIsProcessingWhisper(false);
    }
  };

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
    isProcessingWhisper,
    whisperTranscription,
    handleStartRecording,
    handleStopRecording,
    handlePauseResume,
    uploadToVercelBlob,
    clearBlobUrl,
  };
}

import { useCallback, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

export function useWebcamRecorder(userId: string | undefined) {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        videoChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          videoChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const videoBlob = new Blob(videoChunksRef.current, {
            type: "video/webm",
          });
          setVideoBlob(videoBlob);
          setVideoUrl(URL.createObjectURL(videoBlob));
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Microphone and camera access error: ", error);
        alert("Microphone and camera access are required to record.");
        setIsRecording(false);
      });
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const uploadToVercelBlob = useCallback(
    async (blob: Blob) => {
      try {
        const filename = `RecordedWebcam/${userId}/recording-${Date.now()}.webm`;
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
    isRecording,
    videoUrl,
    videoBlob,
    timer,
    uploadUrl,
    videoRef,
    startRecording,
    stopRecording,
    uploadToVercelBlob,
  };
}

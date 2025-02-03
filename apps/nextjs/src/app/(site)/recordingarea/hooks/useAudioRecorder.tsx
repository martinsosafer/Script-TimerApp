import { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

export function useAudioRecorder(
  userId: string | undefined,
  audioDurationLimit: number,
) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isProcessingWhisper, setIsProcessingWhisper] = useState(false);
  const [whisperTranscription, setWhisperTranscription] = useState<
    string | null
  >(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimerUpdateRef = useRef<number>(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedMicrophone, setSelectedMicrophone] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const constraints = {
      audio: selectedMicrophone
        ? { deviceId: { exact: selectedMicrophone } }
        : true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
      })
      .catch((error) => {
        console.error("Microphone access error:", error);
      });

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [selectedMicrophone]);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    lastTimerUpdateRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTimerUpdateRef.current;
      setTimer((prevTimer) => prevTimer + Math.floor(elapsed / 1000));
      lastTimerUpdateRef.current = now;
    }, 1000);
  }, []);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const resumeTimer = useCallback(() => {
    lastTimerUpdateRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTimerUpdateRef.current;
      setTimer((prevTimer) => prevTimer + Math.floor(elapsed / 1000));
      lastTimerUpdateRef.current = now;
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimer(0);
  }, []);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setIsPaused(false);
    setTimer(0);
    startTimer();

    const constraints = {
      audio: selectedMicrophone
        ? { deviceId: { exact: selectedMicrophone } }
        : true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
        mediaRecorderRef.current = new MediaRecorder(mediaStream, {
          mimeType: "audio/webm",
        });
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          setAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Microphone access error: ", error);
        alert("Microphone access is required to record audio.");
        setIsRecording(false);
        stopTimer();
      });
  }, [selectedMicrophone, startTimer]);

  const pauseRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      pauseTimer();
    }
  }, [pauseTimer]);

  const resumeRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      resumeTimer();
    }
  }, [resumeTimer]);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();

      await new Promise<void>((resolve) => {
        mediaRecorderRef.current!.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });

          const formData = new FormData();
          formData.append("file", audioBlob, "recording.webm");

          setIsProcessingWhisper(true);
          try {
            const response = await fetch("/api/live-transcription", {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              throw new Error(await response.text());
            }

            const result = await response.json();
            setWhisperTranscription(result.transcription);
          } catch (error) {
            console.error("Error in Whisper transcription:", error);
            alert(
              "Failed to process audio with Whisper. Using speech recognition result instead.",
            );
          } finally {
            setIsProcessingWhisper(false);
          }

          setAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
          resolve();
        };
      });
    }
  }, [stopTimer]);

  const uploadToVercelBlob = useCallback(
    async (blob: Blob, customName: string) => {
      try {
        // Sanitize the custom name to remove invalid characters
        const sanitizedName = customName.replace(/[^a-zA-Z0-9]/g, "_");
        const filename = `RecordedAudio/${userId}/${sanitizedName}.mp4`;

        const uploadedFile = await upload(filename, blob, {
          access: "public",
          handleUploadUrl: "/api/uploadspeech",
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

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (isRecording && !isPaused && timer >= audioDurationLimit) {
      stopRecording();
    }
  }, [timer, isRecording, isPaused, audioDurationLimit, stopRecording]);
  return {
    isRecording,
    audioUrl,
    audioBlob,
    timer,
    uploadUrl,
    isProcessingWhisper,
    startRecording,
    whisperTranscription,
    stopRecording,
    uploadToVercelBlob,
    selectedMicrophone,
    setSelectedMicrophone,
    stream,
    pauseRecording,
    resumeRecording,
    isPaused,
  };
}

import { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

export function useWebcamRecorder(userId: string | undefined) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isProcessingWhisper, setIsProcessingWhisper] = useState(false);
  const [whisperTranscription, setWhisperTranscription] = useState<
    string | null
  >(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [selectedWebcam, setSelectedWebcam] = useState<string | null>(null);
  const [selectedMicrophone, setSelectedMicrophone] = useState<string | null>(
    null,
  );
  useEffect(() => {
    const constraints = {
      audio: selectedMicrophone
        ? { deviceId: { exact: selectedMicrophone } }
        : true,
      video: selectedWebcam ? { deviceId: { exact: selectedWebcam } } : true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
      })
      .catch((error) => {
        console.error("Webcam access error:", error);
      });

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [selectedMicrophone, selectedWebcam]);
  const startRecording = useCallback(() => {
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    const constraints = {
      audio: selectedMicrophone
        ? { deviceId: { exact: selectedMicrophone } }
        : true,
      video: selectedWebcam ? { deviceId: { exact: selectedWebcam } } : true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
        mediaRecorderRef.current = new MediaRecorder(mediaStream, {
          mimeType: "video/webm",
        });
        recordingChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          recordingChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const recordingBlob = new Blob(recordingChunksRef.current, {
            type: "video/webm",
          });
          setRecordingBlob(recordingBlob);
          const recordingUrl = URL.createObjectURL(recordingBlob);
          setRecordingUrl(recordingUrl);
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Webcam and microphone access error: ", error);
        alert("Webcam and microphone access is required to record.");
        setIsRecording(false);
      });
  }, [selectedWebcam, selectedMicrophone]);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      await new Promise<void>((resolve) => {
        mediaRecorderRef.current!.onstop = async () => {
          const recordingBlob = new Blob(recordingChunksRef.current, {
            type: "video/webm",
          });

          // Extract audio from the video blob
          const audioContext = new AudioContext();
          const audioBuffer = await audioContext.decodeAudioData(
            await recordingBlob.arrayBuffer(),
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

          // Create and set video URL before processing whisper
          setRecordingBlob(recordingBlob);
          const videoUrl = URL.createObjectURL(recordingBlob);
          setRecordingUrl(videoUrl);

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
            alert(
              "Failed to process audio with Whisper. Using speech recognition result instead.",
            );
          } finally {
            setIsProcessingWhisper(false);
          }

          resolve();
        };
      });

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Don't stop the stream immediately to allow for another recording
      // Only stop tracks if component is unmounting or user changes devices
    }
  }, []);

  const uploadToVercelBlob = useCallback(
    async (blob: Blob) => {
      try {
        const filename = `RecordedVideo/${userId}/recording-${Date.now()}.webm`;
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
    recordingUrl,
    recordingBlob,
    timer,
    uploadUrl,
    isProcessingWhisper,
    startRecording,
    whisperTranscription,
    stopRecording,
    uploadToVercelBlob,
    selectedWebcam,
    setSelectedWebcam,
    selectedMicrophone,
    setSelectedMicrophone,
    stream,
  };
}

"use client";

import { useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

import { IconMic2 } from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";
import { formatTime } from "~/lib/formattime";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function MicrophoneComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [completeTranscript, setCompleteTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [summary, setSummary] = useState("");
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startRecording = () => {
    setTranscript("");
    setCompleteTranscript("");
    setIsRecording(true);
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    try {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const currentTranscript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            setCompleteTranscript((prev) => prev + currentTranscript + " ");
          } else {
            interimTranscript += currentTranscript;
          }
        }

        setTranscript(interimTranscript);
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error("Speech recognition error: ", error);
      alert(
        "Your browser does not support speech recognition. Please use Chrome.",
      );
      setIsRecording(false);
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
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
      });
  };
  const uploadToVercelBlob = async (blob: Blob) => {
    try {
      const filename = `recording-${Date.now()}.wav`;
      const formData = new FormData();
      formData.append("file", blob, filename);

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
  };
  const stopRecording = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();

      // Wait for the mediaRecorder onstop event to complete
      await new Promise<void>((resolve) => {
        mediaRecorderRef.current!.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          setAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);

          // Upload to Vercel Blob
          const uploadedUrl = await uploadToVercelBlob(audioBlob);
          if (uploadedUrl) {
            console.log("Recording uploaded successfully:", uploadedUrl);
          }

          resolve();
        };
      });
    }
    setIsRecording(false);
    setIsPaused(true);
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleDownload = () => {
    if (audioBlob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(audioBlob);
      link.download = "recording.wav";
      link.click();
    }
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(completeTranscript);
    alert("Transcript copied to clipboard!");
  };

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/getSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: completeTranscript,
          type: "summary",
        }),
      });
      const data = await response.json();
      setSummary(data.content);
    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Failed to generate summary. Please try again.");
    }
    setIsLoading(false);
  };

  const handleGenerateBulletPoints = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/getSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: completeTranscript,
          type: "bullet-points",
        }),
      });
      const data = await response.json();
      setBulletPoints(data.content);
    } catch (error) {
      console.error("Error generating bullet points:", error);
      alert("Failed to generate bullet points. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`mb-20 flex h-full w-full items-center justify-center  bg-gray-100 ${poppins.className}`}
    >
      <div className="w-2/3 space-y-4 rounded-lg bg-white p-6 shadow-md">
        <div className="flex flex-col items-center justify-center ">
          <h2 className="mb-4 font-poppins text-[28px] font-bold leading-[24px]">
            Record yourself!
          </h2>

          <p className="mb-4 text-sm text-gray-700">
            Please record your voice for an optimal time. For best results,
            ensure your microphone is of good quality, and avoid background
            noise.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium leading-none">Recorder</p>
            <p className="text-sm text-gray-500">
              {isRecording
                ? "Recording..."
                : "Press the button to start recording!"}
            </p>
          </div>
          {isRecording && (
            <div className="mt-2 h-4 w-4 animate-pulse rounded-full bg-red-400" />
          )}
        </div>
        <div className="mt-4 flex w-full justify-center">
          <button
            onClick={handleToggleRecording}
            className="hover:bg-primary-dark flex w-full items-center justify-center rounded-md bg-primary py-2 font-semibold text-white focus:outline-none"
          >
            <div className="mr-2 flex items-center justify-center">
              {isRecording ? (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                  />
                </svg>
              )}
            </div>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>

        {isRecording && (
          <div className="mt-2 text-center text-gray-700">
            Recording... {formatTime(timer)}
          </div>
        )}
        <div className="mt-4 h-full rounded-md border p-2">
          <textarea
            className="h-40 w-full border p-2"
            value={completeTranscript + transcript}
            readOnly
            placeholder="Transcript will appear here..."
          />
        </div>
        {uploadUrl && (
          <div className="mt-2 text-sm text-gray-600">
            Recording uploaded successfully!
            <a
              href={uploadUrl}
              className="ml-2 text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View uploaded file
            </a>
          </div>
        )}
        {audioUrl && (
          <div className="mt-6 text-center">
            <audio controls src={audioUrl} className="w-full" />
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handleDownload}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
              >
                Download Recording
              </button>
              <button
                onClick={handleCopyTranscript}
                className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
              >
                Copy Transcript
              </button>
              <button
                onClick={handleGenerateSummary}
                className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-400"
                disabled={isLoading}
              >
                Generate Summary
              </button>
              <button
                onClick={handleGenerateBulletPoints}
                className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-400"
                disabled={isLoading}
              >
                Generate Bullet Points
              </button>
            </div>
          </div>
        )}

        {isLoading && <p className="mt-4 text-center">Processing...</p>}

        {summary && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Summary:</h3>
            <p className="mt-2">{summary}</p>
          </div>
        )}

        {bulletPoints.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Key Points:</h3>
            <ul className="mt-2 list-disc pl-5">
              {bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

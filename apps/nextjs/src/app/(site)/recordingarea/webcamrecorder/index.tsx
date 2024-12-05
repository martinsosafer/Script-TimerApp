"use client";

import { useEffect, useRef, useState } from "react";

import { poppins } from "~/app/fonts";
import { formatTime } from "~/lib/formattime";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function MicrophoneAndWebcamComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [completeTranscript, setCompleteTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [summary, setSummary] = useState("");
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startRecording = () => {
    setTranscript("");
    setCompleteTranscript("");
    setIsRecording(true);
    setIsPaused(false);
    timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);

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
      alert("Your browser does not support speech recognition. Use Chrome.");
      setIsRecording(false);
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
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
          const videoBlob = new Blob(audioChunksRef.current, {
            type: "video/webm",
          });
          setVideoUrl(URL.createObjectURL(videoBlob));
        };
        mediaRecorderRef.current.start();
      })
      .catch(() => {
        alert("Microphone and camera access are required to record.");
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    setIsRecording(false);
    setIsPaused(true);
    clearInterval(timerRef.current!);
    setTimer(0);
  };

  const handleToggleRecording = () => {
    if (!isRecording) startRecording();
    else stopRecording();
  };

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/getSummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: completeTranscript,
          type: "summary",
        }),
      });
      const data = await response.json();
      setSummary(data.content);
    } catch {
      alert("Failed to generate summary.");
    }
    setIsLoading(false);
  };

  const handleGenerateBulletPoints = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/getSummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: completeTranscript,
          type: "bullet-points",
        }),
      });
      const data = await response.json();
      setBulletPoints(data.content);
    } catch {
      alert("Failed to generate bullet points.");
    }
    setIsLoading(false);
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(completeTranscript + transcript);
    alert("Transcript copied to clipboard!");
  };

  return (
    <div
      className={`mb-20 flex h-full w-full items-center justify-center bg-gray-100 ${poppins.className}`}
    >
      <div className="w-2/3 space-y-4 rounded-lg bg-white p-6 shadow-md">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold">Record with Video!</h2>
          <p className="text-sm text-gray-500">
            Ensure good audio and lighting quality.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="h-40 w-full rounded-md border"
          />
          <div className="text-center">
            <p className="text-sm font-medium">Recorder</p>
            <p className="text-sm text-gray-500">
              {isRecording
                ? "Recording..."
                : "Press the button to start recording!"}
            </p>
            {isRecording && (
              <div className="mt-2 h-4 w-4 animate-pulse rounded-full bg-red-400" />
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleToggleRecording}
            className="hover:bg-primary-dark flex w-full items-center justify-center rounded-md bg-primary py-2 font-semibold text-white focus:outline-none"
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>

        <div className="mt-4 text-center text-gray-700">
          {isRecording && `Recording... ${formatTime(timer)}`}
        </div>

        <div className="mt-4 rounded-md border p-2">
          <textarea
            className="h-40 w-full p-2"
            value={completeTranscript + transcript}
            readOnly
            placeholder="Transcript will appear here..."
          />
        </div>

        <div className="mt-6 flex justify-center space-x-4">
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
          <button
            onClick={handleCopyTranscript}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
          >
            Copy Transcript
          </button>
          {videoUrl && (
            <a
              href={videoUrl}
              download="recording.webm"
              className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-400"
            >
              Download Video
            </a>
          )}
        </div>

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

"use client";

import { useEffect, useRef, useState } from "react";

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
  const [showInspiration, setShowInspiration] = useState(false);
  const [summary, setSummary] = useState("");
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = () => {
    setTranscript("");
    setCompleteTranscript("");
    setIsRecording(true);
    setIsPaused(false);

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

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
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
    <div className="mb-20 flex h-full w-full items-center justify-center bg-gray-100">
      <div className="w-2/3 space-y-4 rounded-lg bg-white p-6 shadow-md">
        <p className="mb-4 text-sm text-gray-700">
          Please record your voice for an optimal time. For best results, ensure
          your microphone is of good quality, and avoid background noise.
        </p>
        <div className="relative w-full">
          <button
            onClick={() => setShowInspiration(!showInspiration)}
            className="mb-4 w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none"
          >
            {showInspiration ? "Hide Sample Script" : "Show Sample Script"}
          </button>

          <div
            className={`transition-max-height overflow-hidden duration-300 ease-in-out ${
              showInspiration ? "max-h-96" : "max-h-0"
            }`}
          >
            {showInspiration && (
              <div className="mb-4 rounded-md border border-gray-300 bg-gray-50 p-4 text-gray-700">
                <p>
                  In the heart of the bustling city, where the sounds of honking
                  cars and busy pedestrians filled the air, there was a small,
                  unassuming café that seemed to be a world of its own. It was
                  the kind of place that offered a refuge from the hectic pace
                  of urban life, where one could sit quietly with a book or a
                  laptop, enjoying a steaming cup of coffee.
                </p>
                <p className="mt-2">
                  The walls of the café were adorned with vibrant paintings by
                  local artists, adding a splash of color to the cozy space.
                  Soft jazz music played in the background, creating a soothing
                  atmosphere. The café had become a favorite spot for writers,
                  students, and anyone in need of a little inspiration.
                </p>
                <p className="mt-2">
                  On this particular day, Sarah found herself at her usual
                  corner table, her notebook open in front of her. She watched
                  as people came and went, each with their own stories and
                  destinations. It was a habit of hers to imagine the lives of
                  strangers, to weave narratives from the glimpses she caught of
                  their interactions.
                </p>
                <p className="mt-2">
                  As she sipped her coffee, Sarah noticed a young man sitting at
                  a table near the window. He was engrossed in a thick novel,
                  his brow furrowed in concentration. She wondered what world he
                  was lost in, what adventures and characters he was
                  encountering within the pages.
                </p>
                <p className="mt-2">
                  The barista, a friendly woman with a warm smile, approached
                  Sarah with a refill. They exchanged pleasantries, and Sarah
                  felt a sense of belonging, a comfort that came from the
                  familiarity of the place and its people. She returned to her
                  writing, the words flowing more easily now.
                </p>
                <p className="mt-2">
                  As the minutes passed, the café began to fill with the aroma
                  of freshly baked pastries. Sarah glanced at the display case,
                  tempted by the array of treats. She decided to indulge in a
                  chocolate croissant, knowing it would be the perfect companion
                  for her second cup of coffee.
                </p>
                <p className="mt-2">
                  With each bite, she savored the flaky layers and rich
                  chocolate, feeling a sense of contentment. It was these small
                  pleasures, the simple moments of joy, that made the world feel
                  a little brighter. And in the midst of it all, she realized
                  that inspiration was all around her, waiting to be captured in
                  words.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <div>
            <p className="text-sm font-medium leading-none">Recorder</p>
            <p className="text-sm text-gray-500">
              {isRecording
                ? "Recording..."
                : "Press the button to start recording!"}
            </p>
          </div>
          {isRecording && (
            <div className="h-4 w-4 animate-pulse rounded-full bg-red-400" />
          )}
        </div>

        <div className="mt-4 h-full rounded-md border p-2">
          <textarea
            className="h-40 w-full border p-2"
            value={completeTranscript + transcript}
            readOnly
            placeholder="Transcript will appear here..."
          />
        </div>

        <div className="mt-4 flex w-full justify-center">
          <button
            onClick={handleToggleRecording}
            className={`m-auto flex h-16 w-16 items-center justify-center rounded-full ${
              isRecording
                ? "bg-red-400 hover:bg-red-500"
                : "bg-blue-400 hover:bg-blue-500"
            } focus:outline-none`}
          >
            {isRecording ? (
              <svg
                className="h-10 w-10"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
              >
                <path
                  fill="currentColor"
                  d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                />
              </svg>
            )}
          </button>
        </div>

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

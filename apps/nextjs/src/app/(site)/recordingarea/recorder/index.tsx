"use client";

import { useEffect, useRef, useState } from "react";

import AudioActions from "./audioactions";
import ControlPanel from "./controlpanel";
import RecorderPanel from "./recordpanel";
import TelegraphComponent from "./telegrapher";
import TextCorrectionComponent from "./textcorrection";

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
  const [showTextCorrection, setShowTextCorrection] = useState(false);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!window.webkitSpeechRecognition) {
      alert(
        "Your browser does not support speech recognition. Please use Chrome.",
      );
    }
  }, []);

  const setupSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
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

    recognition.onend = () => setIsPaused(true); // Set paused when recognition stops

    return recognition;
  };

  const startRecording = async () => {
    setTranscript("");
    setCompleteTranscript("");
    setIsRecording(true);
    setIsPaused(false);

    // Initialize speech recognition
    recognitionRef.current = setupSpeechRecognition();
    recognitionRef.current.start();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      startAudioRecording(stream);
    } catch (error) {
      console.error("Microphone access error:", error);
      alert("Microphone access is required to record audio.");
      setIsRecording(false);
    }
  };

  const startAudioRecording = (stream: MediaStream) => {
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioBlob(audioBlob);
      setAudioUrl(audioUrl);
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleToggleRecording = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const handleDownload = () => {
    if (!audioBlob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(audioBlob);
    link.download = "recording.wav";
    link.click();
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(completeTranscript);
    alert("Transcript copied to clipboard!");
  };

  // Show text correction component when user clicks a button
  const handleShowTextCorrection = () => {
    setShowTextCorrection(true);
  };

  return (
    <div className="mb-20 flex w-full justify-center bg-gray-100 py-10">
      <div className="w-full max-w-3xl space-y-4">
        <TelegraphComponent />
        <RecorderPanel
          isRecording={isRecording}
          transcript={completeTranscript + transcript}
        />
        <ControlPanel
          isRecording={isRecording}
          handleToggleRecording={handleToggleRecording}
        />
        {audioUrl && (
          <AudioActions
            audioUrl={audioUrl}
            handleDownload={handleDownload}
            handleCopyTranscript={handleCopyTranscript}
          />
        )}

        {/* Display Buttons First and Then TextCorrectionComponent */}
        {!showTextCorrection && (
          <div className="mt-4 space-x-4">
            <button
              onClick={handleShowTextCorrection}
              className="rounded bg-green-500 px-4 py-2 text-white"
            >
              Correct Text
            </button>
            <button
              onClick={handleShowTextCorrection}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Summarize Text
            </button>
          </div>
        )}

        {showTextCorrection && (
          <TextCorrectionComponent
            transcript={completeTranscript + transcript}
          />
        )}
      </div>
    </div>
  );
}

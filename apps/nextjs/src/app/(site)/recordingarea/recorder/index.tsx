"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function MicrophoneComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = () => {
    setIsRecording(true);

    // Start speech recognition
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = transcript;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const currentTranscript = event.results[i][0].transcript;

        // Append interim results or finalize it if the speech is complete
        finalTranscript += event.results[i].isFinal
          ? currentTranscript + " "
          : currentTranscript;
      }

      setTranscript(finalTranscript.trim());
    };

    recognitionRef.current.start();

    // Start audio recording
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
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
    });
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
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

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full">
        {(isRecording || transcript) && (
          <div className="m-auto w-1/4 rounded-md border bg-white p-4">
            <div className="flex w-full flex-1 justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {recordingComplete ? "Recorded" : "Recording"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {recordingComplete
                    ? "Thanks for talking."
                    : "Start speaking..."}
                </p>
              </div>
              {isRecording && (
                <div className="h-4 w-4 animate-pulse rounded-full bg-red-400" />
              )}
            </div>

            {transcript && (
              <div className="mt-4 h-full rounded-md border p-2">
                <textarea
                  className="h-24 w-full border p-2"
                  value={transcript}
                  readOnly
                  placeholder="Transcript will appear here..."
                />
              </div>
            )}
          </div>
        )}

        <div className="flex w-full items-center">
          {isRecording ? (
            <button
              onClick={handleToggleRecording}
              className="m-auto mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-red-400 hover:bg-red-500 focus:outline-none"
            >
              <svg
                className="h-12 w-12 "
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleToggleRecording}
              className="m-auto mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 focus:outline-none"
            >
              <svg
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
              >
                <path
                  fill="currentColor"
                  d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                />
              </svg>
            </button>
          )}
        </div>

        {audioUrl && (
          <div className="mt-6 text-center">
            <audio controls src={audioUrl} className="w-full" />
            <button
              onClick={handleDownload}
              className="mt-4 rounded-md bg-cyan-400 px-4 py-2 text-white hover:bg-cyan-600"
            >
              Download Recording
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

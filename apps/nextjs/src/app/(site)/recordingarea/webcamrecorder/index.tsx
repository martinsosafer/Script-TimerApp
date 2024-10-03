"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function MicrophoneAndWebcamComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [completeTranscript, setCompleteTranscript] = useState(""); // Persisted transcript
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPaused, setIsPaused] = useState(false); // Track if paused
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // Video URL for download and playback

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to video element for webcam preview
  const recordedVideoRef = useRef<HTMLVideoElement | null>(null); // Ref for recorded video playback
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null); // Save media stream

  // Start recording process (audio + video)
  const startRecording = () => {
    setTranscript(""); // This ensures the text area starts fresh for each recording
    setCompleteTranscript(""); // Clear only at the start of a new recording

    setIsRecording(true);
    setIsPaused(false); // Reset paused state

    try {
      // Start speech recognition
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = ""; // Temporary transcript for the current speech

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const currentTranscript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            // If the result is final, append it to the complete transcript
            setCompleteTranscript((prev) => prev + currentTranscript + " ");
          } else {
            // Otherwise, it's an interim result
            interimTranscript += currentTranscript;
          }
        }

        // Update interim transcript to show real-time results
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

    // Start video + audio recording
    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480 }, audio: true }) // Set lower resolution
      .then((stream) => {
        streamRef.current = stream;
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "video/webm; codecs=vp8", // Use VP8 codec for better compression
          videoBitsPerSecond: 2500000, // Lower bitrate for smaller file size
        });
        audioChunksRef.current = [];

        // Set video stream to video element for preview
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play(); // Start playing the webcam feed
        }

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const videoBlob = new Blob(audioChunksRef.current, {
            type: "video/webm",
          });
          setAudioBlob(videoBlob);
          const videoUrl = URL.createObjectURL(videoBlob);
          setVideoUrl(videoUrl); // Set video for download and playback

          // Set the recorded video for playback
          if (recordedVideoRef.current) {
            recordedVideoRef.current.src = videoUrl;
          }
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Webcam or microphone access error: ", error);
        alert("Access to webcam and microphone is required.");
        setIsRecording(false);
      });
  };

  // Stop recording process (audio + video)
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop()); // Stop all media streams (audio + video)
    }
    setIsRecording(false);
    setIsPaused(true); // Set to paused when stopped
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
      link.download = "recording.webm";
      link.click();
    }
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(completeTranscript);
    alert("Transcript copied to clipboard!");
  };

  return (
    <div className="mb-20 flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-2/3 space-y-4">
        <div className="m-auto w-full rounded-md border bg-white p-4">
          <div className="flex w-full justify-between space-y-1">
            <div>
              <p className="text-sm font-medium leading-none">Recorder</p>
              <p className="text-sm text-muted-foreground">
                {isRecording
                  ? "Recording..."
                  : "Press the button to record something!"}
              </p>
            </div>
            {isRecording && (
              <div className="h-4 w-4 animate-pulse rounded-full bg-red-400" />
            )}
          </div>

          <div className="mt-4 h-full rounded-md border p-2">
            <textarea
              className="h-40 w-full border p-2"
              value={completeTranscript + transcript} // Show both final and interim results
              readOnly
              placeholder="Transcript will appear here..."
            />
          </div>
        </div>

        {/* Video preview while recording */}
        {isRecording && (
          <div className="flex justify-center">
            <video
              ref={videoRef}
              className="rounded-lg border border-gray-300"
              width="480" // Increased width for better preview
              height="360" // Increased height for better preview
              muted
              playsInline // Ensures no audio plays from the preview
            />
          </div>
        )}

        {/* Playback recorded video after stopping */}
        {videoUrl && (
          <div className="mt-4 flex justify-center">
            <video
              ref={recordedVideoRef}
              className="rounded-lg border border-gray-300"
              width="480" // Matches the preview size
              height="360"
              controls
            />
          </div>
        )}

        <div className="flex w-full justify-center">
          <div className="flex items-center justify-center rounded-lg bg-gray-200 p-6">
            {isRecording ? (
              <button
                onClick={handleToggleRecording}
                className="m-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-400 hover:bg-red-500 focus:outline-none"
              >
                <svg
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleToggleRecording}
                className="m-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm6 0v12h8V4H6zM2 5v2h2V5H2zm0 4v2h2V9H2zm0 4v2h2v-2H2zm14-8v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex w-full justify-center space-x-4">
          {audioBlob && (
            <button
              onClick={handleDownload}
              className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-400"
            >
              Download Video
            </button>
          )}

          {completeTranscript && (
            <button
              onClick={handleCopyTranscript}
              className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-400"
            >
              Copy Transcript
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

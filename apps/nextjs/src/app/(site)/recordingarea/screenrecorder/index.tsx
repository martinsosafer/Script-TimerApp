"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";

import { useCountdown } from "~/app/hooks/useCountDown";

const ScreenRecorder = () => {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    muteAudio,
    unmuteAudio,
    mediaBlobUrl,
    previewStream,
    isMuted,
    clearBlobUrl,
  } = useReactMediaRecorder({ screen: true, video: true });

  const [countdown, setCountdown] = useState(3);
  const { startCountdown } = useCountdown(setCountdown);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  useEffect(() => {
    if (previewStream && videoRef.current) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  const handleStartRecording = () => {
    setIsRecordingStarted(true);
    startCountdown(); // Start the countdown
    setTimeout(() => {
      startRecording(); // Start recording after countdown ends
      setIsRecordingStarted(false);
    }, 3000); // Start recording after 3 seconds (countdown)
  };

  const downloadRecording = () => {
    if (mediaBlobUrl) {
      const a = document.createElement("a");
      a.href = mediaBlobUrl;
      a.download = "recording.mp4";
      a.click();
    }
  };

  // For webcam drag position
  const [webcamPos, setWebcamPos] = useState({ x: 0, y: 0 });
  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setWebcamPos({
      x: e.clientX - 50, // Offset to center the webcam bubble
      y: e.clientY - 50,
    });
  };

  return (
    <div className="relative mx-auto flex h-screen max-w-xl flex-col items-center rounded-lg bg-gray-100 p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-semibold">
        Screen Recorder
      </h2>
      <p className="mb-4 text-lg">
        Status: <span className="font-bold">{status}</span>
      </p>

      {countdown > 0 && isRecordingStarted && (
        <div className="absolute left-0 right-0 top-16 mx-auto rounded-lg bg-gray-800 p-4 text-center text-4xl font-bold text-white">
          {countdown}
        </div>
      )}

      <div className="mb-4 flex space-x-3">
        <button
          onClick={handleStartRecording}
          className="rounded-lg bg-green-500 px-4 py-2 text-white shadow transition hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={stopRecording}
          className="rounded-lg bg-red-500 px-4 py-2 text-white shadow transition hover:bg-red-600"
        >
          Stop
        </button>
        <button
          onClick={pauseRecording}
          className="rounded-lg bg-yellow-500 px-4 py-2 text-white shadow transition hover:bg-yellow-600"
        >
          Pause
        </button>
        <button
          onClick={resumeRecording}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow transition hover:bg-blue-600"
        >
          Resume
        </button>
      </div>

      <div className="mb-4 flex space-x-3">
        <button
          onClick={isMuted ? unmuteAudio : muteAudio}
          className={`px-4 py-2 ${isMuted ? "bg-gray-600" : "bg-gray-800"} rounded-lg text-white shadow transition hover:opacity-75`}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={clearBlobUrl}
          className="rounded-lg bg-purple-500 px-4 py-2 text-white shadow transition hover:bg-purple-600"
        >
          Clear Recording
        </button>
        {mediaBlobUrl && (
          <button
            onClick={downloadRecording}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-white shadow transition hover:bg-indigo-600"
          >
            Download
          </button>
        )}
      </div>

      {previewStream && (
        <div className="mb-4 w-full">
          <video
            ref={videoRef}
            className="h-auto w-full rounded-lg border shadow-lg"
            autoPlay
            muted
          />
        </div>
      )}

      {mediaBlobUrl && (
        <div className="w-full">
          <video
            src={mediaBlobUrl}
            controls
            autoPlay
            loop
            className="h-auto w-full rounded-lg border shadow-lg"
          />
        </div>
      )}

      {/* Webcam Bubble */}
      <div
        className="fixed bottom-4 right-4 h-28 w-28 cursor-move overflow-hidden rounded-full border-4 border-white shadow-lg"
        style={{ transform: `translate(${webcamPos.x}px, ${webcamPos.y}px)` }}
        onMouseDown={handleDrag}
      >
        <Webcam ref={webcamRef} className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default ScreenRecorder;

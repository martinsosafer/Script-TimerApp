"use client";

import React, { useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import Draggable from "react-draggable";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";

import { Button } from "@voiceai/ui";
import {
  IconCameraVideo,
  IconCircleStop,
  IconSave,
  IconSilence,
  IconStop,
} from "@voiceai/ui/@/components/ui/icons";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface ScreenRecorderProps {
  userId: string | undefined;
  savedScreen: { url: string; filename: string; uploadedAt: string }[];
}

export default function ScreenRecorder({
  userId,
  savedScreen,
}: ScreenRecorderProps) {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({ screen: true, audio: true });

  const webcamRef = useRef<Webcam | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [completeTranscript, setCompleteTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const handleStartRecording = () => {
    startRecording();
    startSpeechRecognition();
  };

  const handleStopRecording = () => {
    stopRecording();
    stopSpeechRecognition();
  };

  const handlePauseResume = () => {
    if (isPaused) {
      resumeRecording();
      resumeSpeechRecognition();
    } else {
      pauseRecording();
      pauseSpeechRecognition();
    }
    setIsPaused(!isPaused);
  };

  const startSpeechRecognition = () => {
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
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const pauseSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const resumeSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const enablePictureInPicture = async () => {
    try {
      if (webcamRef.current?.video) {
        await webcamRef.current.video.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Failed to enable Picture-in-Picture:", error);
    }
  };

  const disablePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      console.error("Failed to disable Picture-in-Picture:", error);
    }
  };

  const downloadRecording = () => {
    if (mediaBlobUrl) {
      const a = document.createElement("a");
      a.href = mediaBlobUrl;
      a.download = "screen-recording.mp4";
      a.click();
    }
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
    } finally {
      setIsLoading(false);
    }
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
    } finally {
      setIsLoading(false);
    }
  };

  const uploadToVercelBlob = async (blob: Blob) => {
    try {
      const filename = `RecordedScreen/${userId}/recording-${Date.now()}.mp4`;
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

  const handleSave = async () => {
    if (mediaBlobUrl) {
      setIsLoading(true);
      try {
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();
        const uploadedUrl = await uploadToVercelBlob(blob);
        if (uploadedUrl) {
          console.log("Recording uploaded successfully:", uploadedUrl);
          alert("Recording saved successfully!");
        }
      } catch (error) {
        console.error("Error saving recording:", error);
        alert("Failed to save recording. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("No recording to save. Please record something first.");
    }
  };

  return (
    <div className="relative mx-auto flex h-full max-w-xl flex-col items-center rounded-lg bg-gray-100 p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-semibold">
        Screen Recorder
      </h2>
      <p className="mb-4 text-lg">
        Status: <span className="font-bold">{status}</span>
      </p>

      {/* Controls */}
      <div className="mb-4 flex flex-wrap justify-center space-x-3">
        <Button onClick={handleStartRecording} variant="default">
          <IconCameraVideo className="mr-2 h-4 w-4" />
          Start Screen Recorder
        </Button>
        <Button onClick={handlePauseResume} variant="default">
          <IconStop className="mr-2 h-4 w-4" />
          {isPaused ? "Resume Recording" : "Pause Recording"}
        </Button>
        <Button onClick={handleStopRecording} variant="destructive">
          <IconCircleStop className="mr-2 h-4 w-4" />
          Stop Recording
        </Button>
        {mediaBlobUrl && (
          <>
            <Button onClick={downloadRecording} variant="default">
              <PlayIcon className="mr-2 h-4 w-4" />
              Download Recording
            </Button>
            <Button onClick={handleSave} variant="default" disabled={isLoading}>
              <IconSave className="mr-2 h-4 w-4" />
              Save Recording
            </Button>
          </>
        )}
      </div>

      {/* PiP Controls */}
      <div className="mb-4 flex flex-wrap justify-center space-x-3">
        <Button onClick={enablePictureInPicture} variant="default">
          <IconCameraVideo className="mr-2 h-4 w-4" />
          Enable Webcam (PiP)
        </Button>
        <Button onClick={disablePictureInPicture} variant="outline">
          <IconStop className="mr-2 h-4 w-4" />
          Exit Webcam (PiP)
        </Button>
      </div>

      {/* Video Display */}
      {mediaBlobUrl && (
        <div className="mt-6 w-full">
          <video
            src={mediaBlobUrl}
            controls
            autoPlay
            loop
            className="h-auto w-full rounded-lg border shadow-lg"
          />
        </div>
      )}

      {/* Transcript */}
      <div className="mt-6 w-full">
        <h3 className="mb-2 text-lg font-semibold">Transcript</h3>
        <textarea
          className="h-32 w-full rounded border p-2"
          value={completeTranscript + transcript}
          readOnly
          placeholder="Transcript will appear here..."
        />
        <div className="mt-4 flex space-x-4">
          <Button onClick={handleGenerateSummary} disabled={isLoading}>
            Generate Summary
          </Button>
          <Button onClick={handleGenerateBulletPoints} disabled={isLoading}>
            Generate Bullet Points
          </Button>
        </div>
        {isLoading && <p className="mt-2 text-gray-500">Processing...</p>}
        {summary && (
          <div className="mt-4">
            <h4 className="font-semibold">Summary:</h4>
            <p>{summary}</p>
          </div>
        )}
        {bulletPoints.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold">Bullet Points:</h4>
            <ul className="list-disc pl-5">
              {bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Webcam Display */}
      <div
        className="fixed bottom-4 right-4 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg"
        style={{ zIndex: 9999 }}
      >
        <Draggable>
          <Webcam
            ref={webcamRef}
            className="h-full w-full rounded-full object-cover"
          />
        </Draggable>
      </div>

      {/* Upload URL Display */}
      {uploadUrl && (
        <div className="mt-4 text-sm text-gray-600">
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
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">Webcam Recording History</h3>
        {savedScreen.length > 0 ? (
          <ul className="space-y-4">
            {savedScreen.map((recording, index) => (
              <li key={index} className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{recording.filename}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(recording.uploadedAt).toLocaleString()}
                  </span>
                </div>
                <video controls src={recording.url} className="w-full" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No saved webcam recordings yet.</p>
        )}
      </div>
    </div>
  );
}

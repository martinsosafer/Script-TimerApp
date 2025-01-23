"use client";

import React, { useState } from "react";

import { Button } from "@voiceai/ui";
import {
  IconCircleStop,
  IconSave,
  IconStop,
  IconVideoCamera,
} from "@voiceai/ui/@/components/ui/icons";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

import { poppins } from "~/app/fonts";
import { formatTime } from "~/lib/formattime";
import { usePostProcessing } from "../hooks/usePostProcess";
import { useScreenRecorder } from "../hooks/useScreenRecorder";
import { AIFeatureButtons } from "../recorder/aifeaturebutton";
import { AudioControls } from "../recorder/audiocontrols";
import { RecordButton } from "../recorder/recordbutton";
import { TranscriptDisplay } from "../recorder/transcriptDisplay";
import { WebcamPreview } from "./webcampreview";

interface ScreenRecorderProps {
  userId: string | undefined;
  savedScreen: { url: string; filename: string; uploadedAt: string }[];
}

export default function ShareScreenRecorder({
  userId,
  savedScreen,
}: ScreenRecorderProps) {
  const {
    status,
    isPaused,
    mediaBlobUrl,
    uploadUrl,
    isProcessingWhisper,
    whisperTranscription,
    handleStartRecording,
    handleStopRecording,
    handlePauseResume,
    uploadToVercelBlob,
    clearBlobUrl,
  } = useScreenRecorder(userId);

  const {
    summary,
    bulletPoints,
    sortedWords,
    mainTheme,
    cutDowns,
    soundBites,
    isLoading,
    processTranscript,
  } = usePostProcessing();

  const [isRecordingComplete, setIsRecordingComplete] = useState(false);

  const handleToggleRecording = () => {
    if (status !== "recording") {
      handleStartRecording();
      setIsRecordingComplete(false);
    } else {
      handleStopRecording();
      setIsRecordingComplete(true);
    }
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(whisperTranscription || "");
    alert("Transcript copied to clipboard!");
  };

  const handleSave = async () => {
    if (mediaBlobUrl) {
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      const uploadedUrl = await uploadToVercelBlob(blob);
      if (uploadedUrl) {
        console.log("Recording uploaded successfully:", uploadedUrl);
        alert("Recording saved successfully!");
      }
    } else {
      alert("No recording to save. Please record something first.");
    }
  };

  const handleGenerateSummary = () =>
    processTranscript(whisperTranscription || "", "summary");
  const handleGenerateBulletPoints = () =>
    processTranscript(whisperTranscription || "", "bullet-points");
  const handleSortWords = () =>
    processTranscript(whisperTranscription || "", "word-sorter");
  const handleMainTheme = () =>
    processTranscript(whisperTranscription || "", "main-topic");
  const handleUsefulCutdowns = () =>
    processTranscript(whisperTranscription || "", "useful-cutdowns");
  const handleGenerateSoundBites = () =>
    processTranscript(whisperTranscription || "", "sound-bites");

  return (
    <div
      className={`relative mx-auto flex h-full max-w-xl flex-col items-center rounded-lg bg-gray-100 p-6 shadow-lg ${poppins.className}`}
    >
      <h2 className="mb-4 text-center text-2xl font-semibold">
        Screen Recorder
      </h2>
      <p className="mb-4 text-lg">
        Status: <span className="font-bold">{status}</span>
      </p>

      <div className="mb-4 flex flex-wrap justify-center space-x-3">
        <RecordButton
          isRecording={status === "recording"}
          onClick={handleToggleRecording}
        />
        <Button onClick={handlePauseResume} variant="default">
          <IconStop className="mr-2 h-4 w-4" />
          {isPaused ? "Resume Recording" : "Pause Recording"}
        </Button>
        {mediaBlobUrl && (
          <>
            <Button onClick={() => window.open(mediaBlobUrl)} variant="default">
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

      <WebcamPreview />

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

      <TranscriptDisplay
        isProcessingWhisper={isProcessingWhisper}
        completeTranscript={whisperTranscription || ""}
        transcript={""}
      />

      <AudioControls
        audioUrl={mediaBlobUrl}
        onDownload={() => window.open(mediaBlobUrl)}
        onCopyTranscript={handleCopyTranscript}
        onSave={handleSave}
        isLoading={isLoading}
      />

      {isRecordingComplete && (
        <AIFeatureButtons
          onGenerateSummary={handleGenerateSummary}
          onGenerateBulletPoints={handleGenerateBulletPoints}
          onSortWords={handleSortWords}
          onMainTheme={handleMainTheme}
          onUsefulCutdowns={handleUsefulCutdowns}
          onGenerateSoundBites={handleGenerateSoundBites}
          isLoading={isLoading}
          videoUrl={mediaBlobUrl}
        />
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

      {sortedWords.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Sorted Words:</h3>
          <ul className="mt-2 list-disc pl-5">
            {sortedWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      )}

      {mainTheme && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Main Theme:</h3>
          <p className="mt-2">{mainTheme}</p>
        </div>
      )}

      {Array.isArray(cutDowns) && cutDowns.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Useful Cutdowns:</h3>
          <ul className="mt-2 list-disc pl-5">
            {cutDowns.map((cutdown, index) => (
              <li key={index}>{cutdown}</li>
            ))}
          </ul>
        </div>
      )}

      {soundBites && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Sound Bites:</h3>
          <div className="mt-2 space-y-2">
            {soundBites.split("\n").map((bite, index) => (
              <p key={index} className="rounded-lg bg-gray-50 p-2">
                {bite}
              </p>
            ))}
          </div>
        </div>
      )}

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
        <h3 className="mb-4 text-lg font-semibold">Screen Recording History</h3>
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
          <p className="text-gray-500">No saved screen recordings yet.</p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import { poppins } from "~/app/fonts";
import { formatTime } from "~/lib/formattime";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { usePostProcessing } from "../hooks/usePostProcess";
import { useTranscription } from "../hooks/useTranscription";
import { AIFeatureButtons } from "./aifeaturebutton";
import { AudioControls } from "./audiocontrols";
import { RecordButton } from "./recordbutton";
import { TranscriptDisplay } from "./transcriptDisplay";

interface MicrophoneProps {
  userId: string | undefined;
  savedAudios: { url: string; filename: string; uploadedAt: string }[];
}

export default function MicrophoneComponent({
  userId,
  savedAudios,
}: MicrophoneProps) {
  const {
    isRecording,
    audioUrl,
    audioBlob,
    timer,
    uploadUrl,
    isProcessingWhisper,
    startRecording,
    stopRecording,
    uploadToVercelBlob,
    whisperTranscription,
  } = useAudioRecorder(userId);

  const {
    transcript,
    completeTranscript,
    startTranscription,
    stopTranscription,
  } = useTranscription();

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
    if (!isRecording) {
      startRecording();
      startTranscription();
      setIsRecordingComplete(false);
    } else {
      stopRecording();
      stopTranscription();
      setIsRecordingComplete(true);
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

  const handleSave = async () => {
    if (audioBlob) {
      const uploadedUrl = await uploadToVercelBlob(audioBlob);
      if (uploadedUrl) {
        console.log("Recording uploaded successfully:", uploadedUrl);
        alert("Recording saved successfully!");
      }
    } else {
      alert("No recording to save. Please record something first.");
    }
  };

  const handleGenerateSummary = () =>
    processTranscript(completeTranscript, "summary");
  const handleGenerateBulletPoints = () =>
    processTranscript(completeTranscript, "bullet-points");
  const handleSortWords = () =>
    processTranscript(completeTranscript, "word-sorter");
  const handleMainTheme = () =>
    processTranscript(completeTranscript, "main-topic");
  const handleUsefulCutdowns = () =>
    processTranscript(completeTranscript, "useful-cutdowns");
  const handleGenerateSoundBites = () =>
    processTranscript(completeTranscript, "sound-bites");

  return (
    <div
      className={`mb-20 flex h-full w-full items-center justify-center  bg-gray-100 ${poppins.className}`}
    >
      <div className="w-2/3 space-y-4 rounded-lg bg-white p-6 shadow-md">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[28pxfont-bold mb-4 font-poppins leading-[24px]">
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

        <RecordButton
          isRecording={isRecording}
          onClick={handleToggleRecording}
        />

        {isRecording && (
          <div className="mt-2 text-center text-gray-700">
            Recording... {formatTime(timer)}
          </div>
        )}

        <TranscriptDisplay
          isProcessingWhisper={isProcessingWhisper}
          completeTranscript={completeTranscript}
          transcript={transcript}
          whisperTranscription={whisperTranscription}
        />

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

        <AudioControls
          audioUrl={audioUrl}
          onDownload={handleDownload}
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
            audioUrl={audioUrl}
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

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Recording History</h3>
          {savedAudios.length > 0 ? (
            <ul className="space-y-4">
              {savedAudios.map((audio, index) => (
                <li key={index} className="rounded-lg bg-gray-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{audio.filename}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(audio.uploadedAt).toLocaleString()}
                    </span>
                  </div>
                  <audio controls src={audio.url} className="w-full" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No saved recordings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

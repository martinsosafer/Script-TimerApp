"use client";

import { useState } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import { poppins, roboto } from "~/app/fonts";
import { formatTime } from "~/lib/formattime";
import DeviceSelector from "../deviceSelector";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { usePostProcessing } from "../hooks/usePostProcess";
import { useTranscription } from "../hooks/useTranscription";
import { AIFeatureButtons } from "./aifeaturebutton";
import { AudioControls } from "./audiocontrols";
import AudioHistory from "./audioHistory";
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
    setSelectedMicrophone,
    isPaused,
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
  const [displayAudioCount, setDisplayAudioCount] = useState(3);
  const loadMoreAudios = () => {
    setDisplayAudioCount((prevCount) => prevCount + 3);
  };
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
    processTranscript(whisperTranscription, "summary");
  const handleGenerateBulletPoints = () =>
    processTranscript(whisperTranscription, "bullet-points");
  const handleSortWords = () =>
    processTranscript(whisperTranscription, "word-sorter");
  const handleMainTheme = () =>
    processTranscript(whisperTranscription, "main-topic");
  const handleUsefulCutdowns = () =>
    processTranscript(whisperTranscription, "useful-cutdowns");
  const handleGenerateSoundBites = () =>
    processTranscript(whisperTranscription, "sound-bites");

  const PulseCircle = () => (
    <div
      className={`h-4 w-4 rounded-full ${
        isRecording
          ? isPaused
            ? "bg-gray-500"
            : "animate-pulse bg-red-500"
          : "bg-transparent"
      }`}
    />
  );
  return (
    <div
      className={`mb-20 flex h-full w-full items-center justify-center bg-gray-100 ${poppins.className}`}
    >
      <div className="mt-[70px] w-[680px] space-y-4 rounded-lg bg-white p-6 shadow-md">
        <div className="flex flex-col items-center">
          <h2 className="text-cp-primary text-[28px] font-bold leading-[33.6px]">
            Record Audio!
          </h2>
          <p
            className={`${roboto.className} text-[18px] font-normal leading-[25px]`}
          >
            Please ensure good audio quality and avoid background noise.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex w-full justify-start">
            <DeviceSelector
              kind="audioinput"
              onDeviceChange={setSelectedMicrophone}
            />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <PulseCircle />
          <div className="text-center text-gray-700">
            {isRecording && <>Recording... {formatTime(timer)}</>}
          </div>
        </div>
        <RecordButton
          isRecording={isRecording}
          isPaused={false}
          onStart={handleToggleRecording}
          onPauseResume={handleToggleRecording}
          onStop={handleToggleRecording}
        />

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

        {whisperTranscription && (
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
        {isLoading && (
          <p className="text-cp-primary mt-4 flex items-center justify-center gap-2 text-center text-[24px] font-semibold leading-[22.4px]">
            We are getting your Feedback please wait
            <IconSpinner className="h-6 w-6" />
          </p>
        )}
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
              {bulletPoints[0] // Assuming bulletPoints[0] contains your string
                .split("-") // Split on dashes
                .filter((point) => point.trim() && !point.includes("*")) // Remove empty strings and asterisks
                .map((point, index) => (
                  <li key={index}>{point.trim()}</li>
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
        {cutDowns && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Useful Cutdowns:</h3>
            <ul className="mt-2 list-disc pl-5">
              {cutDowns.split("\n").map((cutdown, index) => (
                <li key={index}>{cutdown.replace(/^\d+\.\s*/, "").trim()}</li>
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
        <AudioHistory
          savedAudios={savedAudios}
          displayAudioCount={displayAudioCount}
          onLoadMore={loadMoreAudios}
        />
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import { revalidateRecordingPage } from "~/app/actions/speechcoach";
import { poppins, roboto } from "~/app/fonts";
import { formatTime } from "~/lib/formattime";
import { DeviceSelector } from "../deviceSelector";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { usePostProcessing } from "../hooks/usePostProcess";
import { useTranscription } from "../hooks/useTranscription";
import { SaveRecording } from "../saverecording/saverecording";
import { AIFeatureButtons } from "./aifeaturebutton";
import { AIContentWrapper } from "./aiwrapper";
import { AudioControls } from "./audiocontrols";
import AudioHistory from "./audioHistory";
import { RecordButton } from "./recordbutton";
import { TranscriptDisplay } from "./transcriptDisplay";
import VideoHistory from "./videoHistory";

interface MicrophoneProps {
  userId: string | undefined;
  savedAudios: { url: string; filename: string; uploadedAt: string }[];
  savedWebcam: { url: string; filename: string; uploadedAt: string }[];
  currentAudioCount: number;
  audioLimit: number;
  audioDurationLimit: number;
  isSaveDisabled: boolean;
}

export default function MicrophoneComponent({
  userId,
  savedAudios,
  savedWebcam,
  isSaveDisabled,
  currentAudioCount,
  audioLimit,
  audioDurationLimit,
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
    pauseRecording,
    resumeRecording,
    isPaused,
    isRendering,
    setWhisperTranscription,
    setIsProcessingWhisper,
  } = useAudioRecorder(userId, audioDurationLimit);

  const {
    transcript,
    completeTranscript,
    startTranscription,
    stopTranscription,

    setCompleteTranscript,
    setTranscript,
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
    sortedFillerWords,

    setSummary,
    setBulletPoints,
    setSortedWords,
    setMainTheme,
    setCutDowns,
    setSoundBites,
    setSortedFillerWords,
  } = usePostProcessing();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [speechName, setSpeechName] = useState("");
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);
  const [showingRecordedAudio, setShowingRecordedAudio] = useState(false);
  const [displayAudioCount, setDisplayAudioCount] = useState(3);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const loadMoreAudios = () => {
    setDisplayAudioCount((prevCount) => prevCount + 3);
  };
  const handleStart = () => {
    setCompleteTranscript("");
    setTranscript("");
    setWhisperTranscription(null);
    setIsProcessingWhisper(false);
    // Reset AI-generated content states
    setSummary("");
    setBulletPoints([]);
    setSortedWords([]);
    setMainTheme("");
    setCutDowns("");
    setSoundBites("");
    setSortedFillerWords([]);
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(countdownInterval);
          startRecording();
          startTranscription();
          setIsRecordingComplete(false);
          setShowingRecordedAudio(false);
          return null;
        }
        return prevCount! - 1;
      });
    }, 1000);
  };
  const handlePauseResume = () => {
    if (isPaused) {
      resumeRecording();
    } else {
      pauseRecording();
    }
  };
  const handleStop = () => {
    stopRecording();
    stopTranscription();
    setIsRecordingComplete(true);
    setShowingRecordedAudio(true);
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

  const handleSave = () => {
    // Check if the user has reached their recording limit
    if (currentAudioCount >= audioLimit) {
      alert(
        `You've reached your recording limit (${currentAudioCount}/${audioLimit}).`,
      );
      return;
    }

    if (audioBlob) {
      setIsRenameModalOpen(true); // Open the modal
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
  const handleSortFillerWords = () =>
    processTranscript(whisperTranscription, "filler-counter");

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

  function generateShareableLink(blobUrl: string) {
    const baseUrl = "https://voiceai-git-recordingarea-script-timer.vercel.app";
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_HOST_URL is not defined in the environment.");
      return "";
    }
    const encodedBlobUrl = encodeURIComponent(blobUrl);
    return `${baseUrl}/share/audio?url=${encodedBlobUrl}`;
  }

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
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            Recordings remaining:{" "}
            <span className="font-bold">
              {Math.max(0, audioLimit - currentAudioCount)}/{audioLimit}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Maximum recording duration:{" "}
            <span className="font-bold">{audioDurationLimit} seconds</span>
          </div>
          {currentAudioCount >= audioLimit && (
            <div className="mt-2 text-sm text-red-500">
              You've reached your recording limit. Upgrade your plan to record
              more.
            </div>
          )}
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex w-full justify-start">
            <DeviceSelector
              kind="audioinput"
              onDeviceChange={setSelectedMicrophone}
              disabled={isRecording}
            />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <PulseCircle />
          <div className="text-center text-gray-700">
            {isRecording && (
              <>
                Recording... {formatTime(timer)}
                <span className="ml-2 text-sm">
                  (Max: {formatTime(audioDurationLimit)})
                </span>
              </>
            )}
          </div>
        </div>
        <RecordButton
          isRecording={isRecording}
          isPaused={isPaused}
          onStart={handleStart}
          onPauseResume={handlePauseResume}
          onStop={handleStop}
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
            {(uploadedAudioUrl || uploadUrl) && (
              <a
                href={generateShareableLink(uploadedAudioUrl || uploadUrl)}
                className="ml-2 text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Share this recording
              </a>
            )}
          </div>
        )}

        <AudioControls
          audioUrl={audioUrl}
          onDownload={handleDownload}
          onCopyTranscript={handleCopyTranscript}
          onSave={handleSave}
          isLoading={isLoading}
          isSaveDisabled={isSaveDisabled}
        />

        <AIContentWrapper
          whisperTranscription={whisperTranscription}
          isLoading={isLoading}
          recordingUrl={audioUrl}
          summary={summary}
          bulletPoints={bulletPoints}
          sortedWords={sortedWords}
          mainTheme={mainTheme}
          cutDowns={cutDowns}
          soundBites={soundBites}
          sortedFillerWords={sortedFillerWords}
          onGenerateSummary={handleGenerateSummary}
          onGenerateBulletPoints={handleGenerateBulletPoints}
          onSortWords={handleSortWords}
          onMainTheme={handleMainTheme}
          onUsefulCutdowns={handleUsefulCutdowns}
          onGenerateSoundBites={handleGenerateSoundBites}
          userId={userId}
          uploadUrl={uploadUrl}
          onSortFillerWords={handleSortFillerWords}
        />

        <AudioHistory
          savedAudios={savedAudios}
          displayAudioCount={displayAudioCount}
          onLoadMore={loadMoreAudios}
          userId={userId}
        />
      </div>
      <SaveRecording
        isRenameModalOpen={isRenameModalOpen}
        setIsRenameModalOpen={setIsRenameModalOpen}
        recordingBlob={audioBlob}
        uploadToVercelBlob={uploadToVercelBlob}
        setUploadedVideoUrl={setUploadedAudioUrl} // Rename to setUploadedAudioUrl if needed
        revalidateRecordingPage={revalidateRecordingPage}
        isLoading={isLoading}
        speechName={speechName}
        setSpeechName={setSpeechName}
      />
    </div>
  );
}

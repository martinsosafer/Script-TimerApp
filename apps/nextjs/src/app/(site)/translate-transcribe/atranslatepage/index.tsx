"use client";

import * as React from "react";

import { IconEar, IconFlag } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import FreeModal from "~/app/(site)/components/free-modal";
import LoadingDots from "~/app/(site)/components/loadingdots";
import deductOpenAiCredits from "~/app/actions/openAiCredits";
import languages from "~/lib/languages";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

const getAudioMimeType = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  const mimeTypes = {
    m4a: "audio/mp4",
    mp3: "audio/mpeg",
    webm: "audio/webm",
    mp4: "audio/mp4",
    mpga: "audio/mpeg",
    wav: "audio/wav",
    mpeg: "audio/mpeg",
  };
  return mimeTypes[ext] || null;
};

export default function AudioTranslate({
  subData,
  setOpenNoSessionModal,
  openAiCredits,
}) {
  const [loading, setLoading] = React.useState(false);
  const [uploadingToBlob, setUploadingToBlob] = React.useState(false);
  const [language, setLanguage] = React.useState(languages[0]?.value);
  const [generatedTranslation, setGeneratedTranslation] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(undefined);
  const [showFreeModal, setShowFreeModal] = React.useState(false);
  const [fileError, setFileError] = React.useState("");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [credits, setCredits] = React.useState(openAiCredits);

  const translateAudio = async () => {
    setGeneratedTranslation("");
    setLoading(true);
    setFileError("");
    setUploadingToBlob(true);
    setUploadProgress(0);

    if (credits < 60) {
      toast({
        title: "Insufficient Credits",
        description: "You do not have enough credits for this translation.",
      });
      setLoading(false);
      setUploadingToBlob(false);
      return;
    }

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("language", language);

      // Step 1: Upload the file to your API
      setUploadProgress(30);
      const uploadResponse = await fetch("/api/translatorblob", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        throw new Error(`Blob API error: ${JSON.stringify(errorData)}`);
      }

      const uploadData = await uploadResponse.json();

      if (!uploadData.success || !uploadData.downloadUrl) {
        throw new Error(
          `Failed to upload file: ${uploadData.error || "No URL returned"}`,
        );
      }

      // Step 2: Process transcription with OpenAI
      setUploadProgress(70);
      const transcriptionResponse = await fetch("/api/translatorAudio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blobUrl: uploadData.downloadUrl,
          language,
        }),
      });

      if (!transcriptionResponse.ok) {
        const errorText = await transcriptionResponse.text();
        throw new Error(`Transcription failed: ${errorText}`);
      }

      const transcriptionData = await transcriptionResponse.json();

      if (transcriptionData.success) {
        setGeneratedTranslation(transcriptionData.data.text);
        const creditCost = transcriptionData.data.text.length * 3;
        setCredits((prev) => prev - creditCost);
        await deductOpenAiCredits(creditCost);
      }

      setUploadProgress(100);
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        title: "Error processing audio",
        description: error.message,
      });
    } finally {
      setLoading(false);
      setUploadingToBlob(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setFileError("");

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const validExtensions = [
        "m4a",
        "mp3",
        "webm",
        "mp4",
        "mpga",
        "wav",
        "mpeg",
      ];

      if (!validExtensions.includes(fileExtension)) {
        setFileError("Invalid audio file format");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleTranslateClick = () => {
    if (!selectedFile) {
      setFileError("Please select an audio file");
      return;
    }

    if (!subData) {
      setOpenNoSessionModal();
    } else if (!["STUDENT", "CREATOR", "BUSINESS"].includes(subData.status)) {
      setShowFreeModal(true);
    } else {
      translateAudio();
    }
  };

  return (
    <div className="w-full max-w-xl p-4">
      {/* File upload section */}
      <div className="mt-10 flex items-center space-x-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#1877F290] bg-blue-300">
          <IconEar className="text-black" />
        </div>
        <p className="text-left font-medium">Upload Audio File</p>
      </div>

      <input
        type="file"
        accept=".m4a,.mp3,.webm,.mp4,.mpga,.wav,.mpeg,audio/*"
        onChange={handleFileChange}
        disabled={loading}
        className="mb-2 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
      />
      {fileError && <p className="text-sm text-red-500">{fileError}</p>}
      <p className="my-2 text-sm text-gray-500">
        Supported formats: m4a, mp3, webm, mp4, mpga, wav, mpeg (max 25MB)
      </p>

      {/* Language selection */}
      <div className="mb-5 flex items-center space-x-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#1877F290] bg-blue-300">
          <IconFlag className="text-black" />
        </div>
        <p className="text-left font-medium">Select Language</p>
      </div>

      <select
        value={language}
        onChange={handleChange}
        disabled={loading}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>

      {/* Progress bar */}
      {uploadingToBlob && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between">
            <span>Upload Progress</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Action buttons */}
      <button
        onClick={handleTranslateClick}
        disabled={!selectedFile || loading}
        className="mt-8 w-full rounded-xl bg-primary px-4 py-2 font-medium text-white hover:bg-primary/80 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? <LoadingDots color="white" /> : "Translate →"}
      </button>

      {/* Results */}
      {generatedTranslation && (
        <div className="mt-8">
          <div className="cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2.5">
            <p className="text-sm">{generatedTranslation}</p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generatedTranslation);
              window.open("/texttovoice", "_blank");
            }}
            className="mt-2 text-sm text-blue-500 underline"
          >
            Copy & Open Text-to-Speech
          </button>
        </div>
      )}

      {/* Modals */}
      {showFreeModal && (
        <FreeModal
          openModal={showFreeModal}
          setOpenModal={setShowFreeModal}
          plan="Student"
        />
      )}
    </div>
  );
}

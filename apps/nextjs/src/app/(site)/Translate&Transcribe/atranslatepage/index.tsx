"use client";

import * as React from "react";

import { IconEar, IconFlag } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import FreeModal from "~/app/(site)/components/free-modal";
import LoadingDots from "~/app/(site)/components/loadingdots";
import deductOpenAiCredits from "~/app/actions/openAiCredits";
import languages from "~/lib/languages";

// Max file size increased to 25MB since we're using Vercel Blob
const MAX_FILE_SIZE = 25 * 1024 * 1024;

// Map file extensions to MIME types
const getAudioMimeType = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  const mimeTypes = {
    m4a: "audio/mp4", // m4a is actually a container format for MP4 audio
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

  const [credits, setcredits] = React.useState(openAiCredits);

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
      // First, upload the file to Vercel Blob
      let blobUrl;
      let contentType;

      try {
        // Show progress at different stages
        setUploadProgress(10);

        // Generate a unique filename with timestamp
        const timestamp = new Date().getTime();
        const filename = `${timestamp}-${selectedFile.name}`;

        // Determine the correct MIME type based on file extension
        const detectedContentType = getAudioMimeType(selectedFile.name);
        console.log(`Detected content type: ${detectedContentType}`);

        // Create FormData for the blob upload
        const blobFormData = new FormData();
        blobFormData.append("file", selectedFile);
        blobFormData.append("filename", filename);

        setUploadProgress(30);

        console.log(
          `Uploading file: ${filename}, size: ${selectedFile.size} bytes`,
        );
        // Upload to your blob upload endpoint
        const uploadResponse = await fetch("/api/translatorblob", {
          method: "POST",
          body: blobFormData,
        });

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error("Blob upload error response:", errorText);
          throw new Error(
            `Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`,
          );
        }

        const uploadData = await uploadResponse.json();
        blobUrl = uploadData.url;
        contentType =
          uploadData.contentType || detectedContentType || selectedFile.type;

        console.log(
          `File uploaded successfully. URL: ${blobUrl.substring(0, 30)}..., Content-Type: ${contentType}`,
        );
        setUploadProgress(75);
      } catch (error) {
        console.error("Error uploading to Vercel Blob:", error);
        throw new Error(`Failed to upload audio file: ${error.message}`);
      }

      // Now process the audio via the blob URL
      console.log("Starting audio processing...");
      const response = await fetch("/api/translatorAudio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blobUrl,
          language,
          contentType,
        }),
      });

      setUploadingToBlob(false);
      setUploadProgress(100);

      // Get the full response text first for debugging
      const responseText = await response.text();
      console.log(`API response: ${response.status} ${response.statusText}`);

      // Parse the JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response as JSON:", responseText);
        throw new Error(
          `Invalid response from server: ${responseText.substring(0, 100)}`,
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Server error: ${response.status} ${response.statusText}`,
        );
      }

      if (data.success) {
        setGeneratedTranslation(data.data.text);
        const creditCost = data.data.text.length * 3;
        setcredits((prevCredits) => prevCredits - creditCost);
        await deductOpenAiCredits(creditCost);
      } else {
        console.error("Error transcribing audio:", data.error);
        throw new Error(data.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error in translation process:", error);
      toast({
        title: "Error processing audio",
        description:
          error instanceof Error
            ? error.message
            : "Failed to process audio file",
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
      // Get file extension
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

      // Check if extension is valid
      if (
        !validExtensions.includes(fileExtension) &&
        !file.type.startsWith("audio/")
      ) {
        setFileError(
          "Please upload a valid audio file (.m4a, .mp3, .webm, .mp4, .mpga, .wav, or .mpeg)",
        );
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError(
          `File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        );
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTranslateClick = () => {
    if (!selectedFile) {
      setFileError("Please select an audio file to translate");
      return;
    }

    if (!subData) {
      setOpenNoSessionModal();
    } else if (
      subData.status !== "STUDENT" &&
      subData.status !== "CREATOR" &&
      subData.status !== "BUSINESS"
    ) {
      setShowFreeModal(true);
    } else {
      translateAudio();
    }
  };

  return (
    <div className="w-full max-w-xl p-4">
      <div className="mt-10 flex items-center space-x-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#1877F290] bg-blue-300">
          <IconEar className="text-black" />
        </div>
        <p className="text-left font-medium">
          Upload Audio File <span className="text-slate-500"></span>
        </p>
      </div>

      <label className="my-1 ml-1 block text-left text-sm font-medium text-gray-900 dark:text-white">
        Upload file:
      </label>
      <input
        className="mb-2 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
        type="file"
        accept=".m4a,.mp3,.webm,.mp4,.mpga,.wav,.mpeg,audio/*"
        onChange={handleFileChange}
        disabled={loading}
      />
      {fileError && <p className="my-1 text-sm text-red-500">{fileError}</p>}
      <p className="my-2 text-sm text-gray-500 dark:text-gray-300">
        Accepted file formats: m4a, mp3, webm, mp4, mpga, wav, and mpeg. Maximum
        file size: 25MB.
      </p>

      <div className="mb-5 flex items-center space-x-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#1877F290] bg-blue-300">
          <IconFlag className="text-black" />
        </div>
        <p className="text-left font-medium">Choose your Language.</p>
      </div>

      <select
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-black dark:focus:ring-black"
        onChange={handleChange}
        value={language}
        disabled={loading}
      >
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>

      {uploadingToBlob && uploadProgress > 0 && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between">
            <span className="text-sm text-gray-700">Uploading file...</span>
            <span className="text-sm text-gray-700">{uploadProgress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {!loading && (
        <button
          className="mt-8 w-full rounded-xl bg-primary px-4 py-2 font-medium text-white hover:bg-primary/80 disabled:cursor-not-allowed disabled:bg-gray-400 sm:mt-10"
          onClick={handleTranslateClick}
          disabled={!selectedFile || loading}
        >
          Translate &rarr;
        </button>
      )}
      {loading && (
        <button
          className="mt-8 w-full rounded-xl bg-primary px-4 py-2 font-medium text-white hover:bg-primary/80 sm:mt-10"
          disabled
        >
          <LoadingDots color="white" style="large" />
        </button>
      )}

      {generatedTranslation && (
        <div className="mt-8">
          <label className="text-md my-2 block text-left font-medium text-gray-900 dark:text-white">
            Translation:
          </label>
          <div
            className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            onClick={() => {
              navigator.clipboard.writeText(generatedTranslation);
              toast({
                title: "Translation copied to clipboard",
              });
            }}
          >
            <p>{generatedTranslation}</p>
          </div>
          <p className="my-1 text-sm text-gray-500 dark:text-gray-300">
            Click on the translation to copy.
          </p>
          <button
            className="my-2 text-sm text-blue-500 underline"
            onClick={() => {
              navigator.clipboard
                .writeText(generatedTranslation)
                .then(() => {
                  window.open("/texttovoice", "_blank");
                })
                .catch((err) => console.error("Failed to copy text: ", err));
            }}
          >
            Copy and open Text to Voice
          </button>
        </div>
      )}

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

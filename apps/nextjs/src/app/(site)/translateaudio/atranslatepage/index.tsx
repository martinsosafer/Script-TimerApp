"use client";

import * as React from "react";
import Image from "next/image";

import { IconEar, IconFlag } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import FreeModal from "~/app/(site)/components/free-modal"; // Import the FreeModal
import LoadingDots from "~/app/(site)/components/loadingdots";
import deductOpenAiCredits from "~/app/actions/openAiCredits";
import languages from "~/lib/languages";

export default function AudioTranslate({
  subData,
  setOpenNoSessionModal,
  openAiCredits,
}) {
  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState<string>(languages[0]?.value);
  const [generatedTranslation, setGeneratedTranslation] =
    React.useState<string>("");
  const [selectedFile, setSelectedFile] = React.useState<File | undefined>(
    undefined,
  );
  const [showFreeModal, setShowFreeModal] = React.useState(false); // State for showing the FreeModal

  const [credits, setcredits] = React.useState(openAiCredits);

  const translateAudio = async () => {
    setGeneratedTranslation("");
    setLoading(true);

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("language", language);

    if (credits < 60) {
      toast({
        title: "Insufficient Credits",
        description: "You do not have enough credits for this translation.",
      });
      setLoading(false);
    } else {
      try {
        const response = await fetch("/api/translatorAudio", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success as boolean) {
          setGeneratedTranslation(data.data.text);
          setcredits(credits - data.data.text.length * 3);
          await deductOpenAiCredits(data.data.text.length * 3);
        } else {
          console.error("Error transcribing audio:", data.error);
          toast({ title: "Error transcribing audio", description: data.error });
        }
      } catch (error) {
        console.error("Error transcribing audio:", error);
        toast({
          title: "Error transcribing audio",
          description: (error as Error).message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleTranslateClick = () => {
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
        accept="audio/*"
        onChange={handleFileChange}
      />
      <p className="my-2 text-sm text-gray-500 dark:text-gray-300">
        Accepted file formats: m4a, mp3, webm, mp4, mpga, wav, and mpeg.
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
      >
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>

      {!loading && (
        <button
          className="mt-8 w-full rounded-xl bg-primary px-4 py-2 font-medium text-white hover:bg-primary/80 sm:mt-10"
          onClick={handleTranslateClick} // Modified to use handleTranslateClick
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
            Copy and open Text to Voice.
          </button>
        </div>
      )}

      {showFreeModal && (
        <FreeModal
          openModal={showFreeModal}
          setOpenModal={setShowFreeModal}
          plan="Student" // You can adjust this as needed
        />
      )}
    </div>
  );
}

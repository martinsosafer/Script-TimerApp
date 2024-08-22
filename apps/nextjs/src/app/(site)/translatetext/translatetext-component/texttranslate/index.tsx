"use client";

import * as React from "react";

import { IconFlag, IconScanText } from "@voiceai/ui/@/components/ui/icons";
import { toast, ToastAction } from "@voiceai/ui/@/components/ui/toast";

import FreeModal from "~/app/(site)/components/free-modal"; // Import the FreeModal
import LoadingDots from "~/app/(site)/components/loadingdots";
import languages from "~/lib/languages";

export default function TextTranslate({ subData, setOpenNoSessionModal }) {
  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState<string>(languages[0]?.value);
  const [generatedTranslation, setGeneratedTranslation] =
    React.useState<string>("");
  const [text, setText] = React.useState<string>("");
  const [showFreeModal, setShowFreeModal] = React.useState(false); // State for showing the FreeModal

  const url = "https://api.openai.com/v1/audio/transcriptions";
  const currentModel = "gpt-4o";
  const prompt = `Please translate the following text into ${language},The translation should always be in ${language} and should be grammatically correct , only give me the text do not add anything else . \n\nOriginal text:\n"${text}"\n\nPlease provide your translation below:`;

  const translateText = async () => {
    setGeneratedTranslation("");
    setLoading(true);

    try {
      const response = await fetch("/api/translatorText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          currentModel,
        }),
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = JSON.parse(responseText);

      if (!data?.data) {
        throw new Error("Invalid response structure");
      }

      setGeneratedTranslation(data.data);
    } catch (error) {
      console.error("Error during translation:", error);
      toast({
        title: "Translation failed",
        description:
          "An error occurred while translating the text. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedLabel = languages.find(
      (language) => language.value === selectedValue,
    )?.value;
    if (selectedLabel) {
      setLanguage(selectedLabel);
    }
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
      translateText();
    }
  };

  return (
    <div className="w-full max-w-xl">
      <div className="mt-10 flex items-center space-x-3">
        <div className="flex h-9 w-9 items-center justify-center gap-3 rounded-lg border-2 border-[#1877F290] bg-blue-300">
          <IconScanText className="text-black" />
        </div>
        <p className="text-left font-medium ">
          Enter the text you want to translate
        </p>
      </div>
      <textarea
        className="my-3 block h-[80px] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-black dark:focus:ring-black"
        placeholder="Write your text here..."
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="mb-5 flex items-center space-x-3">
        <div className="flex h-9 w-9 items-center justify-center gap-3 rounded-lg border-2 border-[#1877F290] bg-blue-300">
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
        <>
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
        </>
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

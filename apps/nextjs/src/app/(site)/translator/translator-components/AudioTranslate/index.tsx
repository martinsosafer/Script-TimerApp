import * as React from "react";
import Image from "next/image";

import { toast } from "@voiceai/ui/@/components/ui/toast";

import LoadingDots from "~/app/(site)/components/loadingdots";
import languages from "~/lib/languages";

export default function AudioTranslate({}) {
  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState<string>(languages[0]?.value);
  const [generatedTranslation, setGeneratedTranslation] =
    React.useState<string>("");
  const [selectedFile, setSelectedFile] = React.useState<File | undefined>(
    undefined,
  );

  const url = "https://api.openai.com/v1/audio/transcriptions";

  const transcribe = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("model", "whisper-1");
    formData.append("response_type", "verbose_json");
    if (language) {
      formData.append("language", language);
    }
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OpenAI API Key is missing.");
      return;
    }
    const headers = new Headers();

    headers.append("Authorization", `Bearer ${apiKey}`);
    return fetch(url, {
      method: "POST",
      body: formData,
      headers: headers,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  };

  const translateAudio = async () => {
    setGeneratedTranslation("");
    setLoading(true);
    const transcribed = await transcribe();
    console.log("transcription", transcribed.text);
    setGeneratedTranslation(transcribed.text);
    setLoading(false);
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

  return (
    <div>
      <div className="w-full max-w-xl">
        <div className="mt-10 flex flex-row items-center space-x-3">
          <Image
            src="/apps/nextjs/public/notebook.png"
            width={30}
            height={30}
            alt="1 icon"
            className="mb-5 sm:mb-0"
          />
          <div className="">
            <p className="text-left font-medium">
              Upload Audio File <span className="text-slate-500 ">)</span>
            </p>
          </div>
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
          The following file formats are accepted: m4a, mp3, webm, mp4, mpga,
          wav, and mpeg.
        </p>

        <div className="mb-5 flex items-center space-x-3">
          <Image
            src="/apps/nextjs/public/notebook.png"
            width={30}
            height={30}
            alt="1 icon"
          />
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
            className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
            onClick={translateAudio}
          >
            Translate &rarr;
          </button>
        )}
        {loading && (
          <button
            className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
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
              <p> {generatedTranslation}</p>
            </div>
            <p className="my-1 text-sm text-gray-500 dark:text-gray-300">
              Click on translation to copy on clipboard
            </p>
            <div className="mb-[-80px]" />
          </>
        )}
      </div>
    </div>
  );
}

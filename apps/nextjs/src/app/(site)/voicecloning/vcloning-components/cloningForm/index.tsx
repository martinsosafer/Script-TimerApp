"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@voiceai/ui/@/components/ui/toast";

import LoadingDots from "~/app/(site)/components/loadingdots";
import { api } from "~/utils/api";
import AudioRecorderModal from "../cloningRmodal";

export default function VoiceCloningForm() {
  const router = useRouter();
  const { mutateAsync: newCustomVoice } =
    api.voiceCustom.newCustomVoice.useMutation({
      onSuccess(data) {
        console.log("Voice Created", data);
        toast({
          title: "Voice Created",
          description: "Voice created successfully",
        });
        router.replace("/voicecloning");
      },
      onError(error) {
        console.error("Error creating voice", error);
        toast({ title: "Error creating voice", description: error.message });
      },
    });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        file,
      }));
      console.log("File selected from input:", file);
    }
  };

  const handleSaveAudio = (file) => {
    console.log("Audio file saved:", file);

    // Use the functional update form to ensure the latest state is used
    setFormData((prevData) => {
      const updatedData = { ...prevData, file };
      console.log("Form data updated with recorded file:", updatedData);
      return updatedData;
    });

    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.file) {
      alert("Please select a file");
      setLoading(false);
      return;
    }

    console.log("File before reading:", formData.file);

    const reader = new FileReader();
    reader.readAsDataURL(formData.file);
    reader.onloadend = async () => {
      const base64String = reader.result;
      console.log("Base64 audio string:", base64String);
      try {
        await newCustomVoice({
          name: formData.name,
          description: formData.description,
          files: base64String,
          type: "11LABS",
          active: true,
        });
      } catch (error) {
        console.error("Error creating voice", error);
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
      console.error("Error reading file");
      setLoading(false);
    };
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-col space-y-4"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-left text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            maxLength={12}
            required
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="description"
            className="text-left text-sm font-semibold"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            maxLength={35}
            required
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="file" className="text-left text-sm font-semibold">
            Upload file{" "}
            <span className="text-xs text-slate-500">
              Formats that are accepted: m4a, mp3, webm, mp4, mpga, wav, and
              mpeg.
            </span>
          </label>
          <input
            className="block w-full cursor-pointer rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none"
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
          />
          {formData.file && (
            <div className="text-sm text-gray-600">
              Selected file: {formData.file.name}
            </div>
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Record Audio
        </button>

        <button
          type="submit"
          className={`flex items-center justify-center rounded-md py-2 font-semibold text-white ${
            loading
              ? "cursor-not-allowed bg-gray-400"
              : "cursor-pointer bg-primary"
          }`}
          disabled={loading}
        >
          {loading ? (
            <LoadingDots color="white" style="large" />
          ) : (
            "Create Voice"
          )}
        </button>
      </form>
      <AudioRecorderModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSaveAudio}
      />
    </>
  );
}

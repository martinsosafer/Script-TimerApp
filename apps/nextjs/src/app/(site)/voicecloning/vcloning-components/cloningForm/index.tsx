"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { IconMic2 } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import LoadingDots from "~/app/(site)/components/loadingdots";
import { api } from "~/utils/api";
import AudioRecorderModal from "../cloningRmodal";

export default function VoiceCloningForm({ onVoiceCreated }) {
  const router = useRouter();
  const { mutateAsync: newCustomVoice } =
    api.voiceCustom.newCustomVoice.useMutation({
      onSuccess(data) {
        console.log("Voice Created", data);
        toast({
          title: "Voice Created",
          description: "Voice created successfully",
        });
        onVoiceCreated();
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
        // Reset form fields after successful submission
        setFormData({
          name: "",
          description: "",
          file: undefined,
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
        className="mx-auto flex w-full max-w-md flex-col space-y-4 rounded-lg bg-slate-100 p-6 shadow-md"
      >
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="name"
            className="text-left text-sm font-semibold text-gray-700"
          >
            Name{" "}
            <span className="text-sm text-slate-400">(max 12 characters)</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            maxLength={14}
            required
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="description"
            className="text-left text-sm font-semibold text-gray-700"
          >
            Description{" "}
            <span className="text-sm text-slate-400">(max 30 characters)</span>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            maxLength={30}
            required
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="file"
            className="text-left text-sm font-semibold text-gray-700"
          >
            Upload file{" "}
            <span className="text-xs text-slate-500">
              Formats that are accepted: m4a, mp3, webm, mp4, mpga, wav, and
              mpeg.
            </span>
          </label>
          <input
            className="block w-full cursor-pointer rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
          />
          {formData.file && (
            <div className="text-md text-black">
              Selected file: {formData.file.name}
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600">
          If you have no sample audio, just click "Record Audio".
        </p>

        <button
          type="button"
          className="hover:bg-secondary-dark flex items-center justify-center rounded-md bg-primary py-2 font-semibold text-white focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          Record Audio
          <IconMic2 className="ml-2 h-5 w-5 text-white" />
        </button>

        <button
          type="submit"
          disabled={loading}
          className="hover:bg-secondary-dark flex items-center justify-center rounded-md bg-primary py-2 font-semibold text-white focus:outline-none"
        >
          {loading ? <LoadingDots color="#fff" /> : "Clone Voice"}
        </button>
      </form>

      <AudioRecorderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAudio}
      />
    </>
  );
}

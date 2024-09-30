"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

import { IconInfo, IconMic2 } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import FreeModal from "~/app/(site)/components/free-modal";
import LoadingDots from "~/app/(site)/components/loadingdots";
import { api } from "~/utils/api";
import AudioRecorderModal from "../cloningRmodal";

export default function VoiceCloningForm({
  onVoiceCreated,
  subData,
  setOpenNoSessionModal,
}) {
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
        toast({
          title: "Error creating voice",
          description:
            error.message ||
            "An unexpected error occurred while creating the voice",
        });
      },
    });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFreeModal, setShowFreeModal] = useState(false);

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

    if (!subData) {
      setOpenNoSessionModal();
      return;
    }

    if (subData.status !== "CREATOR" && subData.status !== "BUSINESS") {
      setShowFreeModal(true);
      return;
    }

    setLoading(true);

    if (!formData.file) {
      alert("Please select a file");
      setLoading(false);
      return;
    }

    try {
      // Upload file to Vercel Blob
      const uploadedFile = await upload(formData.file.name, formData.file, {
        access: "public",
        handleUploadUrl: "/api/upload", // This will be the API route on your backend
      });

      // Submit the form data with the uploaded file URL
      await newCustomVoice({
        name: formData.name,
        description: formData.description,
        files: uploadedFile.url, // Send the URL to your backend
        type: "11LABS",
        active: true,
      });

      // Reset form fields after successful submission
      setFormData({
        name: "",
        description: "",
        file: undefined,
      });

      toast({
        title: "Voice Created",
        description: "Voice created successfully",
      });
      onVoiceCreated();
    } catch (error) {
      console.error("Error creating voice", error);
      toast({ title: "Error creating voice", description: error.message });
    } finally {
      setLoading(false);
    }
  };
  const handleRecordAudioClick = (e) => {
    if (loading) {
      e.preventDefault();
      return;
    }

    if (!subData) {
      e.preventDefault();
      setOpenNoSessionModal();
      return;
    }
    const allowedStatuses = [
      "CREATOR",
      "BUSINESS",
      "CREATORCLMO",
      "BUSINESSCLMO",
      "CREATORCLYR",
      "BUSINESSCLYR",
    ];
    if (!allowedStatuses.includes(subData.status)) {
      e.preventDefault();
      setShowFreeModal(true);
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-col space-y-4 rounded-lg bg-slate-100 p-6 shadow-md"
      >
        {/* Instructional message */}
        <div className="flex justify-center">
          <div className="flex max-w-md items-start text-sm text-slate-500 sm:text-sm">
            <div className="flex h-9 w-9 items-center justify-center gap-3 rounded-lg border-2 border-[#1877F290] bg-blue-300">
              <IconInfo className="text-black" />
            </div>
            <span className="ml-3">
              Use a clean sample recording. Samples should contain:
              {"\n"}1 speaker, be over 1 minute long, and no background noise.
            </span>
          </div>
        </div>

        {/* Name Field */}
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

        {/* Description Field */}
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

        {/* File Upload Field */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="file"
            className="text-left text-sm font-semibold text-gray-700"
          >
            Upload file{" "}
            <span className="text-xs text-slate-500">
              Formats that are accepted: m4a, mp3, webm, mp4, mpga, wav, and
              mpeg.
            </span>{" "}
            <span className="text-sm text-slate-400">(max 8 MB)</span>
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

        {/* Recording Instructions */}
        <p className="text-sm text-gray-600">
          If you have no sample audio, just click "Record Audio".
        </p>

        {/* Record Audio Button */}
        <button
          type="button"
          className="hover:bg-secondary-dark flex items-center justify-center rounded-md bg-primary py-2 font-semibold text-white focus:outline-none"
          onClick={handleRecordAudioClick}
        >
          Record Audio
          <IconMic2 className="ml-2 h-5 w-5 text-white" />
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="hover:bg-secondary-dark flex items-center justify-center rounded-md bg-primary py-2 font-semibold text-white focus:outline-none"
          onClick={(e) => {
            if (!subData) {
              e.preventDefault();
              setOpenNoSessionModal();
              return;
            }

            if (subData.status !== "CREATOR" && subData.status !== "BUSINESS") {
              e.preventDefault();
              setShowFreeModal(true);
              return;
            }

            // If the user has the required plan, proceed with the form submission
            handleSubmit(e);
          }}
        >
          {loading ? <LoadingDots color="#fff" /> : "Accept & Create"}
        </button>
      </form>

      <AudioRecorderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAudio}
      />
      {showFreeModal && (
        <FreeModal
          openModal={showFreeModal}
          setOpenModal={setShowFreeModal}
          plan="Creator" // You can set this dynamically if needed
        />
      )}
    </>
  );
}

"use client";

import React, { useState } from "react";

import { toast } from "@voiceai/ui/@/components/ui/toast";

import LoadingDots from "~/app/(site)/components/loadingdots";
import { api } from "~/utils/api";

export default function VoiceCloningForm() {
  const { mutateAsync: newCustomVoice } =
    api.voiceCustom.newCustomVoice.useMutation({
      onSuccess(data) {
        console.log("Voice Created", data);
        toast({
          title: "Voice Created",
          description: "Voice created successfully",
        });
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.file) {
      alert("Please select a file");
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(formData.file);
    reader.onloadend = async () => {
      const base64String = reader.result;

      try {
        await newCustomVoice({
          name: formData.name,
          description: formData.description,
          files: base64String, // Send base64 string to the backend
          type: "11LABS", // Automatically set type to 11LABS
          active: true, // Automatically set active to true
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
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
      <div className="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <div className="mb-4">
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
      </div>
      {!loading && (
        <button
          type="submit"
          className="mt-8 w-full rounded-xl bg-primary px-4 py-2 font-medium text-white hover:bg-primary/80 sm:mt-10"
        >
          Submit
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
    </form>
  );
}

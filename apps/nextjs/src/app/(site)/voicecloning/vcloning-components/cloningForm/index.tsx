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
    picture: "",
    gender: "OTHER",
    type: "OTHER",
    active: true,
    metadata: {},
    file: undefined,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = type === "checkbox" ? e.target.checked : value;

    if (name === "metadata") {
      try {
        newValue = JSON.parse(newValue);
      } catch (error) {
        console.error("Error parsing metadata JSON:", error);
      }
    }

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

    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("description", formData.description);
    if (formData.picture) {
      submissionData.append("picture", formData.picture);
    }
    if (formData.file) {
      submissionData.append("files", formData.file);
    }
    submissionData.append("gender", formData.gender);
    submissionData.append("type", formData.type);
    submissionData.append("active", formData.active.toString());
    submissionData.append("metadata", JSON.stringify(formData.metadata));

    try {
      await newCustomVoice({
        name: formData.name,
        description: formData.description,
        files: formData.file,
        picture: formData.picture,
        gender: formData.gender,
        type: formData.type,
        active: formData.active,
        metadata: formData.metadata,
      });
    } catch (error) {
      console.error("Error creating voice", error);
    } finally {
      setLoading(false);
    }
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
        <input
          type="text"
          id="picture"
          name="picture"
          placeholder="Picture URL"
          value={formData.picture}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="input-field"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="input-field"
        >
          <option value="11LABS">11LABS</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          id="active"
          name="active"
          checked={formData.active}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="active" className="select-none">
          Active
        </label>
      </div>
      <div className="mb-4">
        <textarea
          id="metadata"
          name="metadata"
          placeholder="Metadata"
          value={
            formData.metadata ? JSON.stringify(formData.metadata, null, 2) : ""
          }
          onChange={handleChange}
          className="input-field"
          rows={5}
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

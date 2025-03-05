import React, { useState } from "react";

import { api } from "~/utils/api";

export default function VoiceForm() {
  const { mutateAsync: createVoice } = api.voice.newVoice.useMutation({
    onSuccess(data) {
      console.log("Voice Created", data);
    },
    onError(error) {
      console.error("Error creating voice", error);
    },
  });

  const [formData, setFormData] = useState<{
    external_id: string;
    name: string;
    description: string;
    picture?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    type?: "11LABS" | "GOOGLE" | "OTHER";
    active?: boolean;
    metadata?: Record<string, unknown>;
    rank: number;
    celebrity: boolean;
    languageCode?: string;
    ssmlGender?: "MALE" | "FEMALE" | "NEUTRAL";
  }>({
    external_id: "",
    name: "",
    description: "",
    picture: "",
    gender: "OTHER",
    type: "OTHER",
    active: true,
    metadata: {},
    rank: 0,
    celebrity: false,
    languageCode: "en-US",
    ssmlGender: "NEUTRAL",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    let newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    if (name === "metadata") {
      try {
        newValue = JSON.parse(value); // Parse the JSON string
      } catch (error) {
        console.error("Error parsing metadata JSON:", error);
        return; // Don't update state if JSON is invalid
      }
    } else if (name === "rank") {
      newValue = parseFloat(value);
      if (isNaN(newValue)) {
        newValue = 0;
      }
    }

    // Handle gender changes for Google Voices
    if (name === "gender" && formData.type === "GOOGLE") {
      setFormData((prev) => ({
        ...prev,
        gender: newValue,
        metadata: {
          ...prev.metadata,
          labels: {
            ...prev.metadata?.labels,
            gender: newValue, // Update gender in metadata.labels
          },
        },
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleGoogleParamsChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      metadata: {
        ...prev.metadata,
        labels: {
          ...prev.metadata?.labels,
          ...(field === "languageCode" && { language_code: value }),
          ...(field === "ssmlGender" && { ssml_gender: value }),
          ...(field === "gender" && { gender: value }), // Add gender to labels
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createVoice(formData);
    } catch (error) {
      console.error("Error creating voice", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
      <div className="mb-4">
        <input
          type="text"
          id="external_id"
          name="external_id"
          placeholder="External ID"
          value={formData.external_id}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
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
          placeholder="Picture"
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
          <option value="GOOGLE">Google</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      {formData.type === "GOOGLE" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Language Code (e.g., en-US)"
              value={formData.languageCode}
              onChange={(e) =>
                handleGoogleParamsChange("languageCode", e.target.value)
              }
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <select
              value={formData.ssmlGender}
              onChange={(e) =>
                handleGoogleParamsChange("ssmlGender", e.target.value)
              }
              className="input-field"
              required
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="NEUTRAL">Neutral</option>
            </select>
          </div>
        </>
      )}
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
        <input
          type="number"
          id="rank"
          name="rank"
          placeholder="Rank"
          value={formData.rank}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          id="celebrity"
          name="celebrity"
          checked={formData.celebrity}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="celebrity" className="select-none">
          Celebrity?
        </label>
      </div>
      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
}

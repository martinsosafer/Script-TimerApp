import React, { useState } from "react";

import { api } from "~/utils/api";

interface GoogleVoiceFormProps {
  onClose: () => void;
}

const GoogleVoiceForm: React.FC<GoogleVoiceFormProps> = ({ onClose }) => {
  const { mutateAsync: newVoice } = api.voice.newVoice.useMutation();
  const [voiceId, setVoiceId] = useState("");
  const [error, setError] = useState("");

  const parseGoogleVoiceId = (id: string) => {
    const parts = id.split("-");
    if (parts.length < 4) {
      setError("Invalid Google Voice ID format");
      return null;
    }

    const [languageCode, regionCode, voiceType, voiceVariant] = parts;
    const gender =
      voiceVariant === "F" ? "FEMALE" : voiceVariant === "M" ? "MALE" : "OTHER";

    return {
      name: `Google ${voiceType} ${gender}`,
      description: `Google ${languageCode}-${regionCode} ${gender} voice (${voiceType})`,
      gender,
      metadata: {
        engine: "Google Cloud TTS",
        language: `${languageCode}-${regionCode}`,
        voiceType,
        voiceVariant,
      },
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsedData = parseGoogleVoiceId(voiceId);
    if (!parsedData) return;

    try {
      await newVoice({
        external_id: voiceId,
        name: parsedData.name,
        description: parsedData.description,
        picture: "/google-voice-icon.png", // Default image
        gender: parsedData.gender as "MALE" | "FEMALE" | "OTHER",
        type: "GOOGLE",
        active: true,
        metadata: parsedData.metadata,
        rank: 0,
        celebrity: false,
      });
      onClose();
    } catch (err) {
      setError("Error creating voice. Please check the ID format.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-bold">Add Google TTS Voice</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Google Voice ID
              <input
                type="text"
                value={voiceId}
                onChange={(e) => setVoiceId(e.target.value)}
                placeholder="e.g. en-US-Wavenet-F"
                className="mt-1 w-full rounded-md border p-2"
              />
            </label>
            <p className="mt-1 text-sm text-gray-600">
              Example formats:
              <br />• en-US-Wavenet-A
              <br />• fr-FR-Standard-D
              <br />• ja-JP-Wavenet-B
            </p>
          </div>

          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Create Voice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoogleVoiceForm;

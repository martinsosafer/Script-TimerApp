import React, { useEffect, useState } from "react";

import VoiceForm from "./voiceform";

interface VoiceData {
  id: string;
  external_id: string;
  active: boolean;
  voice_type: string;
  name: string;
  picture: string;
  metadata: any; // Adjust the type accordingly
  created_at: Date;
  updated_at: Date;
  description: string;
  gender: string;
  rank: number;
  celebrity: boolean; // New field added
}

interface VoiceboardProps {
  voiceList: VoiceData[];
}

const Voiceboard: React.FC<VoiceboardProps> = ({ voiceList }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredVoices, setFilteredVoices] = useState<VoiceData[]>(voiceList);
  const [showVoiceForm, setVoiceForm] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = voiceList.filter(
      (voice) =>
        voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voice.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredVoices(filtered);
  }, [searchTerm, voiceList]);

  const handleAddVoice = () => {
    setVoiceForm(true);
  };

  const handleCloseVoiceForm = () => {
    setVoiceForm(false);
  };

  return (
    <div className="container mx-auto mb-12 p-4">
      <h1 className="mb-4 text-2xl font-bold">Voiceboard</h1>
      <div className="mb-4 flex flex-wrap">
        <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/2">
          <input
            type="text"
            placeholder="Search by name or description"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <button
          onClick={handleAddVoice}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Add New Voice
        </button>
      </div>

      {showVoiceForm && <VoiceForm onClose={handleCloseVoiceForm} />}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">External ID</th>
            <th className="px-4 py-2">Active</th>
            <th className="px-4 py-2">Voice Type</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Picture</th>
            <th className="px-4 py-2">Metadata</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Updated At</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">Celebrity</th> {/* New column added */}
          </tr>
        </thead>
        <tbody>
          {filteredVoices.map((voice, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="px-4 py-2">{voice.id}</td>
              <td className="px-4 py-2">{voice.external_id}</td>
              <td className="px-4 py-2">{voice.active ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{voice.voice_type}</td>
              <td className="px-4 py-2">{voice.name}</td>
              <td className="px-4 py-2">
                <img
                  src={voice.picture}
                  alt={voice.name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="px-4 py-2">{JSON.stringify(voice.metadata)}</td>{" "}
              {/* You may need to format metadata accordingly */}
              <td className="px-4 py-2">
                {voice.created_at.toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {voice.updated_at.toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{voice.description}</td>
              <td className="px-4 py-2">{voice.gender}</td>
              <td className="px-4 py-2">{voice.rank}</td>
              <td className="px-4 py-2">
                {voice.celebrity ? "Yes" : "No"}
              </td>{" "}
              {/* New data column */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Voiceboard;

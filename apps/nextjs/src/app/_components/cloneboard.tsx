import React, { useEffect, useState } from "react";

import VoiceForm from "./voiceform";

interface VoiceData {
  id: string;
  external_id: string;
  active: boolean;
  name: string;
  metadata: any; // Adjust the type accordingly
  created_at: Date;
  updated_at: Date;
  description: string;
  userEmail: string;
}

interface CloneBoardProps {
  voiceList: VoiceData[];
}

const CloneBoard: React.FC<CloneBoardProps> = ({ voiceList }) => {
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
      <h1 className="mb-4 text-2xl font-bold">CloneBoard</h1>
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
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Updated At</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">User Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredVoices.map((voice, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="px-4 py-2">{voice.id}</td>
              <td className="px-4 py-2">{voice.external_id}</td>
              <td className="px-4 py-2">{voice.active ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{voice.name}</td>
              <td className="px-4 py-2">
                {new Date(voice.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(voice.updated_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{voice.description}</td>
              <td className="px-4 py-2">{voice.userEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CloneBoard;

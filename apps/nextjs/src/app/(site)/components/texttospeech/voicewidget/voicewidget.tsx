import React, { useState } from "react";

import { IconSearch } from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";
import VoiceCards from "../voicecards/voicecards";

function VoiceWidget({ onModelSelect }) {
  const { data: allVoices } = api.voice.list.useQuery({ name: "" });
  console.log("voices", allVoices);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(null);
  const pageSize = 10;

  const filteredVoices = allVoices?.filter((voice) => {
    // Filter by search query
    const matchesSearchQuery = voice.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // Filter by gender if a filter is selected
    const matchesGenderFilter = !filter || voice.gender === filter;
    return matchesSearchQuery && matchesGenderFilter;
  });

  // Calculate pagination boundaries for filtered voices
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredVoices?.length || 0);
  const voices = filteredVoices?.slice(startIndex, endIndex);

  // Calculate total number of pages based on filtered voices
  const totalPages = Math.ceil((filteredVoices?.length || 0) / pageSize);
  //function to handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };
  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Function to handle filter change
  const handleFilterChange = (gender) => {
    setSearchQuery("");

    if (filter === gender) {
      setFilter(null);
    } else {
      setFilter(gender);
    }

    setCurrentPage(1);
  };

  return (
    <div>
      <div className="rounded-lg  bg-gray-100 p-6 shadow-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-md border border-gray-300 px-8 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <IconSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Separator */}
        <hr className="my-4 border-gray-300" />

        {/* Filter Buttons */}
        <div className="mb-4 space-x-4">
          <button className="rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400">
            Favorite
          </button>
          <button
            className={`rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400 ${
              filter === "MALE" ? "bg-blue-100 text-primary" : ""
            }`}
            onClick={() => handleFilterChange("MALE")}
          >
            Male
          </button>
          <button
            className={`rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400 ${
              filter === "FEMALE" ? "bg-blue-100 text-primary" : ""
            }`}
            onClick={() => handleFilterChange("FEMALE")}
          >
            Female
          </button>
        </div>

        <VoiceCards voices={voices} onModelSelect={onModelSelect} />

        {/* Pagination controls */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`mx-2 rounded-full px-4 py-2 focus:outline-none ${
                  pageNumber === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default VoiceWidget;

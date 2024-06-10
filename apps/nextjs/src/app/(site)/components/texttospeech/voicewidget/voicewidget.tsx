import React, { useState } from "react";

import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";
import FavoriteVoiceCards from "../favoritevoicescard/favoritevoicescard";
import VoiceCards from "../voicecards/voicecards";

function VoiceWidget({
  onModelSelect,
  favoriteVoices,
  refreshSubscriptionData,
}) {
  console.log("Favorite Voices", favoriteVoices);
  const { data: allVoices, refetch } = api.voice.list.useQuery({ name: "" });
  console.log("Favorite Voices", favoriteVoices);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const pageSize = 8;

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

  // Function to handle search change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMaleFilterChange = () => {
    setShowFavorites(false);
    setFilter("MALE");
    setCurrentPage(1);
    setSearchQuery("");
  };

  // Function to handle filter change for FEMALE filter
  const handleFemaleFilterChange = () => {
    setShowFavorites(false);
    setFilter("FEMALE");
    setCurrentPage(1);
    setSearchQuery("");
  };

  // Function to handle showing all voices
  const handleShowAll = () => {
    setShowFavorites(false);
    setSearchQuery("");
    setFilter(null);
    setCurrentPage(1);
    setShowFavorites(false); // Make sure to hide favorite voices when showing all
  };
  const handleFavoriteChange = (voice) => {
    // Update favorite state here
    // You can make an API call to update the backend as well
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const updatedFavorites = [...favoriteVoices];
    const index = updatedFavorites.findIndex((v) => v.id === voice.id);
    if (index !== -1) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(voice);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setFavoriteVoices(updatedFavorites);
  };
  // Function to handle showing favorite voices
  const handleShowFavorites = () => {
    setShowFavorites(true);
    setCurrentPage(1);
    setSearchQuery("");
    setFilter(null);
  };

  // Function to render pagination controls
  const renderPagination = () => {
    const pageNumbers = [];
    const maxButtons = 4;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));

    if (startPage + maxButtons > totalPages) {
      startPage = Math.max(1, totalPages - maxButtons + 1);
    }

    for (
      let i = startPage;
      i < startPage + maxButtons && i <= totalPages;
      i++
    ) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center">
        <button
          className="mx-2 rounded-full px-4 py-2 focus:outline-none"
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IconChevronLeft className="h-5 w-5" />
        </button>
        {pageNumbers.map((pageNumber) => (
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
        ))}
        <button
          className="mx-2 rounded-full px-4 py-2 focus:outline-none"
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          <IconChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full rounded-md border border-gray-300 px-8 py-2 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-slate-500 dark:text-secondary-foreground"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <IconSearch className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Separator */}
      <hr className="my-4 border-gray-300" />

      {/* Filter Buttons */}
      <div className="mb-4 space-x-2">
        <button
          className="rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-slate-500 dark:text-secondary-foreground"
          onClick={handleShowAll}
        >
          All
        </button>
        <button
          className={`rounded-md border border-gray-300 bg-white px-2 py-2 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-slate-500 dark:text-secondary-foreground ${
            filter === "MALE" ? "bg-blue-300 text-primary" : ""
          }`}
          onClick={handleMaleFilterChange}
        >
          Male
        </button>
        <button
          className={`rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400  dark:bg-slate-500 dark:text-secondary-foreground ${
            filter === "FEMALE" ? "bg-blue-300 text-primary" : ""
          }`}
          onClick={handleFemaleFilterChange}
        >
          Female
        </button>
        <button
          className={`rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400  dark:bg-slate-500 dark:text-secondary-foreground ${
            showFavorites ? "bg-blue-300 text-primary" : ""
          }`}
          onClick={handleShowFavorites}
        >
          Favorites
        </button>
      </div>

      {showFavorites ? (
        <div>
          {" "}
          {/* Add a parent element */}
          <FavoriteVoiceCards
            favoriteVoices={favoriteVoices}
            onModelSelect={onModelSelect}
            onFavoriteChange={refreshSubscriptionData}
            refetchVoices={refetch}
          />
        </div>
      ) : (
        <VoiceCards
          voices={voices}
          onModelSelect={onModelSelect}
          onFavoriteChange={refreshSubscriptionData}
          favoriteVoices={favoriteVoices}
        />
      )}
      {/* Pagination controls */}
      <div className="mt-4">{renderPagination()}</div>
    </div>
  );
}

export default VoiceWidget;

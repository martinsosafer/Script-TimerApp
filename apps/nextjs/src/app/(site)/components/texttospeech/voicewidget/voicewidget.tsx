import React, { useState } from "react";

import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";
import CustomVoiceCards from "./customvoicecard/customvoicecard";
import FavoriteVoiceCards from "./favoritevoicescard/favoritevoicescard";
import VoiceCards from "./voicecards/voicecards";

function VoiceWidget({
  onModelSelect,
  favoriteVoices,
  refreshSubscriptionData,
  subData,
}) {
  const { data: allVoices, refetch } = subData
    ? api.voice.list.useQuery({ name: "" })
    : api.voice.publicVoices.useQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentFavPage, setCurrentFavPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const isGenderFiltered = filter === "MALE" || filter === "FEMALE";
  const pageSize = isGenderFiltered ? 8 : 8;

  const filteredVoices = allVoices?.filter((voice) => {
    const matchesSearchQuery = voice.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenderFilter = !filter || voice.gender === filter;
    return matchesSearchQuery && matchesGenderFilter;
  });

  const filteredFavoriteVoices = favoriteVoices?.filter((voice) => {
    const matchesSearchQuery = voice.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenderFilter = !filter || voice.gender === filter;
    return matchesSearchQuery && matchesGenderFilter;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredVoices?.length || 0);
  const voices = filteredVoices?.slice(startIndex, endIndex);

  const favStartIndex = (currentFavPage - 1) * pageSize;
  const favEndIndex = Math.min(
    favStartIndex + pageSize,
    filteredFavoriteVoices?.length || 0,
  );
  const paginatedFavoriteVoices = filteredFavoriteVoices?.slice(
    favStartIndex,
    favEndIndex,
  );

  const totalPages = Math.ceil((filteredVoices?.length || 0) / pageSize);
  const totalFavPages = Math.ceil(
    (filteredFavoriteVoices?.length || 0) / pageSize,
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setCurrentFavPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFavPageChange = (pageNumber) => {
    setCurrentFavPage(pageNumber);
  };

  const handleMaleFilterChange = () => {
    setShowFavorites(false);
    setShowCustom(false);
    setFilter("MALE");
    setCurrentPage(1);
    setCurrentFavPage(1);
    setSearchQuery("");
  };

  const handleFemaleFilterChange = () => {
    setShowFavorites(false);
    setShowCustom(false);
    setFilter("FEMALE");
    setCurrentPage(1);
    setCurrentFavPage(1);
    setSearchQuery("");
  };

  const handleShowAll = () => {
    setShowFavorites(false);
    setShowCustom(false);
    setSearchQuery("");
    setFilter(null);
    setCurrentPage(1);
    setCurrentFavPage(1);
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
    setShowCustom(false);
    setCurrentPage(1);
    setCurrentFavPage(1);
    setSearchQuery("");
    setFilter(null);
  };

  const handleShowCustom = () => {
    setShowCustom(true);
    setShowFavorites(false);
    setCurrentPage(1);
    setSearchQuery("");
    setFilter(null);
  };

  const renderPagination = (currentPage, totalPages, onPageChange) => {
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
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
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
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="mx-2 rounded-full px-4 py-2 focus:outline-none"
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
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

      <hr className="my-4 border-gray-300" />

      <div className="mb-4 flex flex-wrap space-x-1">
        <button
          className="py-0.25 rounded-md border border-gray-300 bg-white px-1.5 text-xs focus:outline-none focus:ring focus:ring-blue-400 dark:bg-slate-500 dark:text-secondary-foreground"
          onClick={handleShowAll}
        >
          All
        </button>
        <button
          className={`py-0.25 rounded-md border border-gray-300 bg-white px-1.5 text-xs focus:outline-none focus:ring focus:ring-blue-400 dark:bg-slate-500 dark:text-secondary-foreground ${
            filter === "MALE" ? "bg-blue-300 text-primary" : ""
          }`}
          onClick={handleMaleFilterChange}
        >
          Male
        </button>
        <button
          className={`py-0.25 rounded-md border border-gray-300 bg-white px-1.5 text-xs focus:outline-none focus:ring focus:ring-blue-400 dark:bg-slate-500 dark:text-secondary-foreground ${
            filter === "FEMALE" ? "bg-blue-300 text-primary" : ""
          }`}
          onClick={handleFemaleFilterChange}
        >
          Female
        </button>
        <button
          className={`py-0.25 rounded-md border border-gray-300 bg-white px-1.5 text-xs focus:outline-none focus:ring focus:ring-blue-400 dark:bg-slate-500 dark:text-secondary-foreground ${
            showFavorites ? "bg-blue-300 text-primary" : ""
          }`}
          onClick={handleShowFavorites}
        >
          Favorites
        </button>
        <button
          className={`py-0.25 rounded-md border border-gray-300 bg-white px-1.5 text-xs focus:outline-none focus:ring focus:ring-blue-400 dark:bg-slate-500 dark:text-secondary-foreground ${
            showCustom ? "bg-blue-300 text-primary" : ""
          }`}
          onClick={handleShowCustom}
        >
          Cloned Voices
        </button>
      </div>

      {showFavorites ? (
        <div className="mt-4">
          <FavoriteVoiceCards
            favoriteVoices={paginatedFavoriteVoices}
            onModelSelect={onModelSelect}
            onFavoriteChange={refreshSubscriptionData}
            refetchVoices={refetch}
          />
          <div className="mt-4">
            {renderPagination(
              currentFavPage,
              totalFavPages,
              handleFavPageChange,
            )}
          </div>
        </div>
      ) : showCustom ? (
        <div className="mt-4">
          <CustomVoiceCards onModelSelect={onModelSelect} />
        </div>
      ) : (
        <div className="mt-4">
          <VoiceCards
            voices={voices}
            onModelSelect={onModelSelect}
            onFavoriteChange={refreshSubscriptionData}
            favoriteVoices={favoriteVoices}
            subData={subData}
            currentPage={currentPage}
            isGenderFiltered={isGenderFiltered}
          />
          <div className="mt-4">
            {renderPagination(currentPage, totalPages, handlePageChange)}
          </div>
        </div>
      )}
    </div>
  );
}

export default VoiceWidget;

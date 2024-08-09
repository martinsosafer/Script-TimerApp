import React, { useState } from "react";

import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";
import CelebrityVoiceCards from "../celebrityvoicecard/celebrityvoicecard";
import FavoriteVoiceCards from "../favoritevoicescard/favoritevoicescard";
import VoiceCards from "../voicecards/voicecards";

function VoiceWidget({
  onModelSelect,
  favoriteVoices,
  refreshSubscriptionData,
  subData,
}) {
  const { data: allVoices, refetch } = subData
    ? api.voice.list.useQuery({ name: "" })
    : api.voice.publicVoices.useQuery();
  const { data: celebrityVoices = [], isLoading: isQueryLoading } =
    api.voice.listCelebrity.useQuery({ name: "" });
  const { data: customVoices = [] } = api.voice.customVoices.useQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentFavPage, setCurrentFavPage] = useState(1);
  const [currentCelebrityPage, setCurrentCelebrityPage] = useState(1);
  const [currentCustomPage, setCurrentCustomPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCelebrities, setShowCelebrities] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const pageSize = 8;

  const filteredVoices = allVoices?.filter((voice) => {
    const matchesSearchQuery = voice.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenderFilter = !filter || voice.gender === filter;
    const matchesCelebrityFilter = !showCelebrities || voice.isCelebrity;
    const matchesCustomFilter = !showCustom || voice.isCustom;
    return (
      matchesSearchQuery &&
      matchesGenderFilter &&
      matchesCelebrityFilter &&
      matchesCustomFilter
    );
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

  const celebStartIndex = (currentCelebrityPage - 1) * pageSize;
  const celebEndIndex = Math.min(
    celebStartIndex + pageSize,
    celebrityVoices?.length || 0,
  );
  const paginatedCelebrityVoices = celebrityVoices?.slice(
    celebStartIndex,
    celebEndIndex,
  );

  const customStartIndex = (currentCustomPage - 1) * pageSize;
  const customEndIndex = Math.min(
    customStartIndex + pageSize,
    customVoices?.length || 0,
  );
  const paginatedCustomVoices = customVoices?.slice(
    customStartIndex,
    customEndIndex,
  );

  const totalPages = Math.ceil((filteredVoices?.length || 0) / pageSize);
  const totalFavPages = Math.ceil(
    (filteredFavoriteVoices?.length || 0) / pageSize,
  );
  const totalCelebrityPages = Math.ceil(
    (celebrityVoices?.length || 0) / pageSize,
  );
  const totalCustomPages = Math.ceil((customVoices?.length || 0) / pageSize);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setCurrentFavPage(1);
    setCurrentCelebrityPage(1);
    setCurrentCustomPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFavPageChange = (pageNumber) => {
    setCurrentFavPage(pageNumber);
  };

  const handleCelebrityPageChange = (pageNumber) => {
    setCurrentCelebrityPage(pageNumber);
  };

  const handleCustomPageChange = (pageNumber) => {
    setCurrentCustomPage(pageNumber);
  };

  const handleMaleFilterChange = () => {
    setShowFavorites(false);
    setShowCelebrities(false);
    setShowCustom(false);
    setFilter("MALE");
    setCurrentPage(1);
    setCurrentFavPage(1);
    setCurrentCelebrityPage(1);
    setCurrentCustomPage(1);
    setSearchQuery("");
  };

  const handleFemaleFilterChange = () => {
    setShowFavorites(false);
    setShowCelebrities(false);
    setShowCustom(false);
    setFilter("FEMALE");
    setCurrentPage(1);
    setCurrentFavPage(1);
    setCurrentCelebrityPage(1);
    setCurrentCustomPage(1);
    setSearchQuery("");
  };

  const handleShowAll = () => {
    setShowFavorites(false);
    setShowCelebrities(false);
    setShowCustom(false);
    setSearchQuery("");
    setFilter(null);
    setCurrentPage(1);
    setCurrentFavPage(1);
    setCurrentCelebrityPage(1);
    setCurrentCustomPage(1);
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
    setShowCelebrities(false);
    setShowCustom(false);
    setCurrentPage(1);
    setCurrentFavPage(1);
    setCurrentCelebrityPage(1);
    setCurrentCustomPage(1);
    setSearchQuery("");
    setFilter(null);
  };

  const handleShowCelebrities = () => {
    setShowCelebrities(true);
    setShowFavorites(false);
    setShowCustom(false);
    setCurrentPage(1);
    setCurrentFavPage(1);
    setCurrentCelebrityPage(1);
    setCurrentCustomPage(1);
    setSearchQuery("");
    setFilter(null);
  };

  const handleShowCustom = () => {
    setShowCustom(true);
    setShowFavorites(false);
    setShowCelebrities(false);
    setCurrentPage(1);
    setCurrentFavPage(1);
    setCurrentCelebrityPage(1);
    setCurrentCustomPage(1);
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
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <span className="absolute inset-y-0 right-3 flex items-center">
          <IconSearch className="h-5 w-5 text-gray-400" />
        </span>
      </div>

      <div className="my-4 flex justify-center space-x-4">
        <button
          onClick={handleShowAll}
          className={`rounded-md px-4 py-2 ${
            !showFavorites && !showCelebrities && !showCustom && !filter
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Show All
        </button>
        <button
          onClick={handleMaleFilterChange}
          className={`rounded-md px-4 py-2 ${
            filter === "MALE"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Male
        </button>
        <button
          onClick={handleFemaleFilterChange}
          className={`rounded-md px-4 py-2 ${
            filter === "FEMALE"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Female
        </button>
        <button
          onClick={handleShowFavorites}
          className={`rounded-md px-4 py-2 ${
            showFavorites
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Favorites
        </button>
        <button
          onClick={handleShowCelebrities}
          className={`rounded-md px-4 py-2 ${
            showCelebrities
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Celebrities
        </button>
        <button
          onClick={handleShowCustom}
          className={`rounded-md px-4 py-2 ${
            showCustom ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
          }`}
        >
          Custom
        </button>
      </div>

      {showFavorites && (
        <>
          <div>
            <h2 className="mb-4 text-center text-lg font-semibold">
              Favorite Voices
            </h2>
            {paginatedFavoriteVoices?.length === 0 ? (
              <p className="text-center">No favorite voices found.</p>
            ) : (
              <FavoriteVoiceCards
                favoriteVoices={paginatedFavoriteVoices}
                onModelSelect={onModelSelect}
                refreshSubscriptionData={refreshSubscriptionData}
              />
            )}
          </div>
          {renderPagination(currentFavPage, totalFavPages, handleFavPageChange)}
        </>
      )}

      {showCelebrities && (
        <>
          <div>
            <h2 className="mb-4 text-center text-lg font-semibold">
              Celebrity Voices
            </h2>
            {paginatedCelebrityVoices?.length === 0 ? (
              <p className="text-center">No celebrity voices found.</p>
            ) : (
              <CelebrityVoiceCards
                celebrityVoices={paginatedCelebrityVoices}
                onModelSelect={onModelSelect}
                refreshSubscriptionData={refreshSubscriptionData}
              />
            )}
          </div>
          {renderPagination(
            currentCelebrityPage,
            totalCelebrityPages,
            handleCelebrityPageChange,
          )}
        </>
      )}

      {showCustom && (
        <>
          <div>
            <h2 className="mb-4 text-center text-lg font-semibold">
              Custom Voices
            </h2>
            {paginatedCustomVoices?.length === 0 ? (
              <p className="text-center">No custom voices found.</p>
            ) : (
              <VoiceCards
                voices={paginatedCustomVoices}
                onModelSelect={onModelSelect}
                refreshSubscriptionData={refreshSubscriptionData}
              />
            )}
          </div>
          {renderPagination(
            currentCustomPage,
            totalCustomPages,
            handleCustomPageChange,
          )}
        </>
      )}

      {!showFavorites && !showCelebrities && !showCustom && (
        <>
          <div>
            {voices?.length === 0 ? (
              <p className="text-center">No voices found.</p>
            ) : (
              <VoiceCards
                voices={voices}
                onModelSelect={onModelSelect}
                refreshSubscriptionData={refreshSubscriptionData}
              />
            )}
          </div>
          {renderPagination(currentPage, totalPages, handlePageChange)}
        </>
      )}
    </div>
  );
}

export default VoiceWidget;

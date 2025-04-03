"use client";

import React, { useState } from "react";

import { api } from "~/utils/api";

// Status options for regular paying users
const PAYING_STATUS_OPTIONS = [
  "ACTIVE",
  "STUDENT",
  "CREATOR",
  "BUSINESS",
  "STUDENTCLMO",
  "CREATORCLMO",
  "BUSINESSCLMO",
  "STUDENTCLYR",
  "CREATORCLYR",
  "BUSINESSCLYR",
];

// AppSumo tier options
const APPSUMO_TIER_OPTIONS = [
  { value: 1, label: "Tier 1" },
  { value: 2, label: "Tier 2" },
  { value: 3, label: "Tier 3" },
  { value: 4, label: "Tier 4" },
  { value: 5, label: "Tier 5" },
];

export default function VoiceGenerationDashboard() {
  const {
    data: generationData,
    isLoading,
    isError,
  } = api.user.voiceGenerationUsage.useQuery();
  const [emailSearch, setEmailSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTier, setSelectedTier] = useState("");

  if (isLoading) return <div>Loading voice generation data...</div>;
  if (isError) return <div>Error loading data</div>;

  // Filter the data based on search and filters
  const filteredData = generationData.filter((item) => {
    // Email search filter
    const emailMatch = item.email
      .toLowerCase()
      .includes(emailSearch.toLowerCase());

    // Status filter (applies to non-AppSumo users)
    const statusMatch =
      selectedStatus === "" ||
      (item.isAppSumo === false && item.status === selectedStatus);

    // AppSumo tier filter
    const tierMatch =
      selectedTier === "" ||
      (item.isAppSumo === true && item.appSumoTier === parseInt(selectedTier));

    return emailMatch && (item.isAppSumo ? tierMatch : statusMatch);
  });

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Voice Generation Usage</h1>

      {/* Filter Controls */}
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Email Search */}
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-sm font-medium">
            Search by Email
          </label>
          <input
            type="text"
            placeholder="Search emails..."
            className="w-full rounded border p-2"
            value={emailSearch}
            onChange={(e) => setEmailSearch(e.target.value)}
          />
        </div>

        {/* Paying Users Filter */}
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-sm font-medium">Paying Users</label>
          <select
            className="w-full rounded border p-2"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Paying Users</option>
            {PAYING_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* AppSumo Users Filter */}
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-sm font-medium">
            AppSumo Users
          </label>
          <select
            className="w-full rounded border p-2"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
          >
            <option value="">All AppSumo Users</option>
            {APPSUMO_TIER_OPTIONS.map((tier) => (
              <option key={tier.value} value={tier.value}>
                {tier.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-2 text-sm text-gray-600">
        Showing {filteredData.length} of {generationData.length} records
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Email</th>
              <th className="border p-2">User Type</th>
              <th className="border p-2">Status/Tier</th>
              <th className="border p-2">Voice Type</th>
              <th className="border p-2">Last Used</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((generation, index) => (
              <tr key={index}>
                <td className="border p-2">{generation.email}</td>
                <td className="border p-2">
                  {generation.isAppSumo ? (
                    <span className="font-semibold text-purple-600">
                      AppSumo
                    </span>
                  ) : (
                    <span className="text-blue-600">Regular</span>
                  )}
                </td>
                <td className="border p-2">
                  {generation.isAppSumo ? (
                    <span>Tier {generation.appSumoTier}</span>
                  ) : (
                    <span>{generation.status}</span>
                  )}
                </td>
                <td className="border p-2">
                  {generation.generationType === "11LABS" ? (
                    <span className="text-blue-600">11 Labs</span>
                  ) : generation.generationType === "GOOGLE" ? (
                    <span className="text-green-600">Google</span>
                  ) : (
                    <span className="text-gray-600">Other</span>
                  )}
                </td>
                <td className="border p-2">
                  {new Date(generation.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

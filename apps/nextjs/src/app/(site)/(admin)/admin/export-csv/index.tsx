import React from "react";

import { IconDownload } from "@voiceai/ui/@/components/ui/icons";

import type { UserData } from "../dashboard";

interface DownloadUsersDataProps {
  usersData: UserData[];
}

// Define the DownloadProducts component
export default function DownloadData({ usersData }: DownloadUsersDataProps) {
  // Define column headers for CSV
  const fileHeaders =
    usersData.length > 0 && usersData[0] ? Object.keys(usersData[0]) : [];

  // Function to convert JSON to CSV string
  function convertJSONToCSV(usersData: UserData[], columnHeaders: string[]) {
    // Check if JSON data is empty
    if (usersData.length === 0) {
      return "";
    }

    // Create headers string
    const headers = columnHeaders.join(",") + "\n";

    // Map JSON data to CSV rows
    const rows = usersData
      .map((row) => {
        // Map each row to CSV format
        return columnHeaders
          .map((field: string) => (row as any)[field] || "")
          .join(",");
      })
      .join("\n");

    // Combine headers and rows
    return headers + rows;
  }

  // Function to initiate CSV download
  function downloadCSV(usersData: UserData[], headers: string[]) {
    const csvData = convertJSONToCSV(usersData, headers);

    // Check if CSV data is empty
    if (csvData === "") {
      alert("No data to export");
    } else {
      // Create CSV file and initiate download

      const fileName = `users_data_${new Date().toLocaleDateString()}.csv`;

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Render the button for CSV export
  return (
    <button
      onClick={() => {
        downloadCSV(usersData, fileHeaders);
      }}
      className="text-md flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
    >
      Download Users Data <IconDownload className="h-6 w-6" />
    </button>
  );
}

// Sample JSON data for products

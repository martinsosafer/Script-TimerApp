"use client";

import React, { useState } from "react";

interface UserData {
  id: number;
  name: string;
  email: string;
  subscription: string;
  userId: string;
}

const mockData: UserData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subscription: "free",
    userId: "ABC123",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subscription: "standard",
    userId: "DEF456",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    subscription: "premium",
    userId: "GHI789",
  },
  // Add more mock data as needed
];

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<UserData[]>(mockData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    const filtered = mockData.filter((user) =>
      user.email.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">User Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Plan</th>
            <th className="px-4 py-2">Subscription</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id} className="border-b border-gray-300">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.userId}</td>
              <td className="px-4 py-2">Plan Name</td>
              <td className="px-4 py-2">
                <select className="rounded-lg border border-gray-300 px-2 py-1">
                  <option value="free" selected={user.subscription === "free"}>
                    Free
                  </option>
                  <option
                    value="standard"
                    selected={user.subscription === "standard"}
                  >
                    Standard
                  </option>
                  <option
                    value="premium"
                    selected={user.subscription === "premium"}
                  >
                    Premium
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

"use client";

import React, { useState } from "react";

interface UserData {
  name: string;
  email: string;
}

interface DashboardProps {
  userList: UserData[];
}

const Dashboard: React.FC<DashboardProps> = ({ userList }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<UserData[]>(userList);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    const filtered = userList.filter((user) =>
      user.email.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  return (
    <div className="container mx-auto mb-12 p-4">
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
          {filteredData.map((user, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{index}</td>
              <td className="px-4 py-2">Plan Name</td>
              <td className="px-4 py-2">
                <select className="rounded-lg border border-gray-300 px-2 py-1">
                  <option value="free">Free</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
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

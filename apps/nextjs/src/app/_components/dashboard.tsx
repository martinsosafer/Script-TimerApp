"use client";

import React, { useEffect, useState } from "react";

import { api } from "~/utils/api";

interface UserData {
  name: string;
  email: string;
  id: string;
  created_at: string;
  subscription: string;
  status: string;
  total_credits: number;
  updated_at: string;
}

interface DashboardProps {
  userList: UserData[];
}

const Dashboard: React.FC<DashboardProps> = ({ userList }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minCredits, setMinCredits] = useState<number | "">("");
  const [minDaysWithPlan, setMinDaysWithPlan] = useState<number | "">("");
  const [filteredData, setFilteredData] = useState<UserData[]>(userList);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const { mutateAsync: giveSubscription } =
    api.user.giveSubscription.useMutation({
      onSuccess(data) {
        console.log("Subscription given successfully:", data);
      },
      onError(error) {
        console.error("Error giving subscription:", error);
      },
    });
  const { mutateAsync: cancelSubscription } =
    api.user.cancelSubscription.useMutation({
      onSuccess(data) {
        console.log("Subscription cancelled successfully:", data);
      },
      onError(error) {
        console.error("Error cancelling subscription:", error);
      },
    });
  const { mutateAsync: updateStudent } = api.user.updateStudent.useMutation({
    onSuccess(data) {
      console.log("Subscription updated successfully:", data);
    },
    onError(error) {
      console.error("Error updating subscription:", error);
    },
  });
  const { mutateAsync: updateCreator } = api.user.updateCreator.useMutation({
    onSuccess(data) {
      console.log("Subscription updated successfully:", data);
    },
    onError(error) {
      console.error("Error updating subscription:", error);
    },
  });
  const { mutateAsync: giveFreeTrial } = api.user.giveFreeTrial.useMutation({
    onSuccess(data) {
      console.log("Free trial given successfully:", data);
    },
    onError(error) {
      console.error("Error giving free trial:", error);
    },
  });
  const handleGiveSubscription = async (userId: string) => {
    try {
      await giveSubscription({ userId });
    } catch (error) {
      console.error("Error giving subscription:", error);
    }
  };

  const handleCancelSubscription = async (userId: string) => {
    try {
      await cancelSubscription({ userId });
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  };

  // const handleUpdateSubscription = async (userId: string, status: string) => {
  //   try {
  //     await updateSubscription({ userId, status });
  //   } catch (error) {
  //     console.error("Error updating subscription:", error);
  //   }
  // };
  const handleStudent = async (userId: string, status: string) => {
    try {
      await updateStudent({ userId, status });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  const handleCreator = async (userId: string, status: string) => {
    try {
      await updateCreator({ userId, status });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  const handleGiveFreeTrial = async (userId: string) => {
    try {
      await giveFreeTrial({ userId });
    } catch (error) {
      console.error("Error giving free trial:", error);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = userList.filter(
      (user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name &&
          user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (selectedPlan) {
      setFilteredData(filtered.filter((user) => user.status === selectedPlan));
    } else {
      setFilteredData(filtered);
    }
  }, [searchTerm, userList, selectedPlan]);

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedPlan(e.target.value);
  };

  const handleMinCreditsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMinCredits(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    if (minCredits > 0) {
      setFilteredData(
        userList.filter((user) => user.total_credits >= minCredits),
      );
    } else {
      setFilteredData(userList);
    }
  }, [minCredits, userList]);

  const handleMinDaysWithPlanChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMinDaysWithPlan(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    if (minDaysWithPlan > 0) {
      setFilteredData(
        userList.filter(
          (user) => daysWithCurrentPlan(user.updated_at) >= minDaysWithPlan,
        ),
      );
    } else {
      setFilteredData(userList);
    }
  }, [minDaysWithPlan, userList]);

  const daysSinceCreated = (createdAt: string): number => {
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - createdAtDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };
  const daysWithCurrentPlan = (updated_at: string): number => {
    const updatedAtDate = new Date(updated_at);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - updatedAtDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };
  return (
    <div className="container mx-auto mb-12 p-4">
      <h1 className="mb-4 text-2xl font-bold">User Dashboard</h1>
      <div className="mb-4 flex flex-wrap">
        <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/2">
          <input
            type="text"
            placeholder="Search by email, name or id"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>
        <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
          <select
            value={selectedPlan}
            onChange={handlePlanChange}
            className="mr-2 w-full rounded-lg border border-gray-300 px-2 py-1"
          >
            <option value="">All Plans</option>
            <option value="FREE">Free</option>
            <option value="FREE_TRIAL">Free Trial</option>
            <option value="STUDENT">Student</option>
            <option value="CREATOR">Creator</option>
          </select>
        </div>
        <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
          <input
            type="number"
            placeholder="Min Credits"
            value={minCredits}
            onChange={handleMinCreditsChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>
        <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
          <input
            type="number"
            placeholder="Min Days with Current Plan"
            value={minDaysWithPlan}
            onChange={handleMinDaysWithPlanChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">N°</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Create on</th>
            <th className="px-4 py-2">Days since creation</th>
            <th className="px-4 py-2">Total Credits</th>
            <th className="px-4 py-2">Current Plan</th>
            <th className="px-4 py-2">Days with this plan</th>
            <th className="px-4 py-2">Give Plan</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="px-4 py-2">{index}</td>
              <td className="px-4 py-2">{user.name || "-"}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{daysSinceCreated(user.created_at)}</td>
              <td className="px-4 py-2">{user.total_credits}</td>
              <td className="px-4 py-2">{user.status}</td>
              <td className="px-4 py-2">
                {daysWithCurrentPlan(user.updated_at)}
              </td>
              <td className="px-4 py-2">
                <select
                  value={user.subscription}
                  onChange={(e) => {
                    const selectedStatus = e.target.value;
                    if (selectedStatus === "ACTIVE") {
                      handleGiveSubscription(user.id);
                    } else if (selectedStatus === "FREE") {
                      handleCancelSubscription(user.id);
                    } else if (selectedStatus === "STUDENT") {
                      handleStudent(user.id, "STUDENT");
                    } else if (selectedStatus === "CREATOR") {
                      handleCreator(user.id, "CREATOR");
                    } else if (selectedStatus === "FREE_TRIAL") {
                      handleGiveFreeTrial(user.id, "FREE_TRIAL");
                    }
                  }}
                  className="mr-2 rounded-lg border border-gray-300 px-2 py-1"
                >
                  <option value="">Select</option>
                  <option value="ACTIVE">Activate</option>
                  <option value="FREE">Free</option>
                  <option value="STUDENT">Student</option>
                  <option value="CREATOR">Creator</option>
                  <option value="FREE_TRIAL">Free Trial</option>
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

"use client";

import React, { useEffect, useState } from "react";

import { api } from "~/utils/api";
import AdminFilters from "../filters";

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
  const [minDaysWithPlanAsc, setMinDaysWithPlanAsc] = useState<number | "">("");
  const [minDaysWithPlanDesc, setMinDaysWithPlanDesc] = useState<number | "">(
    "",
  );
  const [minDaysSinceCreationAsc, setMinDaysSinceCreationAsc] = useState<
    number | ""
  >("");
  const [minDaysSinceCreationDesc, setMinDaysSinceCreationDesc] = useState<
    number | ""
  >("");
  const [filteredData, setFilteredData] = useState<UserData[]>(userList);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [isCreationAscending, setIsCreationAscending] = useState<boolean>(true);

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

  const { mutateAsync: updateBusiness } = api.user.updateBusiness.useMutation({
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

  const handleBusiness = async (userId: string, status: string) => {
    try {
      await updateBusiness({ userId, status });
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

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedPlan(e.target.value);
  };

  const handleMinCreditsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMinCredits(parseInt(e.target.value, 10) || "");
  };

  const handleMinDaysWithPlanAscChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMinDaysWithPlanAsc(parseInt(e.target.value, 10) || "");
  };

  const handleMinDaysWithPlanDescChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMinDaysWithPlanDesc(parseInt(e.target.value, 10) || "");
  };

  const handleMinDaysSinceCreationAscChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMinDaysSinceCreationAsc(parseInt(e.target.value, 10) || "");
  };

  const handleMinDaysSinceCreationDescChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMinDaysSinceCreationDesc(parseInt(e.target.value, 10) || "");
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const toggleCreationSortOrder = () => {
    setIsCreationAscending(!isCreationAscending);
  };

  useEffect(() => {
    let filtered = userList.filter(
      (user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name &&
          user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (selectedPlan) {
      filtered = filtered.filter((user) => user.status === selectedPlan);
    }

    if (minCredits !== "") {
      filtered = filtered.filter((user) => user.total_credits >= minCredits);
    }

    if (minDaysWithPlanAsc !== "") {
      filtered = filtered.filter(
        (user) => daysWithCurrentPlan(user.updated_at) >= minDaysWithPlanAsc,
      );
    }

    if (minDaysWithPlanDesc !== "") {
      filtered = filtered.filter(
        (user) => daysWithCurrentPlan(user.updated_at) <= minDaysWithPlanDesc,
      );
    }

    if (minDaysSinceCreationAsc !== "") {
      filtered = filtered.filter(
        (user) => daysSinceCreated(user.created_at) >= minDaysSinceCreationAsc,
      );
    }

    if (minDaysSinceCreationDesc !== "") {
      filtered = filtered.filter(
        (user) => daysSinceCreated(user.created_at) <= minDaysSinceCreationDesc,
      );
    }

    filtered.sort((a, b) => {
      const comparison =
        daysWithCurrentPlan(a.updated_at) - daysWithCurrentPlan(b.updated_at);
      return isAscending ? comparison : -comparison;
    });

    filtered.sort((a, b) => {
      const comparison =
        daysSinceCreated(a.created_at) - daysSinceCreated(b.created_at);
      return isCreationAscending ? comparison : -comparison;
    });

    setFilteredData(filtered);
  }, [
    searchTerm,
    userList,
    selectedPlan,
    minCredits,
    minDaysWithPlanAsc,
    minDaysWithPlanDesc,
    minDaysSinceCreationAsc,
    minDaysSinceCreationDesc,
    isAscending,
    isCreationAscending,
  ]);

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
      <AdminFilters
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        selectedPlan={selectedPlan}
        handlePlanChange={handlePlanChange}
        minCredits={minCredits}
        handleMinCreditsChange={handleMinCreditsChange}
        minDaysWithPlanAsc={minDaysWithPlanAsc}
        handleMinDaysWithPlanAscChange={handleMinDaysWithPlanAscChange}
        minDaysWithPlanDesc={minDaysWithPlanDesc}
        handleMinDaysWithPlanDescChange={handleMinDaysWithPlanDescChange}
        minDaysSinceCreationAsc={minDaysSinceCreationAsc}
        handleMinDaysSinceCreationAscChange={
          handleMinDaysSinceCreationAscChange
        }
        minDaysSinceCreationDesc={minDaysSinceCreationDesc}
        handleMinDaysSinceCreationDescChange={
          handleMinDaysSinceCreationDescChange
        }
      />
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Create on</th>
            <th className="border px-4 py-2">Current Plan</th>
            <th className="border px-4 py-2">Total Credits</th>
            <th className="border px-4 py-2">
              <button onClick={toggleSortOrder}>
                Days with Current Plan {isAscending ? "↑" : "↓"}
              </button>
            </th>
            <th className="border px-4 py-2">
              <button onClick={toggleCreationSortOrder}>
                Days Since Creation {isCreationAscending ? "↑" : "↓"}
              </button>
            </th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{user.status}</td>
              <td className="border px-4 py-2">{user.total_credits}</td>
              <td className="border px-4 py-2">
                {daysWithCurrentPlan(user.updated_at)}
              </td>
              <td className="border px-4 py-2">
                {daysSinceCreated(user.created_at)}
              </td>
              <td className="space-y-2 border px-4 py-2">
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
                    } else if (selectedStatus === "BUSINESS") {
                      handleBusiness(user.id, "BUSINESS");
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
                  <option value="BUSINESS">Business</option>
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

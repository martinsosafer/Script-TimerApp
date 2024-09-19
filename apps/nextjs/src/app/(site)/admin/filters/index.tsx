import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import type { UserData } from "../dashboard";
import { daysSinceCreated, daysWithCurrentPlan } from "../helpers";

interface AdminFiltersProps {
  userList: UserData[];
  setFilteredList: Dispatch<SetStateAction<UserData[]>>;
}

export default function AdminFilters({
  setFilteredList,
  userList,
}: AdminFiltersProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedPlan(e.target.value);
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

    if (minDaysWithPlanAsc !== "") {
      filtered = filtered.filter(
        (user) =>
          daysWithCurrentPlan(user.updated_at ?? new Date()) >=
          minDaysWithPlanAsc,
      );
    }

    if (minDaysWithPlanDesc !== "") {
      filtered = filtered.filter(
        (user) =>
          daysWithCurrentPlan(user.updated_at ?? new Date()) <=
          minDaysWithPlanDesc,
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

    setFilteredList(filtered);
  }, [
    searchTerm,
    selectedPlan,
    minDaysWithPlanAsc,
    minDaysWithPlanDesc,
    minDaysSinceCreationAsc,
    minDaysSinceCreationDesc,
    setFilteredList,
    userList,
  ]);

  return (
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
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="">All Plans</option>
          <option value="STUDENT">Student</option>
          <option value="CREATOR">Creator</option>
          <option value="BUSINESS">Business</option>
          <option value="FREE">Free</option>
          <option value="FREE_TRIAL">Free Trial</option>
        </select>
      </div>

      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
        <input
          type="number"
          placeholder="Min Days with Current Plan Asc"
          value={minDaysWithPlanAsc === "" ? "" : minDaysWithPlanAsc}
          onChange={handleMinDaysWithPlanAscChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
        <input
          type="number"
          placeholder="Max Days with Current Plan Desc"
          value={minDaysWithPlanDesc === "" ? "" : minDaysWithPlanDesc}
          onChange={handleMinDaysWithPlanDescChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
        <input
          type="number"
          placeholder="Min Days Since Creation Asc"
          value={minDaysSinceCreationAsc === "" ? "" : minDaysSinceCreationAsc}
          onChange={handleMinDaysSinceCreationAscChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
        <input
          type="number"
          placeholder="Max Days Since Creation Desc"
          value={
            minDaysSinceCreationDesc === "" ? "" : minDaysSinceCreationDesc
          }
          onChange={handleMinDaysSinceCreationDescChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
    </div>
  );
}

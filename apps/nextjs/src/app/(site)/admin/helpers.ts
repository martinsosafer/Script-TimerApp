import type { Dispatch, SetStateAction } from "react";

import type { UserData } from "./dashboard";

export const daysSinceCreated = (createdAt: Date): number => {
  const createdAtDate = new Date(createdAt);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - createdAtDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

export const daysWithCurrentPlan = (updated_at: Date): number => {
  const updatedAtDate = new Date(updated_at);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - updatedAtDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

interface Sorter {
  type?:
    | "cl_credits"
    | "eleven_labs_credits"
    | "open_ai_credits"
    | "images"
    | "updated_at"
    | "created_at";
  filterCreatedAt?: boolean;
  state: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
  filteredList: UserData[];
  setFilteredList: Dispatch<SetStateAction<UserData[]>>;
}

export function sortHandler({
  type,
  filterCreatedAt = false,
  state,
  setter,
  filteredList,
  setFilteredList,
}: Sorter) {
  if (type === "updated_at") {
    const sortedList = [...filteredList].sort((a, b) => {
      if (state) {
        return (
          daysWithCurrentPlan(a.updated_at ?? new Date()) -
          daysWithCurrentPlan(b.updated_at ?? new Date())
        );
      } else {
        return (
          daysWithCurrentPlan(a.updated_at ?? new Date()) +
          daysWithCurrentPlan(b.updated_at ?? new Date())
        );
      }
    });

    setFilteredList(sortedList);
    setter(!state);
    return;
  }
  if (type === "created_at") {
    const sortedList = [...filteredList].sort((a, b) => {
      if (state) {
        return daysSinceCreated(a[type] ?? 0) - daysSinceCreated(b[type] ?? 0);
      } else {
        return daysSinceCreated(a[type] ?? 0) + daysSinceCreated(b[type] ?? 0);
      }
    });

    setFilteredList(sortedList);
    setter(!state);
  }
  if (filterCreatedAt) {
    const sortedList = [...filteredList].sort((a, b) => {
      if (state) {
        return a.created_at.getTime() - b.created_at.getTime();
      } else {
        return a.created_at.getTime() + b.created_at.getTime();
      }
    });

    setFilteredList(sortedList);
    setter(!state);
  }
  if (type) {
    const sortedList = [...filteredList].sort((a, b) => {
      if (state) {
        return Number(a[type] ?? 0) - Number(b[type] ?? 0);
      } else {
        return Number(a[type] ?? 0) + Number(b[type] ?? 0);
      }
    });

    setFilteredList(sortedList);
    setter(!state);
  }
}

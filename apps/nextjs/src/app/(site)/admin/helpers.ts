"use client";

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

export function sortHandler(
  type:
    | "cl_credits"
    | "eleven_labs_credits"
    | "open_ai_credits"
    | "images"
    | "updated_at"
    | "created_at",
  state: boolean,
  setter: Dispatch<SetStateAction<boolean>>,
  filteredList: UserData[],
  setFilteredList: Dispatch<SetStateAction<UserData[]>>,
) {
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
  } else {
    const sortedList = [...filteredList].sort((a, b) => {
      if (state) {
        return (a[type] ?? 0) - (b[type] ?? 0);
      } else {
        return (a[type] ?? 0) + (b[type] ?? 0);
      }
    });

    setFilteredList(sortedList);
    setter(!state);
  }
}

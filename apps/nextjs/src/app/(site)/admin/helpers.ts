"use client";

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

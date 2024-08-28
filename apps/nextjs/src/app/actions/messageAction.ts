"use server";

import { pusherServer } from "~/lib/pusher";

export const sendMessage = async (message: string) => {
  try {
    await pusherServer.trigger("plagiarism-check", "upcomming-message", {
      message,
    });
  } catch (error) {
    console.error(error);
  }
};

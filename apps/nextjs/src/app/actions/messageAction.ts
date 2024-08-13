"use server";

import type { PlagiarismPayload } from "~/app/api/webhook/plagiarism-result/[status]/[id]/route";
import { pusherServer } from "~/lib/pusher";

export const sendMessage = async (message: PlagiarismPayload) => {
  try {
    await pusherServer.trigger("plagiarism-check", "upcomming-message", {
      message,
    });
  } catch (error) {
    console.error(error);
  }
};

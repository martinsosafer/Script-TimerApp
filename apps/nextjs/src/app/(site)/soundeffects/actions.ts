"use server";

import { list } from "@vercel/blob";

import { db, eq } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";

import type { Blob } from "./types";

export async function getUserCredits(userId: string) {
  try {
    const credits = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });
    return credits;
  } catch (error) {
    console.error(error);
  }
}

export async function getSoundsBlob(prefix: string) {
  try {
    const { blobs } = await list({
      prefix: prefix,
    });
    const fullList = (await JSON.parse(JSON.stringify(blobs))) as Blob[];
    const listByFolders = fullList.reduce(
      (acc: Record<string, Blob[]>, blob) => {
        const folder = blob.pathname.split("/")[1]!;
        if (folder !== "" && !acc[folder]) {
          acc[folder] = [];
        }
        if (folder !== "" && !Array.isArray(Object.values(acc[folder]!)[0])) {
          acc[folder]!.push(blob);
        }
        return acc;
      },
      {},
    );
    const soundEffectsArray = Object.entries(listByFolders).map(
      ([type, sounds]) => {
        return { type, sounds: sounds.slice(1) };
      },
    );
    return soundEffectsArray;
  } catch (error) {
    console.error(error);
  }
}

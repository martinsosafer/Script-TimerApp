"use server";

import { list } from "@vercel/blob";

import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";
import { soundfx, userToSoundfx } from "@voiceai/db/schema/soundEffects";

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

export async function getSoundfxFavorites(userId: string) {
  try {
    const favorites = await db.query.users.findFirst({
      where: eq(schema.users.id, userId),
      // with: {
      //   usersToSoundfxFavorite: true,
      // },
    });
    return favorites;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching sound effects favorites");
  }
}

interface SoundfxFavorite {
  id: string;
  created_at: Date;
  updated_at: Date;
  pathname: string;
  url: string;
  downloadurl: string;
}
export async function postSoundfxFavorite(soundBlob: Blob) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const existingSoundFx = await db.query.soundfx.findFirst({
      where: eq(soundfx.pathname, soundBlob.pathname),
    });

    if (existingSoundFx) {
      return await db
        .insert(userToSoundfx)
        .values({
          userId: userId!,
          soundfxId: existingSoundFx.id,
        })
        .execute();
    }

    const newSoundFx = await db
      .insert(soundfx)
      .values({
        pathname: soundBlob.pathname,
        url: soundBlob.url,
        downloadurl: soundBlob.downloadUrl,
      })
      .returning({ soundfxId: soundfx.id });

    return await db
      .insert(userToSoundfx)
      .values({
        userId: userId!,
        soundfxId: newSoundFx[0]?.soundfxId!,
      })
      .execute();
  } catch (error) {
    console.error(error);
    throw new Error("Error posting sound effects favorites");
  }
}

// - Create get for user favorites list
// - Show in frontend if sound is in favorites
// - If the user adds to favorites
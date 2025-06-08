"use server";

import { list } from "@vercel/blob";

import { auth } from "@voiceai/auth";
import { and, db, eq } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";
import { soundfx, userToSoundfx } from "@voiceai/db/schema/soundEffects";

import type { SoundTypeNeon } from "./types";

export async function getElevenLabsUserCredits(userId: string) {
  try {
    // Check user credits
    const planCredits = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });

    // Check boosters credits
    const boosterCredits = await db.query.elevenLabsBooster.findMany({
      where: (booster, { eq }) => eq(booster.userId, userId),
    });
    let totalBoosterCredits = 0;
    if (boosterCredits.length > 0) {
      totalBoosterCredits = boosterCredits.reduce(
        (acc, booster) => acc + booster.credits,
        0,
      );
    }

    const totalCredits = (planCredits?.credits ?? 0) + totalBoosterCredits;
    return totalCredits;
  } catch (error) {
    console.error("Error getting user credits", error);
  }
}

// Compare Vercel Blobs with Neon list and update dB
// Note: If you remove a sound from Vercel, it will not be removed from dB (handle manually on Neon)
export async function updateSoundfxFromVercel() {
  try {
    // Get Vercel Blob Sound Effects
    const soundEffectsBlobs = await list({
      prefix: "sound-effects",
    });
    const noFolderSoundEffectsBlobs = soundEffectsBlobs.blobs.filter((blob) => {
      const folder = blob.pathname.split("/");
      return folder[2] && folder[2] !== "";
    });
    // Get Vercel Blob Music
    const musicBlobs = await list({
      prefix: "music",
    });
    const noFolderMusicBlobs = musicBlobs.blobs.filter((blob) => {
      const folder = blob.pathname.split("/");
      return folder[2] && folder[2] !== "";
    });
    // Combine both lists
    const allBlobs = [...noFolderSoundEffectsBlobs, ...noFolderMusicBlobs];
    // Get list of sound effects and music from dB
    const soundfxListFromDb = await db.query.soundfx.findMany();
    // Filter sounds not in the dB
    const missingSoundfx = allBlobs.filter((blob) => {
      return !soundfxListFromDb.some(
        (sound) => sound.pathname === blob.pathname,
      );
    });

    if (missingSoundfx.length === 0) {
      console.log(">VercelBlob: No new sound effects or music found<");
      return;
    }
    // Add new sounds to dB
    if (missingSoundfx.length > 0) {
      for (const soundBlob of missingSoundfx) {
        await db
          .insert(soundfx)
          .values({
            pathname: soundBlob.pathname,
            url: soundBlob.url,
            downloadurl: soundBlob.downloadUrl,
          })
          .execute();
      }
      return console.log(">VercelBlob: Sound Effects and Music updated<");
    }
    return console.log(
      ">VercelBlob: Sound Effects and Music already up to date<",
    );
  } catch (error) {
    console.error(">VercelBlob: Error updating soundfx<", error);
  }
}

// Get list of sound effects or music from dB
export async function getSoundfxList(type: string) {
  try {
    const soundEffectsList = await db.query.soundfx.findMany();
    const soundfxOnlyList = soundEffectsList.filter((sound) => {
      return sound.pathname.startsWith(`${type}/`);
    });
    const soundEffectsBySecondName = soundfxOnlyList.reduce(
      (acc: Record<string, SoundTypeNeon[]>, sound) => {
        const secondName = sound.pathname.split("/")[1]!;
        if (secondName !== "" && !acc[secondName]) {
          acc[secondName] = [];
        }
        if (
          secondName !== "" &&
          !Array.isArray(Object.values(acc[secondName]!)[0])
        ) {
          acc[secondName]!.push(sound);
        }
        return acc;
      },
      {},
    );
    const soundEffectsArray = Object.entries(soundEffectsBySecondName).map(
      ([type, sounds]) => {
        return { type, sounds };
      },
    );
    return soundEffectsArray;
  } catch (error) {
    console.error("Error getting sound effects list", error);
  }
}

// Get list of favorites from dB
export async function getFavorites() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const userFavorites = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId!),
      with: {
        userToSoundfx: true,
      },
    });
    const soundfxFavoritesList = userFavorites?.userToSoundfx.map(
      (relation) => relation.soundfxId,
    );
    return soundfxFavoritesList;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching sound effects favorites");
  }
}

// Save sound effect or music to user favorites
export async function postFavorite({
  sound,
  userId,
}: {
  sound: SoundTypeNeon;
  userId: string | undefined;
}) {
  try {
    const soundId = sound?.id;

    if (!userId) return;

    return await db
      .insert(userToSoundfx)
      .values({
        userId: userId,
        soundfxId: soundId,
      })
      .execute();
  } catch (error) {
    console.error(error);
    throw new Error("Error posting sound effects favorite");
  }
}

// Remove sound effect or music from user favorites
export async function deleteFavorite({
  sound,
  userId,
}: {
  sound: SoundTypeNeon;
  userId: string | undefined;
}) {
  try {
    const soundId = sound?.id;

    if (!userId) return;

    return await db
      .delete(userToSoundfx)
      .where(
        and(
          eq(userToSoundfx.userId, userId),
          eq(userToSoundfx.soundfxId, soundId),
        ),
      )
      .execute();
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting sound effects favorite");
  }
}

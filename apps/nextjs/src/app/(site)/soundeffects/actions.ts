"use server";

import { list } from "@vercel/blob";

import { auth } from "@voiceai/auth";
import { db, eq } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";
import { users } from "@voiceai/db/schema/auth";
import { soundfx, userToSoundfx } from "@voiceai/db/schema/soundEffects";

import type { Blob, SoundTypeNeon } from "./types";

export async function getUserCredits(userId: string) {
  try {
    const credits = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });
    return credits;
  } catch (error) {
    console.error("Error getting user credits", error);
  }
}

export async function updateSoundfxFromVercel() {
  try {
    const soundEffectsBlobs = await list({
      prefix: "sound-effects",
    });
    const noFolderSoundEffectsBlobs = soundEffectsBlobs.blobs.filter((blob) => {
      const folder = blob.pathname.split("/");
      return folder[2] && folder[2] !== "";
    });

    const musicBlobs = await list({
      prefix: "music",
    });
    const noFolderMusicBlobs = musicBlobs.blobs.filter((blob) => {
      const folder = blob.pathname.split("/");
      return folder[2] && folder[2] !== "";
    });

    const allBlobs = [...noFolderSoundEffectsBlobs, ...noFolderMusicBlobs];

    const soundfxListFromDb = await db.query.soundfx.findMany();

    const missingSoundfx = allBlobs.filter((blob) => {
      return !soundfxListFromDb.some(
        (sound) => sound.pathname === blob.pathname,
      );
    });

    if (missingSoundfx.length === 0) {
      console.log("No new sound effects or music found");
      return;
    }

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
      return console.log("Sound Effects and Music updated from Vercel");
    }
    return console.log("Sound Effects and Music already up to date");
  } catch (error) {
    console.error("Error updating soundfx from Vercel", error);
  }
}

// Get list of sound effects from dB
export async function getSoundfxList() {
  try {
    const soundEffectsList = await db.query.soundfx.findMany();
    const soundfxOnlyList = soundEffectsList.filter((sound) => {
      return sound.pathname.startsWith("sound-effects/");
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

// export async function getSoundsBlob(prefix: string) {
//   try {
//     const { blobs } = await list({
//       prefix: prefix,
//     });
//     const fullList = (await JSON.parse(JSON.stringify(blobs))) as Blob[];
//     const listByFolders = fullList.reduce(
//       (acc: Record<string, Blob[]>, blob) => {
//         const folder = blob.pathname.split("/")[1]!;
//         if (folder !== "" && !acc[folder]) {
//           acc[folder] = [];
//         }
//         if (folder !== "" && !Array.isArray(Object.values(acc[folder]!)[0])) {
//           acc[folder]!.push(blob);
//         }
//         return acc;
//       },
//       {},
//     );
//     const soundEffectsArray = Object.entries(listByFolders).map(
//       ([type, sounds]) => {
//         return { type, sounds: sounds.slice(1) };
//       },
//     );
//     return soundEffectsArray;
//   } catch (error) {
//     console.error("Error getting sound effects blobs", error);
//   }
// }

// Post new sound effect or music to db
export async function getOrPostSoundFx(soundBlob: Blob) {
  try {
    const existingSoundFx = await db.query.soundfx.findFirst({
      where: eq(soundfx.pathname, soundBlob.pathname),
    });
    if (existingSoundFx) {
      console.log("Sound effect already exists in DB", existingSoundFx?.id);
      return existingSoundFx?.id;
    }
    const newSoundFx = await db
      .insert(soundfx)
      .values({
        pathname: soundBlob.pathname,
        url: soundBlob.url,
        downloadurl: soundBlob.downloadUrl,
      })
      .returning({ soundfxId: soundfx.id });
    return newSoundFx[0]?.soundfxId;
  } catch (error) {
    console.error("Error posting sound effect or music", error);
  }
}

export async function getSoundfxFavorites() {
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

export async function postSoundfxFavorite(soundBlob: Blob) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const findOrCreateSoundfxId = await getOrPostSoundFx(soundBlob);

    return await db
      .insert(userToSoundfx)
      .values({
        userId: userId!,
        soundfxId: findOrCreateSoundfxId!,
      })
      .execute();
  } catch (error) {
    console.error(error);
    throw new Error("Error posting sound effects favorites");
  }
}

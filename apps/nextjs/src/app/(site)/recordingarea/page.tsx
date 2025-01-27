import type { Metadata } from "next";
import { list } from "@vercel/blob";

import { auth } from "@voiceai/auth";

import { getAllAIContent } from "~/app/actions/speechcoach";
import ModeSelectorRecorder from "./mode-selector-recorder";

export const metadata: Metadata = {
  title: "Recording Area",
  description: "Record audio, video or your screen",
};
async function getSavedAudios(userId: string) {
  try {
    const { blobs } = await list({
      prefix: `RecordedAudio/${userId}/`,
    });

    return blobs.map((blob) => {
      // Get the full path after RecordedAudio/userId/
      const fullPath = blob.pathname.split(`RecordedAudio/${userId}/`)[1];

      // Extract the recording pattern using regex
      const recordingPattern = fullPath.match(
        /(recording-\d{2}\/\d{2}\/\d{4}-)/,
      );
      const filename = recordingPattern ? recordingPattern[1] : fullPath;

      // Format the date
      const date = new Date(blob.uploadedAt);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

      return {
        url: blob.url,
        filename,
        uploadedAt: formattedDate,
      };
    });
  } catch (error) {
    console.error("Error fetching saved audios:", error);
    return [];
  }
}
async function getSavedWebcam(userId: string) {
  try {
    const { blobs } = await list({
      prefix: `RecordedWebcam/${userId}/`,
    });
    return blobs.map((blob) => {
      // Get the full path after RecordedWebcam/userId/
      const fullPath = blob.pathname.split(`RecordedWebcam/${userId}/`)[1];

      // Extract the recording pattern using regex
      const recordingPattern = fullPath.match(
        /(recording-\d{2}\/\d{2}\/\d{4}-)/,
      );
      const filename = recordingPattern ? recordingPattern[1] : fullPath;

      // Format the date
      const date = new Date(blob.uploadedAt);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

      return {
        url: blob.url,
        filename,
        uploadedAt: formattedDate,
      };
    });
  } catch (error) {
    console.error("Error fetching saved webcams:", error);
    return [];
  }
}
async function getSavedScreen(userId: string) {
  try {
    const { blobs } = await list({
      prefix: `RecordedScreen/${userId}/`,
    });
    return blobs.map((blob) => ({
      url: blob.url,
      filename: blob.pathname.split("/").pop(),
      uploadedAt: blob.uploadedAt,
    }));
  } catch (error) {
    console.error("Error fetching saved audios:", error);
    return [];
  }
}
export default async function IndexPage() {
  const session = await auth();
  const userId = session?.user.id;

  let savedAudios = [];
  let savedWebcam = [];
  let savedScreen = [];
  let aiContents = [];

  if (userId) {
    savedAudios = await getSavedAudios(userId);
    savedWebcam = await getSavedWebcam(userId);
    savedScreen = await getSavedScreen(userId);

    // Fetch all AI contents for the user
    aiContents = await getAllAIContent(userId);
    console.log("AICONTENT", aiContents);
    // Compare and combine savedWebcam with aiContents
    savedWebcam = savedWebcam.map((webcamItem) => {
      const matchingAIContents = aiContents.filter(
        (aiItem) => aiItem.uploadUrl === webcamItem.url,
      );

      if (matchingAIContents.length > 0) {
        return {
          ...webcamItem,
          aiContent: matchingAIContents.map(({ type, content }) => ({
            type,
            content,
          })),
        };
      }

      return webcamItem;
    });
  }

  console.log("savedwebcam", JSON.stringify(savedWebcam, null, 2));

  return (
    <div className="min-h-screen w-full items-center justify-center ">
      <div className="flex flex-col py-[60px]">
        <div className="flex flex-col items-center">
          <h2
            className={`text-cp-primary  font-poppins text-[42px] font-bold leading-[50px] `}
          >
            Record and Get Feedback
          </h2>
          <p className="text-center text-[16px] font-bold leading-[22.4px] text-black">
            Speak freely and record yourself, then get instant feedback on areas
            to improve your delivery
          </p>
        </div>
        <ModeSelectorRecorder
          userId={userId}
          savedAudios={savedAudios}
          savedWebcam={savedWebcam}
          savedScreen={savedScreen}
        />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { list } from "@vercel/blob";

import { auth } from "@voiceai/auth";

import { getAllAIContent } from "~/app/actions/speechcoach";
import {
  AUDIO_DURATION_LIMITS,
  AUDIO_RECORDING_LIMITS,
  WEBCAM_DURATION_LIMITS,
  WEBCAM_RECORDING_LIMITS,
} from "~/constants/credits";
import PageHeader from "../components/page-header";
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
      const fullPath = blob.pathname.split(`RecordedAudio/${userId}/`)[1];
      const recordingPattern = fullPath.match(
        /(recording-\d{2}\/\d{2}\/\d{4}-)/,
      );
      const filename = recordingPattern ? recordingPattern[1] : fullPath;

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
      const fullPath = blob.pathname.split(`RecordedWebcam/${userId}/`)[1];
      const recordingPattern = fullPath.match(
        /(recording-\d{2}\/\d{2}\/\d{4}-)/,
      );
      const filename = recordingPattern ? recordingPattern[1] : fullPath;

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
    console.error("Error fetching saved screens:", error);
    return [];
  }
}

export default async function IndexPage() {
  const session = await auth();
  const userId = session?.user.id;
  const userEmail = session?.user.email;
  const subData = session?.user.subscription?.status;

  let savedAudios = [];
  let savedWebcam = [];
  let savedScreen = [];
  let aiContents = [];

  // Initialize limit variables for both audio and webcam
  let currentAudioCount = 0;
  let audioLimit = 0;
  let audioDurationLimit = 0;
  let currentWebcamCount = 0;
  let webcamLimit = 0;
  let webcamDurationLimit = 0;
  if (userId) {
    savedAudios = await getSavedAudios(userId);
    savedWebcam = await getSavedWebcam(userId);
    savedScreen = await getSavedScreen(userId);

    // Calculate current audio count
    currentAudioCount = savedAudios.length;

    // Determine the user's plan (default to FREE if no subscription)
    const userPlan = subData || "FREE";

    // Audio limits calculation
    currentAudioCount = savedAudios.length;
    audioLimit =
      AUDIO_RECORDING_LIMITS[userPlan] || AUDIO_RECORDING_LIMITS.FREE;
    audioDurationLimit =
      AUDIO_DURATION_LIMITS[userPlan] || AUDIO_DURATION_LIMITS.FREE;
    // Webcam limits calculation
    currentWebcamCount = savedWebcam.length;
    webcamLimit =
      WEBCAM_RECORDING_LIMITS[userPlan] || WEBCAM_RECORDING_LIMITS.FREE;
    webcamDurationLimit =
      WEBCAM_DURATION_LIMITS[userPlan] || WEBCAM_DURATION_LIMITS.FREE;

    // Fetch all AI contents for the user
    aiContents = await getAllAIContent(userId);

    // Compare and combine savedAudios with aiContents
    savedAudios = savedAudios.map((audioItem) => {
      const matchingAIContents = aiContents.filter(
        (aiItem) => aiItem.uploadUrl === audioItem.url,
      );

      if (matchingAIContents.length > 0) {
        return {
          ...audioItem,
          aiContent: matchingAIContents.map(({ type, content }) => ({
            type,
            content,
          })),
        };
      }

      return audioItem;
    });

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

  const isSaveDisabled = currentAudioCount >= audioLimit;
  const isWebcamSaveDisabled = currentWebcamCount >= webcamLimit;
  return (
    <>
      <div>
        <PageHeader
          title="Record and Get Feedback"
          subtitle="Speak freely and record yourself, then get instant feedback on areas to improve your delivery."
        />
        <ModeSelectorRecorder
          userId={userId}
          savedAudios={savedAudios}
          savedWebcam={savedWebcam}
          savedScreen={savedScreen}
          subData={subData}
          // Pass the new props for audio limits
          currentAudioCount={currentAudioCount}
          audioLimit={audioLimit}
          audioDurationLimit={audioDurationLimit}
          isSaveDisabled={isSaveDisabled}
          currentWebcamCount={currentWebcamCount}
          webcamLimit={webcamLimit}
          webcamDurationLimit={webcamDurationLimit}
          isWebcamSaveDisabled={isWebcamSaveDisabled}
          userEmail={userEmail}
        />
      </div>
    </>
  );
}

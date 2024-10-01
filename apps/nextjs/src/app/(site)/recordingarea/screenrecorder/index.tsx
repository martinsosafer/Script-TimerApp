"use client";

import { useEffect, useRef, useState } from "react";
import { oembed } from "@loomhq/loom-embed";
import { createInstance, RecordingStatus } from "@loomhq/record-sdk";
import { isSupported } from "@loomhq/record-sdk/is-supported";

const ScreenRecorder = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoomSupported, setIsLoomSupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] =
    useState<RecordingStatus | null>(null);
  const sdkRef = useRef<any>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/screen-recorder-token");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Token fetched from server:", data?.token);
        if (data?.token) {
          setToken(data.token);
        } else {
          console.error("No token returned from server");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    async function initializeLoom() {
      if (token) {
        try {
          const { supported } = await isSupported();
          console.log("Loom SDK supported:", supported);

          if (!supported) {
            console.log("Loom is not supported on this browser.");
            setIsLoomSupported(false);
            return;
          }

          setIsLoomSupported(true);

          const sdk = await createInstance({
            mode: "custom",
            jws: token, // Use the fetched token
          });

          sdkRef.current = sdk;

          console.log("SDK initialized successfully");

          sdk.on("recording-status-change", (status: RecordingStatus) => {
            setRecordingStatus(status);
            if (status === RecordingStatus.RECORDING) {
              setRecording(true);
            } else if (status === RecordingStatus.IDLE) {
              setRecording(false);
            }
          });

          sdk.on("recording-complete", async (video) => {
            console.log("Recording complete:", video.sharedUrl);
            try {
              const { html } = await oembed(video.sharedUrl, { width: 400 });
              insertEmbedPlayer(html);
            } catch (error) {
              console.error("Error embedding video:", error);
            }
          });
        } catch (error) {
          console.error("SDK failed to initialize:", error);
        }
      } else {
        console.log("Token is null, cannot initialize Loom SDK");
      }
    }

    initializeLoom();
  }, [token]);

  function insertEmbedPlayer(html: string) {
    const target = document.getElementById("target");
    if (target) {
      target.innerHTML = html;
    }
  }

  const startRecording = async () => {
    if (sdkRef.current) {
      try {
        await sdkRef.current.start();
      } catch (error) {
        console.error("Failed to start recording:", error);
      }
    }
  };

  const stopRecording = async () => {
    if (sdkRef.current) {
      try {
        await sdkRef.current.stop();
      } catch (error) {
        console.error("Failed to stop recording:", error);
      }
    }
  };

  return (
    <div className="bg-blue-500 p-4">
      {isLoomSupported ? (
        <>
          <button
            onClick={recording ? stopRecording : startRecording}
            className={`rounded-lg px-4 py-2 ${
              recording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } font-bold text-white transition-colors`}
            disabled={
              !sdkRef.current ||
              recordingStatus === RecordingStatus.REQUESTING_PERMISSION
            }
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
          {recordingStatus === RecordingStatus.REQUESTING_PERMISSION && (
            <p className="mt-2 text-yellow-300">Requesting permissions...</p>
          )}
          <div id="target" className="mt-4"></div>
        </>
      ) : (
        <p className="text-white">Loom is not supported on this browser.</p>
      )}
    </div>
  );
};

export default ScreenRecorder;

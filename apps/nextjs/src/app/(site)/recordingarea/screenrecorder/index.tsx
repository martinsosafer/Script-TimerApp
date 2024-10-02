"use client";

import { useEffect, useState } from "react";
import { createInstance } from "@loomhq/record-sdk";
import { isSupported } from "@loomhq/record-sdk/is-supported";

const ScreenRecorder = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoomSupported, setIsLoomSupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // Store the video URL

  // Fetch the JWT from the server
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/screen-recorder-token");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Token fetched from server:", data?.token);
        setToken(data?.token || null); // Store the token in the state
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }

    fetchToken();
  }, []);

  // Setup Loom SDK after token is fetched
  useEffect(() => {
    async function initializeLoom() {
      if (token) {
        try {
          const { supported } = await isSupported();
          setIsLoomSupported(supported);

          if (!supported) {
            console.log("Loom is not supported on this browser.");
            return;
          }

          // Initialize Loom SDK instance with token
          const sdk = await createInstance({
            mode: "custom",
            jws: token,
          });

          console.log("SDK initialized successfully");

          // Get the button element
          const buttonElement = document.getElementById("record-button");

          if (buttonElement) {
            // Configure the record button
            const recordButton = sdk.configureButton({
              element: buttonElement,
            });

            // Set up event listeners for button
            recordButton.on("start", () => {
              console.log("Recording started");
              setRecording(true);
            });

            recordButton.on("stop", () => {
              console.log("Recording stopped");
              setRecording(false);
            });

            recordButton.on("recording-complete", (video) => {
              console.log("Recording complete:", video.sharedUrl);
              setRecording(false);
              setVideoUrl(video.sharedUrl); // Save the video URL
            });

            recordButton.on("cancel", () => {
              console.log("Recording canceled.");
              setRecording(false);
            });
          } else {
            console.error("Record button element not found.");
          }
        } catch (error) {
          console.error("SDK initialization error:", error);
        }
      } else {
        console.log("No token available, cannot initialize Loom SDK");
      }
    }

    initializeLoom();
  }, [token]);

  return (
    <div className="bg-blue-500 p-4">
      {isLoomSupported ? (
        <>
          <button
            id="record-button"
            className="rounded-lg bg-gray-500 px-4 py-2 text-white"
            disabled={recording}
          >
            {recording ? "Recording..." : "Record"}
          </button>
          {videoUrl && (
            <div className="mt-4">
              <p>Recording complete! Watch your video below:</p>
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                {videoUrl}
              </a>
            </div>
          )}
        </>
      ) : (
        <p className="text-white">Loom is not supported on this browser.</p>
      )}
    </div>
  );
};

export default ScreenRecorder;

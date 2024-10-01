"use client";

import { useEffect, useState } from "react";
import { oembed } from "@loomhq/loom-embed";
import { createInstance } from "@loomhq/record-sdk";
import { isSupported } from "@loomhq/record-sdk/is-supported";

const ScreenRecorder = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoomSupported, setIsLoomSupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const [sdkInstance, setSdkInstance] = useState<any>(null);

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
        if (data?.token) {
          setToken(data.token); // Store the token in the state
        } else {
          console.error("No token returned from server");
        }
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
          console.log("Loom SDK supported:", supported);

          if (!supported) {
            console.log("Loom is not supported on this browser.");
            setIsLoomSupported(false);
            return;
          }

          setIsLoomSupported(true);

          // Use the SetupFunction instead of createInstance
          const sdk = await createInstance({
            mode: "custom",
            jws: token, // Use the fetched token
          });

          setSdkInstance(sdk);

          console.log("SDK initialized successfully");

          // Get the button element
          const buttonElement = document.getElementById("record-button");

          // Ensure the button element is not null before passing it
          if (buttonElement) {
            // Configure the button
            const recordButton = sdk.configureButton({
              element: buttonElement, // Pass the element
            });

            // Listen for the button's state changes
            recordButton.on("start", () => {
              console.log("Recording started");
              setRecording(true);
            });

            recordButton.on("stop", () => {
              console.log("Recording stopped");
              setRecording(false);
            });

            // Event listeners for recording stages
            recordButton.on("recording-start", () => {
              console.log("Video capture has begun.");
            });

            recordButton.on("recording-complete", async (video) => {
              console.log("Recording complete:", video.sharedUrl);
              setRecording(false);
              try {
                const { html } = await oembed(video.sharedUrl, { width: 400 });
                insertEmbedPlayer(html);
              } catch (error) {
                console.error("Error embedding video:", error);
              }
            });

            recordButton.on("upload-complete", (video) => {
              console.log("Video upload complete:", video.sharedUrl);
            });

            recordButton.on("cancel", () => {
              console.log("Recording canceled.");
              setRecording(false);
            });
          } else {
            console.error("Record button element not found.");
          }
        } catch (error) {
          console.error("SDK failed to initialize:", error);
        }
      } else {
        console.log("Token is null, cannot initialize Loom SDK");
      }
    }

    initializeLoom();
  }, [token]);

  // Helper function to embed the video in the DOM
  function insertEmbedPlayer(html: string) {
    const target = document.getElementById("target");
    if (target) {
      target.innerHTML = html;
    }
  }

  const handleRecordClick = async () => {
    if (sdkInstance) {
      try {
        if (!recording) {
          await sdkInstance.start();
        } else {
          await sdkInstance.stop();
        }
      } catch (error) {
        console.error("Error toggling recording:", error);
      }
    }
  };

  return (
    <div className="bg-blue-500">
      {isLoomSupported ? (
        <>
          <button
            id="record-button"
            className="rounded-lg bg-gray-500 px-2 py-2"
            onClick={handleRecordClick}
            disabled={!sdkInstance} // Disable button until SDK is initialized
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
          <div id="target" className="mt-4"></div>{" "}
          {/* Video will be embedded here */}
        </>
      ) : (
        <p>Loom is not supported on this browser.</p>
      )}
    </div>
  );
};

export default ScreenRecorder;

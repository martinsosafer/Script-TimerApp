"use client";

import { useEffect, useState } from "react";
import { oembed } from "@loomhq/loom-embed";
import { createInstance } from "@loomhq/record-sdk";
import { isSupported } from "@loomhq/record-sdk/is-supported";

const ScreenRecorder = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoomSupported, setIsLoomSupported] = useState(false);
  const [recording, setRecording] = useState(false);

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
          const { supported } = await isSupported(); // Add 'await' here to ensure correct resolution
          console.log("Loom SDK supported:", supported);

          if (!supported) {
            console.log("Loom is not supported on this browser.");
            setIsLoomSupported(false); // Update state for unsupported browser
            return;
          }

          setIsLoomSupported(true); // Browser is supported

          // Setup SDK with custom mode, JWS token, and environment
          const sdk = await createInstance({
            mode: "custom",
            jws: token, // Use the fetched token
          });

          console.log("SDK initialized successfully");

          // Configure the button
          const recordButton = sdk.configureButton({
            element: document.getElementById("record-button"),
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
          recordButton.on("start", () => {
            console.log("Recording started");
            setRecording(true);
          });

          recordButton.on("recording-start", () => {
            console.log("Video capture has begun.");
          });

          recordButton.on("recording-complete", async (video) => {
            console.log("Recording complete:", video.sharedUrl);
            setRecording(false);
            try {
              const { html } = await oembed(video.sharedUrl, { width: 400 });
              insertEmbedPlayer(html); // Embed the video in the DOM
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

  return (
    <div className="bg-blue-500">
      {isLoomSupported ? (
        <>
          <button
            id="record-button"
            className="rounded-lg bg-gray-500 px-2 py-2"
            disabled={recording} // Disable button during recording
          >
            {recording ? "Recording..." : "Record"}
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

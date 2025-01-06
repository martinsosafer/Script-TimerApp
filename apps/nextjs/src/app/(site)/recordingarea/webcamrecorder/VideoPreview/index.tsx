import React, { useEffect, useRef, useState } from "react";

interface VideoPreviewProps {
  stream: MediaStream | null;
  recordingUrl?: string | null;
  isRecording?: boolean;
}

export function VideoPreview({
  stream,
  recordingUrl: initialRecordingUrl,
  isRecording,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(
    initialRecordingUrl,
  );

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (recordingUrl) {
      videoElement.srcObject = null;
      videoElement.src = recordingUrl;
      videoElement.load();
    } else if (stream) {
      videoElement.srcObject = stream;
      videoElement
        .play()
        .catch((err) => console.error("Error playing video:", err));
    }

    return () => {
      if (videoElement.srcObject) {
        videoElement.srcObject = null;
      }
    };
  }, [stream, recordingUrl]);

  const resetWebcam = () => {
    setRecordingUrl(null);
  };

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        className="mb-4 w-full max-w-2xl rounded-lg shadow-lg"
        autoPlay
        playsInline
        muted={!recordingUrl}
        controls={!!recordingUrl}
      />
      {recordingUrl && (
        <button
          onClick={resetWebcam}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
        >
          Reset Webcam
        </button>
      )}
    </div>
  );
}

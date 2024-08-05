"use client";

import React, { useRef, useState } from "react";

const AudioRecorder = ({ onSave }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    recorder.ondataavailable = (e) => {
      const url = URL.createObjectURL(e.data);
      setAudioURL(url);
    };
    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleSave = () => {
    if (audioURL) {
      fetch(audioURL)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "recording.wav", { type: "audio/wav" });
          onSave(file);
        });
    }
  };

  return (
    <div className="audio-recorder">
      <button
        onClick={recording ? stopRecording : startRecording}
        className="btn btn-primary"
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioURL && (
        <>
          <audio ref={audioRef} src={audioURL} controls className="mt-4" />
          <button onClick={handleSave} className="btn btn-secondary mt-2">
            Save Recording
          </button>
        </>
      )}
    </div>
  );
};

export default AudioRecorder;

"use client";

import React, { useEffect, useRef, useState } from "react";

import { IconMic2 } from "@voiceai/ui/@/components/ui/icons";

import { formatTime } from "~/lib/formattime";

const AudioRecorder = ({ onSave }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showInspiration, setShowInspiration] = useState(false);
  const timerRef = useRef(null);
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
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      clearInterval(timerRef.current);
      setTimer(0);
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

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="audio-recorder rounded-lg bg-white p-4 shadow-md">
      <p className="mb-4 text-sm text-gray-700">
        Please record your voice for over 1:30 min. Keep in mind that the result
        of the voice cloning will depend on your microphone quality, and there
        should not be any background noise.
      </p>
      <button
        onClick={() => setShowInspiration(!showInspiration)}
        className="mb-4 w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none"
      >
        {showInspiration ? "Hide sample script" : "Show me a sample script"}
      </button>
      {showInspiration && (
        <div className="mb-4 max-h-48 overflow-y-auto rounded-md border border-gray-300 bg-gray-50 p-4 text-gray-700">
          <p>
            In the heart of the bustling city, where the sounds of honking cars
            and busy pedestrians filled the air, there was a small, unassuming
            café that seemed to be a world of its own. It was the kind of place
            that offered a refuge from the hectic pace of urban life, where one
            could sit quietly with a book or a laptop, enjoying a steaming cup
            of coffee.
          </p>
          <p className="mt-2">
            The walls of the café were adorned with vibrant paintings by local
            artists, adding a splash of color to the cozy space. Soft jazz music
            played in the background, creating a soothing atmosphere. The café
            had become a favorite spot for writers, students, and anyone in need
            of a little inspiration.
          </p>
          <p className="mt-2">
            On this particular day, Sarah found herself at her usual corner
            table, her notebook open in front of her. She watched as people came
            and went, each with their own stories and destinations. It was a
            habit of hers to imagine the lives of strangers, to weave narratives
            from the glimpses she caught of their interactions.
          </p>
          <p className="mt-2">
            As she sipped her coffee, Sarah noticed a young man sitting at a
            table near the window. He was engrossed in a thick novel, his brow
            furrowed in concentration. She wondered what world he was lost in,
            what adventures and characters he was encountering within the pages.
          </p>
          <p className="mt-2">
            The barista, a friendly woman with a warm smile, approached Sarah
            with a refill. They exchanged pleasantries, and Sarah felt a sense
            of belonging, a comfort that came from the familiarity of the place
            and its people. She returned to her writing, the words flowing more
            easily now.
          </p>
          <p className="mt-2">
            As the minutes passed, the café began to fill with the aroma of
            freshly baked pastries. Sarah glanced at the display case, tempted
            by the array of treats. She decided to indulge in a chocolate
            croissant, knowing it would be the perfect companion for her second
            cup of coffee.
          </p>
          <p className="mt-2">
            With each bite, she savored the flaky layers and rich chocolate,
            feeling a sense of contentment. It was these small pleasures, the
            simple moments of joy, that made the world feel a little brighter.
            And in the midst of it all, she realized that inspiration was all
            around her, waiting to be captured in words.
          </p>
        </div>
      )}
      <button
        onClick={recording ? stopRecording : startRecording}
        className="hover:bg-primary-dark flex w-full items-center justify-center rounded-md bg-primary py-2 font-semibold text-white focus:outline-none"
      >
        <IconMic2 className="mr-2" />
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      {recording && (
        <div className="mt-2 text-center text-gray-700">
          Recording... {formatTime(timer)}
        </div>
      )}
      {audioURL && (
        <>
          <div className="mt-4 flex flex-col items-center">
            <audio
              ref={audioRef}
              src={audioURL}
              controls
              className="w-full max-w-md"
            />
            <button
              onClick={handleSave}
              className="hover:bg-secondary-dark mt-2 w-full max-w-md rounded-md bg-tertiary py-2 font-semibold text-white focus:outline-none"
            >
              Save Recording
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioRecorder;

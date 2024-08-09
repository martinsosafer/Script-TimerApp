"use client";

import React from "react";

import AudioRecorder from "../cloningRecord";

const AudioRecorderModal = ({ isOpen, onRequestClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg border-2 border-slate-400 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Record Your Audio</h2>
        <AudioRecorder onSave={onSave} />
        <button onClick={onRequestClose} className="btn btn-secondary mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default AudioRecorderModal;

"use client";

import React from "react";
import Lottie from "lottie-react";

import creatingVoiceAnimation from "../../../public/animations/creatingVoice.json";

interface VoiceCreationModalProps {
  isVisible: boolean;
  onClose: () => void; // onClose function to close the modal
}

const VoiceCreationModal: React.FC<VoiceCreationModalProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <div
      className={`modal fixed left-0 top-0 flex h-full w-full items-center justify-center ${
        isVisible ? "block" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="rounded-lg border-4 border-black bg-white p-6 text-center">
        <div className="mb-6 flex flex-col items-center">
          <Lottie
            animationData={creatingVoiceAnimation}
            className="h-40 w-32"
          />
          <h2 className="mb-4 text-2xl font-bold">Creating voice...</h2>
          <h3 className="mb-4 text-lg">
            Longer{" "}
            <span className="inline-block font-bold text-primary">scripts</span>{" "}
            take longer{" "}
            <span className="inline-block font-bold text-primary">time</span>!
          </h3>
        </div>
        <p className="text-lg">
          Please wait while we generate the voice, you can close this window
          now.
        </p>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceCreationModal;

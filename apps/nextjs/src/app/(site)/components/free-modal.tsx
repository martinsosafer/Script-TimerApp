import React from "react";

function FreeModal({ onClose }) {
  // If the user is not a free user, don't render anything

  const handleSkipForNow = () => {
    onClose();
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="max-h-full w-full max-w-xl overflow-y-auto bg-white sm:rounded-2xl">
        <div className="w-full">
          <div className="m-8 mx-auto my-20 max-w-[400px]">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-extrabold">
                You are missing out !
              </h1>
              <p className="text-gray-600">
                Get the most out of script timer by .......
              </p>
            </div>
            <div className="space-y-4">
              <button
                className="w-full rounded-full bg-tertiary p-3 font-semibold text-primary-foreground"
                onClick={() => handleSkipForNow()}
              >
                Upgrade Plan
              </button>
              <button
                className="w-full rounded-full border bg-white p-3 font-semibold"
                onClick={() => handleSkipForNow()} // Close the modal when clicked
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeModal;
